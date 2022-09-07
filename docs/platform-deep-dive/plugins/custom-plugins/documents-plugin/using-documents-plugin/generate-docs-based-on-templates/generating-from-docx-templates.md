---
sidebar_position: 2
---

# Generating from docx templates

Used to generate documents based on previously defined document templates. The following example covers generating documents using DOCX templates.

## Define needed Kafka topics

Kafka topic names can be set by using environment variables:

* `KAFKA_TOPIC_DOCUMENT_GENERATE_PDF_IN`
* `KAFKA_TOPIC_DOCUMENT_GENERATE_PDF_OUT`

:::caution
The Engine is listening for messages on topics with names of a certain pattern, make sure to use an outgoing topic name that matches the pattern configured in the Engine.
:::

## Example: Generate a PDF with a barcode on top

You can use this plugin to generate a pdf from a docx document and attach a barcode on the document. The bar code will encode information about process id, client type , document type and will respect the pattern: xxxx\_xxxx\_xxxx

**Step 1:** Create a new document template, you can use the REST API

**Step 2:** Upload your docx file for that template

**Step 3:** Go to the Visual Flow Designer and add a Kafka send event

**Step 4:** Configure the Kafka send event with the name of the template, `KAFKA_GENERATE_IN_TOPIC` value for the Kafka topic and the specific body

**Step 5:** Go to the Visual Flow Designer and add a Kafka receive event

**Step 6:** Configure on what topic you want to receive the response, on the value of `KAFKA_GENERATE_OUT_TOPIC`

## Request to generate document

Values expected in the request body:

* eventType = event type (e.g. DOCUMENTS\_GENERATED)
* clientType = client type
* documentList = list of documents to be generated with properties (name and value to be replaced in the document templates)
  * sectionsToKeep = list of sections that should be visible in the document
  * customId = client ID
  * properties = list of keys and values that should be replaced in the document template
    * name = key name that should be replaced
    * value = key value that should be used when replacing keys in document template
    * links = used for tables where you need to add multiple rows
      * name = key name that should be replaced
      * value = key value that should be used when replacing keys in document template

Example:

```
{
    "eventType": "GENERATE_DOCUMENT",
    "clientType": "PF",
    "documentList": [
        {
            "sectionsToKeep": [],
            "customId": "FX04689",
            "templateName": "TYPE1",
            "properties": [
                {
                    "name": "$clientIdentification.firstName",
                    "value": "Test"
                },
                {
                    "name": "$clientIdentification.lastName",
                    "value": "Test"
                }
            ]
        },
        {
            "sectionsToKeep": [],
            "customId": "FX04689",
            "templateName": "TYPE2",
            "properties": [
                {
                    "name": "$date",
                    "value": "01.01.2021"
                },
                {
                    "name": "$clientIdentification.firstName",
                    "value": "Test"
                },
                {
                    "name": "$clientIdentification.lastName",
                    "value": "Test"
                },
                {
                    "name": "$data.generateDocuments.TYPE2.currency",
                    "links": [
                        {
                            "name": "$data.generateDocuments.TYPE2.iban",
                            "value": "RO99FLOW0000RON000009999"
                        }
                    ],
                    "value": "RON"
                }
            ]
        },
        {
            "sectionsToKeep": [
                "profession",
                "employer",
                "education"
            ],
            "customId": "FX04689",
            "templateName": "TYPE3",
            "properties": [
                {
                    "name": "$date",
                    "value": "23.02.2021"
                },
                {
                    "name": "$clientIdentification.firstName",
                    "value": "dsdsss"
                },
                {
                    "name": "$clientIdentification.lastName",
                    "value": "sdsds"
                },
                {
                    "name": "$clientIdentification.cnp",
                    "value": "0000000000000"
                },
                {
                    "name": "$clientIdentification.nationality",
                    "value": "ROMANIA"
                },
                {
                    "name": "$clientIdentification.phoneNumber",
                    "value": "0711111111"
                },
                {
                    "name": "$clientIdentification.emailAddress",
                    "value": "test@test.ro"
                }
            ]
        }
    ]
}
```

## Reply

Response sent back to the engine after generating documents.

Values expected in the event body:

* eventType = event type
* generatedFiles = list of generated files
  * customId = client ID
  * templateName = template name (document type)
  * minioPath = minio path for the converted file
  * downloadPath = download path for the converted file

Example:

```
{
    "eventType": "DOCUMENTS_GENERATED",
    "generatedFiles": {
        "TYPE1": {
            "customId": "FX04689",
            "templateName": "TYPE1",
            "minioPath": "flowx-qa-194406/FX04689/18044_TYPE1.pdf",
            "downloadPath": "internal/files/18044/download"
        },
        "TYPE2": {
            "customId": "FX04689",
            "templateName": "TYPE2",
            "minioPath": "flowx-qa-194406/FX04689/18043_TYPE2.pdf",
            "downloadPath": "internal/files/18043/download"
        },
        "TYPE3": {
            "customId": "FX04689",
            "templateName": "TYPE3",
            "minioPath": "flowx-qa-194406/FX04689/18045_TYPE3.pdf",
            "downloadPath": "internal/files/18045/download"
        }
    }
}
```