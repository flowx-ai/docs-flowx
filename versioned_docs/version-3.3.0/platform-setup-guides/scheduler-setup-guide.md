# Scheduler setup guide

## Introduction

This guide will walk you through the process of setting up the Scheduler service using a Docker image.

## Infrastructure prerequisites

* **MongoDB** - version 4.4 or higher for storing taxonomies and contents
* **Kafka** - version 2.8 or higher

## Dependencies

* [MongoDB](https://www.mongodb.com/2) database
* ability to connect to a Kafka instance used by the engine

The service comes with most of the needed configuration properties filled in, but there are a few that need to be set up using some custom environment variables.

## Dependencies <a href="#2939ce6e-c291-40c2-b3d6-1e789b1617d7" id="2939ce6e-c291-40c2-b3d6-1e789b1617d7"></a>

### MongoDB helm example

Basic MongoDB configuration - helm values.yaml

```yaml
scheduler-mdb:
    existingSecret: {{secretName}}
    mongodbDatabase: {{SchedulerDatabaseName}}
    mongodbUsername: {{SchedulerDatabaseUser}}
    persistence:
      enabled: true
      mountPath: /bitnami/mongodb
      size: 4Gi
    replicaSet:
      enabled: true
      name: rs0
      pdb:
        enabled: true
        minAvailable:
          arbiter: 1
          secondary: 1
      replicas:
        arbiter: 1
        secondary: 1
      useHostnames: true
    serviceAccount:
      create: false
    usePassword: true
```

:::warning
This service needs to connect to a Mongo database that has replicas, in order to work correctly.
:::

## Configuration <a href="#bad24571-ff23-4ec3-83d9-8a2ace74a6b4" id="bad24571-ff23-4ec3-83d9-8a2ace74a6b4"></a>

### Configuring MongoDB

The MongoDB database is used to persist scheduled messages until they are sent back. The following configurations need to be set using environment variables:

* `SPRING_DATA_MONGODB_URI` - the URI for the MongoDB database

### Configuring Kafka <a href="#63673403-7b21-440b-a173-211fd5c9a86e" id="63673403-7b21-440b-a173-211fd5c9a86e"></a>

The following Kafka related configurations can be set by using environment variables:

* `SPRING_KAFKA_BOOTSTRAP_SERVERS` - address of the Kafka server

* `SPRING_KAFKA_CONSUMER_GROUP_ID` - group of consumers

* `KAFKA_CONSUMER_THREADS` - the number of Kafka consumer threads

* `KAFKA_AUTH_EXCEPTION_RETRY_INTERVAL` - the interval between retries after `AuthorizationException` is thrown by `KafkaConsumer`

Each action available in the service corresponds to a Kafka event. A separate Kafka topic must be configured for each use-case.

:::caution
Make sure the topics configured for this service don't follow the engine pattern.
:::

### Configuring logging

The following environment variables could be set in order to control log levels:

* `LOGGING_LEVEL_ROOT` - root spring boot microservice logs

* `LOGGING_LEVEL_APP` - app level logs