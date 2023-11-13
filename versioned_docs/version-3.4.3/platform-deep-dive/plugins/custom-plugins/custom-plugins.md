# Custom plugins

Let's get into a bit more detail about the custom plugins 🎛️

## Document management plugin

**Effortless document generation and safe-keeping** 

The document management plugin securely stores documents, facilitates document generation based on predefined templates and also handles conversion between various document formats.

It offers an easy-to-use interface for handling documents on event-based Kafka streams.

![high level architecture](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/document_service_architecture.svg)

[More about Documents plugin](../../plugins/custom-plugins/documents-plugin/documents-plugin.md)

## Notifications plugin

**Multi-channel notifications made easy**

The plugin handles various types of notifications:

* SMS (if a third party service is available for communication management)
* email notifications
* generating and validating OTP passwords for **user identity verification**

It can also be used to forward custom notifications to external outgoing services. It offers an intuitive interface for defining templates for each kind of notification and handles sending and auditing notifications easily.

![high level architecture](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/custom_plugins_architecture.svg)

[More about Notifications plugin](../../../platform-deep-dive/plugins/custom-plugins/notifications-plugin/notifications-plugin.md)

## Task management

**Helper for back-officers and supervisors, easy track, assignment management**

The Task Management plugin has the scope to show a process that you defined using FLOWX.AI Designer, using a more business-oriented view. It also offers interactions at the assignment level.

## Customer management

**Convenient and secure access to user data** 

Light CRM uses an elasticSearch engine to retrieve user details using partial matches on intricate databases.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/crm_plugin_archi.svg)

[More about Customer management plugin](./customer-management/customer-management.md)


## OCR plugin

**Automatic key information extraction** 

Used to easily read barcodes or extract handwritten signatures from PDF documents.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/ocr_plugin_archi.svg)

[More about OCR plugin](../custom-plugins/ocr-plugin.md)

## Reporting plugin

**Easy-to-read dynamic dashboards**

Use reporting plugin to build and bootstrap custom reports built on generic information about usage and processes.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/reporting_diag.png)

[More about Reporting plugin](../custom-plugins/reporting)

