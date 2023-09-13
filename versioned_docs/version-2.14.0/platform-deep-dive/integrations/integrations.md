# Integrations

## What is an integration?

**Connecting legacy systems or third-party apps** to the engine is easily done through custom integrations. These can be developed using any tech stack, the only requirement is that they connect to Kafka in order to communicate with the FLOWX process engine.

Integrations can be used for anything from legacy APIs, custom file exchange solutions, or RPAs.

#### High-level architecture 

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/intgr_final.png)

Since they involve interaction with legacy systems and custom logic, they need to be developed the first time you need to integrate one into your FLOWX.AI setup.

## Creating a custom integration

Creating integrations for the FLOWX.AI platform is pretty straightforward, you can use your preferred technology in order to write the custom code for them. The only constraint is that they need to be able to send and receive messages to/from the Kafka cluster.

#### Steps for creating an integration

To create an integration follow the next steps:

1. Create a Microservice (we'll refer to it as a Connector) that can listen for and react to Kafka events, using your preferred tech stack. Add custom logic for handling the received data from Kafka and obtaining related info from legacy systems. And finally, send the data back to Kafka.
2. Add the related configuration in the [process definition](../../building-blocks/process/process-definition/process-definition.md), you will have to add a [message](../../building-blocks/node/message-send-received-task-node.md) send action in one of the [nodes](../../building-blocks/node/node.md) to send the needed data to the connector.
3. When the response from the custom integration is ready, send it back to the engine, keep in mind, that your process will wait in a receive message node.

Here's the startup code for a Java Connector Microservice:

[Quickstart connector](https://github.com/flowx-ai/quickstart-connector)

## Managing an integration

#### How to manage Kafka Topics

Don't forget, the engine is configured to consume all the events on topics that start with a predefined topic path (ex. flowx.in.\*)

* you will need to configure this topic pattern when setting up the Engine
* and make sure to use it when sending messages from the Connectors back to the Engine
* all Kafka headers received by the Connector should be sent back to the Engine with the result

## Building a Connector

Connectors should act as a light business logic layer that:

* Converts data from one domain to another (date formats, list of values, units, etc.)
* Adds information that is required by the integration but is not important for the process (a flag, generates a GUID for tracing, etc.)

[Creating a Kafka consumer](./creating-a-kafka-consumer.md)

[Creating a Kafka producer](./creating-a-kafka-producer.md)

Keep in mind that you are in an event-driven architecture and the communication between the engine and the connector is asynchronous. The connectors will need to be designed in such a way that they do not bloat the platform. Depending on the communication type between the connector and the legacy system you might need to also add custom implementation for load balancing requests, scaling the connector, and such.

:::caution
In order for the connector to communicate correctly with the Engine, you have to make sure to include all the received Kafka headers in the response that is sent back to the FLOWX Engine.
:::

To be able to easily trace the process flow, a minimal setup for Jaeger tracing should be added to custom Connectors.