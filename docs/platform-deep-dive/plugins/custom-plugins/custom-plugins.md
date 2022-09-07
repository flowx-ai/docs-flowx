# 📦 Custom plugins

Let's get into a bit more details about the custom plugins 🎛️

## Notifications plugin

**Multi-channel notifications made easy**. The notifications plugin handles various types of notifications:

* SMS
* push notifications to mobile devices,
* email notifications and
* generating and validating OTP passwords for **user identity verification**

It can also be used to forward custom notifications to external outgoing services. It offers an intuitive interface for defining templates for each kind of notification and handles sending and auditing notifications easily.

![high level architecture](../../img/custom_plugins_architecture.svg)

[What is the notification plugin?](../../../platform-deep-dive/plugins/custom-plugins/notifications-plugin/notifications-plugin.md)

## Document management plugin

**Effortless document generation and safe-keeping.** The document management plugin stores documents in a secure way, facilitates document generation based on predefined templates and also handles conversion between various document formats.

It offers an easy-to-use interface for handling documents on both REST and event based Kafka streams.

![high level architecture](../../img/document_service_architecture.svg)


[What is the document management plugin?](../../plugins/custom-plugins/documents-plugin/documents-plugin.md)


## OCR plugin

**Automatic key information extraction.** Used to easily read barcodes or extract handwritten signatures from pdf documents.

![](../../img/ocr_plugin_archi.svg)


[OCR service](../custom-plugins/ocr-plugin.md)


## CMS

**The go-to place for all taxonomies.** The plugin offers a convenient way of managing various definitions, list and content translations.

## Customer management

**Convenient and secure access to user data.** Light CRM uses an Elastic Search engine to user retrieve details using partial match on big databases.

![](../../img/crm_plugin_archi.svg)

[customer-management](custom-plugins/customer-management/)
