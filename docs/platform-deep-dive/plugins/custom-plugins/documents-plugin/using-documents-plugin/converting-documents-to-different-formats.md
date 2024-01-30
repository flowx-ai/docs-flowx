---
sidebar_position: 3
---

# Converting Files

:::caution
Currently, the supported conversion method is limited to transforming **PDF** files into **JPEG** format.
:::

This guide provides step-by-step instructions on how to convert an uploaded file (utilizing the provided example) from PDF to JPEG.

## Prerequisites

Before initiating the conversion process, it is essential to identify the file in the storage solution using its unique ID. This ensures that the conversion is performed on an already uploaded file.

You have two options to obtain the file ID:

1. Extract the file ID from a [**Response Message**](./uploading-a-new-document.md#response-message-example-1) of an upload file request. For more details, refer to the [**upload process documentation**](uploading-a-new-document.md).

2. Extract the file ID from a [**Response Message**](./generate-docs-based-on-templates/generating-from-html-templates.md#receiving-the-document-generation-reply) of a generate from template request. For more details, refer to the [**document generation reply documentation**](./generate-docs-based-on-templates/generating-from-html-templates.md).

:::info
In the following example, we will use the `fileId` generated for [<u>**Uploading a New Document**</u>](./uploading-a-new-document.md) scenario.

```json
{
  "customId": "119246",
  "fileId": "96975e03-7fba-4a03-99b0-3b30c449dfe7",
  "documentType": "BULK",
  "documentLabel": null,
  "minioPath": "flowx-dev-process-id-119246/119246/458_BULK.pdf",
  "downloadPath": "internal/files/96975e03-7fba-4a03-99b0-3b30c449dfe7/download",
  "noOfPages": null,
  "error": null
}
```
:::

## Configuring the Process

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/convert_pdf_to_jpeg.png)

To create a process that converts a document from PDF to JPEG format, follow these steps:

1. Create a process that includes a [**Message Event Send (Kafka)**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-send-task-node) node and a [**Message Event Receive (Kafka)**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-receive-task-node) node:

* Use the **Message Send** node to send the conversion request.
* Use the **Receive Node** node to receive the reply.

2. Configure the first node (**Message Send**) by adding a **Kafka send action**.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/convert_action_name.png)

3. Specify the [**Kafka topic**](../../../plugins-setup-guide/documents-plugin-setup/documents-plugin-setup.md#kafka-configuration) where you send the conversion request.

:::tip
To identify your defined topics in your current environment, follow the next steps:

1. From the FLOWX.AI main screen, navigate to the **Platform Status** menu at the bottom of the left sidebar.
2. In the FLOWX Components list, scroll to the **document-plugin-mngt** line and press the eye icon on the right side.
3. In the details screen, expand the `KafkaTopicsHealthCheckIndicator` line and then **details → configuration → topic → document → convert**. Here will find the in and out topics for converting files.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/kakfa_topics_convert.png)
:::

4. Fill in the body of the message request.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/convert_action.png)

#### Message Request Example

:::info
This is an example of a message that follows the custom integration data model.
:::

```json
{
  "fileId": "96975e03-7fba-4a03-99b0-3b30c449dfe7",
  "to": "image/jpeg"
}
```

* `fileId`: The file ID that will be converted 
* `to`: The file extension to convert to (in this case, "jpeg")


5. Configure the second node (**Message Receive**) by adding a **Data stream topic**:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/convert_stream.png)

:::info
The response will be sent to this `..out` Kafka topic.
:::

## Receiving the reply

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/convert_response.png)

The following values are expected in the reply body:

* **customId**: The client ID.
* **fileId**: The file ID.
* **documentType**: The document type.
* **documentLabel**: The document label (if available).
* **minioPath**: The path where the converted file is saved. It represents the location of the file in the storage system, whether it's a MinIO path or an S3 path, depending on the specific storage solution.
* **downloadPath**: The download path for the converted file.
* **noOfPages**: If applicable.
* **error**: Any error message in case of an error during the conversion process.


#### Message Response Example

```json
{
  "customId": "119246",
  "fileId": "8ec75c0e-eaa6-4d80-b7e5-15a68bba7459",
  "documentType": "BULK",
  "documentLabel": null,
  "minioPath": "flowx-dev-process-id-119246/119246/461_BULK.jpg",
  "downloadPath": "internal/files/461/download",
  "noOfPages": null,
  "error": null
}
```

The converted file is now available in the storage solution and it can be downloaded:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/jpg_final.png)


Please note that the actual values in the response will depend on the specific conversion request and the document being converted.