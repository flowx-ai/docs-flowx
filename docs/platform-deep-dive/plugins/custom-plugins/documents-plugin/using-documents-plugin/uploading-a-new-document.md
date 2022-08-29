# Uploading a new document

Documents management can be done via the REST API, for example adding various general documents needed in the processes, but it can also be integrated in the process steps via Kafka events.

## REST API

The plugin has the following options for managing documents and files via REST:

POST `{{documentUrl}}/internal/documents` - Create a document metadata

POST `{{documentUrl}}/internal/documents/upload` - Create the document metadata and upload the file

POST `{{documentUrl}}/internal/documents/DOCUMENT_ID/upload` - Upload a file

GET `{{documentUrl}}/internal/documents` - Get all documents

GET `{{documentUrl}}/internal/documents/DOCUMENT_ID` - Get document by id

GET `{{documentUrl}}/internal/documents/DOCUMENT_ID/files` - Get all files of a document

GET `{{documentUrl}}/internal/files/DOCUMENT_ID` - Get file by id

GET `{{documentUrl}}/internal/files/FILE_ID/download` - Download file by id

DELETE `{{documentUrl}}/internal/documents/DOCUMENT_ID` - Delete document by id

DELETE `{{documentUrl}}/internal/documents/DOCUMENT_ID` - Delete document by type

DELETE `{{documentUrl}}/internal/files/FILE_ID` - Delete file by id

### Steps for managing a document

**Step 1:** Check if a document with the specific type exists:

```
GET {{documentUrl}}/internal/documents
```

possible response of a document with one file uploaded:

```
[
    {
        "createdBy": "anonymous",
        "createdDate": "2020-12-12T10:26:37.807+0000",
        "lastModifiedBy": null,
        "lastModifiedDate": null,
        "id": 1001,
        "currentFile": {
            "createdBy": "anonymous",
            "createdDate": "2020-12-12T10:26:37.820+0000",
            "lastModifiedBy": null,
            "lastModifiedDate": null,
            "id": 2,
            "name": "REQUEST.pdf",
            "size": 142655,
            "mimeType": "application/pdf",
            "path": "file/REQUEST.pdf",
            "deleted": false,
            "notes": "write_completed",
            "parentId": null,
            "childIds": [],
            "encryptionKey": null,
            "destinationSystem": "minio",
            "cloned": false
        },
        "files": [
            {
                "createdBy": "anonymous",
                "createdDate": "2020-12-12T10:26:37.820+0000",
                "lastModifiedBy": null,
                "lastModifiedDate": null,
                "id": 2,
                "name": "REQUEST.pdf",
                "size": 142655,
                "mimeType": "application/pdf",
                "path": "file/REQUEST.pdf",
                "deleted": false,
                "notes": "write_completed",
                "parentId": null,
                "childIds": [],
                "encryptionKey": null,
                "destinationSystem": "minio",
                "cloned": false
            }
        ],
        "documentType": "REQUEST",
        "documentTypeDescription": null,
        "processInstanceId": null,
        "customId": null,
        "deleted": false,
        "systemOwner": "account"
    }
]
```

**Step 2:** If you want to upload a new version of this file you should use:

```
POST {{documentUrl}}/internal/documents/{{documentId}}/upload
form-data body with file 
```

**Step 3:** If you want to create a new document use:

```
POST {{documentUrl}}/internal/documents/upload
form-data body with file +
{
    "documentType": "SOME_TYPE"
}
```

## Defining process actions

### Define needed Kafka topics

Kafka topic names can be set by using environment variables:

* `KAFKA_TOPIC_DOCUMENT_PERSIST_IN`
* `KAFKA_TOPIC_DOCUMENT_PERSIST_OUT`

:::caution
The Engine is listening for messages on topics with names of a certain pattern, make sure to use an outgoing topic name that matches the pattern configured in the Engine.
:::

### Persist a document uploaded to a business process

**Step 1:** Go to the Visual Flow Designer and add a Kafka send event

**Step 2:** Configure the Kafka send event with the name of the template, `KAFKA_PERSIST_IN_TOPIC` value for the Kafka topic and the specific body

**Step 3:** Go to the Visual Flow Designer and add a Kafka receive event

**Step 4:** Configure on what topic you want to receive the response, on the value of K`AFKA_PERSIST_OUT_TOPIC`

### Save a document

Used to save documents for specific clients. E.g. save client image

#### Request

Values expected in the request body:

* payload = document payload
* documentType = document type
* documentLabel = document label
* customId = client ID
* shouldOverride = boolean, true to override an existing document already saved, false not to override

Example: `{ "payload": "IMAGE_BASE64", "documentType": "ID_PIC", "documentLabel": "User photo", "customId": "FX04689", "shouldOverride": true }`

#### Reply

Values expected in the reply body:

* customId = client ID
* fileId = file ID
* documentType = document type
* documentLabel = document label
* minioPath = minio path for the converted file
* downloadPath = download path for the converted file
* error = error description

Example: `{ "customId": "FX04689", "fileId": 18002, "documentType": "BULK", "documentLabel": null, "minioPath": "flowx-qa-194303/FX04689/18002_BULK.pdf", "downloadPath": "internal/files/18002/download", "error": null }`