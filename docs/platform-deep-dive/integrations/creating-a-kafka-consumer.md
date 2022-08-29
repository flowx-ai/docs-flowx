# How to create a Kafka consumer

:::tip
 using Spring Boot
:::

Here are some tips regarding needed configurations and code samples for implementing a Kafka consumer using Java.

## Required dependencies

```bash
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

```bash
spring.kafka:
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

kafka:
  consumerThreads: 1
  authorizationExceptionRetryInterval: 10
  ADD_NEEDED_TOPIC_NAMES_HERE
```

## Code sample for a Kafka Listener

```text
@KafkaListener(topics = "TOPIC_NAME_HERE")
public void listen(ConsumerRecord<String, String> record) throws JsonProcessingException {

  SomeDTO request = objectMapper.readValue(record.value(), SomeDTO.class);

  // process received dto
}
```
