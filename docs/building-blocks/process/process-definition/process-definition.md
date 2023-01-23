---
sidebar_position: 1
--- 

# Process definition

The core of the platform is the process definition, which is the blueprint of the business process made up of [nodes](../../node) that are linked by sequences.

![](../../../platform-deep-dive/img/process_definitions_new.png)

## Process designer

When a process definition is displayed, the name contains the following:

* Process definition name 
* Version number
* State

We have designed FLOWX.AI components to closely resemble their BPMN counterparts for ease of use. In the following sections, we will provide more details on how to use the process designer.

![](../img/process_def.png)

Check the following section for more details about nodes and how to use them:

[Node](../../node/node.md)

Once a process is defined and set as published on the platform, it can be executed, monitored, and optimized. When a business process is started, a new instance of the definition is created.

[Process instance](../active-process/process-instance/process-instance.md)

[Failed process start](../active-process/failed-process-start.md)

## History

In the **History** tab, you will find a record of all the modifications and events that have occurred in the process.

* **Versions** - provides information on who edited the process, when it was modified, and the version number and status
* **Audit log** - provides a detailed record of events and changes

![](../img/process_audit.gif)

### Versions

In the **Versions** tab you will find the following details:

* Last edited on - the last time when the process was modified
* Last edited by - the last person who modified a process
* Version - version number
* Status - can be either **Published** or **Draft** 

:::info HINT
❗️Published processes cannot be modified (they must be deprecated to be set as **Draft** before editing them).
:::

* View process - clicking on the eye icon will redirect you to the process definition 

### Audit log

In the **Audit log** tab you will find the following items:

* Timestamp 
* User 
* Subject 
* Event 
* Subject Identifier 
* Version
* Status 

:::info
Some items in the Audit log are filterable, making it easy to track changes in the process.
:::

[Audit](../../../platform-deep-dive/core-components/core-extensions/audit.md)

## Data model

In the Data Model, you can add new key-pair values, which enables you to use shortcuts when adding new keys using the UI Designer, without having to switch back and forth between menus.

![](../../img/data_model.png)

### Attributes type

![](../../../platform-deep-dive/img/add_new_data_model.png)

The Data Model supports the following attribute types:

* STRING
* NUMBER
* BOOLEAN
* OBJECT
* ARRAY
* ENUM

:::info

When you export or import a [**process definition**](process-definition.md), the data model will be included.
:::

### Sensitive data

To protect your data and your customer's data, you can hide data that could be visible in the process details or in the browser's console. You can now also secret data for a specific key.

![](../img/process_sensitive_data.png)

### Reporting

The **Use in Reporting** tag is used for keys that will be used further in the reporting plugin.

## Settings

### General

In the General settings, you can edit the process definition name, include the process in reporting, set general data, and configure expiry time using Cron Expressions and ISO 8601 formatting.

* **Process definition name** - edit process definition name
* **Use process in reporting** - if switched on, the process will be included in reporting
* **General data** - data that you can set and receive on a response
* **Expiry time** - a user can set up a `expiryTime` function on a process, for example, a delay of 30s will be set up like: `30 16 11 4 7 1`

For more information about **Cron Expressions** and **ISO 8601** formatting, check the following section:

[Timer Expressions](../../../platform-overview/frameworks-and-standards/timer-expressions.md)

![](../../../platform-deep-dive/img/process_settings.png)

### Swimlanes

Swimlanes provide a way of grouping process nodes by process participants. Using swimlanes, you can ensure that only certain user roles have access to certain process nodes. 

![](../../img/process_swimlanes.png)

### Permissions

After defining roles in the identity provider solution, they will be available to be used in the process definition settings panel for configuring swimlane access. 

When you create a new swimlane, it comes with two default permissions assigned based on a specific role: execute and self-assign. Other permissions can be added manually, depending on the needs of the user.

![](../../img/process_permissions.png)


[Configuring access rights for processes](../../../platform-deep-dive/platform-setup-guide/flowx-engine-setup-guide/configuring-access-roles-for-processes.md)

### Task management

The Task Management plugin offers a business-oriented view of the process you defined in the Designer and allows for interactions at the assignment level. It also includes a generic parameter pointing to the application URL where the Flowx process is loaded and uses process keys to search data stored in the process.

![](../img/process_task_mngmnt.png)

