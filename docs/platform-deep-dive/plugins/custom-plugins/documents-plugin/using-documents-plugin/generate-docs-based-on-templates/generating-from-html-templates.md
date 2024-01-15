# Generating Documents from HTML templates

The Document Management Plugin streamlines the document generation process based on predefined templates. This example focuses on generating documents using HTML templates.

## Creating an HTML Template

Before initiating document generation, HTML templates must be created or imported. Employ the [<u>**WYSIWYG**</u>](../../../../wysiwyg.md) editor accessible through **FLOWX Designer → Plugins → Document templates**.

:::caution
Prior to utilizing your templates, ensure they are in a **Published** state. Document Templates marked as **Draft/In Progress** will not undergo the generation process.
:::

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/ocr_doc_template.gif)

:::tip ACADEMY COURSES
We've created a comprehensive course guiding you through the process of **Creating a Document Template in Designer**. Access the course [<u>**here**</u>](https://academy.flowx.ai/catalog/info/id:172) for detailed instructions and insights.
:::

## Sending a Document Generation Request

Consider a scenario where you need to send a personalized document to a customer based on specific details they provide. Create a process involving a [**User task**](../../../../../../building-blocks/node/user-task-node.md), a [**Kafka send event node**](../../../../../../building-blocks/node/message-send-received-task-node.md#message-send-task), and a [**Kafka receive event node**](../../../../../../building-blocks/node/message-send-received-task-node.md#message-receive-task).

:::info
* In the initial user task node, users input information.
* The second node (Kafka send) creates a request with a specified template and keys corresponding to user-filled values.
* The third node sends the reply with the generated document.
:::

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/generate_from_html.png)

1. Add a **User task** and configure it with UI elements for user input.

:::info
In this instance, we will use three UI elements, comprising two input fields and a select (dropdown). Subsequently, we will leverage the keys associated with these UI elements to establish a binding with the template. This binding enables dynamic adjustments to the template based on user-input values, enhancing flexibility and customization.
:::

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/data_model_doc_template.gif)

2. Configure the second node (Kafka Send Event) by adding a **Kafka send action**.
3. Add the [**Kafka topic**](../../../../plugins-setup-guide/documents-plugin-setup/documents-plugin-setup.md#kafka-configuration) to which the request should be sent.
4. Fill in the message with the expected values in the request body:

- **documentList**: A list of documents to be generated with properties (name and value to be replaced in the document templates)
- **customId**: Client ID
- **templateName**: The name of the template that you want to use (defined in the **Document templates** section)
- **language**: Should match the language set on the template (a template can be created for multiple languages as long as they are defined in the system, see **Languages** for more information)
- **includeBarcode**: True/False
- **data**: A map containing the values that should be replaced in the document template (data that comes from user input). The keys used in the map should match the ones defined in the HTML template and your UI elements:

```json
      "data": {
        "firstInput": "${application.client.firstName}",
        "secondInput": "${application.client.lastName}",
        "thirdInput": "${application.client.accountType}"
      }, 
```
![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/inputs_html.png)

Also add them in the data model of your template:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/data_model_html_template.png)

Ultimately, the configuration should resemble the presented image:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/html_generate1.png)

Example request body:

```json
{ 
  "documentList": [
    {
      "customId": "ClientsFolder",
      "templateName": "AccountCreation",
      "language": "en",
      "data": {
        "firstInput": "${application.client.firstnName}",
        "secondInput": "${application.client.lastName}",
        "thirdInput": "${application.client.accountType}"
      },
     "includeBarcode": false //if you want to include a barcode, you can set it to true
    }
  ]
}

```

:::info
Ensure that Kafka topic names align with configured environment variables in the deployment:

* **`KAFKA_TOPIC_DOCUMENT_GENERATE_HTML_IN`** - the topic that listens for the request from the engine
* **`KAFKA_TOPIC_DOCUMENT_GENERATE_HTML_OUT`** - the topic on which the engine expects the reply

The topics follow the following pattern:

```yaml
  topic:
    naming:
      package: "ai.flowx."
      environment: "dev."
      version: ".v1"
      prefix: ${kafka.topic.naming.package}${kafka.topic.naming.environment}
      suffix: ${kafka.topic.naming.version}
      engineReceivePattern: engine.receive.
```
Example:


```yaml
document:
      generate:
        html:
          in: ${kafka.topic.naming.prefix}plugin.document.trigger.generate.html${kafka.topic.naming.suffix}
          out: ${kafka.topic.naming.prefix}${kafka.topic.naming.engineReceivePattern}plugin.document.generate.html.results${kafka.topic.naming.suffix}
```

:::

:::caution
The engine listens for messages on topics with specific naming patterns. Use an outgoing topic name that matches the configured pattern in the engine.
:::

## Receiving the Document Generation Reply

The response, containing information about the generated documents, is sent to the output Kafka topic defined in the Kafka Receive Event Node. The response includes details such as file IDs, document types, and storage paths.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/html_generated_response.png)

Example Response (received on `KAFKA_TOPIC_DOCUMENT_GENERATE_HTML_OUT` topic):

```json
{
  "generatedFiles": {
    "ClientsFolder": {
      "AccountCreation": {
        "customId": "ClientsFolder",
        "fileId": "320f4ec2-a509-4aa9-b049-87224594802e",
        "documentType": "AccountCreation",
        "documentLabel": "GENERATED_PDF",
        "minioPath": "{{your_bucket}}/2024/2024-01-15/process-id-865759/ClientsFolder/6869_AccountCreation.pdf",
        "downloadPath": "internal/files/320f4ec2-a509-4aa9-b049-87224594802e/download",
        "noOfPages": 1,
        "error": null
      }
    }
  },
  "error": null
}
```

* **generatedFiles**: List of generated files.
  * **customId**: Client ID.
  * **fileId**: The ID of the generated file.
  * **documentType**: The name of the document template.
  * **documentLabel**: A label or description for the document.
  * **minioPath**: The path where the converted file is saved. It represents the location of the file in the storage system, whether it's a MinIO path or an S3 path, depending on the specific storage solution.
  * **downloadPath**: The download path for the converted file. It specifies the location from where the file can be downloaded.
  * **noOfPages**: The number of pages in the generated file.
  * **error**: If there were any errors encountered during the generation process, they would be specified here. In the provided example, the value is null, indicating no errors.
