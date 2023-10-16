---
sidebar_position: 4
---

# Splitting a document

You can split a document into multiple parts using the Documents Plugin. This feature is useful, for example, when a user uploads a bulk scanned file that needs to be separated into separate files.

## Sending the request

To split a document, follow these steps:

1. Create a process and add a [**Kafka send event node**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-send-task-node) and a [**Kafka receive event node**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-receive-task-node). These nodes are used to send the request and receive the reply.
2. Configure the first node, Kafka send event node by adding a **Kafka send action**.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/kafka_split_action.png)

3. Specify the [**Kafka topic**](../../../plugins-setup-guide/documents-plugin-setup/documents-plugin-setup.md#kafka-configuration) to which you want to send the request.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/kafka_split_topic.png)

4. Fill in the body message request:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/split_doc_body.png)

* **fileId**: The ID of the file to be split.
* **parts**: A list containing information about the expected document parts.
  * **documentType**: The document type.
  * **customId**: The client ID.
  * **shouldOverride**: A boolean value (true or false) indicating whether to override an existing document if one with the same name already exists.
  * **pagesNo**: The pages that you want to separate from the document.

:::info
You can customize the Kafka topic names by overwriting the following environment variables during deployment:

`KAFKA_TOPIC_DOCUMENT_SPLIT_IN` - default value: `ai.flowx.in.qa.document.split.v1` - this is the topic that listens for the request from the engine

`KAFKA_TOPIC_DOCUMENT_SPLIT_OUT` - default value: `ai.flowx.updates.qa.document.split.v1` - this is the topic on which the engine expects the reply

The above examples of topics are extracted from an internal testing environment. When setting topics for other environments, follow this pattern: `ai.flowx.updates.{{environment}}.document.split.v1`.
:::

:::caution
The Engine listens for messages on topics with specific names. Make sure to use an outgoing topic name that matches the pattern configured in the Engine.
:::

## Receiving the reply

You can view the response by accessing the Audit log menu. The reply will be sent to the Kafka topic specified in the Kafka receive event node.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/split_updates.png)

The response body will contain the following values:

* **docs**: A list of documents.
  * **customId**: The client ID.
  * **fileId**: The ID of the file.
  * **documentType**: The document type.
  * **minioPath**: The storage path for the document.
  * **downloadPath**: The download path for the document.
  * **noOfPages**: The number of pages in the document.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/split_doc_reply.png)

Here's an example of the response JSON:

```json
{
  "docs": [
    {
      "customId": "1234_759769",
      "fileId": 4743,
      "documentType": "BULK",
      "documentLabel": null,
      "minioPath": "qualitance-dev-paperflow-qa-process-id-759770/1234_759769/4743_BULK.pdf",
      "downloadPath": "internal/files/4743/download",
      "noOfPages": 2,
      "error": null
    }
  ],
  "error": null
}
```