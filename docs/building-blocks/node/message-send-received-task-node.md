---
sidebar_position: 2
---
# Send Message/Receive Message task nodes

**Send Message Task** and **Receive Message Task** [**nodes**](../../terms/flowx-node) are used for managing interactions between running processes and external systems.

## Send Message Task

The Send Message Task node is dedicated to configuring and dispatching messages to external systems.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/send_message_task.png#center)

### Configuring a Send Message Task node

Node configuration involves accessing the **Node Config** tab, which provides various options for customizing the message send task node:

#### General Config

Under General Config, key properties include:

- **Node name** - the designated identifier for the node
- **Can Go Back** - enabling this option allows users to backtrack to this step after completion

:::info
Setting `canGoBack` to false makes subsequent steps inaccessible upon reaching this point.
:::

- [**Stage**](../../platform-deep-dive/plugins/custom-plugins/task-management/using-stages.md) - assigning a stage to the node

![General Config](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/message_send_task_action_new.png)

To configure a message send task node:

1. Access the [**Process Designer**](../../terms/flowx-process-designer) and begin setting up a process.
2. Incorporate a **Send Message Task** node.
3. Select the node, access its configuration.
4. Within the **Actions** tab, add an [**action**](../../terms/flowx-actions) of type **Kafka Send**.
5. :exclamation: Fill in action-specific parameters depending on the chosen action type.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/message_send_node_new.gif)

Multiple options exist for this action type, adjustable via the FLOWX.AI Designer. Utilize the [**Actions**](../../terms/flowx-actions) tab at the node level for configuration, offering:

- [Action Edit](#action-edit)
- [Parameters](#parameters)

#### Action Edit

- **Name** - internally used for distinguishing between different [actions](../actions/actions.md) within the process. Establish a clear naming convention for easy identification.
- **Order** - sets the running order for multiple actions on the same node.
- **Timer expression** - facilitates a delay if necessary, using [ISO 8601 duration format](./timer-events/timer-expressions.md#iso-8601) (e.g., `PT30S` for a 30-second delay).
- **Action type** - designate as **Kafka Send Action** for sending messages to external systems.
- **Trigger type** (Automatic/Manual) - typically, Kafka Send Actions are automatically triggered when the process reaches this step.
- **Required type** (Mandatory/Optional) - **automatic** actions are typically set as **mandatory**. Manual actions can be either mandatory or optional.
- **Repeatable** - allows triggering the action multiple times if required.
- **Autorun Children** - when activated, child actions (mandatory and automatic) execute immediately after the parent action concludes.

![Action Edit](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/node/message_send_action_edit.png)

#### Parameters

Parameters can be added via the **Custom** option or by importing pre-defined parameters from an integration.

:::info
For detailed information on **Integrations management**, refer to [<u>**this link**</u>](../../platform-deep-dive/core-components/core-extensions/integration-management).
:::

- **Topics** - specifies the Kafka topics listened to by the external system for requests.
- **Message** - contains the message payload to be dispatched.
- **Advanced configuration (headers)** - represents a JSON value sent within the Kafka message headers.

![Parameters](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/message_send_parameters.png)

### Example of a Send Message Task

To send a message to a CRM integration for a local database search request:

#### Action Edit

- **Name** - Choose a descriptive name, e.g., `sendRequestToSearchClient`.
- **Order** - 1
- **Timer Expression** - left empty for immediate triggering upon node traversal.
- **Action type** - Kafka Send Action
- **Trigger type** - _Automatic_ for automatic triggering
- **Required type** - _Mandatory_ to ensure execution before advancing to the next node
- **Repeatable** - false, running once is sufficient


#### **Parameters**

In this example we utilized the **Custom** method.

##### Custom

- **Topics** - `ai.flowx.in.crm.search.v1` - the target Kafka topic for CRM requests
- **Message** - `{ "clientType": "${application.client.clientType}", "personalNumber": "${personalNumber.client.personalNumber}" }` - includes two keys, `clientType` and `personalNumber`, fetching values from the process instance
- **Headers** - `{"processInstanceId": ${processInstanceId}}`


![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/node/message_send_param1.png)

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/node/message_send_param2.png)

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/node/message_send_param3.png)

## Receive Message Task

This node type is used when awaiting a response from an external system.

![Receive Message Task](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/receive_message_task.png#center)

The response received from the external system gets stored in the process instance values, allocated to a specified key. To defer processing the message, a timeout can be established using the [ISO 8601](./timer-events/timer-expressions.md#iso-8601) format.

Consider a scenario with a CRM microservice awaiting requests to search for a user in a database. It responds upon listening for the configured topic.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/message_receive_example_new.png)

### Configuring a Receive Message Task node

Configure the following values for this node:

- **Topic name** - the topic name where the [process engine](../../platform-deep-dive/core-components/flowx-engine.md) listens for responses. Ensure alignment with the platform's topic naming rule for the engine to process it: `ai.flowx.out.crm.search.v1`

:::warning
Define a naming pattern on the process engine to utilize the specified topics. Events starting with the configured pattern will be consumed by the Engine. For instance, `KAFKA_TOPIC_PATTERN` is the pattern the Engine uses to listen for incoming Kafka events.
:::

- **Key Name** - stores the received result from the external system. If the key exists in the process values, it will be overwritten: `crmResponse`

For further Kafka configuration details, refer [here](../../platform-setup-guides/flowx-engine-setup-guide/flowx-engine-setup-guide.md#configuring-kafka).

![Example of a message receive task for a CRM integration](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/message_receive_parameters.png)

#### From integration

Upon defining an integration (within [Integration management](../../platform-deep-dive/core-components/core-extensions/integration-management)), compatible nodes can utilize the pre-defined integrations.

- **Topics** - topics specified in your integration 
- **Message** - utilizes the **Message data model** from your integration
- **Headers** - all integrations include `processInstanceId` as a default header parameter; include other relevant parameters

![Integration Example](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/node/message_send_from_integr.gif)
