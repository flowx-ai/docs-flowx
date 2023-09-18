# Deployment guidelines v2.0.0

## Summary

* New FLOWX component versions
* [deploy] Migrating from custom env variables to spring environment default binding
* [deploy] Component renaming
* [deploy] New deployment helm charts 

## Component Versions



|                          :ballot_box_with_check:  | 2.0.0     | 1.16.0  | 1.15    | 1.14    | **1.13.0** | 1.12.0 | 1.11.0  |
| ---------------------------------------------------- | --------- | ------- | ------- | ------- | ---------- | ------ | ------- |
| **Process engine**                                   | 0.4.12    | 0.4.4   | 0.3.26  | 0.3.21  | 0.3.14     | 0.3.9  | 0.3.7   |
| **Designer**                                         | 2.10.0    | 2.5.0   | 2.1.1   | 1.21.0  | 1.16.3     | 1.15.2 | 1.14.0  |
| **CMS Core**                                         | 0.2.17    | 0.2.14  | 0.2.9   | 0.2.9   | 0.2.9      | 0.2.5  | 0.2.3   |
| **Scheduler Core**                                   | 0.0.23    | 0.0.19  | 0.0.12  | 0.0.12  | 0.0.12     | NA     | 0.0.6   |
| **flowx-process-renderer**                           | 2.10.0    | 2.4.2   | 2.1.1   | 1.21.0  | 1.16.3     | 1.15.2 | 1.14.0  |
| **flowx-web-components**                             | 0.2.1     | 0.2.1   | 0.0.298 | 0.0.298 | 0.0.298    | NA     | 0.0.293 |
| **Admin**                                            | 0.3.13    | 0.3.3   | 0.2.26  | 0.2.26  | 0.2.26     | 0.2.25 | 0.2.23  |
| **Notification Plugin**                              | 1.0.186-1 | 1.0.186 | 1.0.182 | 1.0.182 | 1.0.182    | NA     | 1.0.179 |
| **Document Plugin**                                  | 1.0.30    | 1.0.26  | 1.0.24  | 1.0.20  | 1.0.18     | NA     | 1.0.15  |
| **OCR Plugin**                                       | 0.0.109   | 0.0.109 | 0.0.106 |         |            |        |         |
| **License Core**                                     | 0.1.12    | 0.1.10  | 0.1.5   | n/a     |            |        |         |
| **Customer Management Plugin**                       | 0.1.18    | 0.1.16  | 0.1.10  | 0.1.10  | 0.1.10     | NA     | 0.1.6   |
| **Task Management Plugin**                           | 0.0.16    | 0.0.14  |         |         |            |        |         |

## Component Renaming

As FLOWX evolves, initial component names don't make sense anymore and we decided to update them. We started this process a while ago and hoped to make the change in time without affecting the customers too much, but as the number of components increased we needed to accelerate this process as it would become harder and harder as time passes. In this release we deprecated old names and moved everything to a more standard naming convention:

* FLOWX components are separated in core, engine or a plugin (`<process-engine>,<cms-core>,<document-plugin>`)
* container images have also been renamed (svc- prefix removed, added component category as suffix, no more "flowx" in the name)
* helm charts have also been renamed (+ migrating to a new **non backwards compatible** helm chart standard)
* installed instances should be renamed and this change hneeds to be reflected in ingress route configuration or reporting tools

### Container Images Naming

Some container images have been renamed to adhere to the same naming standard and old image names are not maintained anymore. 

Replacing the name should not affect the deployment process, but may affect reporting or security tools (eg. image scanning ignoring new names).

| Category | Deprecated Names                                              | New image name                                                   |
| -------- | ------------------------------------------------------------- | ---------------------------------------------------------------- |
| Core     | \[svc-]onboarding         | **process-engine**            |
| Core     | \[svc-]flowx-admin         | **admin**                   |
| Core     | \[svc]-flowx-cms            | **cms-core**                |
| Plugin   | \[svc-]document           | **document-plugin**          |
| Plugin   | \[svc-]notification       | **notification-plugin**      |
| Plugin   | \[svc-]customer-management | **customer-management-plugin**|
| Web      | flowx-process-renderer     | **designer**             |

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release-notes/200_containers.png)

### Change Deployment / Service Naming

:exclamation: Change deployment names and services to match with new naming. Eg Change onboarding to process-engine:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release-notes/200_service_naming.png)

:exclamation: Service name inside helm charts default to legacy component name. They also need to be renamed, and for this you just need to override the `service.name` variable. Eg. For onboarding there are actually two names:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release-notes/200_service_naming1.png)

:exclamation: Ingress/route resources are created outside helm charts and they need to be updated to use the correct backend service name as target. Make sure both admin/public resources are updated.  E.g.: Changing onboarding:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release-notes/200_service_naming2.png)

:::caution
**Make sure to validate before applying that all Ingress/Route ⇾ Service → Deployments match.**
:::

### (Optional) Change onboarding base-path

Currently web apps use /onboarding base path for any process-engine api requests. In order to replace it with /engine two changes must be done:

1. Update ingress/route configs and make sure both admin/public resources are updated:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release-notes/200_onboarding.png)

2. Update designer (and other custom frontends) to use the new path. Eg **PROCESS_API_PATH** variable for designer chart:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release-notes/200_onboarding1.png)

