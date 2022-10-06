---
sidebar_position: 1
---

# FLOWX.AI Engine Setup guide

## Infrastructure Prerequisites

There are some components that are mandatory to start the engine:

### Database - Postgres / Oracle

A basic Postgres configuration:

*   helm values.yaml:

    ```yaml
      onboardingdb:
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
        postgresqlDatabase: onboarding
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

### Redis server

Redis cluster that will allow the engine to cache process definitions, compiled scripts and Kafka responses

### Kafka cluster

Kafka is the backbone of the Engine, all plugins and integrations are accessed using the Kafka broker.

### Management Tools

Additional you can check details about (the platform will start without these components):

* Logging via Elasticsearch
* Monitoring
* Tracing via Jaeger

## Configuration

### Datasource configuration

To store process definition and the data about the process instances the engine uses a Postgres / Oracle database.

The following configuration details need to be added using environment variables:

`SPRING_DATASOURCE_URL`

`SPRING_DATASOURCE_USERNAME`

`SPRING_DATASOURCE_PASSWORD`

You will need to make sure that the user, password, connection link and db name are configured correctly, otherwise, you will receive errors at start time.

The datasource is configured automatically via a liquibase script inside the engine. All updates will include migration scripts.

### Redis configuration

The following values should be set with the corresponding Redis-related values.

`SPRING_REDIS_HOST`

`SPRING_REDIS_PASSWORD`

`REDIS_TTL`

All the data produced by the engine will be stored in Redis under a specific key. The name of the key can be configured using the environment variable:

`SPRING_CACHE_REDIS_KEY_PREFIX`

### File upload size

The maximum file size allowed for uploads can be set by using the `SPRING_SERVLET_MULTIPART_MAX_FILE_SIZE` & `SPRING_SERVLET_MULTIPART_MAX_REQUEST_SIZE` variables.

### Kafka configuration

Kafka handles all communication between the FLOWX Engine and external plugins and integrations. It is also used for notifying running process instances when certain events occur. 

Both a producer and a consumer must be configured. The following Kafka-related configurations can be set by using environment variables:

`SPRING_KAFKA_BOOTSTRAP_SERVERS` - address of the Kafka server

`KAFKA_AUTH_EXCEPTION_RETRY_INTERVAL` - the interval between retries after `AuthorizationException` is thrown by `KafkaConsumer`

`KAFKA_MESSAGE_MAX_BYTES` - this is the largest size of the message that can be received by the broker from a producer.

The configuration related to consumers (group ids and thread numbers) can be configured separately for each message type:

`KAFKA_CONSUMER_GROUP_ID_NOTIFY_ADVANCE`

`KAFKA_CONSUMER_GROUP_ID_NOTIFY_PARENT`

`KAFKA_CONSUMER_GROUP_ID_ADAPTERS`

`KAFKA_CONSUMER_GROUP_ID_SCHEDULER_RUN_ACTION`

`KAFKA_CONSUMER_GROUP_ID_PROCESS_START`

`KAFKA_CONSUMER_GROUP_ID_PROCESS_EXPIRE`

`KAFKA_CONSUMER_GROUP_ID_PROCESS_OPERATIONS`

`KAFKA_CONSUMER_THREADS_NOTIFY_ADVANCE`

`KAFKA_CONSUMER_THREADS_NOTIFY_PARENT`

`KAFKA_CONSUMER_THREADS_ADAPTERS`

`KAFKA_CONSUMER_THREADS_SCHEDULER_RUN_ACTION`

`KAFKA_CONSUMER_THREADS_PROCESS_START`

`KAFKA_CONSUMER_THREADS_PROCESS_EXPIRE`

`KAFKA_CONSUMER_THREADS_PROCESS_OPERATIONS`


It is important to know that all the events that start with a configured pattern will be consumed by the engine. This makes it possible to create a new integration and connect it to the engine without changing the configuration of the engine.

![](../../img/engine_kafka_pattern.svg) 

`KAFKA_TOPIC_PROCESS_NOTIFY_ADVANCE` - Kafka topic used internally by the engine

`KAFKA_TOPIC_PROCESS_NOTIFY_PARENT` - Topic used for sub-processes to notify parent process when finished

`KAFKA_TOPIC_PATTERN` - the topic name pattern that the Engine listens on for incoming Kafka events

`KAFKA_TOPIC_LICENSE_OUT` - the topic name used by the Engine to generate licensing-related details

#### **Topics related to the Task Management plugin**

`KAFKA_TOPIC_TASK_OUT` - used for sending notifications to the plugin

`KAFKA_TOPIC_PROCESS_OPERATIONS_IN` - user for receiving calls from the task management plugin

#### **Topics related to the scheduler extension**


[Scheduler](../../core-components/core-extensions/scheduler.md)


`KAFKA_TOPIC_PROCESS_EXPIRE_IN` - the topic name that the Engine listens on for requests to expire processes

`KAFKA_TOPIC_PROCESS_SCHEDULE_OUT_SET` - the topic name used by the Engine to schedule a process expiration

`KAFKA_TOPIC_PROCESS_SCHEDULE_OUT_STOP` - the topic name used by the Engine to stop a process expiration

`KAFKA_TOPIC_PROCESS_SCHEDULE_IN_RUN_ACTION` - the topic name that the Engine listens on for requests to run scheduled actions

[Using the scheduler](../../core-components/core-extensions/scheduler.md#using-the-scheduler)

#### **Topics related to the Search Data service**

`KAFKA_TOPIC_DATA_SEARCH_IN` - the topic name that the Engine listens on for requests to search for processes

`KAFKA_TOPIC_DATA_SEARCH_OUT` - the topic name used by the Engine to reply after finding a process

#### **Topics related to the Audit service**

`KAFKA_TOPIC_AUDIT_OUT` - topic key for sending audit logs. Default value:`ai.flowx.audit.log`

#### **Processes can also be started by sending messages to a Kafka topic.**

`KAFKA_TOPIC_PROCESS_START_IN` - the Engine listens on this topic for requests to start a new process instance

`KAFKA_TOPIC_PROCESS_START_OUT` - used for sending out the reply after starting a new process instance

### Web socket configuration

The engine also communicates with the frontend application via WebSockets. The socket server connection details also need to be configured:

`WEB_SOCKET_SERVER_URL_EXTERNAL`

`WEB_SOCKET_SERVER_PORT`

`WEB_SOCKET_SERVER_PATH`

### Authorization & access roles

The following variables need to be set in order to connect to the identity management platform:

`SECURITY_OAUTH2_BASE_SERVER_URL`

`SECURITY_OAUTH2_CLIENT_CLIENT_ID`

`SECURITY_OAUTH2_REALM`


[Configuring access roles for processes](configuring-access-roles-for-processes)


### Debugging

Advanced debugging features can be enabled. When this happens, snapshots of the process status will be taken after each action and can be later used for debugging purposes. This feature comes with an exponential increase in database usage so we suggest having the flag set to true on debugging media and false production ones.

This feature can be enabled by setting the `FLOWX_DEBUG` environment variable to true.

### Logging

The following environment variables could be set in order to control log levels:

`LOGGING_LEVEL_ROOT` - root spring boot microservice logs

`LOGGING_LEVEL_APP` - app-level logs

`LOGGING_LEVEL_PROCESS` - process instance orchestration-related logs, included in `LOGGING_LEVEL_APP`

`LOGGING_LEVEL_MESSAGING`- Kafka events-related logs, included in `LOGGING_LEVEL_APP`

`LOGGING_LEVEL_SOCKET` - WebSocket-related logs, included in `LOGGING_LEVEL_APP`

`LOGGING_LEVEL_REDIS` - Redis-related logs

`LOGGING_LEVEL_JAEGER` - Jaeger tracing related logs

`LOGGING_LEVEL_OAUTH2_EXC` - specific auth exception logs, included in `LOGGING_LEVEL_APP`