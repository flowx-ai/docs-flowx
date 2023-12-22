# Understanding BPMN Basic Concepts

Let's delve into the fundamental elements of BPMN processes.


## Events

Events are pivotal signals that signify occurrences within a process, encompassing its initiation, conclusion, and interactions with the environment. There are three event types:

### Start and End events


| Start Event                                                                                                                                                                                              | End Event                                                                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Start Event](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-overview/frameworks-and-standards/business-process-industry-standards/intro-to-bpmn/bpmn-basic-concepts/event_start.png#center) | ![End Event](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-overview/frameworks-and-standards/business-process-industry-standards/intro-to-bpmn/bpmn-basic-concepts/event_end.png#center) |
| Triggers the process                                                                                                                                                                                     | Concludes the process                                                                                                                                                                                |                                                                                                                          

### Intermediate events

#### Send and Receive Tasks

- **Send Task**: Sends a message to another lane or pool, completing the task once the message is sent.
- **Receive Task**: Indicates a wait for a message to arrive before continuing the process.

These events involve incoming or outgoing messages from external sources such as information, emails, or bank transfers. They include:

- Receive Message Event: An incoming message occurring within the process flow.
- Send Message Event: An outgoing message.


| Send Message Task Event                                                                | Receive Message Task                                                                      |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| ![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/send_message_task.png#center) | ![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/receive_message_task.png#center) |
| Outgoing message                                                                       | Incoming message                                                                          |


### Activities

**Tasks** are individual actions within a process flow. They come in various types:

#### User and Service Tasks

| User Task                                                                                                                                                                                            | Service Task                                                                                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![User Task](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-overview/frameworks-and-standards/business-process-industry-standards/intro-to-bpmn/bpmn-basic-concepts/user_task.png#center) | ![Service Task](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-overview/frameworks-and-standards/business-process-industry-standards/intro-to-bpmn/bpmn-basic-concepts/service_task.png#center) |
| Requires human action                                                                                                                                                                                | Utilizes a web service or automated application                                                                                                                                                            |


#### User Task

* is a Task that is performed without the aid of any business process execution engine or any application. It is performed when the user performs a certain action in the application.

#### Service Task

* is executed by a business process engine. The task defines a script that the [**process engine**](../../../../terms/flowxai-process-engine) can interpret. When the task begin, the engine will execute the script. The Task will be completed when the script is completed. It also provides a mechanism for a process to run a [**business rule**](../../../../terms/business-rules) on the process data.

### BPMN Subprocesses

Subprocesses are compound activities that encapsulate multiple tasks and subprocesses. These allow breaking down complex processes into manageable levels within a single diagram, aiding communication.

### Gateways

Gateways control, merge, and split process flow:

| Exclusive Gateway | Parallel Gateway |
| ----------------- | ---------------- |
| ![Exclusive Gateway](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-overview/frameworks-and-standards/business-process-industry-standards/gateway_exclusive.png#center) | ![Parallel Gateway](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-overview/frameworks-and-standards/business-process-industry-standards/gateway_parallel.png#center) |
| Decisive path selection | Simultaneous activation of all branches |


#### Exclusive Gateways

In business processes, you typically need to make choices — **business decisions**. The most common type of decision is choosing **either/or**. Exclusive Gateways limit the possible outcome of a decision to a single path, and circumstances choose which one to follow.

#### Parallel Gateways

In various scenarios, dividing the flow within your business process proves beneficial. For instance, simultaneous assessment of a new mortgage application by both the sales and risk departments reduces the overall cycle time for a case. To denote parallel flow in BPMN, the **parallel gateway** is employed.

**Key Attributes of Parallel Gateways:**

- **Branch Connection**: Closes gateways by linking branches without specific logic involved.
- **Symbol Variation**: The symbol used varies based on the initial gateway.
- **Behavior**:
  - **Parallel Gateways**: Awaits all input tokens and consolidates them into a single token.
  - **Inclusive Gateways**:
    - Waits for all active inputs.
    - Gathers information about preceding token flows, acknowledging the chosen path and expecting the token from these paths.
