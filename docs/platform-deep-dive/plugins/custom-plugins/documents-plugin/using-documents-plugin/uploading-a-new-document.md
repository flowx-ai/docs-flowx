---
sidebar_position: 2
---

# Uploading a New Document

This guide provides a detailed walkthrough of seamlessly integrating document uploads into a [**process definition**](../../../../../terms/flowx-process-definition) by incorporating a user task node with an **Upload action**. This feature empowers users to actively engage with the process and select the desired file for upload.

:::info
User task [**nodes**](../../../../../terms/flowx-node) provide a flexible framework to define and configure UI templates and actions for specific template config nodes, such as an upload file button.
:::

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/docs_upload_proc.png)

To upload a document using this process, follow the steps outlined below.

## Uploading and Reviewing a Document - Step by Step

### Defining the Process

Having explored how to generate documents in the [previous section](./generate-docs-based-on-templates/generating-from-html-templates.md), let's create a process that enables users to generate a document, review/sign it, and subsequently upload it again.

Consider a scenario where a user inputs data, a document is generated for preview, and the user must then sign and upload it. The following types of nodes are involved:

- [**Start**](../../../../../building-blocks/node/start-end-node.md#start-node) and [**End**](../../../../../building-blocks/node/start-end-node.md#end-node) nodes
- [**Milestone**](../../../../../building-blocks/node/milestone-node.md) nodes to configure the [**stepper/steps**](../../../../../building-blocks/node/milestone-node.md#stepper--steps) structure
- A [**User Task**](../../../../../building-blocks/node/user-task-node.md) for user input
- [**Message Event Send**](../../../../../building-blocks/node/message-send-received-task-node.md#message-send-task) and [**Message Event Receive**](../../../../../building-blocks/node/message-send-received-task-node.md#message-receive-task) for document generation and retrieval
- [**Service Task**](../../../../../building-blocks/node/task-node.md) for adding the generated document path
- User Tasks for document preview and upload

### Configuring the process

1. Follow the steps from [Generating from HTML templates](./generate-docs-based-on-templates/generating-from-html-templates.md) to set up the document generation part of the process.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/file_upload_proc.png)

2. Configure the preview and upload parts of the process.

![Preview and Upload](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/preview_and_upload.png)


#### Document Path - Service Task

Configure a business rule to construct a file path for the generated document. Ensure the base admin path is specified.

:::caution
Ensuring the base admin path is specified is crucial, as it grants the required administrative rights to access the endpoint responsible for document generation.
:::

##### **Actions**

###### Actions Edit

- **Action Type**: Set to **Business Rule**
- **Trigger Type**: Choose **Automatic** because is not a user-triggered action
- **Required Type**: Set as **Mandatory**

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/create_document_path.png)

###### Parameters

- **Language**: We will use **MVEL** for this example
- **Body Message**: Fill in the body message request

```js
adminPath = "https://admin-main.playground.flowxai.dev/document/";
processInstanceId = input.?generatedDocuments.?generatedFiles.keySet().toArray()[0];
downloadPath = input.?generatedDocuments.?generatedFiles.?get(processInstanceId).Company_Client_Document.downloadPath;

if(downloadPath != null){
    output.put("generatedDocuments", {
        "filePath" : adminPath + downloadPath
    });
}
```

<details>
  <summary>Explanation of MVEL Code</summary>


* **adminPath**: Base URL for the admin path.

```java
adminPath = "https://admin-main.playground.flowxai.dev/document/";
```
* **processInstanceId**: Extracts the process instance ID from the input. Assumes an input structure with a generatedDocuments property containing a generatedFiles property. Retrieves the keys, converts them to an array, and selects the first element.

```java
processInstanceId = input.?generatedDocuments.?generatedFiles.keySet().toArray()[0];
```

* **downloadPath**: Retrieves the downloadPath property using the obtained processInstanceId.

```java
downloadPath = input.?generatedDocuments.?generatedFiles.?get(processInstanceId).Company_Client_Document.downloadPath;`
```

* **if condition**: Checks if downloadPath is not null and constructs a new object in the output map.

```java
if(downloadPath != null){
    output.put("generatedDocuments", {
        "filePath" : adminPath + downloadPath
    });
}
```

</details>

#### Preview Document - User Task

##### **Actions**

###### Actions edit

* **Action Type**: Set to **Save Data**.
* **Trigger Type**: Choose **Manual** to allow user-triggered action.
* **Required Type**: Set as **Mandatory**.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/document_preview_action.png)

#### Upload Document - User Task

##### **Node Config**

* **Swimlane**: Choose a swimlane (if multiple) to restrict access to specific user roles.
* **Stage**: Assign a stage to the node.
* **Data stream topics**: Add the topic where the response will be sent; in this example `ai.flowx.updates.document.html.persist.v1` and its key: `uploadedDocument`.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/upload_document_node_config.png)

##### **Actions**

Configure the following node actions:

* Upload File action with two child actions:
    * Business Rule
    * Send Data to User Interface
* Save Data action

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/upload_document_actions.png)

###### Upload File Action

This is a standard predefined FLOWX.AI Node Action for uploading files.

<details>
<summary>Configuring the File Upload Action</summary>

##### Action edit

* **Action Type**: Set to **Upload File**.
* **Trigger Type**: Choose **Manual** to allow user-triggered action.
* **Required Type**: Set it as **Optional**.
* **Repeatable**: Check this option if the action can be triggered multiple times. 

##### Parameters

* **Topics**: Kafka topic where the file will be posted, in this example `ai.flowx.in.document.persist.v1`.

:::info
to be added where to find kafka topics
:::

* **Document Type**: Metadata for the document plugin, in this example `BULK`.
* **Folder**: Configure a value by which the file will be identified, in this example it will be the`${processInstanceId}` (it will be replaced at runtime with a generated process instance id).
* **Advanced configuration (Show headers)**: This represents a JSON value that will be sent on the headers of the Kafka message, in this example:

```json
{"processInstanceId": ${processInstanceId}, "destinationId": "upload_document", "callbacksForAction": "uploadDocument"}`
```
:::tip
`callbacksForAction` - the value of this key is a string that specifies a callback action associated with the "upload_document" destination ID (node). This is part of an event-driven system (Kafka send action) where this callback will be called once the "upload_document" action is completed.
:::


##### Data to send

* **Keys**: Used when data is sent from the frontend via an action for data validation.

</details>

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/upload_config_a.png)
![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/upload_config_b.png)

