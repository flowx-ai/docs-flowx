---
sidebar_position: 1
---

# 📦 Documents plugin

The document plugin can be easily added to your custom FLOWX.AI deployment to **enhance the core platform capabilities with functionality specific to document handling**.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/doc_plugin_general.png)

The plugin offers the following features:

* **Document Storage and Editing**: Easily store and make changes to documents.
* **Document Generation**: Generate documents using predefined templates and custom process-related data.
* **WYSIWYG Editor**: Create various templates using a user-friendly ["What You See Is What You Get" (WYSIWYG) editor](../../wysiwyg.md).

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/doc_plugin_wysiwyg.png)
    
* **Template Import**: Import templates created in other environments.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/doc_plugin_create_import.png)

:::caution
When exporting a document template, it is transformed into a JSON file that can be imported later.
:::

* **Document Conversion**: Convert documents from PDF to JPEG format.
* **Document Splitting**: Split bulk documents into smaller separate documents.
* **Document Editing**: Add generated barcodes, signatures, and assets to documents.
* **OCR integration**: When a document requires OCR processing, the Document Plugin initiates the interaction by passing the document data or reference to the [**OCR Plugin**](../ocr-plugin.md).

The Documents Plugin can be easily deployed on your chosen infrastructure, preloaded with industry-specific document templates using an intuitive WYSIWYG editor, and connected to the FLOWX Engine through Kafka events.

* [<u>**Kafka send event node**</u>](../../../../building-blocks/node/message-send-received-task-node.md#message-send-task)
* [<u>**Kafka receive event node**</u>](../../../../building-blocks/node/message-send-received-task-node.md#message-receive-task)

Let's go through the steps needed to deploy and set up the plugin:

[Documents plugin setup](../../plugins-setup-guide/documents-plugin-setup/documents-plugin-setup.md)

We've prepared some examples of various use cases where this plugin would be useful:

[Using the plugin](./using-documents-plugin/using-documents-plugin.md)


:::info Performance Considerations:

To ensure optimal performance while using document plugin, consider the following recommendations:

* For large or complex documents, it is recommended to allocate sufficient system resources, such as CPU and memory, to handle the conversion/editing process efficiently.
* Avoid processing extremely large files or a large number of files simultaneously, as it may impact performance and responsiveness.
* Monitor system resources during the generating/editing/converting etc. process and scale resources as needed to maintain smooth operations.
* Following these performance considerations will help optimize the document processing and improve overall system performance.
:::