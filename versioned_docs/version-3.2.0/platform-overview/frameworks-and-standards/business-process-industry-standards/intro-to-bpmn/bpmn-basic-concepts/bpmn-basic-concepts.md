# BPMN 2.0 basic concepts

Let's get into a bit more details on the main types of BPMN process elements.

## BPMN 2.0 basic concepts

### Events

Events are **signals that something happens** – this includes the start and end of a process as well as any interaction with the process’ environment.

There are 3 types of events:

* Start events
* End events
* Intermediate events

### Start and End events

**Start & End events**

| Start Event Icon                                                                 | End Event Icon                                                                 |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| ![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.2/event_start.png#center) | ![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.2/event_end.png#center) |
| Event that triggers the process                                                  | Event that defines the state that terminates the process                       |

### Intermediate events

#### **Message events**

* Represents incoming or outgoing messages from external parties - information, email, bank transfer
* Receive Message Event - incoming message occurring during the process flow, somewhere between start and end
* Send Message Event - outgoing message

| Send Message Event Icon                                                           | Receive Message Event Icon                                                           |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| ![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.2/message_send.png#center) | ![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.2/message_receive.png#center) |
| Outgoing message                                                                  | Incoming message                                                                     |

### Activities

**Task**

* It is an atomic activity within a process flow. You create a task when the activity cannot be broken down to a finer level of detail. A task can only belong to one lane.

| User task                                                                      | Service task                                                                                                |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| ![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.2/user_task.png#center) | ![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.2/service_task.png#center)                           |
| A task that requires the human to perform an action                            | A task that uses a Web service, an automated application, or other kinds of service in completing the task. |

**Send Task**

* Represents a task that sends a Message to another lane or pool. The Task is completed once the Message has been sent.

#### Receive Task

* Indicates that the process has to wait for a message to arrive in order to continue. The Task is completed once the message has received.

#### User Task

* Is a Task that is performed without the aid of any business process execution engine or any application. It is performed when the user performs a certain action in the application.

#### Service Task

* Is executed by a business process engine. The task defines a script that the engine can interpret. When the task begin, the engine will execute the script. The Task will be completed when the script is completed. It also provides a mechanism for a process to run a business rule on the process data.

### BPMN Sub-Processes

In BPMN, a sub-process is a compound activity that represents a collection of other tasks and sub-processes. Generally, we create BPMN diagrams to communicate processes with others. To facilitate effective communications, we really do not want to make a business process diagram too complex. By using sub-processes, you can split a complex process into multiple levels, which allows you to focus on a particular area in a single process diagram.

### Gateways

Gateways allow controlling as well as merge and split the process flow.

#### Exclusive gateways

In business processes, you typically need to make choices — **business decisions**. The most common type of decision is choosing **either/or**. Exclusive Gateways limit the possible outcome of a decision to a single path, and circumstances choose which one to follow.

#### Parallel gateways

In many cases, you want to split up the flow within your business process. For example the sales and risk departments may examine a new mortgage application at the same time. This reduces the total cycle time for a case. To express parallel flow in BPMN, you use a **parallel gateway**.

| Exclusive gateway (XOR)                                                                | Parallel gateway (AND)                                                                 |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| ![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.2/gateway_exclusive.png#center) | ![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.2/gateway_exclusive.png#center) |
| <ul><li>Defines a decision point</li></ul>                                             | <ul><li>No decision-making; </li><li>all outgoing branches are activated</li></ul>     |

**Closing gateway**

* Closes gateways by connecting branches with no logic involved
* Symbol used depends on the initial gateway
* Parallel gateways - waits for all input tokens and merges all into one single token
* Inclusive gateways
  * Waits for all active inputs
  * Is informed about all preceding token flows - knows the path selected and are expecting the token from these