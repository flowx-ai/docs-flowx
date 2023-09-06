---
sidebar_position: 4
---

# Start Subprocess action

:::info
**What is it?** A **Start Subprocess action** is an action that allows you to start a subprocess from another (parent) process.

**Why is it important?**  Using [**subprocesses**](../process/subprocess.md) is a good way to split the complexity of your business flow into multiple, simple and reusable processes.
:::

## Configuring a Start Subprocess action

To use a process as a [subprocess](../process/subprocess.md), you must first create it. Once the subprocess is created, you can start it from another (parent) process. To do this, you will need to add a **Start Subprocess** action to a [**User task**](../node/task-node.md) node in the parent process or by using a [subprocess run node](../node/subprocess-run-node.md).

Here are the steps to start a subprocess from a parent process:

1. First, create a [process](../process/process.md) designed to be used as a [subprocess](../process/subprocess.md).
2. In the parent process, create a **User task** node where you want to start the subprocess created at step 1.
3. Add a **Start Subprocess** action to the Task Node.
4. Configure the **Start Subprocess** action and from the dropdown list choose the subprocess created at step 1.

By following these steps, you can start a subprocess from a parent process and control its execution based on your specific use case.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.1/process_subprocess.png)

The following properties must be configured for a **Start subprocess** action:

* [Action Edit](#action-edit)
* [Back in steps (for Manual actions)](#back-in-steps)
* [Parameters](#parameters)
* [Data to send (for Manual actions)](#data-to-send)

### Action Edit

* **Name** - used internally to make a distinction between different actions on nodes in the process. We recommend defining an action naming standard to be able to quickly find the process actions
* **Order** - if multiple actions are defined on the same node, the running order should be set using this option
* **Timer expression** - it can be used if a delay is required on that action. The format used for this is [ISO 8601 duration format ](https://www.w3.org/TR/NOTE-datetime)(for example, a delay of 30 seconds will be set up as `PT30S`)
* **Action type** - should be set to **Start Subprocess**
* **Trigger type** (options are Automatic/Manual) - choose if this action should be triggered automatically (when the process flow reaches this step) or manually (triggered by the user); in most use cases, this will be set to automatic
* **Required type** (options are Mandatory/Optional) - automatic actions can only be defined as mandatory. Manual actions can be defined as mandatory or optional.
* **Repeatable** - should be checked if the action can be triggered multiple times
* **Autorun Children** - when this is switched on, the child actions (the ones defined as mandatory and automatic) will run immediately after the execution of the parent action is finalized

### Back in steps

* **Allow BACK on this action** - back in process is a functionality that allows you to go back in a business process and redo a series of previous actions in the process. For more details, check [**Moving a token backwards in a process**](../../flowx-designer/managing-a-process-flow/moving-a-token-backwards-in-a-process.md) section.

### Parameters

* **Subprocess** - the name of the process that you want to start as a subprocess
* **Exclude from current state** - what fields do you want to exclude when copying the data from the parent process to the subprocess (by default all data fields are copied)
* **Copy from current state** - if a value is set here, it will overwrite the default behavior (of copying the whole data from the subprocess) with copying just the data that is specified (based on keys)

:::caution
When copying from the current state using a subprocess, it is mandatory to specify the `webSocketAddress` and `webSocketPath` as parameters. This ensures that the Engine can accurately transmit the relevant information to the frontend, enabling it to display the appropriate UI. 
:::

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.1/websocket_send.png)

* `webSocketAddress` - specifies the domain name or IP address where the WebSocket server is hosted
* `webSocketPath` - specifies the specific endpoint on the server where the WebSocket connection can be established

**Advanced configuration**

* **Show Target Process** - ID of the current process, to allow the subprocess to communicate with the parent process (which is the process where this action is configured)

### Data to send

* **Keys** - are used when data is sent from the frontend via an action to validate the data (you can find more information in the [**User Task configuration**](../node/user-task-node.md) section)

:::warning
**Data to send** option is configurable only when the action **trigger type** is **Manual**.
:::

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.1/subprocess_action_data.png)

## Example

Let's create a main process, in this process we will add a user task node that will represent a menu page. In this newly added node we will add multiple subprocess actions that will represent menu items. When you select a menu item, a subprocess will run representing that particular menu item.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.1/subprocess_menu.png)

To start a subprocess, we can, for example, create the following minimum configuration in a user task node (now we configure the process where we want to start a subprocess):

* **Action** - `menu_item_1` - used internally to make a distinction between different actions on nodes in the process. We recommend defining an action naming standard to be able to quickly find the process actions
* **Trigger type** - Manual; Optional
* **Repeatable** - yes
* **Subprocess** - `docs_menu_item_1` - the name of the process that you want to start as a subprocess

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.1/subprocess_example1.png)

* **Exclude from current state** - `test.price` - copy all the data from the parent, except the price data
* **Copy from current state** - leave this field empty in order to copy all the data (except the keys that are specified in the **Exclude from current state** field), if not, add the keys from which you wish to copy the data

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.1/subprocess_example2.png)

:::caution
When copying from the current state using a subprocess, it is mandatory to specify the `webSocketAddress` and `webSocketPath` as parameters. This ensures that the Engine can accurately transmit the relevant information to the frontend, enabling it to display the appropriate UI. 
:::

**Advanced configuration**

* **Target process (parentProcessInstanceId)** - `${processInstanceId}` - current process ID

#### Result

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.1/subprocess_example.gif)

