# Starting a process

Getting started with FLOWX.ai opens up a range of possibilities for enhancing processes and workflows. From automation to data-driven decision-making, there are several straightforward ways to begin using this platform effectively. Let's explore these options you have when starting a process.

## Kafka event

To create a Kafka Send Action to start a process:

1. Launch FLOWX Designer and navigate to the Processes tab, then choose Definitions.
2. Either select an existing process definition or create a new one.
3. Include a Message Event Send node in your workflow.
4. Attach a Kafka Send action to this node.
5. Specify the topic corresponding to the KAFKA_TOPIC_PROCESS_START_IN environment variable defined in your process-engine deployment.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/topic_address.png)

:::info
If you're uncertain about the topic, you can navigate to **Platform status → Flowx Components → process-engine-mngt -> kafkaTopicHealthCheckIndicator → details → configuration → topic → process → start_in** to verify the specific topic:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/topic_start_process.png)

:::

6. You must add the name of the process you would like to start with this action in the body message as it follows:

```json
{"processName": "your_process_name"}
```

7. Expand advanced configuration, you will see that a custom header is always set by default to `{"processInstanceId": ${processInstanceId}}`
8. Also add your JWT key in the headers:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/jwt_start.png)

In the headers section you will have something like this:

```json
{"processInstanceId": ${processInstanceId}, "jwt": "your_jwt"}
```



## Timer start event

## Message catch start event

## Task management - via Hooks

## Rest API