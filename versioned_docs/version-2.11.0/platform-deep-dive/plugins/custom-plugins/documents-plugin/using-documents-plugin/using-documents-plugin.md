# Using the plugin

After deploying the document management plugin in your infrastructure, you can start including custom document related actions in your process flow definitions.

Before adding the corresponding actions in your process definition, you will need to follow a few steps:

* make sure all custom info is configured in the plugin database, for example the document templates to be used
* for each event type, you will need two Kafka topics: one for the request sent from the engine to the plugin and one for the corresponding reply

:::info
The topic names configured for the plugin should match the ones used when configuring the engine and when adding plugin related process actions:

* the Engine is listening for messages on topics with names of a certain pattern, make sure to use an outgoing topic name that matches the pattern configured in the Engine
* to make a request to the plugin, the process definition needs to have an action of type `Kafka send` that has an action param with key `topicName` and the needed topic name as a value
* to receive the reply from the plugin, the process definition needs to have a receiving node with a node value with key `topicName` and the topic name as the value
:::

After all the set up is in place, you can start adding the custom actions to the processes.

Let's go through a few examples. These cover both the configuration part and the integration with the engine for all the use cases covered by the plugin.


[Generating docs based on templates](../using-documents-plugin/generate-docs-based-on-templates/generate-docs-based-on-templates.md)

[Uploading a new document](./uploading-a-new-document.md)

[Converting documents to different formats](converting-documents-to-different-formats.md)

[Split a document](splitting-a-document.md)

[Updating / deleting document files](./updating-deleting-document-files.md)

[Getting URLs to documents](getting-urls-to-documents.md)

[Listing stores files](listing-stored-files.md)