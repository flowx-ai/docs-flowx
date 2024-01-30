---
sidebar_position: 5
---

# Updating and Deleting Document Files

The documents plugin provides functionality for updating and deleting files associated with documents. You can update existing files or remove them from a document.

## Prerequisites

Before you begin updating or deleting document files, ensure that you have the following prerequisites in place:

1. **Access Permissions**: Ensure that you have the necessary permissions to use documents plugin. The user account used for these operations should have the required access rights.

2. **Kafka Configuration**: Verify that the Kafka messaging system is properly configured and accessible. The documents plugin relies on Kafka for communication between nodes.

    - **Kafka Topics**: Familiarize yourself with the Kafka topics used for these operations.

3.  **File IDs and Document Types**: Prepare the necessary information for updating or deleting files:

    - **Updating Files**:
      - `fileId`: The ID of the file you want to update.
      - `customId`: The custom ID associated with the file.
      - `documentType`: The document type.

    - **Deleting Files**:
      - `fileId`: The ID of the file you want to delete.
      - `customId`: The custom ID associated with the file.
      - `documentType`: The document type.




## Updating Files

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/update_process.png)

### Sending the request

To update files, follow these steps:

1. Create a process that includes a [**Message Event Send (Kafka)**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-send-task-node) node and [**a Message Event Receive (Kafka)**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-receive-task-node) node:

* Use the **Message Send** node to send the update request.
* Use the **Message Receive** node to receive the update reply.

2. Configure the **first node (Message Send)** by adding a **Kafka send** action.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/doc_update_params.png)


3. Specify the [**Kafka topic**](../../../plugins-setup-guide/documents-plugin-setup/documents-plugin-setup.md#kafka-configuration) where you want to send the update/delete request.


![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/doc_update_topic.png)

4. Fill in the body of the request message:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/doc_update_body.png)

* **fileId**: The ID of the file.
* **customId**: The custom ID.
* **documentType**: The document type.


### Receiving the reply

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/doc_update_ceva.png)

Values expected in the reply body:

* customId = client ID
* fileId = file ID
* documentType = document type
* documentLabel = document label
* minioPath = minio path for the updated file
* downloadPath = download path for the updated file
* error = error description

Example:

```json
{
  "customId": "test_763879",
  "fileId": 4749,
  "documentType": "BULK",
  "documentLabel": null,
  "minioPath": "qualitance-dev-paperflow-qa-process-id-763879/test_763879/4749_BULK.pdf",
  "downloadPath": "internal/files/4749/download",
  "noOfPages": null,
  "error": null
}
```

## Deleting files from a document

Used to delete files after bulk upload.

### Sending the request

1. Create a process in which you add a [**Kafka send event node**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-send-task-node) and a [**Kafka receive event node**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-receive-task-node) (one to send the request, one to receive the reply).
2. Configure the first node (Kafka send event) - add a **Kafka send action**.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/doc_delete_general.png)

3. Add the [**Kafka topic**](../../../plugins-setup-guide/documents-plugin-setup/documents-plugin-setup.md#kafka-configuration) where to send the request:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/doc_delete_topic.png)

4. Fill in the body message request:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/delete_doc_body.png)

* `fileId`- the id of the file 
* `customId` - the client ID
* `documentType` - document type

:::info
Kafka topic names can be set by using (overwriting) the following environment variables in the deployment:

`KAFKA_TOPIC_FILE_DELETE_IN` - default value: `ai.flowx.in.qa.document.delete.file.v1`

`KAFKA_TOPIC_FILE_DELETE_OUT` - default value: `ai.flowx.updates.document.delete.file.v1`


:::caution
The Engine is listening for messages on topics with names of a certain pattern, make sure to use an outgoing topic name that matches the pattern configured in the Engine.
:::

### Receiving the reply

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/delete_doc_reply.png)

Values expected in the reply body:

* customId = client ID
* fileId = file ID
* documentType = document type
* error = error description

Example:

```json
{
  "customId": "1234_763417",
  "fileId": 4747,
  "documentType": "BULK",
  "error": null
}
```