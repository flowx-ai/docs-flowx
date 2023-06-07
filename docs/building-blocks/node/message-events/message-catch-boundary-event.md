---
sidebar_position: 2
--- 

# Message Catch Boundary Events

:::info quick intro
**What is it?** A Message Catch Boundary Event is a special event that can be attached to a user task in a process. 

**Why it is important?** It allows the process to listen for and capture specific messages during the execution of the associated user task. 
:::

There are two types of Message Catch Boundary Events: 

* [**Interrupting**](#message-catch-interrupting-event)  
* [**Non-Interrupting**](#message-catch-non-interrupting-event)

## Message Catch Interrupting Event

<div className = "image-scaled">

![](../img/message_catch_interrupting_event.png#center)

</div>

When an Interrupting Message Catch Boundary Event is triggered by receiving a message, it interrupts the associated task that is being performed. The task is immediately finished, and the process flow continues to advance based on the received message.

## Message Catch Non-Interrupting Event

<div className = "image-scaled">

![](../img/%20message_catch_non_interrupting.png#center)

</div>

A Non-Interrupting Message Catch Boundary Event also listens for messages while the associated task is being performed. However, in this case, the task is not immediately finished when messages are received. The event captures the messages, allowing the task to continue its execution. Multiple non-interrupting events can be received while the task is still active, and the task will continue until its completion.


## Configuring a Message Catch Interrupting/Non-Interrupting Event

#### General config

* **Correlate with throwing events** - the dropdown contains all throw events from the process definitions accessible to the user

:::info
It is used to establish the correlation between the catch event and the corresponding throw event.
By selecting the appropriate throw event, the catch event will be triggered when a message is thrown from that event.
:::

* **Correlation key** - is a process key that uniquely identifies the instance to which the message is sent

:::info
Correlation key serves as a means to correlate the incoming message with the specific process instance it belongs to.
When a message is received with a matching correlation key, the catch event will be triggered.
:::

* **Receive data (process key)** - the catch event can receive data associated with the message and store it in a process variable with the specified process key

:::info
This data can then be used within the process instance for further processing or decision-making.
:::
