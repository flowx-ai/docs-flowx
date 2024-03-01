---
sidebar_position: 5
---

# Updating / deleting document files

The documents plugin can also be used to make updates to the files stored for the documents, it is possible to update files or delete them from a document.

## Updating the files

### Sending the request

1. Create a process in which you add a [**Send Message Task**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-send-task-node) and a [**Receive Message Task**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-receive-task-node) (one to send the request, one to receive the reply).
2. Configure the first node (Send Message Task) - add a **Kafka send action**.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/doc_update_params.png)

3. Add the [**Kafka topic**](../../../plugins-setup-guide/documents-plugin-setup/documents-plugin-setup.md#kafka-configuration) where to send the request:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/doc_update_params.png)

4. Fill in the body message request:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/doc_update_body.png)

* `fileId`- the id of the file 
* `customId` - the client ID

:::info
Kafka topic names can be set by using (overwriting) the following environment variables in the deployment:

`KAFKA_TOPIC_FILE_UPDATE_IN:` - default value: `ai.flowx.in.qa.document.update.file.v1`

`KAFKA_TOPIC_FILE_UPDATE_OUT` - default value: `ai.flowx.updates.qa.document.update.file.v1`

The above examples of topics are extracted from an internal testing environment, when setting topics for other environments, follow the next pattern, for example, `ai.flowx.updates.{{environment}}.document.update.file.v1`.
:::

:::caution
The Engine is listening for messages on topics with names of a certain pattern, make sure to use an outgoing topic name that matches the pattern configured in the Engine.
:::

### Receiving the reply

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/doc_update_ceva.png)

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

1. Create a process in which you add a [**Send Message Task**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-send-task-node) and a [**Receive Message Task**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-receive-task-node) (one to send the request, one to receive the reply).
2. Configure the first node (Send Message Task) - add a **Kafka Send Action**.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/doc_delete_general.png)

3. Add the [**Kafka topic**](../../../plugins-setup-guide/documents-plugin-setup/documents-plugin-setup.md#kafka-configuration) where to send the request:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/doc_delete_topic.png)

4. Fill in the body message request:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/delete_doc_body.png)

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

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/delete_doc_reply.png)

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