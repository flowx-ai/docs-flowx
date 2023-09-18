---
sidebar_position: 2
---

# Uploading a new document

Documents upload can be integrated into a process definition by adding a user task node with an **Upload action** attached. This way you can interact with the process, and you can choose which file to upload.

:::info
User task nodes allow you to define and configure UI templates and possible actions for a certain template config node (ex: upload file button).
:::

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.12/docs_upload_proc.png)

To upload a document using a process, follow the next steps.

## Defining the process

1. Create a process definition.
2. Add the needed nodes:
    * start/end nodes
    * start/end milestone nodes
    * user task node
3. configure the user task node:
    * Configure the node
    * Configure the upload action:
        * Topics
        * Document type
        * Folder
    * (UI) Configure the upload button


## Configuring the process definition

### User task node

#### **Node Config**

* **Swimlane** - choose a swimlane (if there are multiple swimlanes on the process) to make sure only certain user roles have access only for certain process nodes - if there are no multiple swimlanes, the value is Default
* **Stage** - assign a stage to the node
* **Topic Name** - the topic name where the process engine listens for the response (this should be added to the platform and match the topic naming rule for the engine to listen to it) - will be set to `ai.flowx.updates.qa.persist.files.v1` (the value extracted from `KAFKA_TOPIC_DOCUMENT_PERSIST_IN`) 


:::caution
A naming pattern must be defined on the process engine configuration to use the defined topics. It is important to know that all the events that start with a configured pattern will be consumed by the Engine. For example, KAFKA_TOPIC_PATTERN is the topic name pattern where the Engine listens for incoming Kafka events.
:::

**Key Name** - will hold the result received from the external system, if the key already exists in the process values, it will be overwritten


![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.12/doc_upload_file_con.png)

#### **Actions**

##### Actions edit

* **Action type** - should be set to **Upload File**
* **Trigger type** (options are Automatic/Manual) - should be manual (triggered by the user)
* **Required type** (options are Mandatory/Optional) - should be set as optional
* **Reputable** - should be checked if the action can be triggered multiple times
* **Autorun Children** - when this is switched on, the child actions (the ones defined as mandatory and automatic) will run immediately after the execution of the parent action is finalized

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.12/action_edit_doc_plugin.png)

##### Parameters

* **Topics** - will be set to - `ai.flowx.in.document.persist.v1` (the value extracted from `KAFKA_TOPIC_DOCUMENT_PERSIST_IN`)
* **Document Type** - BULK
* **Folder** - allows you to configure a value by which the file will be identified in the future
* **Advanced configuration** (Show headers)- this represents a JSON value that will be sent on the headers of the Kafka message

:::info
Kafka topic names can be set by using (overwriting) the following environment variables in the deployment:

KAFKA_TOPIC_DOCUMENT_PERSIST_IN - default value: `ai.flowx.in.qa.document.persist.v1`

KAFKA_TOPIC_DOCUMENT_PERSIST_OUT - default value: `ai.flowx.updates.qa.document.persist.v1`

The above examples of topics are extracted from an internal testing environment, when setting topics for other environments, follow the next pattern, for example, `ai.flowx.updates.{{environment}}.document.persist.v1`.

:::

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.12/doc_plugin_upload_param.png)

### Milestone node

You can configure a start milestone node and an end milestone node before and after a user task. After adding the milestones, you can add a modal template (in this case a **Page**) to the start milestone node to display a modal screen (like in the example above).

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.12/milestone_page.png)

## Receiving the reply

Values expected in the reply body:

* customId
* fileId
* documentType
* documentLabel
* minioPath
* downloadPath
* noOfPages

:::info
You can view the response by accessing the **Audit log** menu.
:::

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.12/audit_log_doc_upload.png)

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