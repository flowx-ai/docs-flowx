---
sidebar_position: 3
---

# Converting documents to different formats

:::caution
Currently, the supported conversion method is from **PDF** to **JPEG**.
:::

## Sending the request

To create a process that converts a document from PDF to JPEG format, follow these steps:

1. Create a process that includes a [**Kafka send event**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-send-task-node) node and a [**Kafka receive event**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-receive-task-node) node. The **send node** is used to send the conversion request, and the **receive node** is used to receive the reply.
2. Configure the first node (**Kafka send event**) by adding a **Kafka send action**. Here is an example:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/pdf_to_jpeg.png)

3. Specify the [**Kafka topic**](../../../plugins-setup-guide/documents-plugin-setup/documents-plugin-setup.md#kafka-configuration) where you want to send the conversion request:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/doc_kafka_topic.png)

4. Fill in the body of the message request:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/doc_message_body.png)

* `fileId`: The file ID that will be converted 
* `to`: The file extension to convert to (in this case, "jpeg").

:::info
You can set the Kafka topic names by overwriting the following environment variables during deployment:

* `KAFKA_TOPIC_FILE_CONVERT_IN` - default value: `ai.flowx.in.qa.document.convert.v1` - the topic that listens for conversion requests from the engine
* `KAFKA_TOPIC_FILE_CONVERT_OUT` - default value: `ai.flowx.updates.qa.document.convert.v1` - the topic on which the engine expects the reply

The examples provided above are extracted from an internal testing environment. When setting topics for other environments, use the pattern `ai.flowx.updates.{{environment}}.document.convert.v1`.
:::

:::caution
Make sure to use an outgoing topic name for the reply that matches the pattern configured in the [**Engine**](../../../../../terms/flowxai-process-engine), as it listens for messages on topics with specific names.
:::

## Receiving the reply

:::info
You can view the response by accessing the **Audit log** menu.
:::

The response will be sent to the outgoing Kafka topic (defined on the Kafka receive event node) and can be accessed as follows:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/convert_updates.png)

Values expected in the reply body:

* **customId**: The client ID.
* **fileId**: The file ID.
* **documentType**: The document type.
* **documentLabel**: The document label (if available).
* **minioPath**: The path where the converted file is saved. It represents the location of the file in the storage system, whether it's a MinIO path or an S3 path, depending on the specific storage solution.
* **downloadPath**: The download path for the converted file.
* **noOfPages**: The number of pages in the converted file (if available).
* **error**: Any error message in case of an error during the conversion process.



![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/document_convert_pdf.png)

Response:

```json
{
  "customId": "1234_727705",
  "fileId": 4152,
  "documentType": "BULK",
  "documentLabel": null,
  "minioPath": "qualitance-dev-paperflow-qa-process-id-727705/1234_727705/4152_BULK.jpg",
  "downloadPath": "internal/files/4152/download",
  "noOfPages": null,
  "error": null
}
```

Please note that the actual values in the response will depend on the specific conversion request and the document being converted.