Now, configure the child actions of Upload File Action.

###### 1. Business Rule 

This is necessary to create the path to display the uploaded document.

<details>
<summary>Configuring the Business Rule Action</summary>

##### Action edit

* **Order**: Set to **1** so it will be processed before the second child action.
* **Action Type**: Set to **Upload File**.
* **Trigger Type**: Choose **Automatic**, it does not need user intervention.
* **Required Type**: Set as **Mandatory**.
* **Repeatable**: Check this option if the action can be triggered multiple times. 

##### Parameters

* **Language**: In this example we will use **MVEL**.
* **Body Message**: Fill in the body of the message request by applying a logic similar to the one utilized in configuring the "preview_document" node. Establish a path that will be later employed to showcase the uploaded document within a preview UI component.


```js
adminPath = "https://admin-main.playground.flowxai.dev/document/";
downloadPath = input.?uploadedDocument.?downloadPath;

if(downloadPath != null){
    output.put("uploadedDocument", {
        "filePath" : adminPath + downloadPath
    });
}
```

</details>

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/upload_business_rule_a.png)

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/upload_business_rule_b.png)

###### 2. Send Data to User Interface

This is necessary to send the previously created information to the frontend.

<details>
<summary>Configuring the Send Data to User Interface Action</summary>

##### Action Edit

* **Order**: Set to **2** so it will be processed after the previously created Business Rule.
* **Action Type**: Set to **Send data to user interface**.
* **Trigger Type**: Choose **Automatic**, it does not need user intervention.
* **Required Type**: Set as **Mandatory**.
* **Repeatable**: Check this option if the action can be triggered multiple times. 

##### Parameters

* **Message Type**: Set to **Default**.
* **Body Message**: Populate the body of the message request; this object will be utilized to bind it to the document preview UI element.

```json
{
    "uploadedDocument": {
        "filePath": "${uploadedDocument.filePath}"
    }
}
```
* **Target Process**: Used to specify to what running process instance should this message be sent - set to **Active Process**.

</details>

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/send_to_UI_a.png)
![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/send_to_UI_b.png)


###### Save Data

Configure the last node action to save all the data.

##### Action edit

* **Order**: Set to **3**.
* **Action Type**: Set to **Save Data**.
* **Trigger Type**: Choose **Manual** to allow user-triggered action.
* **Required Type**: Set as **Mandatory**.

## Configuring the UI

## Receiving The Reply

The reply body is expected to contain the following values:

* **customId**: The client ID.
* **fileId**: The ID of the file.
* **documentType**: The document type.
* **minioPath**: The path where the uploaded file is saved. It represents the location of the file in the storage system, whether it's a MinIO path or an S3 path, depending on the specific storage solution.
* **downloadPath**: The download path for the uploaded file. It specifies the location from where the file can be downloaded.
* **noOfPages**: The number of pages in the document.

:::info
You can view the response by accessing the **Audit log** menu.
:::

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/audit_log_doc_upload.png)

```json
    {
        "customId" : "1234_727605",
        "fileId" : 4718,
        "documentType" : "BULK",
        "documentLabel" : null,
        "minioPath" : "bucket-path-qa-process-id-727605/1234_726254/4718_BULK.png",
        "downloadPath" : "internal/files/4714/download",
        "noOfPages" : null,
        "error" : null
    }
```