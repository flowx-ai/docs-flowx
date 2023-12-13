---
sidebar_position: 1
---

# Message Throw Intermediate Event

:::info quick intro
**What is it?** It's like throwing a message to tell someone about something. After throwing the message, the process keeps going, and other parts of the process can listen to that message.

**Why it is important?** The Message Throw Intermediate Event is important because it allows different parts of a process to communicate and share information with each other. 
:::

## Configuring a Message Throw Intermediate Event

A Message Throw Intermediate Event is an event in a process where a message is sent to trigger a communication or action with another part of the process (can be correlated with a catch event). It represents the act of throwing a message to initiate a specific task or notification. The event creates a connection between the sending and receiving components, allowing information or instructions to be transmitted. Once the message is thrown, the process continues its flow while expecting a response or further actions from the receiving component.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/node/throw_message_event.png#center)

#### General config

* **Can go back?** - setting this to true will allow users to return to this step after completing it, when encountering a step with `canGoBack` false, all steps found behind it will become unavailable
* **Correlate with catch events** - the dropdown contains all catch messages from the process definitions accessible to the user
* **Correlation key** - is a process key that uniquely identifies the instance to which the message is sent
* **The data field** - allows the user to define a JSON structure with the data to be sent along with the message
* **Stage** - assign a stage to the node

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/node/message_throw_interm_config.png)










