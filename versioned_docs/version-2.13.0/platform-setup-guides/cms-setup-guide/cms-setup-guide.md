# CMS setup guide

The service is available as a docker image.

It has the following dependencies:

* a [mongodb](https://www.mongodb.com/2) database
* it needs to be able to connect to the same Kafka instance as the one used by the engine
* a [redis](https://redis.io/) instance for caching

The service comes with most of the needed configuration properties filled in, but there are a few that need to be set up using some custom environment variables.

## Dependencies <a href="#2939ce6e-c291-40c2-b3d6-1e789b1617d7" id="2939ce6e-c291-40c2-b3d6-1e789b1617d7"></a>

### **Mongo database**

Basic Mongo configuration - helm values.yaml

```yaml
cms-mdb:
    existingSecret: {{secretName}}
    mongodbDatabase: {{CmsDatabaseName}}
    mongodbUsername: {{CmsDatabaseUser}}
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

### **Redis server** <a href="#faa668e8-966f-468a-8009-f4e903e01d14" id="faa668e8-966f-468a-8009-f4e903e01d14"></a>

The service can use the [Redis component](../../platform-overview/frameworks-and-standards/event-driven-architecture-frameworks/intro-to-redis.md) already deployed for the engine.

## Configuration <a href="#bad24571-ff23-4ec3-83d9-8a2ace74a6b4" id="bad24571-ff23-4ec3-83d9-8a2ace74a6b4"></a>

### Authorization configuration

The following variables need to be set in order to connect to the identity management platform:

`SECURITY_OAUTH2_BASE_SERVER_URL`

`SECURITY_OAUTH2_CLIENT_CLIENT_ID`

`SECURITY_OAUTH2_REALM`

### MongoDB configuration

The MongoDB database is used for storing taxonomies and contents. The following configurations need to be set using environment variables:

`SPRING_DATA_MONGODB_URI` - the uri for the mongodb database

### Redis configuration

The following values should be set with the corresponding Redis-related values.&#x20;

`SPRING_REDIS_HOST`

`SPRING_REDIS_PASSWORD`

`REDIS_TTL`

All the data produced by the service will be stored in Redis under a specific key. The name of the key can be configured using the environment variable:

`SPRING_CACHE_REDIS_KEY_PREFIX`

### **Kafka configuration** <a href="#63673403-7b21-440b-a173-211fd5c9a86e" id="63673403-7b21-440b-a173-211fd5c9a86e"></a>

The following Kafka-related configurations can be set by using environment variables:

`SPRING_KAFKA_BOOTSTRAP_SERVERS` - address of the Kafka server

`SPRING_KAFKA_CONSUMER_GROUP_ID` - a group of consumers

`KAFKA_CONSUMER_THREADS` - the number of Kafka consumer threads

`KAFKA_AUTH_EXCEPTION_RETRY_INTERVAL` - the interval between retries after `AuthorizationException` is thrown by `KafkaConsumer`

Each action available in the service corresponds to a Kafka event. A separate Kafka topic must be configured for each use case.

:::caution
The Engine is listening for messages on topics with names of a certain pattern, make sure to use correct outgoing topic names when configuring the CMS service.
:::

### Logging

The following environment variables could be set in order to control log levels:

`LOGGING_LEVEL_ROOT` - root spring boot microservice logs

`LOGGING_LEVEL_APP` - app level logs

`LOGGING_LEVEL_MONGO_DRIVER` - logs related to mongo driver

### File storage

`APPLICATION_FILE_STORAGE_S3_SERVER_URL`

`APPLICATION_FILE_STORAGE_S3_BUCKET_NAME` 

`APPLICATION_FILE_STORAGE_S3_ROOT_DIRECTORY`

`APPLICATION_FILE_STORAGE_S3_CREATE_BUCKET` 