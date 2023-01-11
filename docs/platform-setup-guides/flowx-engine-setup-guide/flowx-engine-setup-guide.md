---
sidebar_position: 2
---

# FLOWX.AI Engine Setup guide

## Infrastructure Prerequisites

There are some components that are mandatory to start the engine:

### Database - Postgres / Oracle

For Microservices architecture, some Microservices holds their data individually using separate Databases.

A basic Postgres configuration:

*   helm values.yaml:

    ```yaml
      onboardingdb:
        existingSecret: {{secretName}}
        metrics:
          enabled: true
          service:
            annotations:
              prometheus.io/port: {{prometheus port}}
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

## Dependencies

* **Redis server** - Redis cluster that will allow the engine to cache process definitions, compiled scripts and Kafka responses
* **Kafka cluster** - kafka is the backbone of the Engine, all plugins and integrations are accessed using the Kafka broker

Additional you can check details about (the platform will start without these components):

* [**Logging via Elasticsearch**](../platform-setup-guides.md#logging-via-elasticsearch)
* **Monitoring**
* [**Tracing via Jaeger**](../platform-setup-guides.md#tracing-via-jaeger)

## Configuration

* [**Datasource configuration**](../platform-setup-guides.md#datasource-configuration)
* [**Redis configuration**](../platform-setup-guides.md#redis-configuration)
* [**Logging**](../platform-setup-guides.md#logging)
* [**Authorization & access roles**](../platform-setup-guides.md#authorization--access-roles)

[Configuring access roles for processes](configuring-access-roles-for-processes)


### File upload size

The maximum file size allowed for uploads can be set by using the `SPRING_SERVLET_MULTIPART_MAX_FILE_SIZE` & `SPRING_SERVLET_MULTIPART_MAX_REQUEST_SIZE` variables.

### Kafka configurations

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

`KAFKA_CONSUMER_GROUP_ID_SCHEDULER_ADVANCING`

`KAFKA_CONSUMER_GROUP_ID_PROCESS_START`

`KAFKA_CONSUMER_GROUP_ID_PROCESS_EXPIRE`

`KAFKA_CONSUMER_GROUP_ID_PROCESS_OPERATIONS`

`KAFKA_CONSUMER_THREADS_NOTIFY_ADVANCE`

`KAFKA_CONSUMER_THREADS_NOTIFY_PARENT`

`KAFKA_CONSUMER_THREADS_ADAPTERS`

`KAFKA_CONSUMER_THREADS_SCHEDULER_RUN_ACTION`

`KAFKA_CONSUMER_THREADS_SCHEDULER_ADVANCING`

`KAFKA_CONSUMER_THREADS_PROCESS_START`

`KAFKA_CONSUMER_THREADS_PROCESS_EXPIRE`

`KAFKA_CONSUMER_THREADS_PROCESS_OPERATIONS`


It is important to know that all the events that start with a configured pattern will be consumed by the engine. This makes it possible to create a new integration and connect it to the engine without changing the configuration of the engine.

![](../../platform-deep-dive/img/engine_kafka_pattern.svg) 

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

`KAFKA_TOPIC_PROCESS_SCHEDULE_IN_ADVANCE` - 

[Using the scheduler](../../core-components/core-extensions/scheduler.md#using-the-scheduler)

#### **Topics related to the Search Data service**

`KAFKA_TOPIC_DATA_SEARCH_IN` - the topic name that the Engine listens on for requests to search for processes

`KAFKA_TOPIC_DATA_SEARCH_OUT` - the topic name used by the Engine to reply after finding a process

#### **Topics related to the Audit service**

`KAFKA_TOPIC_AUDIT_OUT` - topic key for sending audit logs. Default value: `ai.flowx.audit.log`

#### **Processes that can be started by sending messages to a Kafka topic**

`KAFKA_TOPIC_PROCESS_START_IN` - the Engine listens on this topic for requests to start a new process instance

`KAFKA_TOPIC_PROCESS_START_OUT` - used for sending out the reply after starting a new process instance

### Web socket configuration

The engine also communicates with the frontend application via WebSockets. The socket server connection details also need to be configured:

`WEB_SOCKET_SERVER_URL_EXTERNAL`

`WEB_SOCKET_SERVER_PORT`

`WEB_SOCKET_SERVER_PATH`

### Advancing Controller

To use advancing controller, the following env vars are needed for `process-engine` to connect to Advancing Postgres DB.

`ADVANCING_DATASOURCE_JDBC_URL` - environment variable used to configure a JDBC (Java database connectivity) data source, it specifies the connection URL for a particular database, including the server, port, database name, and any other connection parameters necessary

`ADVANCING_DATASOURCE_USERNAME` - environment variable used to authenticate the user access to the data source

`ADVANCING_DATASOURCE_PASSWORD` - environment variable used to set the password for a data source connection

[Advancing controller setup](../flowx-engine-setup-guide/advancing-controller-setup-guide)