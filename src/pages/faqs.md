# FAQs:question:

<br/>

## What is the impact of clearing Redis?

When Redis is cleared, the system will automatically regenerate the Redis information using the available data in the database. However, it's essential to be aware that clearing the entire Redis dataset may lead to a temporary performance degradation until the data is fully recreated.

In extreme scenarios, users might encounter situations where refreshing their screens becomes necessary to resend any data that was lost in transit during the clearance process. It's crucial to consider these factors and communicate them effectively to users to minimize any potential disruptions in the user experience.

<br/>

## How can I generate A4 PDF documents using HTML templates?

You should include the following bit of CSS in the HTML templates:

```css
@page {
    @bottom-left {
        content: element(footer);
        vertical-align: top;
        padding-top: 10px;
    }
    @top-right {
        content: element(header);
        vertical-align: bottom;
        padding-bottom: 10px;
    }
    size: A4 portrait;
    margin-top:1.8cm;
    margin-left:3cm;
    margin-right:2cm;
    margin-bottom:4.4cm;
}
```
<br/>

## What are the adjustable elements of the signature area?

The size of the area cannot be changed, you can however, edit or format the text inside it.

<br/>

## How are S3 buckets organized?

The FLOWX platform can be set up to use any S3 compatible cloud storage solution for storing documents. These use buckets in order to organize files. The platform uses the following buckets:

* the main bucket prefix for the platform can be configured in the [Document Plugin configuration](https://docs.flowx.ai/documents-plugin/prerequisites#54ac96e3-fbfc-45bc-b884-aa4683975d21)&#x20;
* the docx templates for generating documents, are stored under `PLATFORM_PREFIX-svc-docx-template`
* custom application related files (not specific to a certain user) are stored under `PLATFORM_PREFIX-svc-file`
* documents related to a process instance are stored under `PLATFORM_PREFIX-process-id-PROCESS_ID`
* the OCR plugin stores extracted signatures in the bucket named `extracted-signatures` , this can be configured with the environment variable `MINIO_OCR_SIGNATURE_BUCKET`

All storage solution have space limitations that need to be taken into consideration. Any necessary file cleanup can be done [via the provided REST API](https://docs.flowx.ai/documents-plugin/using-the-plugin/update-delete-document-files) or by configuring the lifecycle of the bucket contents.

Here's an example of how the lifecycle configuration can be done on MinIO:

[Min.IO docs](https://docs.min.io/docs/minio-bucket-lifecycle-guide.html)

## What does the notification plugin use for template management?

We use the [Thymeleaf](https://www.thymeleaf.org/) engine to define templates for all types of notifications: we use text based templates for email subjects, sms and push notifications and html templates for email bodies.

<br/>

## Do OTPs expire?

Yes, OTPs have a certain validity, it can be configured in the notifications plugin. The default value is set to 10 minutes.

<br/>

## What happens if I generate more OTPs for a certain action?

If a new OTP is generated for the same user and channel (phone number, email address), the previously generated OTP is invalidated when the new one is saved. The latest generated OTP must be used by the user to continue the flow.

<br/>

## Does FLOWX need a data warehouse/data lake?

FLOWX implementation is not conditioned by the existence of a data warehouse.

Connecting to raw data sources can be done as long as there are APIs that provide that data (for example an API for a CRM can access customer information or create new information about existing or new customers).

<br/>

## What databases does FLOWX have APIs for?

Oracle, MongoDB, PostgreSQL. Connecting directly to a database is done through Kafka connectors.

<br/>

## What other API services can FLOWX connect to?

FLOWX can connect to any API - SOAP, REST, etc.

<br/>

## How does FLOWX orchestrate the data flow?

FLOWX orchestrates the data flow by modeling business processes using BPMN concepts.&#x20;

There are "send event" nodes that send events to other systems on an event bus (Kafka). These events are transformed into calls to the various APIs that are orchestrated by FLOWX.

<br/>

## What is the FLOWX scalability limit, regardless of the size of the available infrastructure?

There is no clear limit given by the platform, which can scale horizontally so that it can support loads of tens of thousands of users per second. Usually, the limitations are given by the systems they orchestrate or by hardware limitations.

FLOWX was created to orchestrate business processes that involve several steps, business rules between these steps, user interactions, and other systems.

<br/>

## What kind of UI can FLOWX generate?

The FLOWX Platform is able to generate screens based on a business flow but it can also orchestrate custom screens developed by a developer so all need can be addressed in terms of UI.

<br/>

## What information does FLOWX store and for how long?

FLOWX stores data during a business process. There is a routine that, depending on the configuration, deletes processes older than a certain number of days.

<br/>

## What kind of data structure does FLOWX have?

FLOWX does not have a predefined data structure.

<br/>

## How is data from a newly created field recorded in the legacy databases?

Each input has a key based on which the data is saved in the process database.
At a certain point, the data is sent to a legacy system through an adapter. At that moment, the mapping is made between the key on which the information was saved and the key on which that information must reach another system.
