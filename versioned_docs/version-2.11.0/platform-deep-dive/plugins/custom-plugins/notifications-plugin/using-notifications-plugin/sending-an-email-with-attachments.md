# Sending an email with attachments

Using the notification plugin for sending emails with attachments needs the same configuration as sending regular notifications.

The notification template needs to be saved and the corresponding Kafka topic needs to be set.

[Send a notification](sending-a-notification.md)

## **Defining process actions**

### Example: send an email notification with attached files from a business flow

Let's pick a simple use-case, say we need to send a copy of a contract signed by a new customer. Before setting the action for the notification, another action will be needed in order to first save the new contract using the documents plugin.

[Uploading a new document](../../documents-plugin/using-documents-plugin/uploading-a-new-document.md)

The steps for sending the notification are the following:

**Step 1:** Configure the template that you want to use for the email, see the [Managing notification templates](managing-notification-templates) section for more information.

**Step 2:** Check that the needed topics are configured correctly:

`KAFKA_TOPIC_NOTIFICATION_INTERNAL_IN`

`KAFKA_TOPIC_NOTIFICATION_INTERNAL_OUT`

**Step 3:** Use the FLOWX Designer to add a new Kafka send event to the correct node in the process definition

**Step 4:** Add the proper configuration to the action, the Kafka topic and message to be sent.

The message to be sent to Kafka will look something like:

```
{
  "templateName" : "contractCopy",
  "identifier" : "text",
  "language": "en",
  "receivers" : [ "someone@somewhere.com" ],
  "contentParams" : {
    "clientId" : "clientId",
    "firstName" : "first",
    "lastName" : "last"
  },
  "attachments" : [ {
    "filename" : "contract",
    "path" : "MINIO_BUCKET_PATH/contract.pdf"
  } ]
}
```