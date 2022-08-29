# Getting URLs to documents

There might be cases when you will need to urls pointing to uploaded documents so they can be send to and used by another integration.

In this case, you will need to add a custom action in the process that will request the urls from the documents plugin.

## Define needed Kafka topics

Kafka topic names can be set by using environment variables:

* `KAFKA_TOPIC_DOCUMENT_GET_URLS_IN` - the topic that listens for the request from the engine
* `KAFKA_TOPIC_DOCUMENT_GET_URLS_OUT` - the topic on which the engine will expect the reply

{% hint style="warning" %}
The Engine is listening for messages on topics with names of a certain pattern, make sure to use an outgoing topic name that matches the pattern configured in the Engine.
{% endhint %}

## Request to retrieve URLs

Used to get URLs for documents. For example, get documents URLs to send them to the notification plugin and attach them to emails.

Values expected in the request body:

* types = list of document types

Example:

```
{ 
    "types": [ 
        "TYPE1", 
        "TYPE2" 
    ] 
}
```

## Reply with URLs

Response for documents URLs

Values expected in the reply body:

* success = boolean, true if the document exists and the URL was generated
* fullName = document file full name
* fileName = document file name without extension
* fileExtension = document file extension
* url = full download URL

Example:

```
[
    {
        "success": true,
        "fullName": "3952_TYPE1.pdf",
        "fileName": "3952_TYPE1",
        "fileExtension": "pdf",
        "url": "<http://SOME_URL/3952_TYPE1.pdf?X-Amz-Algorithm=SOME_ALGORITHM&X-Amz-Credential=SOME_CREDENTIAL&X-Amz-Date=20210223T113621Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=>"
    },
    {
        "success": true,
        "fullName": "3953_TYPE2.pdf",
        "fileName": "3953_TYPE2",
        "fileExtension": "pdf",
        "url": "<http://SOME_URL/3953_TYPE2.pdf?X-Amz-Algorithm=SOME_ALGORITHM&X-Amz-Credential=SOME_CREDENTIAL&X-Amz-Date=20210223T113621Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=>"
    }
]
```