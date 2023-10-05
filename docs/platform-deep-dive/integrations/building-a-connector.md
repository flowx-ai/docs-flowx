# Building a Connector

Connectors play a crucial role in integrating systems by providing a lightweight business logic layer. They perform essential tasks such as data transformation and information enrichment, ensuring seamless communication between different domains. This guide will walk you through the process of creating a Connector step by step.

## Key Connector Functions

Connectors serve two primary functions:

1. **Data Transformation:** Convert data from one format to another, ensuring compatibility between different domains, such as date formats, lists of values, and units.

2. **Information Enrichment:** Add information required for integration purposes but not critical for the overall process. This may include flags, tracing GUIDs, and more.

To create a Connector, you will need to follow these steps:

## Creating a Connector

### Step 1: Create a Kafka Consumer.

* **Create a Kafka Consumer:** [Read the guide here](./creating-a-kafka-consumer.md) to set up a Kafka consumer for your Connector.

### Step 2: Create a Kafka Producer.

* **Create a Kafka Producer:** [Refer to this guide](./creating-a-kafka-producer.md) for instructions on configuring a Kafka producer.

## Connector Design Considerations

Asynchronous Communication: Communication between the Engine and Connector is asynchronous in an event-driven architecture. Design your Connectors efficiently to avoid overloading the platform.

Custom Solutions: Depending on the communication type between the Connector and the legacy system, you may need to implement custom solutions for load balancing requests, scaling the Connector, and more.

:::caution
To ensure seamless communication with the Engine, include all received Kafka headers in the response sent back to it.
:::

## Connector Configuration Example

Here's an example of a basic Connector setup that you can use as a starting point for FLOWX Connectors. This example includes configurations for Kafka, Jaeger tracing, and custom health checks.

### Step 1: Choose a Meaningful Name

Select a meaningful name for your Connector service and set it in the configuration file.

### Step 2: Select Listening Topic

Decide the topic your Connector should listen to and configure it in the configuration file. For multiple topics, configure separate thread pools. See the `KafkaConfiguration` example below for reference.

```java
package ai.flowx.quickstart.connector.config;

import ai.flowx.quickstart.connector.exception.ExchangeException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.listener.SeekToCurrentErrorHandler;
import org.springframework.kafka.support.converter.RecordMessageConverter;
import org.springframework.kafka.support.converter.StringJsonMessageConverter;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import javax.annotation.PostConstruct;
import java.time.Duration;

@Slf4j
@Configuration
@EnableKafka
public class KafkaConfiguration {

    private ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();

    @Value(value = "${kafka.consumer.threads}")
    private Integer threadsNumber;

    @Value(value = "${kafka.auth-exception-retry-interval}")
    private Long authorizationExceptionRetryInterval;

    @PostConstruct
    private void configure() {
        initializeThreadPoolExecutor(executor, "kafka-connector-thread-group", "KafkaConnectorConsumerThread", threadsNumber);
    }

    private void initializeThreadPoolExecutor(ThreadPoolTaskExecutor threadPoolTaskExecutor, String threadGroupName, String threadNamePrefix, Integer threadsNumbers){
        threadPoolTaskExecutor.setThreadGroupName(threadGroupName);
        threadPoolTaskExecutor.setCorePoolSize(threadsNumbers);
        log.info("Configuring kafka consumers thread pool for group " + threadGroupName + " with " + threadPoolTaskExecutor.getCorePoolSize() + " threads.");

        threadPoolTaskExecutor.setThreadNamePrefix(threadNamePrefix);
        threadPoolTaskExecutor.setWaitForTasksToCompleteOnShutdown(true);
        threadPoolTaskExecutor.initialize();
    }

    @Bean
    public SeekToCurrentErrorHandler errorHandler() {
        SeekToCurrentErrorHandler handler = new SeekToCurrentErrorHandler();
        handler.addNotRetryableExceptions(ExchangeException.class);
        return handler;
    }

    @Bean
    public StringJsonMessageConverter messageConverter(ObjectMapper objectMapper) {
        return new StringJsonMessageConverter(objectMapper);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, Object> listenerContainerFactory(ConsumerFactory consumerFactory, RecordMessageConverter messageConverter, SeekToCurrentErrorHandler errorHandler) {
        ConcurrentKafkaListenerContainerFactory<String, Object> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory);
        factory.setMessageConverter(messageConverter);
        factory.setConcurrency(threadsNumber);
        factory.setErrorHandler(errorHandler);
        factory.getContainerProperties().setConsumerTaskExecutor(executor);
        factory.setContainerCustomizer(
                container -> container.getContainerProperties().setAuthorizationExceptionRetryInterval(
                        Duration.ofSeconds(authorizationExceptionRetryInterval)));
        return factory;
    }
}
```


