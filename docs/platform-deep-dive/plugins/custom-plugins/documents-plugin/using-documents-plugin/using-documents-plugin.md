# Using the plugin

After deploying the document management plugin in your infrastructure, you can start including custom document related actions in your process flow definitions.

Before adding the corresponding actions in your process definition, you will need to follow a few steps:

* make sure all custom info is configured in the plugin database, for example the document templates to be used
* for each event type, you will need two Kafka topics: one for the request sent from the engine to the plugin and one for the corresponding reply

{% hint style="info" %}
The topic names configured for the plugin should match the ones used when configuring the engine and when adding plugin related process actions:

* the Engine is listening for messages on topics with names of a certain pattern, make sure to use an outgoing topic name that matches the pattern configured in the Engine
* to make a request to the plugin, the process definition needs to have an action of type `Kafka send` that has an action param with key `topicName` and the needed topic name as a value
* to receive the reply from the plugin, the process definition needs to have a receiving node with a node value with key `topicName` and the topic name as the value
{% endhint %}

After all the set up is in place, you can start adding the custom actions to the processes.

Let's go through a few examples. These cover both the configuration part and the integration with the engine for all the use cases covered by the plugin.

{% content-ref url="generating-docs-based-on-templates/" %}
[generating-docs-based-on-templates](generating-docs-based-on-templates/)
{% endcontent-ref %}

{% content-ref url="uploading-a-new-document.md" %}
[uploading-a-new-document.md](uploading-a-new-document.md)
{% endcontent-ref %}

{% content-ref url="convert-documents-to-different-formats.md" %}
[convert-documents-to-different-formats.md](convert-documents-to-different-formats.md)
{% endcontent-ref %}

{% content-ref url="split-a-document.md" %}
[split-a-document.md](split-a-document.md)
{% endcontent-ref %}

{% content-ref url="update-delete-document-files.md" %}
[update-delete-document-files.md](update-delete-document-files.md)
{% endcontent-ref %}

{% content-ref url="get-urls-to-documents.md" %}
[get-urls-to-documents.md](get-urls-to-documents.md)
{% endcontent-ref %}

{% content-ref url="list-stored-files.md" %}
[list-stored-files.md](list-stored-files.md)
{% endcontent-ref %}