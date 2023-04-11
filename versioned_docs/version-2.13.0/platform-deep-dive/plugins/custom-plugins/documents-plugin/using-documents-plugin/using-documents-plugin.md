# Using the plugin

After deploying the document management plugin in your infrastructure, you can start creating various document templates. After choosing a document template, start creating a process definition by including kafka nodes and custom document-related actions in your process flow definitions.

Possible actions:

* Generating docs based on templates
* Uploading documents
* Converting documents
* Splitting documents
* Updating / deleting documents
* Getting URLs to documents
* Listing stored documents

Before adding the corresponding actions in your process definition, you will need to follow a few steps:

* make sure all custom info is configured in the plugin database, for example, the document templates to be used
* for each event type, you will need a corresponding Kafka topic

:::info
The topic names configured for the plugin should match [**the ones used when configuring the engine**](../../../../../platform-setup-guides/flowx-engine-setup-guide/flowx-engine-setup-guide.md#kafka-configuration) and when adding plugin related process actions:

* the Engine is listening for messages on topics with names of a certain pattern, make sure to use an outgoing topic name that matches the pattern configured in the Engine, the value can be found and overwritten at the `KAFKA_TOPIC_PATTERN` variable, click [**here**](../../../../../platform-setup-guides/flowx-engine-setup-guide/flowx-engine-setup-guide.md#kafka-configuration) for more details about Kafka topics configuration
* to make a request to the plugin, the process definition needs to have an action of type [**Kafka send**](../../../../../building-blocks/node/message-send-received-task-node.md#example-of-a-message-send-event) defined on a [**Message event send**](../../../../../building-blocks/node/message-send-received-task-node.md#message-send-task) node
 that has an action parameter with key `topicName` and the needed topic name as a value
* to receive the reply from the plugin, the process definition needs to have a [**Message event receive**](../../../../../building-blocks/node/message-send-received-task-node.md#message-receive-task) node with a node value with key `topicName` and the topic name as the value
:::

After the setup is finished, you can start adding custom actions to the processes.

Let's go through a few examples. These cover both the configuration part and the integration with the engine for all the use cases covered by the plugin.

[Generating docs based on templates](../using-documents-plugin/generate-docs-based-on-templates/generate-docs-based-on-templates.md)

[Uploading a new document](./uploading-a-new-document.md)

[Converting documents to different formats](converting-documents-to-different-formats.md)

[Splitting a document](splitting-a-document.md)

[Updating / deleting document files](./updating-deleting-document-files.md)

[Getting URLs to documents](getting-urls-to-documents.md)

[Listing stored documents](listing-stored-files.md)
