---
sidebar_position: 5
---

# Deleting Files

The documents plugin provides functionality for deleting files.

## Prerequisites

Before deleting document files, ensure:

1. **Access Permissions**: Have the necessary permissions for updates or deletions. The user account used should have the required access rights.

2. **Kafka Configuration**:

- **Verify Kafka Setup**: Ensure proper configuration and accessibility of the Kafka messaging system.
- **Kafka Topics**: Understand the Kafka topics used for these operations.

3.  **File IDs and Document Types**: Prepare information for updating or deleting files:
 
- `fileId`: ID of the file to delete.
- `customId`: Custom ID associated with the file.

:::info
In the example below, we use a `fileId` generated for a document using [<u>**Uploading a New Document**</u>](./uploading-a-new-document.md) scenario.

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

## Configuring the Deletion Process

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/delete_file_proc.png)

To delete files:

1. Create a process that includes a [**Message Event Send (Kafka)**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-send-task-node) node and [**a Message Event Receive (Kafka)**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-receive-task-node) node:

* Use the **Message Send** node to send the delete request.
* Use the **Message Receive** node to receive the delete reply.

2. Configure the **first node (Message Send)** by adding a **Kafka send** action.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/delete_file_action.png)

3. Specify the [**Kafka topic**](../../../plugins-setup-guide/documents-plugin-setup/documents-plugin-setup.md#kafka-configuration) for sending the delete request.

:::tip
Identify defined topics in your environment:

1. Navigate to **Platform Status > FLOWX Components > document-plugin-mngt**  and press the eye icon on the right side.
3. In the details screen, expand the `KafkaTopicsHealthCheckIndicator` line and then **details → configuration → topic → file → delete**. Here will find the in and out topics for deleting files.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/delete_topics.png)
:::

4. Fill in the request message body.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/delete_request_message.png)

#### Message Request Example

Example of a message following the custom integration data model:

```json
{
  "customId": "119408",
  "fileId": "c4e6f0b0-b70a-4141-993b-d304f38ec8e2"
}
```

* **fileId**: The ID of the file.
* **customId**: The custom ID.

5. Configure the **second node (Message Receive)** by adding a Data stream topic:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/delete_stream.png)


:::info
The response will be sent to this `..out` Kafka topic.
:::


### Receiving the Reply

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/delete_response.png)

Values expected in the reply body:

- **customId**: The unique identifier for your document
- **fileId**: The ID of the file
- **documentType**: The document type
- **error**: Any error message in case of an error during the deleting process

#### Message Response Example

```json
{
  "customId": "119408",
  "fileId": "c4e6f0b0-b70a-4141-993b-d304f38ec8e2",
  "documentType": null,
  "error": null
}
```