### Step 3: Define Reply Topic

Determine the topic to which the Connector should reply. Ensure it matches the Engine's listening topic pattern.

### Step 4: Adjust Consumer Threads

Modify the number of consumer threads as needed. Ensure the total threads match the number of partitions per topic.

```yaml
kafka:
  consumer.threads: 3
  auth-exception-retry-interval: 10
  topic:
    in: ai.flowx.currency.exchange.in
    out: ai.flowx.updates.currency.exchange
```

### Step 5: Define Incoming and Outgoing DTO Formats

Specify the format for incoming and outgoing data using DTOs (Data Transfer Objects).

```java
package ai.flowx.quickstart.connector.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class KafkaRequestMessageDTO {
    private String fromCurrency;
    private String toCurrency;
    private Double amount;
}
```

```java
package ai.flowx.quickstart.connector.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
public class KafkaResponseMessageDTO {
    private String fromCurrency;
    private String toCurrency;
    private Double initialAmount;
    private Double exchangedAmount;
    private String errorMessage;
}
```

### Step 6: Implement Business Logic

Develop the business logic for handling messages received from the Engine and sending back replies. Include the process instance UUID as a key for Kafka messages.

### Optional Steps

* Jaeger Tracing: Decide whether to use Jaeger tracing in your setup and configure it in the YAML file.

* Health Checks: Enable health checks for the services used in your Connector.

#### Jaeger

```yaml
application:
  jaeger:  # TODO optional: decide whether you want to use Jaeger tracing in your setup and choose a prefix name
    enabled: false
    prefix: connector
```

#### Management

```yaml
management: # TODO optional: enable health check for all the services you use in case you add any
  health:
    kafka.enabled: true
    # db.enabled: true
    # mongo.enabled: true
    # redis.enabled: true
    # elasticsearch.enabled: true
```
#### Logging

```yaml
logging:
  level:
    ROOT: INFO
    ai.flowx.quickstart.connector: INFO
    io.netty: INFO
    reactor.netty: INFO
    jdk.event.security: INFO
```


## Sample YAML Configuration

Here's a sample YAML configuration for reference:

* application.yaml

```yaml
logging:
  level:
    ROOT: INFO
    ai.flowx.quickstart.connector: INFO
    io.netty: INFO
    reactor.netty: INFO
    jdk.event.security: INFO

server:
  port: 8080

spring:
  application:
    name: currency exchange
  jackson:
    serialization:
      write_dates_as_timestamps: false
      fail-on-empty-beans: false

application:
  jaeger:
    enabled: true
    prefix: exchange

management:
  health:
    kafka.enabled: true

exchangerate-api:
  key: YOUR_API_KEY # get your free api key here https://www.exchangerate-api.com/docs/pair-conversion-requests
  scheme: https
  host: v6.exchangerate-api.com
  path: v6/{apiKey}/pair/{fromCurrency}/{toCurrency}/{amount}
```

* application-kafka.yml

```yaml
spring:
  kafka:
    bootstrap-servers: localhost:9092
    security.protocol: "PLAINTEXT"
    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.springframework.kafka.support.serializer.JsonSerializer
      properties:
        interceptor:
          classes: io.opentracing.contrib.kafka.TracingProducerInterceptor
    consumer:
      group-id: kafka-connector-group
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      properties:
        interceptor:
          classes: io.opentracing.contrib.kafka.TracingConsumerInterceptor

kafka:
  consumer.threads: 3
  auth-exception-retry-interval: 10
  topic:
    in: ai.flowx.currency.exchange.in
    out: ai.flowx.updates.currency.exchange
```