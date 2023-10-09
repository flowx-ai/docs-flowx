# Creating a Kafka producer 

:::tip
This guide focuses on creating a [**Kafka**](../../terms/flowx-kafka) producer using Spring Boot.
:::

Here are some tips, including the required configurations and code samples, to help you implement a Kafka producer in Java.

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
spring.kafka:
      bootstrap-servers: URL_OF_THE_KAFKA_SERVER # Specifies the URL of the Kafka server that the Spring Kafka application should connect to.
      producer: #This sub-section configures Kafka producer settings.
        key-deserializer: org.apache.kafka.common.serialization.StringSerializer # Specifies the key deserializer to use for serializing keys as strings.
        value-serializer: org.springframework.kafka.support.serializer.JsonSerializer # Specifies the value serializer to use for serializing values as JSON.
        properties: 
          interceptor: # This sub-section configures Kafka producer interceptors.
            classes: io.opentracing.contrib.kafka.TracingProducerInterceptor
          security.protocol: "SASL_PLAINTEXT"
          sasl.mechanism: "OAUTHBEARER" # Specifies the SASL mechanism as "OAUTHBEARER," which is often used for OAuth-based authentication.
          sasl.jaas.config: "org.apache.kafka.common.security.oauthbearer.OAuthBearerLoginModule required ;"
          sasl.login.callback.handler.class: io.strimzi.kafka.oauth.client.JaasClientOauthLoginCallbackHandler

kafka:
  authorizationExceptionRetryInterval: 10
  ADD_NEEDED_TOPIC_NAMES_HERE # make sure to use the correct naming pattern for topics used to send data to the FLOWX Engine
```

1. **Spring Kafka configuration**

* **`bootstrap-servers`**: Specifies the URL of the Kafka server that the Spring Kafka application should connect to. Replace `URL_OF_THE_KAFKA_SERVER` with the actual Kafka server URL.

* **`producer`**: This sub-section configures Kafka producer settings.

* **`key-deserializer: org.apache.kafka.common.serialization.StringSerializer`**: Specifies the key deserializer to use for serializing keys as strings.

* **`value-serializer: org.springframework.kafka.support.serializer.JsonSerializer`**: Specifies the value serializer to use for serializing values as JSON.

* **`properties`**: This is a sub-section for additional Kafka producer properties.

* **`interceptor`**: This sub-section configures Kafka producer interceptors and specifies the `io.opentracing.contrib.kafka.TracingProducerInterceptor` interceptor class for tracing.

* **`security.protocol: "SASL_PLAINTEXT"`**: Sets the security protocol for communication with Kafka to "SASL_PLAINTEXT," indicating the use of a simple SASL mechanism without encryption.

* **`sasl.mechanism: "OAUTHBEARER"`**: Specifies the SASL mechanism as "OAUTHBEARER," which is often used for OAuth-based authentication.

* **`sasl.jaas.config: "org.apache.kafka.common.security.oauthbearer.OAuthBearerLoginModule required ;"`**: Configures the JAAS (Java Authentication and Authorization Service) configuration for OAuthBearerLoginModule, which is used for OAuth-based authentication.

* **`sasl.login.callback.handler.class: io.strimzi.kafka.oauth.client.JaasClientOauthLoginCallbackHandler`**: Sets the class for handling SASL login callbacks when using OAuthBearer authentication.

2. **Kafka-related configuration**

* `authorizationExceptionRetryInterval: 10`: Sets the retry interval (in milliseconds) in case of authorization exceptions to 10 milliseconds.

* `ADD_NEEDED_TOPIC_NAMES_HERE`: This comment indicates that you should specify the Kafka topic names that your Spring Kafka application needs to interact with. You should replace the placeholder with actual topic names as required.

## Code sample for a Kafka Listener

## Code sample for a Kafka producer

:::danger
Ensure that you have the necessary KafkaTemplate bean autowired in your producer class. The sendMessage method demonstrates how to send a message to a Kafka topic with the specified headers and payload. Make sure to include all the received Kafka headers in the response that is sent back to the [**FLOWX Engine**](../../terms/flowxai-process-engine).
:::

```java
private final KafkaTemplate<String, Object> kafkaTemplate;

public void sendMessage(String topic, Headers headers, Object payload) {
  ProducerRecord<String, Object> producerRecord = new ProducerRecord<>(topic, payload);
  // make sure to send all the received headers back to the FlowX Engine
  headers.forEach(header -> producerRecord.headers().add(header));
  kafkaTemplate.send(producerRecord);
}
```