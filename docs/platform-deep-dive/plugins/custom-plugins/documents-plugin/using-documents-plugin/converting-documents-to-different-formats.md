---
sidebar_position: 3
---

# Converting documents to different formats

Convert a document to a different format, for example convert a pdf to jpeg.

## Define needed Kafka topics

Kafka topic names can be set by using environment variables:

* `KAFKA_TOPIC_FILE_CONVERT_IN`
* `KAFKA_TOPIC_FILE_CONVERT_OUT`

:::caution
The Engine is listening for messages on topics with names of a certain pattern, make sure to use an outgoing topic name that matches the pattern configured in the Engine.
:::

## Request to convert document

Values expected in the request body:

* fileId = file ID that will be converted
* to = file extension to convert to

Sent body example: `{ "fileId": 1001, "to": "image/jpeg" }`

## Response for file conversion

Values expected in the reply body:

* customId = client ID
* fileId = file ID
* documentType = document type
* documentLabel = document label
* minioPath = minio path for the converted file
* downloadPath = download path for the converted file

Sent body example: `{ "customId": "FX04689", "fileId": 1001, "documentType": "TYPE1", "documentLabel": "TYPE1", "minioPath": "flowx-qa-194406/FX04689/18052_TYPE1.jpg", "downloadPath": "internal/files/18052/download" }`