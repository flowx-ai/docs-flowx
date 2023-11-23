# Initiating processes

Entering the realm of FLOWX.AI unlocks a spectrum of possibilities for elevating processes and workflows. From automation to data-driven decision-making, several straightforward approaches pave the way for leveraging this platform efficiently. Let's delve into the ways to kickstart a process.

## Kafka event

To trigger a process using a Kafka Send Action:

1. Access FLOWX Designer and navigate to the Processes tab, then select Definitions.
2. Choose an existing process definition or create a new one.
3. Integrate a Message Event Send node into your workflow.
4. Attach a Kafka Send action to this node.
5. Define the topic corresponding to the `KAFKA_TOPIC_PROCESS_START_IN` environment variable from your process-engine deployment.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/topic_address.png)

:::info
For clarification on the topic, in FLOWX.AI Designer visit **Platform status → Flowx Components → process-engine-mngt -> kafkaTopicHealthCheckIndicator → details → configuration → topic → process → start_in**:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/topic_start_process.png)

:::

6. The body message must include the name of the process you intend to start with this action, structured as follows:

```json
{"processName": "your_process_name"}
```

7. Expand advanced configuration, you will see that a custom header is always set by default to `{"processInstanceId": ${processInstanceId}}`
8. Also include your JWT key in the headers:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/jwt_start.png)

The headers section should resemble this structure:

```json
{"processInstanceId": ${processInstanceId}, "jwt": "your_jwt"}
```

## Timer start event

To initiate a process using a Start Timer Event:

1. Open FLOWX Designer, head to the Processes tab, then select Definitions.
2. Opt for an existing process definition or create a new one.
3. Incorporate a Start Timer Event and configure it as required, specifying either a specific date or a cycle.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/start_timer_process.png)

:::caution
Starting a process through registered timers necessitates sending a process start message to Kafka, requiring a service account and authentication. For detailed guidance, refer to:

[**<u>Service Accounts</u>**](../../platform-setup-guides/access-management/configuring-an-iam-solution.md#scheduler-service-account)
:::

For deeper insights into the Start Timer Event, refer to the section below:

[Start Timer Event](../../building-blocks/node/timer-events/timer-start-event.md)

## Message catch start event

To initiate a process using a Message Catch Start Event, two processes are required. One utilizes a throw message event, while the other employs a start catch message event to initiate the process.

### Configuring the parent process

1. Access FLOWX Designer, proceed to the Processes tab, then select Definitions.
2. Opt for an existing process definition or create a new one.
3. Configure your process and integrate a Message Throw Intermediate event.
4. Add a task or a user task where process data bound to a correlation key is included (e.g., 'key1').

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/correlation_data.png)

5. Configure the node, considering message correlation.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/message_correlation.png)

:::info
Message correlation is vital and achieved through message subscriptions, involving the message name (must be identical for both throw and catch events) and the correlation key (also known as the correlation value).
:::

### Configuring the process with catch event

Now, we will configure the process that will be started with the start catch message event:

1. Follow the initial three steps from the previous section.
2. Integrate a Start Message Catch event node.
3. Configure the node:
    * Include the same message name for correlation as added in the throw message event (e.g., 'start_correlation').
    * In the Receive data tab, add the Process Key, which is the correlation key added in the throw event (e.g., 'key1').

Once both processes are configured, commence the parent process. At runtime, you'll notice the initiation of the second process:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/start_with_message_event.gif)

## Task management - via Hooks

To initiate a process using hooks, we must first create a hook and also two processes are required. One will be the parent process, while the other will be the process triggered by the hook.

### Creating a hook

Hooks allow you to extract stateful logic from a component, so it can be tested and reused independently.

1. Create a hook. To do this, access FLOWX Designer, proceed to the Plugins tab, then select Task Manager → Hooks.

:::info
Users with task management permissions can create hooks to trigger specific process instances, such as sending notifications when events occur.
:::


## Rest API