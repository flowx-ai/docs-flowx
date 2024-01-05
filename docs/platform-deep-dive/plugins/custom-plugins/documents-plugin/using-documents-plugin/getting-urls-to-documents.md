# Getting URLs for documents

In certain scenarios, you may need to obtain URLs that point to uploaded documents to be used by other integrations. This requires adding a custom action to your process that requests the URLs from the Documents Plugin.

## Sending the request

To retrieve document URLs and use them, for example, in the Notification Plugin to attach them to emails, follow the next steps:

1. Create a process and include the following nodes: 
* a [**Kafka Send Event Node**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-send-task-node),
* a [**Kafka Receive Event Node**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-receive-task-node)
* a [**User Task Node**](../../../../../building-blocks/node/user-task-node.md)
* [**Start / End Milestone**](../../../../../building-blocks/node/milestone-node.md) Nodes to [create a modal](../../../../../building-blocks/node/milestone-node.md#modal)

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/getting_urls_proc.png)

2. Configure the **User Task Node** and add an [**Upload Action**](../../../../../building-blocks/actions/upload-file-action.md) to it.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/getting_urls_upload_ac.png)

3. Configure the parameters for the **Upload Action**:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/getting_urls_upload_params.png)

:::info
For more details on uploading a document and configuring an upload action, refer to the following sections:

[**Upload document**](uploading-a-new-document.md)

[**Upload action**](../../../../../building-blocks/actions/upload-file-action.md)
:::

4. Configure the Kafka Send Event Node by adding a **Kafka Send Action** and specifying the [**Kafka topic**](../../../plugins-setup-guide/documents-plugin-setup/documents-plugin-setup.md#kafka-configuration) to send the request to:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/getting_urls_topic.png)

5. Fill in the body of the request message for the action:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/getting_urls_message.png)

* `types` - a list of document types

6. Configure the [**Kafka Receive Event Node**](../../../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-receive-task-node) by adding the kafka topic on which the response will be sent.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/getting_urls_reply_topic.png)

:::info
Kafka topic names can be set by using environment variables:

* `KAFKA_TOPIC_DOCUMENT_GET_URLS_IN` - `ai.flowx.in.qa.document.urls.v1` - the topic that listens for the request from the engine

* `KAFKA_TOPIC_DOCUMENT_GET_URLS_OUT` - `ai.flowx.updates.qa.document.urls.v1` - the topic on which the engine will expect the reply

The example topic names above are from an internal testing environment. When setting topics for other environments, follow this pattern: `ai.flowx.updates.{{environment}}.document.urls.v1`.
:::

:::caution
The Engine listens for messages on topics with specific naming patterns. Ensure that your outgoing topic name matches the pattern configured in the Engine.
:::

## Receiving the reply

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/getting_urls_response.png)

The response body is expected to contain the following values:

```json
[
    {
        "success": true,
        "fullName": "1234_771853/4752_771853.pdf",
        "fileName": "1234_771853",
        "fileExtension": "pdf",
        "url": "<http://SOME_URL/1234_771853/4752_771853.pdf?X-Amz-Algorithm=SOME_ALGORITHM&X-Amz-Credential=SOME_CREDENTIAL&X-Amz-Date=20210223T113621Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=>"
    }
]
```

* **success**: A boolean indicating whether the document exists and the URL was generated successfully.
* **fullName**: The full name of the document file, including the directory path.
* **fileName**: The name of the document file without the extension.
* **fileExtension**: The extension of the document file.
* **url**: The full download URL for the document.


