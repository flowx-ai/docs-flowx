---
sidebar_position: 2
---
# Message send / message received task node

**Message send task** and **message received** nodes are used to handle the interaction between a running process and any external systems.

## Message send task

This node is used to configure messages that should be sent to external systems.

![Message send task](./img/message_send_task.png#center)

### Configuring a message send task node

Node configuration is done by accessing the **Node Config** tab. You have the following configuration options for a message send task node**:**

#### General Config

Inside the General Config you have the following properties:

* **Node name** - the name of the node
* **Can Go Back** -  switching this option to true will allow users to return to this step after completing it

:::info
When encountering a step with `canGoBack` switched to false, all steps found behind it will become unavailable.
:::

* [**Swimlane**](../../platform-deep-dive/user-roles-management/swimlanes.md) - choose a swimlane (if there are multiple swimlanes on the process) to make sure only certain user roles have access only for certain process nodes - if there are no multiple swimlanes, the value is **Default**
* [**Stage** ](../../platform-deep-dive/plugins/custom-plugins/task-management/using-stages.md) assign a stage to the node

![General Config](./img/message_send_task_action.png)

To configure a message send task node, we first need to add a new node and then configure an action (**Kafka Send Action** type):

1. Open **Process Designer** and start configuring a process.
2. Add a **message send task** node.
3. Select the **message send task** node and open **node configuration**.
4. Add an **action**, the type of the action set to **Kafka send**.
5. :exclamation:A few action parameters will need to be filled in depending on the selected action type.

![](./img/message_send_node.gif)

Multiple options are available for this type of action and can be configured via the FLOWX Designer:

Multiple options are available for this type of action and can be configured via the FLOWX Designer. To configure and [add an action to a node](../../flowx-designer/managing-a-process-flow/adding-an-action-to-a-node.md), use the **Actions** tab at the node level, which has the following configuration options:

* [Action Edit](#action-edit)
* [Back in steps (for Manual actions)](#back-in-steps)
* [Parameters](#parameters)
* [Data to send (for Manual actions)](#data-to-send)

#### Action Edit

* **Name** - used internally to make a distinction between different [actions](../actions.md) on nodes in the process. We recommend defining an action naming standard to be able to easily find the process actions
* **Order** - if multiple actions are defined on the same node, the running order should be set using this option
* **Timer expression** - it can be used if a delay is required on that action. The format used for this is [ISO 8601 duration format ](https://www.digi.com/resources/documentation/digidocs/90001437-13/reference/r\_iso\_8601\_duration\_format.htm)(for example, a delay of 30 seconds will be set up as `PT30S`)
* **Action type** - should be set to **Kafka Send Action** for actions used to send messages to external systems
* **Trigger type** (options are Automatic/Manual) - choose if this action should be triggered automatically (when the process flow reaches this step) or manually (triggered by the user); in most use cases, this will be set to automatic
* **Required type** (options are Mandatory/Optional) - automatic actions can only be defined as mandatory. Manual actions can be defined as mandatory or optional.
* **Repeatable** - should be checked if the action can be triggered multiple times
* **Autorun Children** - when this is switched on, the child actions (the ones defined as mandatory and automatic) will run immediately after the execution of the parent action is finalized

#### **Back in steps**

* **Allow BACK on this action** - back in process is a functionality that allows you to go back in a business process and redo a series of previous actions in the process. For more details, check [Moving a token backwards in a process](../../flowx-designer/managing-a-process-flow/moving-a-token-backwards-in-a-process.md) section

![Action Edit](./img/message_send_action_edit.png)

:::info
The values for these parameters could be set when defining the process or set at runtime, using some values from the process instance. If you want some values to be replaced at runtime, the Replace values checkbox should be checked.
:::

#### Data to send

* **Keys** - are used when data is sent from the frontend via an action to validate the data (you can find more information in the [User Task configuration](user-task-node/) section)

:::warning
**Data to send** option is configurable only when the action **trigger type** is **Manual**.
:::

![Parameters](./img/parameters_message_send.gif)

For more information about what Kafka is, check the following sections:

[Intro to Kafka](/docs/platform-overview/frameworks-and-standards/event-driven-architecture-frameworks/intro-to-kafka-concepts)

[Kafka documentation](https://kafka.apache.org/documentation/)

### Example of a message send event

Send a message to a CRM integration to request a search in the local database:

#### Action Edit

* **Name** - pick a name that makes it easy to figure out what this action does, for example, `sendRequestToSearchClient`
* **Order** - 1
* **Timer Expression** - this remains empty if we want to action to be triggered as soon as the token reaches this node
* **Action type** - Kafka Send Action
* **Trigger type** - _Automatic_ - to trigger this action automatically
* **Required type** - _Mandatory_ - to make sure this action will be run before advancing to the next node
* **Repeatable** - false, it only needs to run once

#### **Parameters**

* **Address** - `ai.flowx.in.crm.search.v1` the Kafka topic on which the CRM listens for requests
* **Message** -`{ "clientType": "${application.client.clientType}", "personalNumer": "${personalNumer.client.personalNumer}" }` - the message payload will have two keys, clientType and personalNumber, both with values from the process instance
* **Headers** - `{ "processInstanceId": ${processInstanceId}}`

![](./img/message_send_param1.png)

![](./img/message_send_param2.png)

![](./img/message_send_param3.png)

## Message receive task

This type of node is used when we need to wait for a reply from an external system.

![Message receive task](./img/message_receive_node.png#center)

The reply from the external system will be saved in the process instance values, on a specified key. If the message needs to be processed at a later time, a timeout can be set using the [ISO 8601](https://www.digi.com/resources/documentation/digidocs/90001437-13/reference/r\_iso\_8601\_duration\_format.htm) format.

For example, let's think about a CRM microservice that waits to receive requests to look for a user in a database. It will send back the response when a topic is configured to listen for the response.

![](./img/message_receive_example.png)

### Configuring a message receive task node

The values you need to configure for this node are the following:

* **Topic name** - the topic name where the [process engine](../../platform-deep-dive/core-components/flowx-engine.md) listens for the response (this should be added to the platform and match the topic naming rule for the engine to listen to it) - `ai.flowx.out.crm.search.v1`

:::warning
A naming pattern must be defined on the process engine to use the defined topics. It is important to know that all the events that start with a configured pattern will be consumed by the Engine. For example, `KAFKA_TOPIC_PATTERN` is the topic name pattern that the Engine listens to for incoming Kafka events.
:::

* **Key Name** - will hold the result received from the external system, if the key already exists in the process values, it will be overwritten - `crmResponse`

For more information about Kafka configuration, click [here](../../platform-deep-dive/platform-setup-guide/flowx-engine-setup-guide/flowx-engine-setup-guide.md#kafka-configuration).

![Example of a message receive task for a CRM integration](./img/message_receive_kafka.png)
