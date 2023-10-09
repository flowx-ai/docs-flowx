# Setting up Jaeger tracing for microservices

The scope of this document is to present some basic information on how to include Jaeger tracing into a Java based project.

## Required Dependencies

```xml
<dependency>
    <groupId>io.jaegertracing</groupId>
    <artifactId>jaeger-client</artifactId>
    <version>1.4.0</version>
</dependency>
<dependency>
    <groupId>io.opentracing.contrib</groupId>
    <artifactId>opentracing-kafka-client</artifactId>
    <version>0.1.13</version>
</dependency>
```

## Configuration

### Adding Kafka Interceptors for Tracing

In distributed tracing setups, Kafka interceptors help trace the flow of messages as they traverse through Kafka.

#### Producer Interceptor Configuration


```yaml
kafka:
    producer:
        properties: # this will be added to `spring.kafka.properties` section in the kafka configuration file
            interceptor:
                classes: io.opentracing.contrib.kafka.TracingProducerInterceptor
```

#### Consumer Interceptor Configuration

```yaml
kafka:
    consumer:
        properties: # this will be added to `spring.kafka.properties` section in the kafka configuration file
            interceptor:
                classes: io.opentracing.contrib.kafka.TracingConsumerInterceptor
```

### Extracting Jaeger Span Context from Kafka Messages

```java
@KafkaListener(topics = "${TOPIC_NAME}")
public void listen(ConsumerRecord<String, String> record) {
    // some code
    SpanContext spanContext = TracingKafkaUtils.extractSpanContext(record.headers(), tracer);
    // some other code
}
```

:::tip
Utilize this context to create child spans and log events from the adapter:

```java
Span span = tracer.buildSpan(JAEGER_SPAN_NAME).asChildOf(spanContext).start();
```
:::

### Sending span context with outgoing Kafka messages

When sending Kafka messages, ensure that you include the span context for tracing:

```java
ProducerRecord<String, Object> producerRecord = new ProducerRecord<>(responseTopic, responseMessage);

TracingKafkaUtils.inject(span.context(), producerRecord.headers(), tracer);

kafkaTemplate.send(producerRecord);
```
