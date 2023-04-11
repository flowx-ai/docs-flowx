# License engine setup guide

The service is available as a docker image.

It has the following dependencies:

* a [postgres](https://www.mongodb.com/2) database
* it needs to be able to connect to the same Kafka instance as the one used by the engine
* requests made to the License engine should be routed from the FLOWX Designer using NGINX



The service comes with most of the needed configuration properties filled in, but there are a few that need to be set up using some custom environment variables.

## Dependencies <a href="#2939ce6e-c291-40c2-b3d6-1e789b1617d7" id="2939ce6e-c291-40c2-b3d6-1e789b1617d7"></a>

### Postgres database

Basic Postgres configuration - helm values.yaml

```yaml
  licencedb:
    existingSecret: {{secretName}}
    metrics:
      enabled: true
      service:
        annotations:
          prometheus.io/port: {{phrometeus port}}
          prometheus.io/scrape: "true"
        type: ClusterIP
      serviceMonitor:
        additionalLabels:
          release: prometheus-operator
        enabled: true
        interval: 30s
        scrapeTimeout: 10s
    persistence:
      enabled: true
      size: 1Gi
    postgresqlDatabase: license-coredb
    postgresqlExtendedConf:
      maxConnections: 200
      sharedBuffers: 128MB
    postgresqlUsername: postgres
    resources:
      limits:
        cpu: 6000m
        memory: 2048Mi
      requests:
        cpu: 200m
        memory: 512Mi
```

****

## Configuration <a href="#bad24571-ff23-4ec3-83d9-8a2ace74a6b4" id="bad24571-ff23-4ec3-83d9-8a2ace74a6b4"></a>

### Authorization configuration & access roles

The following variables need to be set in order to connect to the identity management platform:

`SECURITY_OAUTH2_BASE_SERVER_URL`

`SECURITY_OAUTH2_CLIENT_CLIENT_ID`

`SECURITY_OAUTH2_REALM`


[Configuring access roles (old)](configuring-access-roles-old.md)


### License datasource configuration

To store license related data, the license engine uses a Postgres / Oracle database.

The following configuration details need to be added in configuration files or overwritten using environment variables:

`SPRING_DATASOURCE_JDBCURL`

`SPRING_DATASOURCE_USERNAME`

`SPRING_DATASOURCE_PASSWORD`

### Engine datasource configuration

The License service needs to retrieve the data for a process instance from the engine database. So it needs to have all the correct information to connect to the engine database.

The following configuration details need to be added in configuration files or overwritten using environment variables:

`ENGINE_DATASOURCE_JDBCURL`

`ENGINE_DATASOURCE_USERNAME`

`ENGINE_DATASOURCE_PASSWORD`

### Kafka configuration

Kafka handles all communication between the License Engine and the FLOWX Engine.&#x20;

Both a producer and a consumer must be configured. The following Kafka related configurations can be added in configuration files or overwritten using environment variables:

`SPRING_KAFKA_BOOTSTRAP_SERVERS` - address of the Kafka server

`SPRING_KAFKA_CONSUMER_GROUP_ID` - group of consumers

`KAFKA_CONSUMER_THREADS` - the number of Kafka consumer threads

`KAFKA_AUTH_EXCEPTION_RETRY_INTERVAL` - the interval between retries after `AuthorizationException` is thrown by `KafkaConsumer`

:::caution
The configured license topic `KAFKA_TOPIC`\_`LICENSE_IN` should be the same as the `KAFKA_TOPIC_LICENSE_OUT` from the engine&#x20;
:::

### Logging

The following environment variables could be set in order to control log levels:

`LOGGING_LEVEL_ROOT` - root spring boot microservice logs

`LOGGING_LEVEL_APP` - app level logs

### NGINX

The [configuration for the Flowx Designer](../../../flowx-designer/designer-setup-guide/#nginx) should be updated to also expose the REST API of the license engine by adding a path in `flowx-admin-plugins-subpaths`

```
      - path: /license(/|$)(.*)
        backend:
          serviceName: license-core
          servicePort: 80
```