# Creating a Kafka consumer

:::tip
This guide focuses on creating a [**Kafka**](../../terms/flowx-kafka) consumer using Spring Boot.
:::

Here are some tips, including the required configurations and code samples, to help you implement a Kafka consumer in Java.

## Required dependencies

Ensure that you have the following dependencies in your project:

```xml
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>

<dependency>
    <groupId>io.strimzi</groupId>
    <artifactId>kafka-oauth-client</artifactId>
    <version>0.6.1</version>
</dependency>

<dependency>
    <groupId>org.apache.kafka</groupId>
    <artifactId>kafka-clients</artifactId>
    <version>2.5.1</version>
</dependency>

<dependency>
    <groupId>io.opentracing.contrib</groupId>
    <artifactId>opentracing-kafka-client</artifactId>
    <version>0.1.13</version>
</dependency>
```

## Configuration

Ensure that you have the following configuration in your `application.yml` or `application.properties` file:

```yaml
spring.kafka: #1
      bootstrap-servers: URL_OF_THE_KAFKA_SERVER
      consumer:
        group-id: ADD_CONSUMER_NAME
        auto-offset-reset: earliest
        key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
        value-deserializer: org.apache.kafka.common.serialization.StringDeserializer
        properties:
          interceptor:
            classes: io.opentracing.contrib.kafka.TracingConsumerInterceptor
          security.protocol: "SASL_PLAINTEXT"
          sasl.mechanism: "OAUTHBEARER"
          sasl.jaas.config: "org.apache.kafka.common.security.oauthbearer.OAuthBearerLoginModule required ;"
          sasl.login.callback.handler.class: io.strimzi.kafka.oauth.client.JaasClientOauthLoginCallbackHandler

kafka: #2
  consumerThreads: 1
  authorizationExceptionRetryInterval: 10
  ADD_NEEDED_TOPIC_NAMES_HERE
```

1. **Spring Kafka configuration.**

* `bootstrap-servers: URL_OF_THE_KAFKA_SERVER`: Specifies the URL of the Kafka server that the application should connect to.

* `consumer`: Configuration specific to Kafka consumers.

* `group-id`: Sets the consumer group ID. This ID is used to group Kafka consumers together.

* `auto-offset-reset: earliest`: Configures the consumer to start consuming from the earliest available offset when it first connects to a topic.

* `key-deserializer: org.apache.kafka.common.serialization.StringDeserializer`: Specifies the key deserializer class to deserialize keys as strings.

* `value-deserializer: org.apache.kafka.common.serialization.StringDeserializer`: Specifies the value deserializer class to deserialize values as strings.

* `interceptor`: Configures Kafka consumer interceptors, specifically using `io.opentracing.contrib.kafka.TracingConsumerInterceptor` class for tracing.

* `security.protocol`: "SASL_PLAINTEXT": Sets the security protocol to "SASL_PLAINTEXT," indicating the use of a simple SASL (Simple Authentication and Security Layer) mechanism without encryption.

* `sasl.mechanism`: "OAUTHBEARER": Specifies the SASL mechanism as "OAUTHBEARER," which is often used for OAuth-based authentication.

* `sasl.jaas.config: "org.apache.kafka.common.security.oauthbearer.OAuthBearerLoginModule required ;"`: Configures the JAAS (Java Authentication and Authorization Service) configuration for OAuthBearerLoginModule, which is used for OAuth-based authentication.

* `sasl.login.callback.handler.class`: io.strimzi.kafka.oauth.client.JaasClientOauthLoginCallbackHandler: Sets the class for handling SASL login callbacks when using OAuthBearer authentication.

2. **Kafka-related configuration**

* `consumerThreads: 1`: Specifies the number of consumer threads to be used. In this case, it's set to 1.

* `authorizationExceptionRetryInterval: 10`: Sets the retry interval (in milliseconds) in case of authorization exceptions to 10 milliseconds.

## Code sample for a Kafka Listener

Here's an example of a Kafka listener method:

```java
@KafkaListener(topics = "TOPIC_NAME_HERE")
public void listen(ConsumerRecord<String, String> record) throws JsonProcessingException {

  SomeDTO request = objectMapper.readValue(record.value(), SomeDTO.class);

  // process received DTO
}
```

:::caution IMPORTANT
Make sure to replace topics placeholders with the actual name of the Kafka topic you want to consume from. Additionally, ensure that you have the necessary serialization and deserialization logic based on your specific use case, example:

```yaml
topic: #example
    in: ai.flowx.connector.in #Decide what topic should the connector listen on
    out: ai.flowx.updates.from_connector # Decide what topic should the connector reply on (this topic name must match the topic pattern the Engine listens on)
```
:::