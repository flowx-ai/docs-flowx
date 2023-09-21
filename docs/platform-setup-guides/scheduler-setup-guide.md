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
  batchSize: 100
  cronExpression: "*/10 * * * * *" #every 10 seconds

timer-event-scheduler: //used for timer events nodes
  batchSize: 100
  cronExpression: "*/1 * * * * *" #every 1 seconds

flowx:
  timer-calculator:
    delay-max-repetitions: 1000000
```

* **cronExpression** is a schedule expression that determines when the cleanup process runs. In this case, it runs every day during the night (between 12:00 AM and 5:59 AM) and every 5 minutes, at the start of the minute. 
* **batchSize** specifies the number of processes to be cleaned up in one batch.

### Recovery mechanism

:::info EXAMPLE
You have a "next execution" set for 10:25, and the cycle step is 10 minutes. If the instance goes down for 2 hours, the next execution time should be 12:25, not 10:35. To calculate this, you add 10 minutes repeatedly to 10:25 until you reach the current time. So, it would be 10:25 + 10 min + 10 min + 10 min, until you reach the current time of 12:25. This ensures that the next execution time is adjusted correctly after the downtime.
:::

* `FLOWX_TIMER_CALCULATOR_DELAY_MAX_REPETITIONS` - This means that, for example, if our cycle step is set to one second and the system experiences a downtime of two weeks, which is equivalent to 1,209,600 seconds, and we have the "max repetitions" set to 1,000,000, it will attempt to calculate the next schedule. However, when it reaches the maximum repetitions, an exception is thrown, making it impossible to calculate the next schedule. As a result, the entry remains locked and needs to be rescheduled. This scenario represents a critical case where the system experiences extended downtime, and the cycle step is very short (e.g., 1 second), leading to the inability to determine the next scheduled event.


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




