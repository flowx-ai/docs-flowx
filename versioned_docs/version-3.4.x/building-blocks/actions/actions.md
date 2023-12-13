---
sidebar_position: 3
---

# Actions

:::info
**What is it?** The activity that a node has to handle is defined using an [**action**](../../terms/flowx-actions). These can have various types, they can be used to specify the communication details for plugins or integrations.

**Why it is important?** Actions can be used to include [**business rules**](../../terms/business-rules) in a [**process**](../../terms/flowx-process), and also to send various data to be displayed in the front-end applications.
:::

The FLOWX.AI platform handles the following **types of actions**:

* [Business Rule](./business-rule-action)
* Save Data
* [Kafka Send](../node/message-send-received-task-node.md)
* [Send data to user interface](./send-data-to-user-interface.md)
* [Upload File](./upload-file-action)
* [Start Subprocess](./start-subprocess-action)
* [Append Params to Parent Process](./append-params-to-parent-process)

:::info
You can only define and add actions on the following types of [**nodes**](../../terms/flowx-node): [**Message send task**](../node/message-send-received-task-node.md#message-send-task), [**Task**](../node/task-node.md) and [**User task**](../node/user-task-node.md).
:::

### Action rules

Business rules can be attached to a node by using actions with [**action rules**](#action-rules) on them. These can be specified using [DMN rules](./business-rule-action/dmn-business-rule-action), MVEL expressions, or scripts written in JavaScript, Python, or Groovy.

[Supported scripts](../supported-scripts.md)

Each button on the user interface corresponds to a manual user action.

Actions can be:

* Manual or automatic
* They can be set as optional or mandatory, if not all mandatory actions are performed on the process node, the flow will not advance
* Actions can also be marked as one-time or repeatable

Some actions can be set to run immediately after another action is performed. In order to achieve this, we need to set the `parentName` field on the action to be used as a callback. The callback actions can be performed when a certain message is received by the Engine. In order for this to happen the `callbacksForAction` header needs to be set on the message. Callback actions can also be configured to run immediately after the parent action is run, by setting the `autoRunChildren` flag to true for the parent action.

[Business Rule Action](./business-rule-action)

### Action parameters

**Action params** are used to set extra values for actions. They are stored as key/value pairs. For example, we can set a topic to use for sending outgoing messages or the message format to be sent to the front-end.

The decision that needs to be defined on an exclusive gateway is defined using a **node rule**. Similar to action rules, these can be set using [DMN](../../platform-overview/frameworks-and-standards/business-process-industry-standards/intro-to-dmn.md) or [MVEL](../../platform-overview/frameworks-and-standards/business-process-industry-standards/intro-to-mvel.md).

There are two possible kinds of actions:

* business logic rules
* interactions with users

## Configuring actions

Actions have a few characteristics that need to be set:

* an **action** can be set as **manual** or **automatic**. Manual actions can be executed only through the REST API, this usually means they are triggered by the application user from the interface. Automatic actions are executed without any need for external triggers.
* manual actions can be either mandatory or optional. Automatic actions are all considered mandatory.
* all actions have an **order.** When there are more actions on a single node, the order needs to be set.
* **repeatable** - the actions that could be triggered more than once are marked accordingly
* the actions can have a parent/child hierarchy

For more information, check the following section:

[Adding an action to a node](../../flowx-designer/managing-a-process-flow/adding-an-action-to-a-node.md)

## Linking actions together

There are two ways actions could be linked together, so certain actions can be set to run immediately after others.

### Child actions

A parent action has a flag `autoRunChildren`, set to `false` by default. When this flag is set to `true`, the child actions (the ones defined as mandatory and automatic) will be run immediately after the execution of the parent action is finalized.

### Callback actions

Child actions can be marked as callbacks to be run after a reply from an external system is received. They will need to be set when defining the interaction with the external system (the [Kafka send action](../node/message-send-received-task-node.md#configuring-a-message-send-task-node)).

For example, a callback function might be used to handle a user's interaction with a web page, such as upload a file. When the user performs the action, the callback function is executed, allowing the web application to respond appropriately.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/callback1.png)

Child actions can be marked as callbacks to be run after a reply from an external system is received. They will need to be set when defining the interaction with the external system (the Kafka send action).

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/callback2.png)

#### Example

Callback actions are added in the **Advanced configuration** tab, in the **header** param - `callbacksForAction`.

```js
{"processInstanceId": ${processInstanceId}, "destinationId": "upload_file", "callbacksForAction": "upload_file"}
```

* `callbacksForAction` - the value of this key is a string that specifies a callback action associated with the "upload_file" destination ID. This is part of an event-driven system (Kafka send action) where this callback will be called once the "upload_file" action is completed.

## Scheduling actions

A useful feature for actions is having the ability to set them to run at a future time. Actions can be configured to be run after a period of time, starting from the moment the token triggered them to be executed.