## Spring Boot Environment Configuration

In FLOWX < 2.0 environment variables used to configure java services were embedded inside existing application properties configs and changing or adding new ones was not straightforward. And also didn't provide much flexibility in some cases like using different ports or a different url format for databases (E.g. changing from single mongodb instance to a multinode setup). 

Starting with FLOWX 2.0 we migrated from predefined environment variables to default [spring boot environment variables binding](https://docs.spring.io/spring-boot/docs/2.3.2.RELEASE/reference/html/spring-boot-features.html#boot-features-external-config-relaxed-binding-from-environment-variables).&#x20;

Examples ([full config changes per component below](deployment-guidelines-v2.0.md#component-updates)):

```yaml
# SOURCE APPLICATION PROPERTIES - with custom envvar names
spring:
  datasource:
    url: jdbc:postgresql://${DB_HOST:jx-onboardingdb}:5432/${DB_NAME:onboarding}
    username: ${DB_USERNAME:postgres}
    password: ${DB_PASSWORD:wrongpwd}
    hikari:
      maximum-pool-size: ${HIKKARI_MAX_POOL_SIZE:10}

# REQUIRED CONTAINER ENV VARS
DB_HOST: onboardingdb-postgresql
DB_NAME: onboarding
DB_PASSWORD: database.password
DB_USERNAME: database.username
HIKKARI_MAX_POOL_SIZE: 25
```

```yaml
# SOURCE APPLICATION PROPERTIES - no predefined env placeholders
spring:
  datasource:
    url: jdbc:postgresql://jx-onboardingdb:5432/onboarding
    driver-class-name: org.postgresql.Driver
    username: postgres
    password: wrongpwd

# REQUIRED CONTAINER ENV VARS
SPRING_DATASOURCE_URL: jdbc:postgresql://onboardingdb-postgresql:5432/onboarding
SPRING_DATASOURCE_PASSWORD: database.password
SPRING_DATASOURCE_USERNAME: database.username
SPRING_DATASOURCE_HIKARI_MAXIMUM_POOL_SIZE: 25
```
## Component updates

Let's go through the configuration updates that need to be made in order for the platform upgrade to run smoothly:

:::info
A new environment variable should be available to all microservices: `MANAGEMENT_HEALTH_KAFKA_ENABLED` and set to `true`.
:::

### Process Engine

#### Deployment specific changes:

* Container image update from onboarding to process-engine
* Deployment rename from onboarding to process-engine
* Service resource rename from onboarding to process-engine
* Ingress/route change to use process-enginebackend instead of onboarding

####

#### Application configuration

The following environment variable names need to be updated:

| Old name                                  | New name                                           | Extra changes                                                                            |
| ----------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| OAUTH2_PROTOCOL + OAUTH2_URL            | SECURITY_OAUTH2_BASE_SERVER_URL                | the value for the new environment variable is:`OAUTH2_PROTOCOL://OAUTH2_URL/`**`auth`**  |
| OAUTH2_CLIENT_ID                        | SECURITY_OAUTH2_CLIENT_CLIENT\_ID               |                                                                                          |
| OAUTH2_REALM                             | SECURITY_OAUTH2_REALM                            |                                                                                          |
| KEYCLOAK_CLIENT_SECRET                  | SECURITY_OAUTH2_CLIENT_CLIENT_SECRET           |                                                                                          |
| DB_HOST + DB_NAME                       | SPRING_DATASOURCE_URL                            | the value for the new environment variable is: `jdbc:postgresql://DB_HOST:5432/DB_NAME`  |
| DB_USERNAME                              | SPRING_DATASOURCE_USERNAME                       |                                                                                          |
| DB_PASSWORD                              | SPRING_DATASOURCE_PASSWORD                       |                                                                                          |
| HIKKARI_MAX_POOL_SIZE                  | SPRING_DATASOURCE_HIKARI_MAXIMUM_POOL_SIZE    |                                                                                          |
| REDIS_MASTER_HOST                       | SPRING_REDIS_HOST                                |                                                                                          |
| REDIS_PASSWORD                           | SPRING_REDIS_PASSWORD                            |                                                                                          |
| SCHEDULER_THREAD                         | SCHEDULER_THREADS                                 |                                                                                          |
| WEBSOCKET_PATH                           | WEB_SOCKET_SERVER_PATH                          |                                                                                          |
| WEBSOCKET_ENDPOINT + WEBSOCKET_PROTOCOL | WEB_SOCKET_SERVER_URL_EXTERNAL                 | the value for the new environment variable is: `WEBSOCKET_PROTOCOL://WEBSOCKET_ENDPOINT` |
| KAFKA_BOOTSTRAP_SERVER                  | SPRING_KAFKA_BOOTSTRAP_SERVERS                  |                                                                                          |
| KAFKA_TOPIC_PATTERN_PROCESS_RECEIVE   | KAFKA_TOPIC_PATTERN                              |                                                                                          |
| KAFKA_TOPIC_ACTION_RUN                 | KAFKA_TOPIC\PROCESS_SCHEDULE_IN_RUN_ACTION   |                                                                                          |
| KAFKA_TOPIC_PROCESS_NOTIFY             | KAFKA_TOPIC_PROCESS_NOTIFY_ADVANCE             |                                                                                          |
| KAFKA_TOPIC_PROCESS_NOTIFY_PARENT     | KAFKA_TOPIC_PROCESS_NOTIFY_PARENT              |                                                                                          |
| KAFKA_TOPIC_PROCESS_EXPIRE             | KAFKA_TOPIC_PROCESS_EXPIRE_IN                  |                                                                                          |
| KAFKA_TOPIC_SCHEDULE_MESSAGE           | KAFKA_TOPIC_PROCESS_SCHEDULE_OUT_SET          |                                                                                          |
| KAFKA_TOPIC_STOP_SCHEDULED_MESSAGE    | KAFKA_TOPIC_PROCESS_SCHEDULE_OUT_STOP         |                                                                                          |
| KAFKA_TOPIC_START_PROCESS_IN          | KAFKA_TOPIC_PROCESS_START_IN                   |                                                                                          |
| KAFKA_TOPIC_START_PROCESS_OUT         | KAFKA_TOPIC_PROCESS_START_OUT                  |                                                                                          |
| KAFKA_LICENSE_TOPIC                     | KAFKA_TOPIC_LICENSE_OUT                         |                                                                                          |
| KAFKA_NOTIFY_TASK_TOPIC                | KAFKA_TOPIC_TASK_MAN_OUT                       |                                                                                          |
| KAFKA_TOPIC_PROCESS_OPERATIONS         | KAFKA_TOPIC_PROCESS_OPERATIONS_IN              |                                                                                          |
| LOGGING_ROOT_LEVEL                      | LOGGING_LEVEL_ROOT                               |                                                                                          |
| LOGGING_JAEGER_LOGLEVEL                 | LOGGING_LEVEL_JAEGER                             |                                                                                          |
| LOGGING_APP_LOGLEVEL                    | LOGGING_LEVEL_APP                                |                                                                                          |
| LOGGING_LIQUIBASE_LOGLEVEL              | LOGGING_LEVEL_LIQUIBASE                          |                                                                                          |
| LOGGING_OAUTH2_EXC_LOGLEVEL            | LOGGING_LEVEL_OAUTH2_EXC                        |                                                                                          |
| LOGGING_PROCESS_LOGLEVEL                | LOGGING_LEVEL_PROCESS                            |                                                                                          |
| LOGGING_SOCKET_LOGLEVEL                 | LOGGING_LEVEL_SOCKET                             |                                                                                          |
| LOGGING_MESSAGING_LOGLEVEL              | LOGGING_LEVEL_MESSAGING                          |                                                                                          |
| LOGGING_REDIS_LOGLEVEL                  | LOGGING_LEVEL_REDIS                              |                                                                                          |
| KAFKA_CONSUMER_GROUP_ID                | KAFKA_CONSUMER_GROUP_ID_NOTIFY_ADVANCE        |                                                                                          |
|                                           | KAFKA_CONSUMER_GROUP_ID_NOTIFY_PARENT         |                                                                                          |
|                                           | KAFKA_CONSUMER_GROUP_ID_ADAPTERS               |                                                                                          |
|                                           | KAFKA_CONSUMER_GROUP_ID_SCHEDULER_RUN_ACTION |                                                                                          |
|                                           | KAFKA_CONSUMER_GROUP_ID_PROCESS_START         |                                                                                          |
|                                           | KAFKA_CONSUMER_GROUP_ID_PROCESS_EXPIRE        |                                                                                          |
|                                           | KAFKA_CONSUMER_GROUP_ID_PROCESS_OPERATIONS    |                                                                                          |
| KAFKA_CONSUMER_THREADS_NO              | KAFKA_CONSUMER_THREADS_NOTIFY_ADVANCE          |                                                                                          |
|                                           | KAFKA_CONSUMER_THREADS_NOTIFY_PARENT           |                                                                                          |
|                                           | KAFKA_CONSUMER_THREADS_ADAPTERS                 |                                                                                          |
|                                           | KAFKA_CONSUMER_THREADS_SCHEDULER_RUN_ACTION   |                                                                                          |
|                                           | KAFKA_CONSUMER_THREADS_PROCESS_START           |                                                                                          |
|                                           | KAFKA_CONSUMER_THREADS_PROCESS_EXPIRE          |                                                                                          |
|                                           | KAFKA_CONSUMER_THREADS_PROCESS_OPERATIONS      |                                                                                          |
|                                           | SPRING_TASK_EXECUTION_POOL_QUEUECAPACITY       |                                                                                          |
|                                           | SPRING_TASK_EXECUTION_POOL_CORESIZE            |                                                                                          |
|                                           | SPRING_TASK_EXECUTION_POOL_MAXSIZE             |                                                                                          |
| ENVIRONMENT_NAME                         | FLOWX_ENVIRONMENT_NAME                           |                                                                                          |
| METRICS_PROMETHEUS_EXPORT               | MANAGEMENT_METRICS_EXPORT_PROMETHEUS_ENABLED   |                                                                                          |

### Admin

#### Deployment specific changes:

* Container image update from flowx-admin to **admin**
* Deployment rename from flowx-admin to **admin**
* Service resource rename from flowx-admin to **admin**
* Ingress/route change to use **admin** backend instead of flowx-admin

#### Enable health platform dashboard

For health platform status dashboard admin service uses a kubernetes service account to scan in current namespaces for management services that have a specific annotation configured.  Health data is extracted from spring actuator health endpoint.&#x20;

* Add the following environment variables on admin deployment:

```yaml
# namespace to scan for kubernetes services
FLOWX_PLATFORM_HEALTH_NAMESPACE: {{ .Values.flowx.environment }}

# annotations filter for services
FLOWX_PLATFORM_HEALTH_ANNOTATIONNAME: "flowx.ai/health"
FLOWX_PLATFORM_HEALTH_ANNOTATIONVALUE: "true"
```

* Add the same annotation as above on all "-mngt" flowx kubernetes services. Eg. for admin:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: flowx-admin-mngt
  annotations:
    flowx.ai/health: "true"
..................................................
```

#### Application Configuration

The following environment variable names need to be updated:

| Old name                                | New name                                                  | Extra changes                                                                           |
| --------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| OAUTH2\_PROTOCOL + OAUTH2\_URL          | SECURITY\_OAUTH2\_BASE\_SERVER\_URL                       | the value for the new environment variable is:`OAUTH2_PROTOCOL://OAUTH2_URL/`**`auth`** |
| OAUTH2\_CLIENT\_ID                      | SECURITY\_OAUTH2\_CLIENT\_CLIENT\_ID                      |                                                                                         |
| OAUTH2\_REALM                           | SECURITY\_OAUTH2\_REALM                                   |                                                                                         |
| KEYCLOAK\_CLIENT\_SECRET                | SECURITY\_OAUTH2\_CLIENT\_CLIENT\_SECRET                  |                                                                                         |
| OAUTH2\_ADMIN\_SERVICE\_ACCOUNT\_SECRET | SECURITY\_OAUTH2\_SERVICE\_ACCOUNT\_ADMIN\_CLIENT\_SECRET |                                                                                         |
| DB\_HOST + DB\_NAME                     | SPRING\_DATASOURCE\_URL                                   | the value for the new environment variable is: `jdbc:postgresql://DB_HOST:5432/DB_NAME` |
| DB\_USERNAME                            | SPRING\_DATASOURCE\_USERNAME                              |                                                                                         |
| DB\_PASSWORD                            | SPRING\_DATASOURCE\_PASSWORD                              |                                                                                         |
| HIKKARI\_MAX\_POOL\_SIZE                | SPRING\_DATASOURCE\_HIKARI\_MAXIMUM\_POOL\_SIZE           |                                                                                         |
| REDIS\_MASTER\_HOST                     | SPRING\_REDIS\_HOST                                       |                                                                                         |
| REDIS\_PASSWORD                         | SPRING\_REDIS\_PASSWORD                                   |                                                                                         |
| KAFKA\_BOOTSTRAP\_SERVER                | SPRING\_KAFKA\_BOOTSTRAP\_SERVERS                         |                                                                                         |
| KAFKA\_TOPIC\_AUDIT\_LOG                | KAFKA\_TOPIC\_AUDIT\_OUT                                  |                                                                                         |

### CMS Core

The following environment variable names need to be updated:

| Old name                               | New name                                 | Extra changes                                                                                           |
| -------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| OAUTH2\_PROTOCOL + OAUTH2\_URL         | SECURITY\_OAUTH2\_BASE\_SERVER\_URL      | the value for the new environment variable is:`OAUTH2_PROTOCOL://OAUTH2_URL/`**`auth`**                 |
| OAUTH2\_CLIENT\_ID                     | SECURITY\_OAUTH2\_CLIENT\_CLIENT\_ID     |                                                                                                         |
| OAUTH2\_REALM                          | SECURITY\_OAUTH2\_REALM                  |                                                                                                         |
| KEYCLOAK\_CLIENT\_SECRET               | SECURITY\_OAUTH2\_CLIENT\_CLIENT\_SECRET |                                                                                                         |
| DB\_HOST + DB\_NAME                    | SPRING\_DATA\_MONGODB\_URI               | the value for the new environment variable is: `mongodb://DB_USERNAME:DBPASSWORD@DB_HOST:27017/DB_NAME` |
| REDIS\_MASTER\_HOST                    | SPRING\_REDIS\_HOST                      |                                                                                                         |
| REDIS\_PASSWORD                        | SPRING\_REDIS\_PASSWORD                  |                                                                                                         |
| KAFKA\_BOOTSTRAP\_SERVER               | SPRING\_KAFKA\_BOOTSTRAP\_SERVERS        |                                                                                                         |
| KAFKA\_CONSUMER\_GROUP\_ID             | SPRING\_KAFKA\_CONSUMER\_GROUP\_ID       |                                                                                                         |
| KAFKA\_GET\_CONTENTS\_IN\_TOPIC\_NAME  | KAFKA\_TOPIC\_REQUEST\_CONTENT\_IN       |                                                                                                         |
| KAFKA\_SEND\_CONTENTS\_IN\_TOPIC\_NAME | KAFKA\_TOPIC\_REQUEST\_CONTENT\_OUT      |                                                                                                         |

### Customer Management Plugin

The following environment variable names need to be updated:​



| Old name                         | New name                                 | Extra changes                                                                           |
| -------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------- |
| OAUTH2\_PROTOCOL + OAUTH2\_URL   | SECURITY\_OAUTH2\_BASE\_SERVER\_URL      | the value for the new environment variable is:`OAUTH2_PROTOCOL://OAUTH2_URL/`**`auth`** |
| OAUTH2\_CLIENT\_ID               | SECURITY\_OAUTH2\_CLIENT\_CLIENT\_ID     |                                                                                         |
| OAUTH2\_REALM                    | SECURITY\_OAUTH2\_REALM                  |                                                                                         |
| KEYCLOAK\_CLIENT\_SECRET         | SECURITY\_OAUTH2\_CLIENT\_CLIENT\_SECRET |                                                                                         |
| KAFKA\_BOOTSTRAP\_SERVER         | SPRING\_KAFKA\_BOOTSTRAP\_SERVERS        |                                                                                         |
| KAFKA\_CONSUMER\_GROUP\_ID       | SPRING\_KAFKA\_CONSUMER\_GROUP\_ID       |                                                                                         |
| KAFKA\_CUSTOMER\_RESPONSE\_TOPIC | KAFKA\_TOPIC\_CUSTOMER\_SEARCH\_OUT      |                                                                                         |
| KAFKA\_CUSTOMER\_SEARCH\_TOPIC   | KAFKA\_TOPIC\_CUSTOMER\_SEARCH\_IN       |                                                                                         |

### Document Plugin

The following environment variable names need to be updated:​

| Old name                            | New name                                        | Extra changes                                                                                                               |
| ----------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| OAUTH2\_PROTOCOL + OAUTH2\_URL      | SECURITY\_OAUTH2\_BASE\_SERVER\_URL             | the value for the new environment variable is:`OAUTH2_PROTOCOL://OAUTH2_URL/`**`auth`**                                     |
| OAUTH2\_CLIENT\_ID                  | SECURITY\_OAUTH2\_CLIENT\_CLIENT\_ID            |                                                                                                                             |
| OAUTH2\_REALM                       | SECURITY\_OAUTH2\_REALM                         |                                                                                                                             |
| KEYCLOAK\_CLIENT\_SECRET            | SECURITY\_OAUTH2\_CLIENT\_CLIENT\_SECRET        |                                                                                                                             |
| MONGODB\_HOST + MONGODB\_NAME       | SPRING\_DATA\_MONGODB\_URI                      | the value for the new environment variable is: `mongodb://MONGODB_USERNAME:MONGODBPASSWORD@MONGODB_HOST:27017/MONGODB_NAME` |
| DB\_HOST + DB\_NAME                 | SPRING\_DATASOURCE\_URL                         | the value for the new environment variable is: `jdbc:postgresql://DB_HOST:5432/DB_NAME`                                     |
| DB\_USERNAME                        | SPRING\_DATASOURCE\_USERNAME                    |                                                                                                                             |
| DB\_PASSWORD                        | SPRING\_DATASOURCE\_PASSWORD                    |                                                                                                                             |
| HIKKARI\_MAX\_POOL\_SIZE            | SPRING\_DATASOURCE\_HIKARI\_MAXIMUM\_POOL\_SIZE |                                                                                                                             |
| REDIS\_MASTER\_HOST                 | SPRING\_REDIS\_HOST                             |                                                                                                                             |
| REDIS\_PASSWORD                     | SPRING\_REDIS\_PASSWORD                         |                                                                                                                             |
| MINIO\_SERVER\_URL                  | APPLICATION\_FILE\_STORAGE\_S3\_SERVER\_URL     |                                                                                                                             |
| MINIO\_BUCKET\_PREFIX               | APPLICATION\_FILE\_STORAGE\_S3\_BUCKET\_PREFIX  |                                                                                                                             |
| MINIO\_ACCESS\_KEY                  | APPLICATION\_FILE\_STORAGE\_S3\_ACCESS\_KEY     |                                                                                                                             |
| MINIO\_SECRET\_KEY                  | APPLICATION\_FILE\_STORAGE\_S3\_SECRET\_KEY     |                                                                                                                             |
| HTML\_TEMPLATES\_ENABLED            | FLOWX\_HTML\_TEMPLATES\_ENABLED                 |                                                                                                                             |
| HTML\_TEMPLATES\_FONT\_PDFFONTPATHS | FLOWX\_HTML\_TEMPLATES\_FONT\_PDFFONTPATHS      |                                                                                                                             |
| PDF\_GENERATION\_FONT\_PATH         | FLOWX\_PDF\_GENERATION\_FONT\_PATH              |                                                                                                                             |
| KAFKA\_BOOTSTRAP\_SERVER            | SPRING\_KAFKA\_BOOTSTRAP\_SERVERS               |                                                                                                                             |
| KAFKA\_CONSUMER\_GROUP\_ID          | SPRING\_KAFKA\_CONSUMER\_GROUP\_ID              |                                                                                                                             |
| KAFKA\_CONVERT\_IN\_TOPIC           | KAFKA\_TOPIC\_FILE\_CONVERT\_IN                 |                                                                                                                             |
| KAFKA\_CONVERT\_OUT\_TOPIC          | KAFKA\_TOPIC\_FILE\_CONVERT\_OUT                |                                                                                                                             |
| KAFKA\_DELETE\_FILE\_IN\_TOPIC      | KAFKA\_TOPIC\_FILE\_DELETE\_IN                  |                                                                                                                             |
| KAFKA\_DELETE\_FILE\_OUT\_TOPIC     | KAFKA\_TOPIC\_FILE\_DELETE\_OUT                 |                                                                                                                             |
| KAFKA\_GENERATE\_IN\_TOPIC          | KAFKA\_TOPIC\_DOCUMENT\_GENERATE\_PDF\_IN       |                                                                                                                             |
| KAFKA\_GENERATE\_OUT\_TOPIC         | KAFKA\_TOPIC\_DOCUMENT\_GENERATE\_PDF\_OUT      |                                                                                                                             |
| KAFKA\_NOTIFICATION\_TOPIC          | KAFKA\_TOPIC\_NOTIFICATION\_OUT                 |                                                                                                                             |
| KAFKA\_OCR\_SPLIT\_TOPIC            | KAFKA\_TOPIC\_OCR\_OUT                          |                                                                                                                             |
| KAFKA\_OCR\_TOPIC                   | KAFKA\_TOPIC\_OCR\_IN                           |                                                                                                                             |
| KAFKA\_PERSIST\_IN\_TOPIC           | KAFKA\_TOPIC\_DOCUMENT\_PERSIST\_IN             |                                                                                                                             |
| KAFKA\_PERSIST\_OUT\_TOPIC          | KAFKA\_TOPIC\_DOCUMENT\_PERSIST\_OUT            |                                                                                                                             |
| KAFKA\_SPLIT\_IN\_TOPIC             | KAFKA\_TOPIC\_DOCUMENT\_SPLIT\_IN               |                                                                                                                             |
| KAFKA\_SPLIT\_OUT\_TOPIC            | KAFKA\_TOPIC\_DOCUMENT\_SPLIT\_OUT              |                                                                                                                             |
| KAFKA\_UPDATE\_FILE\_IN\_TOPIC      | KAFKA\_TOPIC\_FILE\_UPDATE\_IN                  |                                                                                                                             |
| KAFKA\_UPDATE\_FILE\_OUT\_TOPIC     | KAFKA\_TOPIC\_FILE\_UPDATE\_OUT                 |                                                                                                                             |
| KAFKA\_URLS\_IN\_TOPIC              | KAFKA\_TOPIC\_DOCUMENT\_GET\_URLS\_IN           |                                                                                                                             |
| KAFKA\_URLS\_OUT\_TOPIC             | KAFKA\_TOPIC\_DOCUMENT\_GET\_URLS\_OUT          |                                                                                                                             |
| KAFKA\_HTML\_GENERATE\_IN\_TOPIC    | KAFKA\_TOPIC\_DOCUMENT\_GENERATE\_HTML\_IN      |                                                                                                                             |
| KAFKA\_HTML\_GENERATE\_OUT\_TOPIC   | KAFKA\_TOPIC\_DOCUMENT\_GENERATE\_HTML\_OUT     |                                                                                                                             |
| KAFKA\_PERSIST\_MINIO\_FILES\_IN    | KAFKA\_TOPIC\_FILE\_PERSIST\_IN                 |                                                                                                                             |
| KAFKA\_PERSIST\_MINIO\_FILES\_OUT   | KAFKA\_TOPIC\_FILE\_PERSIST\_OUT                |                                                                                                                             |
| KAFKA\_COMBINE\_FILES\_IN           | KAFKA\_TOPIC\_FILE\_COMBINE\_IN                 |                                                                                                                             |
| KAFKA\_COMBINE\_FILES\_OUT          | KAFKA\_TOPIC\_FILE\_COMBINE\_OUT                |                                                                                                                             |

### License Core

The following environment variable names need to be updated:​​​

| Old name                            | New name                                        | Extra changes                                                                                         |
| ----------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| OAUTH2\_PROTOCOL + OAUTH2\_URL      | SECURITY\_OAUTH2\_BASE\_SERVER\_URL             | the value for the new environment variable is:`OAUTH2_PROTOCOL://OAUTH2_URL/`**`auth`**               |
| OAUTH2\_CLIENT\_ID                  | SECURITY\_OAUTH2\_CLIENT\_CLIENT\_ID            |                                                                                                       |
| OAUTH2\_REALM                       | SECURITY\_OAUTH2\_REALM                         |                                                                                                       |
| KEYCLOAK\_CLIENT\_SECRET            | SECURITY\_OAUTH2\_CLIENT\_CLIENT\_SECRET        |                                                                                                       |
| DB\_HOST + DB\_NAME                 | SPRING\_DATASOURCE\_JDBCURL                     | the value for the new environment variable is: `jdbc:postgresql://DB_HOST:5432/DB_NAME`               |
| DB\_USERNAME                        | SPRING\_DATASOURCE\_USERNAME                    |                                                                                                       |
| DB\_PASSWORD                        | SPRING\_DATASOURCE\_PASSWORD                    |                                                                                                       |
| ENGINE\_DB\_HOST + ENGINE\_DB\_NAME | ENGINE\_DATASOURCE\_JDBCURL                     | the value for the new environment variable is: `jdbc:postgresql://ENGINE_DB_HOST:5432/ENGINE_DB_NAME` |
| HIKKARI\_MAX\_POOL\_SIZE            | SPRING\_DATASOURCE\_HIKARI\_MAXIMUM\_POOL\_SIZE |                                                                                                       |
| KAFKA\_BOOTSTRAP\_SERVER            | SPRING\_KAFKA\_BOOTSTRAP\_SERVERS               |                                                                                                       |
| KAFKA\_CONSUMER\_GROUP\_ID          | SPRING\_KAFKA\_CONSUMER\_GROUP\_ID              |                                                                                                       |
| KAFKA\_LICENSE\_TOPIC               | KAFKA\_TOPIC\_LICENSE\_IN                       |                                                                                                       |

### Notification Plugin

The following environment variable names need to be updated:​​​

| Old name                                  | New name                                       | Extra changes                                                                                           |
| ----------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| OAUTH2\_PROTOCOL + OAUTH2\_URL            | SECURITY\_OAUTH2\_BASE\_SERVER\_URL            | the value for the new environment variable is:`OAUTH2_PROTOCOL://OAUTH2_URL/`**`auth`**                 |
| OAUTH2\_CLIENT\_ID                        | SECURITY\_OAUTH2\_CLIENT\_CLIENT\_ID           |                                                                                                         |
| OAUTH2\_REALM                             | SECURITY\_OAUTH2\_REALM                        |                                                                                                         |
| KEYCLOAK\_CLIENT\_SECRET                  | SECURITY\_OAUTH2\_CLIENT\_CLIENT\_SECRET       |                                                                                                         |
| DB\_HOST + DB\_NAME                       | SPRING\_DATA\_MONGODB\_URI                     | the value for the new environment variable is: `mongodb://DB_USERNAME:DBPASSWORD@DB_HOST:27017/DB_NAME` |
| REDIS\_MASTER\_HOST                       | SPRING\_REDIS\_HOST                            |                                                                                                         |
| REDIS\_PASSWORD                           | SPRING\_REDIS\_PASSWORD                        |                                                                                                         |
| MINIO\_SERVER\_URL                        | APPLICATION\_FILE\_STORAGE\_S3\_SERVER\_URL    |                                                                                                         |
| MINIO\_BUCKET\_PREFIX                     | APPLICATION\_FILE\_STORAGE\_S3\_BUCKET\_PREFIX |                                                                                                         |
| MINIO\_ACCESS\_KEY                        | APPLICATION\_FILE\_STORAGE\_S3\_ACCESS\_KEY    |                                                                                                         |
| MINIO\_SECRET\_KEY                        | APPLICATION\_FILE\_STORAGE\_S3\_SECRET\_KEY    |                                                                                                         |
| SPRING\_MAIL\_PASSWORD                    | SIMPLEJAVAMAIL\_SMTP\_PASSWORD                 |                                                                                                         |
| SPRING\_MAIL\_USERNAME                    | SIMPLEJAVAMAIL\_SMTP\_USERNAME                 |                                                                                                         |
| SMTP\_HOST                                | SIMPLEJAVAMAIL\_SMTP\_HOST                     |                                                                                                         |
| SMTP\_PORT                                | SIMPLEJAVAMAIL\_SMTP\_PORT                     |                                                                                                         |
| MAIL\_FROM                                | APPLICATION\_MAIL\_FROM\_EMAIL                 |                                                                                                         |
| KAFKA\_BOOTSTRAP\_SERVER                  | SPRING\_KAFKA\_BOOTSTRAP\_SERVERS              |                                                                                                         |
| KAFKA\_CONSUMER\_GROUP\_ID                | SPRING\_KAFKA\_CONSUMER\_GROUP\_ID             |                                                                                                         |
| KAFKA\_FORWARD\_NOTIFICATION\_TOPIC\_NAME | KAFKA\_TOPIC\_NOTIFICATION\_EXTERNAL\_OUT      |                                                                                                         |
| KAFKA\_GENERATE\_OTP\_IN\_TOPIC\_NAME     | KAFKA\_TOPIC\_OTP\_GENERATE\_IN                |                                                                                                         |
| KAFKA\_GENERATE\_OTP\_OUT\_TOPIC\_NAME    | KAFKA\_TOPIC\_OTP\_GENERATE\_OUT               |                                                                                                         |
| KAFKA\_TOPIC\_NAME                        | KAFKA\_TOPIC\_NOTIFICATION\_INTERNAL\_IN       |                                                                                                         |
| KAFKA\_VALIDATE\_OTP\_IN\_TOPIC\_NAME     | KAFKA\_TOPIC\_OTP\_VALIDATE\_IN                |                                                                                                         |
| KAFKA\_VALIDATE\_OTP\_OUT\_TOPIC\_NAME    | KAFKA\_TOPIC\_OTP\_VALIDATE\_OUT               |                                                                                                         |

### Scheduler Core

The following environment variable names need to be updated:​​​

| Old name                                         | New name                                 | Extra changes                                                                                                             |
| ------------------------------------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| OAUTH2\_PROTOCOL + OAUTH2\_URL                   | SECURITY\_OAUTH2\_BASE\_SERVER\_URL      | the value for the new environment variable is:`OAUTH2_PROTOCOL://OAUTH2_URL/`**`auth`**                                   |
| OAUTH2\_CLIENT\_ID                               | SECURITY\_OAUTH2\_CLIENT\_CLIENT\_ID     |                                                                                                                           |
| OAUTH2\_REALM                                    | SECURITY\_OAUTH2\_REALM                  |                                                                                                                           |
| KEYCLOAK\_CLIENT\_SECRET                         | SECURITY\_OAUTH2\_CLIENT\_CLIENT\_SECRET |                                                                                                                           |
| DB\_HOST + DB\_NAME                              | SPRING\_DATA\_MONGODB\_URI               | the value for the new environment variable is: `mongodb://DB_USERNAME:DBPASSWORD@DB_HOST:27017/DB_NAME?retryWrites=false` |
| KAFKA\_BOOTSTRAP\_SERVER                         | SPRING\_KAFKA\_BOOTSTRAP\_SERVERS        |                                                                                                                           |
| KAFKA\_CONSUMER\_GROUP\_ID                       | SPRING\_KAFKA\_CONSUMER\_GROUP\_ID       |                                                                                                                           |
| KAFKA\_SCHEDULE\_MESSAGE\_IN\_TOPIC\_NAME        | KAFKA\_TOPIC\_SCHEDULE\_IN\_SET          |                                                                                                                           |
| KAFKA\_STOP\_SCHEDULED\_MESSAGE\_IN\_TOPIC\_NAME | KAFKA\_TOPIC\_SCHEDULE\_IN\_STOP         |                                                                                                                           |

### Task Management Plugin

The following environment variable names need to be updated:​​​

| Old name                                  | New name                                                  | Extra changes                                                                                           |
| ----------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| OAUTH2\_PROTOCOL + OAUTH2\_URL            | SECURITY\_OAUTH2\_BASE\_SERVER\_URL                       | the value for the new environment variable is:`OAUTH2_PROTOCOL://OAUTH2_URL/`**`auth`**                 |
| OAUTH2\_CLIENT\_ID                        | SECURITY\_OAUTH2\_CLIENT\_CLIENT\_ID                      |                                                                                                         |
| OAUTH2\_REALM                             | SECURITY\_OAUTH2\_REALM                                   |                                                                                                         |
| KEYCLOAK\_CLIENT\_SECRET                  | SECURITY\_OAUTH2\_CLIENT\_CLIENT\_SECRET                  |                                                                                                         |
| OPENID\_ADMIN\_CLIENT\_SECRET             | SECURITY\_OAUTH2\_SERVICE\_ACCOUNT\_ADMIN\_CLIENT\_SECRET |                                                                                                         |
| DB\_HOST + DB\_NAME                       | SPRING\_DATA\_MONGODB\_URI                                | the value for the new environment variable is: `mongodb://DB_USERNAME:DBPASSWORD@DB_HOST:27017/DB_NAME` |
| ENGINE\_DB\_USERNAME                      | SPRING\_DATASOURCE\_USERNAME                              |                                                                                                         |
| ENGINE\_DB\_PASSWORD                      | SPRING\_DATASOURCE\_PASSWORD                              |                                                                                                         |
| ENGINE\_DB\_HOST + ENGINE\_DB\_NAME       | SPRING\_DATASOURCE\_URL                                   | the value for the new environment variable is: `jdbc:postgresql://ENGINE_DB_HOST:5432/ENGINE_DB_NAME`   |
| HIKKARI\_MAX\_POOL\_SIZE                  | SPRING\_DATASOURCE\_HIKARI\_MAXIMUM\_POOL\_SIZE           |                                                                                                         |
| REDIS\_MASTER\_HOST                       | SPRING\_REDIS\_HOST                                       |                                                                                                         |
| REDIS\_PASSWORD                           | SPRING\_REDIS\_PASSWORD                                   |                                                                                                         |
| KAFKA\_BOOTSTRAP\_SERVER                  | SPRING\_KAFKA\_BOOTSTRAP\_SERVERS                         |                                                                                                         |
| KAFKA\_CONSUMER\_GROUP\_ID                | SPRING\_KAFKA\_CONSUMER\_GROUP\_ID                        |                                                                                                         |
| KAFKA\_TASK\_TOPIC                        | KAFKA\_TOPIC\_TASK\_IN                                    |                                                                                                         |
| KAFKA\_TOPIC\_START\_PROCESS\_IN          | KAFKA\_TOPIC\_PROCESS\_START\_OUT                         |                                                                                                         |
| KAFKA\_TOPIC\_PROCESS\_OPERATIONS         | KAFKA\_TOPIC\_PROCESS\_OPERATIONS\_OUT                    |                                                                                                         |
| KAFKA\_TOPIC\_SCHEDULE\_MESSAGE           | KAFKA\_TOPIC\_PROCESS\_SCHEDULE\_OUT\_SET                 |                                                                                                         |
| KAFKA\_TOPIC\_STOP\_SCHEDULED\_MESSAGE    | KAFKA\_TOPIC\_PROCESS\_SCHEDULE\_OUT\_STOP                |                                                                                                         |
| WEBSOCKET\_ENDPOINT + WEBSOCKET\_PROTOCOL | WEB\_SOCKET\_SERVER\_URL\_EXTERNAL                        | the value for the new environment variable is: `WEBSOCKET_PROTOCOL://WEBSOCKET_ENDPOINT`                |
| WEBSOCKET\_PATH                           | WEB\_SOCKET\_SERVER\_PATH                                 |                                                                                                         |

