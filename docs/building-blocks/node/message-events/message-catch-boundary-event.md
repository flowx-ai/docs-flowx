# Message Catch Boundary Events

A Message Catch Boundary Event is a special event that can be attached to a user task in a process. It allows the process to listen for and capture specific messages during the execution of the associated user task. There are two types of Message Catch Boundary Events: 

* [Interrupting](#message-catch-interrupting-event)  
* [Non-Interrupting](#message-catch-non-interrupting-event)

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

