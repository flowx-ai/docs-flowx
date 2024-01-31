---
sidebar_position: 5
---

# Deleting Files

The documents plugin provides functionality for deleting files.

## Prerequisites

Before you begin  deleting document files, ensure that you have the following prerequisites in place:

1. **Access Permissions**: Make sure you have the necessary permissions to perform updates or deletions on document files. The user account used for these operations should have the required access rights.

2. **Kafka Configuration**:

- **Verify Kafka Setup**: Ensure that the Kafka messaging system is properly configured and accessible. The documents plugin relies on Kafka for communication between nodes.

- **Kafka Topics**: Familiarize yourself with the Kafka topics used for these operations.

3.  **File IDs and Document Types**: Prepare the necessary information for updating or deleting files:
 
- `fileId`: The ID of the file you want to delete.   
- `customId`: The custom ID associated with the file.



:::info
In the following example, we will use a `fileId` generated for a document using [<u>**Uploading a New Document**</u>](./uploading-a-new-document.md) scenario.

```json
{
  "docs": [
    {
      "customId": "119407",
      "fileId": "c4e6f0b0-b70a-4141-993b-d304f38ec8e2",
      "documentType": "BULK",
      "documentLabel": null,
      "minioPath": "flowx-dev-process-id-119408/119407/466_BULK.pdf",
      "downloadPath": "internal/files/c4e6f0b0-b70a-4141-993b-d304f38ec8e2/download",
      "noOfPages": 2,
      "error": null
    }
  ],
  "error": null
}
```
:::

## Configuring the Deleting Process

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/update_process.png)

To update files, follow these steps:

1. Create a process that includes a [**Message Event Send (Kafka)**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-send-task-node) node and [**a Message Event Receive (Kafka)**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-receive-task-node) node:

* Use the **Message Send** node to send the update request.
* Use the **Message Receive** node to receive the update reply.

2. Configure the **first node (Message Send)** by adding a **Kafka send** action.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/document_update_action.png)


3. Specify the [**Kafka topic**](../../../plugins-setup-guide/documents-plugin-setup/documents-plugin-setup.md#kafka-configuration) where you want to send the update/delete request.

:::tip
To identify your defined topics in your current environment, follow the next steps:

1. From the FLOWX.AI main screen, navigate to the **Platform Status** menu at the bottom of the left sidebar.
2. In the FLOWX Components list, scroll to the **document-plugin-mngt** line and press the eye icon on the right side.
3. In the details screen, expand the `KafkaTopicsHealthCheckIndicator` line and then **details → configuration → topic → file → update**. Here will find the in and out topics for updating files.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/doc_update_topics.png)
:::

4. Fill in the body of the request message.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/document_update_param.png)

### Message Request Example

```json
{
  "customId": "119408",
  "fileId": "c4e6f0b0-b70a-4141-993b-d304f38ec8e2"
}
```

* **fileId**: The ID of the file.
* **customId**: The custom ID.

5. Configure the **second node (Message Receive)** by adding a Data stream topic:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/doc_update_reply.png)


:::info
The response will be sent to this `..out` Kafka topic.
:::


### Receiving the reply

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/doc_update_receive.png)

Values expected in the reply body:

- customId = client ID
- fileId = file ID
- documentType = document type
- documentLabel = document label
- minioPath = Minio path for the updated file
- downloadPath = Download path for the updated file
- error = error description

Example:

```json
{
  "customId": "119408",
  "fileId": "c4e6f0b0-b70a-4141-993b-d304f38ec8e2",
  "documentType": "BULK",
  "documentLabel": "BULK",
  "minioPath": "flowx-dev-process-id-119408/119407/466_BULK.pdf",
  "downloadPath": "internal/files/c4e6f0b0-b70a-4141-993b-d304f38ec8e2/download",
  "noOfPages": null,
  "error": null
}
```

## Configuring the Deleting Process

This is used for deleting files after a bulk upload using the documents plugin.

### Sending the request

1. Create a process in which you add a [**Kafka send event node**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-send-task-node) and a [**Kafka receive event node**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-receive-task-node) (one to send the request, one to receive the reply).
2. Configure the first node (Kafka send event) - add a **Kafka send action**.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/doc_delete_general.png)

3. Add the [**Kafka topic**](../../../plugins-setup-guide/documents-plugin-setup/documents-plugin-setup.md#kafka-configuration) where to send the request.

:::tip
Same as for update, go to **document-plugin-mngt** line in **Platform Status** and press the eye icon on the right side.

In the details screen, expand the **KafkaTopicsHealthCheckIndicator line and then details → configuration → topic → file → delete**. Here will find the in and out topics for updating files.
:::

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/delete_topics.png)

4. Fill in the body message request:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/delete_doc_body.png)

* `fileId`- the ID of the file 
* `customId` - the custom ID
* `documentType` - document type


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