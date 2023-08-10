# 📦 OCR plugin

The OCR (Optical Character Recognition) plugin is used to easily read barcodes or extract handwritten signatures from .pdf documents.

:::caution
* All \*.pdf documents that are sent to the OCR service for reading barcodes and extracting handwritten signatures should be scanned at a minimum resolution of 200DPI (approximately 1654x2339 px for A4 pages)
* Barcode is searched on the top 15% of each image (scanned page)
* Signatures are detected on boxes with a border: 4px black solid
* Only two signatures per image (scanned page) are detected.
:::

:::info
The barcode type supported by the plugin is **1D Code 128**, find more information [here](https://graphicore.github.io/librebarcode/documentation/code128.html).
:::

## Using OCR plugin

You can print generic document templates by either using a specific flow on FLOWX.AI (HTML template) or by using any other document editor.

:::info
If you choose to use a specific flow on FLOWX.AI, there are some advantages:
* only one application will be used to manage the templates and the flow
* you have visibility on the template history upon each version
:::

### Use case

1. Print generic templates.
2. End-user completes, signs and scans the document.
3. On the flow, the document is uploaded.
4. FLOWX validates the template (barcode) and the signatures.


### FLOWX.AI generated documents scenario


1. Use the [**Documents plugin**](./documents-plugin) to create a [**document template**](./documents-plugin/using-documents-plugin/generate-docs-based-on-templates).

[Generating documents based on templates](./documents-plugin/using-documents-plugin/generate-docs-based-on-templates)

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/ocr_doc_template.gif)

2. Create a process and add a [**Kafka Send Action**](../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-send-task-node) on a [**Message event send**](../../../building-blocks/node/message-send-received-task-node.md#message-send-task) node. Here you add the [**kafka topic**](../../../platform-overview/frameworks-and-standards/event-driven-architecture-frameworks/intro-to-kafka-concepts.md#topics) (address) where the template will be generated.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/ocr_kafka_send.png)

:::info
The Kafka topic where you want to generate the template must match the topic defined on the **`KAFKA_TOPIC_DOCUMENT_GENERATE_HTML_IN`** variable. Click [**here**](../../../platform-setup-guides/flowx-engine-setup-guide/flowx-engine-setup-guide.md#kafka-configuration) for more details on how to configure kafka topics. For more information, check the [**Documents plugin setup guide**](../plugins-setup-guide/documents-plugin-setup).
:::

3. Fill in the **Message**. Values expected in the request body:

* **documentList** = list of documents to be generated with properties (name and value to be replaced in the document templates)
* **customId** = client ID
* **templateName** = the name of the template to be used
* **language**
* **includeBarcode** = true/false
* **data** = a map containing the values that should be replaced in the document template; the keys used in the map should match the ones defined in the HTML template

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/ocr_message_body.png)

:::info
[**`data` parameters**](../wysiwyg.md) must be defined first in the document template that you use. For more information, check the [**WYSIWYG Editor**](../wysiwyg.md) section.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/ocr_data_model.png)

:::

4. Add a **barcode**.

:::info
* if you want a **default barcode**, add to the body message the following parameter: `includeBarCode: true`.
* if you want a **custom barcode**, set `includeBarCode: false` and fill in the `data` you want to add to it.
:::

5. Add a [**message received event**](../../../building-blocks/node/message-send-received-task-node.md#message-receive-task) node where you add the topic where you want to receive the response. 

:::caution 
 The topic must be the one that is defined at the **`KAFKA_TOPIC_DOCUMENT_GENERATE_HTML_OUT`** variable. 
:::

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/ocr_receive_response.png)

6. Add a [**user task node**](../../../building-blocks/node/user-task-node) and configure an [**Upload file action**](../../../building-blocks/node/task-node/upload-file-action.md) - the action will send the file on the topic (defined at the **`KAFKA_TOPIC_DOCUMENT_PERSIST_IN`**) to the [Min.io](https://min.io/) - storage solution.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/ocr_upload_file.png)

7. The response will be sent back to the kafka topic defined at **`KAFKA_TOPIC_DOCUMENT_PERSIST_OUT`** environment variable through a callback action/ subprocess.
8. Next, send the response to the OCR Kafka topic defined at **`KAFKA_TOPIC_OCR_IN`** variable (representing the path to the Min.io file)
9. Display the result of the OCR validation at the kafka topic defined at **`KAFKA_TOPIC_OCR_OUT`**. 

### Setup guide

[OCR plugin setup](../plugins-setup-guide/ocr-plugin-setup)
