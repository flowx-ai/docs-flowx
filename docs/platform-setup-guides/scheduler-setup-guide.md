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

## Dependencies 

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

## Configuration 

```yaml
scheduler:
  thread-count: 30  # Configure the number of threads to be used for sending expired messages.
  callbacks-thread-count: 60 # Configure the number of threads for handling Kafka responses, whether the message was successfully sent or not
  cronExpression: "*/10 * * * * *" #every 10 seconds
  retry: # new retry mechanism
    max-attempts: 3
    seconds: 1
    thread-count: 3
    cronExpression: "*/10 * * * * *" #every 10 seconds
  cleanup:
    cronExpression: "*/25 * * * * *" #every 25 seconds
```

* `SCHEDULER_THREAD_COUNT` - Used to configure the number of threads to be used for sending expired.
* `SCHEDULER_CALLBACKS_THREAD_COUNT` - Used to configure the number of threads for handling Kafka responses, whether the message was successfully sent or not.

### Retry mechanism

* `SCHEDULER_RETRY_THREAD_COUNT` - Specify the number of threads to use for resending messages that need to be retried.
* `SCHEDULER_RETRY_MAX_ATTEMPTS` - This configuration parameter sets the number of retry attempts. For instance, if it's set to 3, it means that the system will make a maximum of three retry attempts for message resending.
* `SCHEDULER_RETRY_SECONDS` - This configuration parameter defines the time interval, in seconds, for retry attempts. For example, when set to 1, it indicates that the system will retry the operation after a one-second delay.

### Cleanup

* A configuration for cleaning up processes.

### Configuring MongoDB

The MongoDB database is used to persist scheduled messages until they are sent back. The following configurations need to be set using environment variables:

* `SPRING_DATA_MONGODB_URI` - the URI for the MongoDB database

### Configuring Kafka 

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