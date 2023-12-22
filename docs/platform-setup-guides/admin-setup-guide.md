# Admin Setup Guide

## Dependencies

* [**Database**](#database---postgres--oracle)
* [**Redis server**](../platform-setup-guides-docs.md#redis-configuration)
* [**Kafka**](#kafka-configuration)
* [**Logging**](../platform-setup-guides-docs.md#logging)


## Configuration

* [**Datasource configuration**](../platform-setup-guides-docs.md#datasource-configuration)
* [**Redis configuration**](../platform-setup-guides-docs.md#redis-configuration)
* [**Logging**](../platform-setup-guides-docs.md#logging)
* [**Authorization & access roles**](../platform-setup-guides-docs.md#authorization--access-roles)
* [**Configuring access roles for processes**](configuring-access-roles-for-processes)
* [**Kafka configuration**](#configuring-kafka)

### Configuring Kafka

Kafka handles all communication between the FLOWX.AI Engine and external plugins and integrations. It is also used for notifying running process instances when certain events occur. 

Both a producer and a consumer must be configured. The following Kafka-related configurations can be set by using environment variables:

* `SPRING_KAFKA_BOOTSTRAP_SERVERS` - the address of the Kafka server, it should be in the format "host:port"

* `KAFKA_AUTH_EXCEPTION_RETRY_INTERVAL` - the interval between retries after AuthorizationException is thrown by Kafka consumer

* `KAFKA_MESSAGE_MAX_BYTES` - this is the largest size of the message that can be received by the broker from a producer.

* `KAFKA_MESSAGE_MAX_REQUEST_SIZE` - 

#### Consumer groups & consumer threads

In Kafka a consumer group is a group of consumers that jointly consume and process messages from one or more Kafka topics. Each consumer group has a unique identifier called a group ID, which is used by Kafka to manage message consumption and distribution among the members of the group.

Thread numbers, on the other hand, refer to the number of threads that a consumer application uses to process messages from Kafka. By default, each consumer instance runs in a single thread, which can limit the throughput of message processing. Increasing the number of consumer threads can help to improve the parallelism and efficiency of message consumption, especially when dealing with high message volumes.

Both group IDs and thread numbers can be configured in Kafka to optimize the processing of messages according to specific requirements, such as message volume, message type, and processing latency.

The configuration related to consumers (group ids and thread numbers) can be configured separately for each message type as it follows:

* `KAFKA_CONSUMER_GROUP_ID_GENERIC_PROCESSING` - related to a Kafka consumer group that receives messages related to notifying advance actions, it is used to configure the group ID for this consumer group

* `KAFKA_CONSUMER_THREADS_GENERIC_PROCESSING` - the number of threads used by a Kafka consumer application to notify the Kafka broker about the progress of


| Default parameter (env var)                | Default FLOWX.AI value (can be overwritten) |
| ------------------------------------------ | ------------------------------------------- |
| KAFKA_CONSUMER_GROUP_ID_GENERIC_PROCESSING | genericProcessingGroup                      |
| KAFKA_CONSUMER_THREADS_GENERIC_PROCESSING  | 6                                           |

It is important to know that all the events that start with a configured pattern will be consumed by the engine. This makes it possible to create a new integration and connect it to the engine without changing the configuration of the engine.

:::info
The suggested topic pattern naming convention is the following:

```yaml
 topic:
    naming:
      package: "ai.flowx."
      environment: "dev."
      version: ".v1"
      prefix: ${kafka.topic.naming.package}${kafka.topic.naming.environment}
      suffix: ${kafka.topic.naming.version}
      engineReceivePattern: engine.receive.

    pattern: ${kafka.topic.naming.prefix}${kafka.topic.naming.engineReceivePattern}*
```
:::

## Datasource configuration

To store process definitions the Admin microservice connects to the same Postgres / Oracle database as the Engine. Make sure to set the needed database connection details.

The following configuration details need to be added using environment variables:

* `SPRING_DATASOURCE_URL` - This environment variable is used to specify the URL of the database that the Admin microservice and Engine connect to. The URL typically includes the necessary information to connect to the database server, such as the host, port, and database name. It follows the format of the database's JDBC URL, which is specific to the type of database being used (e.g., PostgreSQL or Oracle).

* `SPRING_DATASOURCE_USERNAME` - This environment variable sets the username that the Admin microservice and Engine used to authenticate themselves when connecting to the database. The username is used to identify the user account that has access to the specified database.

* `SPRING_DATASOURCE_PASSWORD` - This environment variable specifies the password associated with the username provided in the SPRING_DATASOURCE_USERNAME variable. The password is used to authenticate the user and grant access to the database.

## Redis configuration

Redis configuration involves setting up the connection parameters, such as the host, port, username, and password. In some cases, additional configuration settings may be required, such as specifying the type of data store or setting up access control for data access.

* SPRING_REDIS_HOST - environment variable used to configure the hostname or IP address of a Redis server when using Spring Data Redis
* SPRING_REDIS_PASSWORD - environment variable is used to store the password used to authenticate with a Redis server, it is used to secure access to the Redis server and should be kept confidential
* SPRING_REDIS_TTL - environment variable is used to specify the maximum time-to-live (TTL) for a key in Redis, it is used to set a limit on how long a key can exist before it is automatically expired (Redis will delete the key after the specified TTL has expired)
* SPRING_REDIS_PLATFORM_HEALTH_TTL -
* SPRING_REDIS_PLATFORM_COMPONENTS_VERSION_TTL -

### Spring Cache with Redis 

It is primarily used for caching specific method results in Redis. It simplifies caching by providing annotations and allows you to cache the results of methods without explicitly writing caching logic.

* SPRING_CACHE_TYPE -
* SPRING_CACHE_REDIS_KEY_PREFIX -
* SPRING_CACHE_REDIS_PERSISTENCE_KEY_PREFIX -
* SPRING_CACHE_REDIS_TIME_TO_LIVE - 

### Redis Template

Redis Template provides a more low-level, direct, and flexible access to Redis operations. It's suitable when you need more control over Redis functionalities, like working with different data structures in Redis, executing complex operations, or leveraging specific Redis features directly.

* APPLICATION_REDIS_DEFAULTSERIALIZER -
* APPLICATION_REDIS_KRYO_SHOW_TRACE - 
* APPLICATION_REDIS_KRYO_REGISTERED_CLASSES -
* APPLICATION_REDIS_KRYO_REGISTERED_COMPONENTS_VERSIONS_CLASSES -
* APPLICATION_REDIS_KEY_DURATION_SECONDS_RECEIVEDMESSAGE -
* APPLICATION_REDIS_PREFIXEXTERNALMESSAGE -
* APPLICATION_REDIS_CLEARABLE_CACHES - 

## OpenID Settings

* SECURITY_OAUTH2_BASE_SERVER_URL - This setting specifies the base URL of the OpenID server, which is used for authentication and authorization.
* SECURITY_OAUTH2_SERVICE_ACCOUNT_ADMIN_CLIENT_ID -
* SECURITY_OAUTH2_SERVICE_ACCOUNT_ADMIN_CLIENT_SECRET - Along with the client ID, you must also specify the client secret associated with the service account for proper authentication.






