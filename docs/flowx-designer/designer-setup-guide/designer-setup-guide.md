# Designer setup guide

The [FLOWX Designer](../flowx-designer.md) app is made up of a backend microservice and a frontend app. The backend microservice handles saving and editing process definitions. It provides the REST API used by the FLOWX Designer. The processes defined here will be handled by the [FLOWX Engine](../../platform-deep-dive/core-components/flowx-engine/flowx-engine.md).

Follow to next steps in order to set them up in your environment.

## **Managing Prerequisites**

The backend microservice uses most of the same resources as the FLOWX Engine.

### Database - Postgres / Oracle

The backend microservice connects to the same Postgres / Oracle database as the Engine.

### Kafka cluster

The backend microservice needs to be able to connect to the Kafka cluster in case you want to use the audit functionality. If connected to Kafka, it will send details about all database transactions on a configured Kafka topic.

### NGINX

It would be best if the FLOWX Designer used a separate [NGINX](../../platform-overview/frameworks-and-standards/event-driven-architecture-frameworks/intro-to-nginx.md) load balancer from the Engine. This is used in order to route API calls from the [SPA](designer-setup-guide.md#for-configuring-the-spa) (single page application) to the backend service, to the engine and to various plugins.

This is used in order to route API calls from the SPA (single page application) to the backend service, to the engine, and to various plugins.&#x20;

The FLOWX Designer SPA will use the backend service to manage the platform via REST calls, will use API calls to manage specific content for the plugins and will use REST and [WebSocket](../../building-blocks/node/task-node/websocket-send-action.md) calls to connect to the engine.

Here's an example/suggestion of an NGINX setup:

#### For routing calls to plugins:

```jsx
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/enable-cors: "true"
    nginx.ingress.kubernetes.io/cors-allow-methods: GET, PUT, POST, DELETE, PATCH
    nginx.ingress.kubernetes.io/cors-allow-origin: "http://localhost:4200,http://localhost:80,http://localhost:8080"
    nginx.ingress.kubernetes.io/rewrite-target: /$2
  name: flowx-admin-plugins-subpaths
spec:
  rules:
  - host: {{host}}
    http:
      paths:
      - path: /notification(/|$)(.*)
        backend:
          serviceName: notification
          servicePort: 80
      - path: /document(/|$)(.*)
        backend:
          serviceName: document
          servicePort: 80
  tls:
  - hosts:
    - {{host}}
    secretName: {{tls secret}}
```

#### For routing calls to the engine

Three different configs are needed:

1. For viewing the current instances of processes running in the Engine:

```jsx
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/rewrite-target: /api/instances/$2
    nginx.ingress.kubernetes.io/enable-cors: "true"
    nginx.ingress.kubernetes.io/cors-allow-methods: GET, PUT, POST, DELETE, PATCH
    nginx.ingress.kubernetes.io/cors-allow-origin: "http://localhost:4200,http://localhost:80,http://localhost:8080"
  name: flowx-admin-engine-instances
spec:
  rules:
  - host: {{host}}
    http:
      paths:
      - path: /api/instances(/|$)(.*)
        backend:
          serviceName: {{engine-service-name}}
          servicePort: 80
```

2. For testing process definitions from the FlowX Designer, we need to route API calls and WebSocket communication to the Engine backend.

setup for routing REST calls:

```jsx
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/rewrite-target: /api/$2
    nginx.ingress.kubernetes.io/enable-cors: "true"
    nginx.ingress.kubernetes.io/cors-allow-methods: GET, PUT, POST, DELETE, PATCH
    nginx.ingress.kubernetes.io/cors-allow-origin: "http://localhost:4200,http://localhost:80,http://localhost:8080"
  name: flowx-admin-engine-rest-api
spec:
  rules:
  - host: {{host}}
    http:
      paths:
      - path: /{{PROCESS_API_PATH}}/api(/|$)(.*)
        backend:
          serviceName: {{engine-service-name}}
          servicePort: 80
```

setup for routing WS communication:

```jsx
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/configuration-snippet: |
      more_set_headers "Access-Control-Allow-Origin: $http_origin";
    nginx.ingress.kubernetes.io/cors-allow-credentials: "true"
    nginx.ingress.kubernetes.io/enable-cors: "true"
    nginx.ingress.kubernetes.io/proxy-read-timeout: "3600"
    nginx.ingress.kubernetes.io/proxy-send-timeout: "3600"
  name: flowx-admin-engine-ws
spec:
  rules:
  - host: {{host}}
    http:
      paths:
      - path: /ws
        backend:
          serviceName: {{engine-service-name-ws}}
          servicePort: 80
```

3. For accessing the REST API of the backend microservice

```jsx
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/proxy-body-size: "4m"
    nginx.ingress.kubernetes.io/enable-cors: "true"
    nginx.ingress.kubernetes.io/cors-allow-methods: GET, PUT, POST, DELETE, PATCH
    nginx.ingress.kubernetes.io/cors-allow-origin: "http://localhost:4200,http://localhost:80,http://localhost:8080"
  name: flowx-admin-api
spec:
  rules:
  - host: {{host}}
    http:
      paths:
        - path: /
          backend:
            serviceName: {{flowx-admin-service-name}}
            servicePort: 80
  tls:
  - hosts:
    - {{host}}
    secretName: {{tls secret}}
```

#### For configuring the SPA:

```jsx
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    certmanager.k8s.io/issuer: letsencrypt-prod
    kubernetes.io/ingress.class: nginx
    ingress.kubernetes.io/affinity: cookie
  name: flowx-designer-spa
spec:
  rules:
  - host: {{host of web app}}
    http:
      paths:
      - backend:
          serviceName: {{flowx-designer-service-name}}
          servicePort: 80
  tls:
  - hosts:
    - {{host of web app}}
    secretName: {{tls secret}}
```

## **Admin configuration**

### Datasource configuration

To store process definitions the Admin microservice connects to the same Postgres / Oracle database as the Engine. Make sure to set the needed database connection details.

The following configuration details need to be added using environment variables:

`SPRING_DATASOURCE_URL`

`SPRING_DATASOURCE_USERNAME`

`SPRING_DATASOURCE_PASSWORD`

:::danger
You will need to make sure that the user, password, connection link and db name are configured correctly, otherwise, you will receive errors at start time.
:::

:::info
The database schema is managed by a [liquibase](https://www.liquibase.org/) script provided with the Engine.
:::

### Kafka configuration

Kafka is used only for saving audit logs. Only a producer needs to be configured. The environment variables that need to be set are:

`KAFKA_BOOTSTRAP_SERVERS` - the Kafka bootstrap servers URL

`KAFKA_TOPIC_AUDIT_OUT` - topic key for sending audit logs. Default value: `ai.flowx.audit.log`


[How to create a Kafka producer](../../platform-deep-dive/integrations/creating-a-kafka-producer)

### Redis configuration

The following values should be set with the corresponding Redis-related values:

`SPRING_REDIS_HOST`

`SPRING_REDIS_PASSWORD`


### Logging

The following environment variables could be set in order to control log levels:

`LOGGING_LEVEL_ROOT` - root spring boot microservice logs

`LOGGING_LEVEL_APP` - app level logs

### Authorization & access roles

The following variables need to be set in order to connect to the identity management platform:

`SECURITY_OAUTH2_BASE_SERVER_URL`

`SECURITY_OAUTH2_CLIENT_CLIENT_ID`

`SECURITY_OAUTH2_REALM`

A specific service account should be configured in the OpenID provider to allow the Admin microservice to access realm-specific data. It can be configured using the following environment variables:

`SECURITY_OAUTH2_SERVICE_ACCOUNT_ADMIN_CLIENT_ID` - the openid service account username

`SECURITY_OAUTH2_SERVICE_ACCOUNT_ADMIN_CLIENT_SECRET` - the openid service account client secret

Configuration needed to clear the offline sessions of a user session from the identity provider solution:

`FLOWX_AUTHENTICATE_CLIENTID` 

[Configuring access rights for admin](configuring-access-rights-for-admin)

### Elasticsearch

`SPRING_ELASTICSEARCH_REST_URIS`

`SPRING_ELASTICSEARCH_REST_DISABLESSL`

`SPRING_ELASTICSEARCH_INDEX_SETTINGS_NAME` 

`SPRING_ELASTICSEARCH_REST_USERNAME`

`SPRING_ELASTICSEARCH_REST_PASSWORD`


## **Steps to deploy Frontend app**

The FLOWX Designer is an SPA application that is packaged in a docker image with `nginx:1.19.10`. The web application allows an authenticated user to administrate the FLOWX platform.

In order to configure the docker image you need to configure the next parameters:

```jsx
flowx-process-renderer:
  env:
    BASE_API_URL: {{the one configured as host in the nginx}}
    PROCESS_API_PATH: {{something like /engine}}
    KEYCLOAK_ISSUER: {{openid provider - ex: https://something/auth/realms/realmName}}
    KEYCLOAK_REDIRECT_URI: {{url of the SPA}}
    KEYCLOAK_CLIENT_ID: {{client ID}}
    STATIC_ASSETS_PATH: {{mediaLibrary.s3.publicUrl }}/{{env}}
```