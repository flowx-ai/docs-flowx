---
sidebar_position: 4
--- 

# Message catch boundary events

:::info quick intro
**What is it?** Boundary [**events**](../../../terms/events) are integral components linked to **user tasks** within a process flow. Specifically, Message Catch Boundary Events are triggered by incoming messages and can be configured as either interrupting or non-interrupting based on your requirements.

**Why is it important?** It empowers processes to actively listen for and capture designated messages during the execution of associated user tasks. 
:::

When an event is received, it progresses through the sequence from the intermediate [**node**](../../../terms/flowx-node). Multiple intermediate boundary events can exist on the same user task, but only one can be activated at a time.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/message_catch_boundary_multiple.png)

Message Catch Boundary Events can be categorized by their behavior, resulting in two main classifications:

* [**Interrupting**](#message-catch-interrupting-event)  
* [**Non-interrupting**](#message-catch-non-interrupting-event)

## Message catch interrupting event

<div className = "image-scaled">

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/node/message_catch_interrupting_event.png#center)

</div>

In the case of an Interrupting Message Catch Boundary Event triggered by a received message, it immediately interrupts the ongoing task. The associated task concludes, and the [**process flow**](../../../terms/flowx-process) advances based on the received message. 

- **Use Cases:**
  - Suitable for scenarios where the receipt of a specific message requires an immediate interruption of the current activity.
  - Often used when the received message signifies a critical event that demands prompt attention.


- **Example:**
  - A user task is interrupted as soon as a high-priority message is received, and the process flow moves forward to handle the critical event.


## Message catch non-interrupting event

<div className = "image-scaled">

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/node/%20message_catch_non_interrupting.png#center)

</div>

Contrastingly, a Non-Interrupting Message Catch Boundary Event continues to listen for messages during the execution of the associated task without immediate interruption. The task persists in its execution even upon receiving messages. Multiple non-interrupting events can be activated concurrently while the task is still active, allowing the task to continue until its natural completion.

- **Use Cases:**
  - Appropriate for scenarios where multiple messages need to be captured during the execution of a user task without disrupting its flow.
  - Useful when the received messages are important but do not require an immediate interruption of the ongoing activity.

- **Example:**
  - A user task continues its execution while simultaneously capturing and processing non-critical messages.

## Configuring a message catch interrupting/non-interrupting event

#### General config

* **Correlate with Throwing Events** - the dropdown lists all throw events from accessible process definitions

:::info
Establishes correlation between the catch event and the corresponding throw event. Selection of the relevant throw event triggers the catch event upon message propagation.
:::

* **Correlation Key** - process key used to correlate received messages with specific process instances


:::info
The correlation key associates incoming messages with specific process instances. Upon receiving a message with a matching correlation key, the catch event is triggered.
:::

* **Receive Data (Process Key)** - the catch event can receive and store data associated with the message in a process variable with the specified process key


:::info
This received data becomes available within the process instance, facilitating further processing or decision-making.
:::
