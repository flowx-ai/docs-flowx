# Message events

Message events serve as a means to incorporate messaging capabilities into business process modeling. These events are specifically designed to capture the interaction between different process participants by referencing messages. 

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/message_events_new.png)

By leveraging message events, processes can pause their execution until the expected messages are received, enabling effective coordination and communication between various system components.

FLOWX.AI works with the following message events nodes:

* [**Message catch start event**](message-catch-start-event.md) 
* [**Message throw intermediate event**](message-throw-intermediate-event.md)
* [**Message catch intermediate event**](message-catch-intermediate-event.md)
* [**Message catch boundary event**](message-catch-boundary-event.md)


### Message catch boundary event

This type of event can be triggered at any time while the associated task is being performed.
For an interrupting event, when the message is received, the user task is finished, and the token advances in the process flow.
For a non-interrupting event, the user task to which the event is attached is not finished immediately when messages are received. Multiple non-interrupting events can be received while the token is still active in the user task.

[Message Catch Boundary Event](message-catch-boundary-event.md)


### Message events correlation

Messages are not sent directly to process instances. Instead, message correlation is achieved through message subscriptions, which consist of the message name and the correlation key (also referred to as the correlation value).

:::info
A correlation key is a key that can have the same value across multiple instances, and it is used to match instances based on their shared value. It is not important what the attribute's name is (even though we map based on this attribute), but rather the value itself when performing the matching between instances.

For example, in an onboarding process for a user, you hold a unique personal identification number (SSN), and someone else needs a portion of your process, specifically the value of your input (SSN).
:::

The communication works as follows: you receive a message on a Kafka topic - `${kafka.topic.naming.prefix}.core.message.event.process${kafka.topic.naming.suffix}`. The engine listens here and writes the response.

### Message events configuration

* `attachedTo`: a property that applies to boundary events
* `messageName`: a unique name at the database level, should be the same for throw and catch events
* `correlationKey`: a process variable used to uniquely identify the instance to which the message is sent
* `data`: allows defining the JSON message body mapping as output and input

#### Data example

```json
{
	"document":{
			"documentId": "${document.id}",
			"documentUrl": "${document.url}"
	}
}
```


