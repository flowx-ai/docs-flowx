---
sidebar_position: 1
---

# Process instance

Once a process is defined and added on the platform, it can be executed, monitored and optimized. When a business process starts, we create an **instance** of the definition. 

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/proc_instance_progress.png)

Think of the process instance as if the process definition is the blueprint of a house and the instance is the house.

Each process instance holds its current state and business data related to it.

The engine takes care of going through the process steps defined and handles all the business logic on the process definition.

The **token** is used to describe the current position in the process. The token moves from one node to the next one based on the defined sequences between hem and the business rules defined on the exclusive gateways. In the case of parallel gateways, child tokens are created for each flow branch and they are merged back into the parent token once the parallel execution part ends.

**Kafka events** are used for all communication between various FLOWX.AI components such as the engine and the integrations and plugins. Each event type is associated with a **Kafka topic** to be able to keep track and orchestrate the multitude of messages sent on Kafka.

The engine is also responsible with updating the UI when some actions occur. This is done by sending messages via **sockets**.

## Process status

To check the status of your process or to debug/troubleshoot a failed process, follow the next steps:

1. Open **FLOWX.AI Designer**.
2. Go to **Processes → Active Process → Process instances**.
3. Click **Process status** button.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/process_status.png)

### Process status data

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/process_status_data.png)

* **Status** - status of the process instance
  * CREATED
  * STARTED
  * DISMISSED
  * EXPIRED
  * FINISHED
* **Process definition** - the name of the process
* **Active process instance** - process instance UUID (a copy action is also available)
* **Variables** - variables are displayed as an expanded JSON

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/process_variables.png)

* **Tokens** - a token represents a state within a process instance (it describes the current position in the process flow)

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/process_tokens.png)

:::info
For more information about token status details, [here](../../../token).
:::

* **Subprocesses** - :exclamation:displayed only if the current [process instance](process-instance.md) generated a [subprocess](../../subprocess.md) instance
* **Exceptions** - are errors that are letting you know where the process is blocked (they also allow you to access directly the node where the process is breaking so you can edit it); :exclamation:displayed only if exceptions were thrown on the process

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/process_exceptions.png)

:::info
For more information about **Exceptions**, check the following section:
:::

[Failed process start](../failed-process-start.md)

* **Audit Log** - display events registered for process instances, tokens, tasks and exceptions reverse chronologically by timestamp

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/process_status_audit.png)

[Audit](../../../../platform-deep-dive/core-components/core-extensions/audit)

Inside the breadcrumb menu (top-right corner):

* **Go to process definition** **button** - you can open the process right away and start editing it
* **Version** - version of the process definition
* **Started** - when the process instance started
* **Ended** - when the process instance ended

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/process_export_smth.png)

### Color coding

Inside the **Process status** view, some nodes are highlighted with different colors so you can easily debug in case of a process failure.

* **Green** - nodes highlighted with green mark the nodes passed by the [token](../../../token.md)
* **Red** - the node highlighted with red marks the node where the token is stuck (process failure)

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/color_coding.gif)

## Starting a new process instance

The new instances will be started by making a request to the [FLOWX.AI Engine](../../../../platform-deep-dive/core-components/flowx-engine). This will be handled by the web / mobile application that was created.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/process_instance_diagram.png)

To be able to start a new process instance, the current user needs to have the appropriate role/permissions:

[Configuring access roles for processes](../../../../platform-setup-guides/flowx-engine-setup-guide/configuring-access-roles-for-processes.md)

When starting a new process instance, we can also set it to [inherit some values from a previous process instance](../../../../platform-deep-dive/core-components/flowx-engine.md#orchestration)
## Troubleshooting possible errors

If everything was configured correctly, the new process instance is added in the database and visible in the UI.

### Possible errors

**`"Process definition not found."`** - there is no process definition set as published with the requested process definition name

**`"Start node for process definition not found."`** - the start node was not configured correctly

**`"Multiple start nodes found, but start condition not specified."`** - there were multiple start nodes defined but the start condition for choosing the start node was not set

**`"Some mandatory params are missing."`** - there were some parameters set as mandatory when configuring the start node, but they were not sent on the start request

**HTTP code `403 - Forbidden`** - the current user does not have the process access role for starting that process

**HTTP code `401 - Unauthorized`** - the current user is not logged in.