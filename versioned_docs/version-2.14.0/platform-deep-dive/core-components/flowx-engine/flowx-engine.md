---
sidebar_position: 1
---

# FLOWX.AI Engine

The engine is the core of the platform, it is the service that runs instances of the process definitions, generates UI, communicates with the frontend and also with custom integrations and plugins. It keeps track of all currently running process instances and makes sure the process flows run correctly.

## A high-level overview

![](../../img/image%20(20).png)

## Orchestration

Creating and interacting with process instances is pretty straightforward, as most of the interaction happens automatically and is handled by the engine.

The only points that need used interaction are starting the process and executing user tasks on it (for example when a user fills in a form on the screen and saves the results).

### REST API

The process can be started by making an API call. Certain parameters needed by the process can be sent on the request body.

Some special cases for stating process instances are:

* starting a process instance from another instance and inhering some data from the first one to the second
* a process can have multiple start nodes, in which case, a start condition must be set when making the start process call

<details>
<summary><span class="postcall"><b>POST</b></span><b> ENGINE_URL/api/process/PROCESS_DEFINITION_NAME/start</b></summary>

**Start process** - starts a new process instance for the requested process definition name

**Parameters**

**Path**

`PROCESS_DEFINITION_NAME` (string) - the name of the process definition to instantiate

**Body** (object) - a JSON object with relevant process data

**Responses**

200 - returns all the relevant process instance data

</details>


<details>
<summary><span class="postcall"><b>POST</b></span> <b>ENGINE_URL/api/process/PROCESS_DEFINITION_NAME/start/inheritFrom/RELATED_PROCESS_INSTANCE_UUID</b></summary>

**Start process and inherit values from previous process** - start a new process instance which inherits some values from a previous process

**Parameters**

**Path**

`RELATED_PEROCESS_INSTANCE_UUID` (string) - the name of the process definition to instantiate

`PROCESS_DEFINITION_NAME` (string) - the name of the process definition to be started


**Body** 

`paramsToInherit` (string) - a map with info regarding which values to copy from the related process instance

**Responses**

200 

</details>

The `paramsToInherit` map should hold the needed values on one the following keys, depending on the desired outcome:

* `paramsToCopy` - this is used to pick only a subset of parameters to be inherited from the parent process; it holds the list of key names that will be inherited from the parent parameters
* `withoutParams` - this is used in case we need to remove some parameter values from the parent process before inheriting them; it holds the list of key names that will be removed from the parent parameters

If none of these keys have values, all the parameter values from the parent process will be inherited by the new process.


<details>
<summary><span class="getcall"><b>GET</b></span> <b>ENGINE_URL/api/process/PROCESS_INSTANCE_ID/status</b></summary>

**Process status** - returns the complete data about the requested process instance

**Parameters**

**Path**

`PROCESS_INSTANCE_ID` (string) - the name of the process definition to instantiate

**Responses**

200 - returns all the info related to the requested process instance

</details>


<details>
<summary><span class="postcall"><b>POST</b></span> <b>ENGINE_URL/api/process/PROCESS_INSTANCE_ID/token/TOKEN_INSTANCE_ID/action/ACTION_NAME/execute</b></summary>

**Execute action** - runs an action on a process instance

**Parameters**

**Path**

`ACTION_NAME` (string) - the name of the action to run

`TOKEN_INSTANCE_ID` (integer) - the token instance ID

`PROCESS_INSTANCE_ID` (integer) - the process instance ID

**Responses**

200 

</details>


<details>
<summary><span class="postcall"><b>POST</b></span> <b>ENGINE_URL/api/process/PROCESS_INSTANCE_ID/token/TOKEN_INSTANCE_ID/action/ACTION_NAME/upload</b></summary>

**File upload** - runs an action to upload file to the process instance

**Parameters**

**Path**

`ACTION_NAME` (string) - the name of the action to run

`TOKEN_INSTANCE_ID` (integer) - the token instance ID

`PROCESS_INSTANCE_ID` (integer) - the process instance ID

**Responses**

200 

</details>

[FLOWX.AI Engine setup guide](../../platform-setup-guide/flowx-engine-setup-guide)

## Triggering or skipping nodes on a process based on Flow Names

There might be cases when you want to include or exclude process nodes based on some information that is available at start. For example, in case of a bank onboarding process, you might want a few extra nodes in the process in case the person trying to onboard is a minor.

For these cases, we have added the possibility of defining flow names. For each process node, we can choose to set if they are only available in certain cases. In the example above, we will need a flow name, let's call it _enroll\_minor_. And we'll have to add this to the extra nodes.

When starting a process, in case a value is set on the _flowName_ key in the values map, it will be used in order to decide which nodes to be included in a certain process instance. This means that if an adult starts the bank onboarding process, no extra key will be added when starting the process, so the extra nodes that have the _enroll\_minor_ flow name set will not be included. Those nodes will only be included in case a minor person starts an onboarding process.

:::info
If no _flowName_ value is set on a node, this means the node will be included in all possible flows.
:::

A node could also be a part of multiple flow names.

## Advancing controller

The process engine needs the advancing controller, a support service, to orchestrate advancing more efficiently with equal distribution and redistribution of load during scale-up and scale-down. 

Advancing controller microservice uses Postgres triggers in the database configuration.

:::info
A Postgres trigger is a function called automatically whenever an event such as an insert, update, or deletion occurs.
:::

:::info
If the process engine is up and running, make sure the advancing microservice is up as well. 
:::


Check out the section below for further information on how to set up the microservice:

[Advancing controller setup guide](../../../platform-setup-guides/flowx-engine-setup-guide/advancing-controller-setup-guide.md)