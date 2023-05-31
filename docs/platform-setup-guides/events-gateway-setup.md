# Events gateway setup guide

## Introduction

This guide will walk you through the process of setting up the events-gateway service.

## Infrastructure prerequisites

Before proceeding with the setup, ensure that the following components have been set up:

* **Redis** - version 6.0 or higher
* **Kafka** - version 2.8 or higher

## Dependencies

* **Kafka** - used for event communication
* **Redis** - used for caching

## Configuration

### Configuring Kafka

Set the following Kafka-related configurations using environment variables:

* `SPRING_KAFKA_BOOTSTRAP_SERVERS` - the address of the Kafka server, it should be in the format "host:port"

* `KAFKA_CONSUMER_GROUP_ID_PROCESS_ENGINE_COMMANDS` - 

* `KAFKA_CONSUMER_GROUP_ID_PROCESS_ENGINE_COMMANDS_MESSAGE` - 

* `KAFKA_CONSUMER_GROUP_ID_PROCESS_ENGINE_COMMANDS_DISCONNECT` -

* `KAFKA_CONSUMER_GROUP_ID_PROCESS_ENGINE_COMMANDS_CONNECT` - 

* `KAFKA_CONSUMER_GROUP_ID_PROCESS_TASK_COMMANDS` - 

* `KAFKA_CONSUMER_THREADS_PROCESS_ENGINE_COMMANDS_MESSAGE` -

* `KAFKA_CONSUMER_THREADS_PROCESS_ENGINE_COMMANDS_DISCONNECT` -

* `KAFKA_CONSUMER_THREADS_PROCESS_ENGINE_COMMANDS_CONNECT` - 

* `KAFKA_CONSUMER_THREADS_TASK_COMMANDS` - 

* `KAFKA_TOPIC_EVENTS_GATEWAY_PROCESS_INSTANCE_IN_MESSAGE` - 

* `KAFKA_TOPIC_EVENTS_GATEWAY_PROCESS_INSTANCE_IN_DISCONNECT`-

* `KAFKA_TOPIC_EVENTS_GATEWAY_PROCESS_INSTANCE_IN_CONNECT` - 

* `KAFKA_TOPIC_EVENTS_GATEWAY_TASK_IN_MESSAGE` - 

* `KAFKA_AUTH_EXCEPTION_RETRY_INTERVAL` - the interval between retries after AuthorizationException is thrown by Kafka consumer

#### Kafka topics related to process instances

* `KAFKA_TOPIC_EVENTS_GATEWAY_PROCESS_INSTANCE_IN_MESSAGE` - 

* `KAFKA_TOPIC_EVENTS_GATEWAY_PROCESS_INSTANCE_IN_DISCONNECT` - 

* `KAFKA_TOPIC_EVENTS_GATEWAY_PROCESS_INSTANCE_IN_CONNECT` -


#### Kafka topics related to tasks

* `KAFKA_TOPIC_EVENTS_GATEWAY_TASK_IN_MESSAGE` -

### Configuring Elasticsearch

Set the following Elasticsearch-related configurations using environment variables:

* `SPRING_ELASTICSEARCH_REST_URIS` 

* `SPRING_ELASTICSEARCH_REST_DISABLESSL` 

* `SPRING_ELASTICSEARCH_REST_USERNAME`

* `SPRING_ELASTICSEARCH_REST_PASSWORD`

* `SPRING_ELASTICSEARCH_INDEX_SETTINGS_NAME` - the index can be customized for data-search and it should be similar to what is configured on the process-engine


### Configuring authorization & access roles

Set the following environment variables to connect to the identity management platform:

* `SECURITY_OAUTH2_BASE_SERVER_URL`

* `SECURITY_OAUTH2_CLIENT_CLIENT_ID`

* `SECURITY_OAUTH2_REALM`

### Configuring logging

The following environment variables could be set in order to control log levels:

* `LOGGING_LEVEL_ROOT` - for root spring boot microservice logs

* `LOGGING_LEVEL_APP` - for app level logs
