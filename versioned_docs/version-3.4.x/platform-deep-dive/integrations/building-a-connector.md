# Building a Connector

Connectors serve as lightweight business logic layers, performing the following essential tasks:

1. **Data Transformation:** Convert data from one format to another, ensuring compatibility between different domains, such as date formats, lists of values, and units.

2. **Information Enrichment:** Add information required for integration purposes but not critical for the overall process. This may include flags, tracing GUIDs, and more.

To create a Connector, you will need to follow these steps:

1. **Create a Kafka Consumer:** [Read the guide here](./creating-a-kafka-consumer.md) to set up a Kafka consumer for your Connector.


2. **Create a Kafka Producer:** [Refer to this guide](./creating-a-kafka-producer.md) for instructions on configuring a Kafka producer.

When designing Connectors, it's vital to understand that the communication between the Engine and the Connector is asynchronous within an event-driven architecture. Thus, it's crucial to design Connectors in an efficient way that avoids overloading the platform. Depending on the communication type between the Connector and the legacy system, you may need to implement custom solutions for load balancing requests, scaling the Connector, and more.

:::caution
To ensure seamless communication with the [**Engine**](../../terms/flowxai-process-engine), ensure that you include all received Kafka headers in the response sent back to it.
:::

### Connector Configuration Example

Here's a basic setup for a Connector, which can serve as a starting point for FLOWX connectors. This guide includes the following:

- Kafka-related configurations and examples of listener and message sender setups.
- Jaeger-related configurations and examples.
- Configuration examples for activating custom health checks.

Please follow these steps and check the TODOs in the code to implement your custom FLOWX connector effectively:

1. **Choose a Meaningful Name:** Select a meaningful name for your connector service and set it in the configuration file.

2. **Select Listening Topic:** Decide what topic your connector should listen to and configure it in the configuration file. If the connector needs to listen to multiple topics, ensure you add settings and configure a separate thread pool executor for each needed topic (refer to `KafkaConfiguration `for an example configuration):

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


3. **Define Reply Topic:** Determine the topic to which the connector should reply. This topic's name must match the topic pattern that the Engine listens on.

4. **Adjust Consumer Threads:** Modify the number of consumer threads as needed. Ensure that the number of instances multiplied by the number of threads equals the number of partitions per topic.

```yaml
kafka:
  consumer.threads: 3
  auth-exception-retry-interval: 10
  topic:
    in: ai.flowx.currency.exchange.in
    out: ai.flowx.updates.currency.exchange
```

5. **Define Incoming DTO Format:** Specify the format for incoming data.

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

6. **Define Outgoing DTO Format:** Specify the format for outgoing data.

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

7. **Implement Business Logic:** Develop the business logic for handling messages received from the Engine and sending back replies. Ensure that you include the process instance UUID as a key for the Kafka message.

Optional Steps:

- **Jaeger Tracing:** Decide whether you want to use Jaeger tracing in your setup and choose a prefix name in the configuration file.

- **Health Checks:** Enable health checks for all the services you use in the service.

For straightforward process flow tracing, consider adding minimal Jaeger tracing setup to your custom Connectors:

#### Basic configuration

```yaml
spring:
  application:
    name: quickstart-connector # TODO 1. choose a meaningful name for your connector service
  jackson:
    serialization:
      write_dates_as_timestamps: false
      fail-on-empty-beans: false

```


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

### Logging

```yaml
logging:
  level:
    ROOT: INFO
    ai.flowx.quickstart.connector: INFO
    io.netty: INFO
    reactor.netty: INFO
    jdk.event.security: INFO
```

Sample:

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