---
sidebar_position: 4
---

# Splitting a document

Split a document into multiple parts. This might be the case, for example, when the client uploads a set of documents as a bulk scanned file that needs to be split into more separate files.

## Define needed Kafka topics

Kafka topic names can be set by using environment variables:

* `KAFKA_TOPIC_DOCUMENT_SPLIT_IN`
* `KAFKA_TOPIC_DOCUMENT_SPLIT_OUT`

:::caution
The Engine is listening for messages on topics with names of a certain pattern, make sure to use an outgoing topic name that matches the pattern configured in the Engine.
:::

## Request to split documents

Values expected in the request header:

* processInstanceId = process instance ID

Values expected in the request body:

* fileId = the id of the file to be split
* parts = a list of info about the expected document parts
  * documentType = document type
  * customId = the client ID
  * startIndex = start page number for this part
  * endIndex = end page number for this part
  * shouldOverride
  * pagesNo

## Response for document split

Values expected in the reply body:

* docs = list of documents
  * customId = client ID
  * fileId = file ID
  * documentType = document type
  * documentLabel = document label
  * minioPath = minio path for the converted file
  * downloadPath = download path for the converted file

Example:

```
{
    "docs": [
        {
            "customId": "FX04689",
            "fileId": 18047,
            "documentType": "TYPE1",
            "minioPath": "flowx-qa-194406/FX04689/18047_TYPE1.pdf",
            "downloadPath": "internal/files/18047/download"
        },
        {
            "customId": "FX04689",
            "fileId": 18048,
            "documentType": "TYPE2",
            "minioPath": "flowx-qa-194406/FX04689/18048_TYPE2.pdf",
            "downloadPath": "internal/files/18048/download"
        },
        {
            "customId": "FX04689",
            "fileId": 18049,
            "documentType": "TYPE3",
            "minioPath": "flowx-qa-194406/FX04689/18049_TYPE3.pdf",
            "downloadPath": "internal/files/18049/download"
        }
    ]
}
```