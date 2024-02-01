# Using the plugin

Once you have deployed the Documents Plugin in your infrastructure, you can start creating various document templates. After selecting a document template, proceed to create a [**process definition**](../../../../../terms/flowx-process-definition) by including Kafka nodes and custom document-related actions in your process flow.

The plugin offers the following actions:

* Generating docs based on templates
* Uploading documents
* Converting documents
* Splitting documents
* Updating / deleting documents
* Getting URLs to documents
* Listing stored documents
* OCR integration

Before adding these actions to your [**process definition**](../../../../../terms/flowx-process-definition), follow these steps:

1. Ensure that all custom information is properly configured in the plugin database, such as the document templates to be used.
2. For each event type, you will need a corresponding Kafka topic.

:::info
The `..in` topic names configured for the plugin should match [**the `..out` topic  names used when configuring the engine**](../../../../../platform-setup-guides/flowx-engine-setup-guide/flowx-engine-setup-guide.md#configuring-kafka). Make sure to use an outgoing topic name that matches the pattern configured in the Engine. The value can be found and overwritten in the `KAFKA_TOPIC_PATTERN` variable. 

For more details about Process Engine Kafka topic configuration, click [<u>**here**</u>](../../../../../platform-setup-guides/flowx-engine-setup-guide/flowx-engine-setup-guide.md#configuring-kafka).

To make a request to the plugin, the process definition needs to have an action of type [**Kafka send**](../../../../../building-blocks/node/message-send-received-task-node.md#example-of-a-message-send-event) defined on a [**Message event send**](../../../../../building-blocks/node/message-send-received-task-node.md#message-send-task) node. The action parameter should have the key `topicName` and the corresponding topic name as its value.

To receive a reply from the plugin, the process definition needs to include a [**Message event receive**](../../../../../building-blocks/node/message-send-received-task-node.md#message-receive-task) node with a node value having the key `topicName` and the topic name as its value.
:::

Once the setup is complete, you can begin adding custom actions to your processes.

Let's explore a few examples that cover both the configuration and integration with the engine for all the use cases supported by the plugin:

[Generating docs based on templates](../using-documents-plugin/generate-docs-based-on-templates/generate-docs-based-on-templates.md)

[Uploading a new document](./uploading-a-new-document.md)

[Converting documents to different formats](converting-documents-to-different-formats.md)

[Splitting a document](splitting-a-document.md)

[Deleting a file](deleting-a-file.md)

[Getting URLs to documents](getting-urls-to-documents.md)

[Listing stored documents](listing-stored-files.md)
