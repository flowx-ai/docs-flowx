---
sidebar_position: 5
---

# Updating / deleting document files

The documents plugin ca also be used to make updates to the files stored for the documents, it is possible to update files or delete them from a document.

## Define needed Kafka topics

Kafka topic names can be set by using environment variables:

* `KAFKA_TOPIC_FILE_UPDATE_IN`
* `KAFKA_TOPIC_FILE_UPDATE_OUT`
* `KAFKA_TOPIC_FILE_DELETE_IN`
* `KAFKA_TOPIC_FILE_DELETE_OUT`

:::caution
The Engine is listening for messages on topics with names of a certain pattern, make sure to use an outgoing topic name that matches the pattern configured in the Engine.
:::

## Update a document file

Used to update document files

### Request

Values expected in the request body:

* fileId = file ID
* customId = client ID

Sent body example: `{ "fileId": 1001, "customId": "FX04689" }`

### Reply

Values expected in the reply body:

* customId = client ID
* fileId = file ID
* documentType = document type
* documentLabel = document label
* minioPath = minio path for the converted file
* downloadPath = download path for the converted file
* error = error description

Sent body example: `{ "customId": "JX04627", "fileId": 17779, "documentType": "CERT", "documentLabel": "Certificat", "minioPath": "flowx-qa-193243/26192244/17779_CERT.pdf", "downloadPath": "internal/files/17779/download", "error": null }`

## Deleting files from a document

Used to delete files after bulk upload.

### Request&#x20;

Values expected in the request body:

* customId = client ID
* fileId = file ID
* documentType = document type

Example: `{ "customId": "FX04689", "fileId": 1001, "documentType": "TYPE1" }`

### Reply

Values expected in the reply body:

* customId = client ID
* fileId = file ID
* documentType = document type
* error = error description

Example: `{ "customId": "FX04689", "fileId": 1001, "documentType": "TYPE1", "error": null }`