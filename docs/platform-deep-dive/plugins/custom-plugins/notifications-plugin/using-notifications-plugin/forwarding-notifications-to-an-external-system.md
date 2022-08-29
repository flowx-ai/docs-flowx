# Forward notifications to an external system

If the Notification service is not directly connected to a SMTP / SMS server and you want to use an external system for sending the notifications, you can use the notification plugin just to forward the notifications to your custom implementation.

### Define needed Kafka topics <a href="#define-needed-kafka-topics" id="define-needed-kafka-topics"></a>

Kafka topic names can be set by using environment variables:

* `KAFKA_TOPIC_NOTIFICATION_INTERNAL_IN` - topic used to trigger the request to send a notification
* `KAFKA_TOPIC_NOTIFICATION_EXTERNAL_OUT` - the notification will be forwarded on this topic to be handled by an external system
* `KAFKA_TOPIC_NOTIFICATION_INTERNAL_OUT` - topic used for sending replies after sending the notification

### Example: send a notification from a business flow

Let's pick a simple use-case, say we need to send a new welcome letter when we onboard a new customer. The steps are the following:

**Step 1:** Configure the template that you want to use for the welcome email, you will need to make a request to the API for adding this new template.

Make a `POST` request to `NOTIFICATION_URL/api/template` with the following body:

```
{
    "name": "welcomeLetter",
    "type": "MAIL",
    "strategyType": "MAIL",
    "active": true,
    "context": [],
    "language": "ro",
    "subject": "Welcome!",
    "body": "<!DOCTYPE html> <html xmlns:th='<http://www.thymeleaf.org>'> <head> <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' /> </head> <body> <p>Hello!</p> <p th:text='${lastName}'></p> <p th:text='${firstName}'></p></body> </html>",
    "params": [
        {
            "key": "lastName",
            "mandatory": false
        },
        {
            "key": "firstName",
            "mandatory": false
        },
        {
            "key": "clientId",
            "mandatory": true
        }
    ]
}
```

**Step 2:** Check that the needed topic is configured correctly `KAFKA_TOPIC_NOTIFICATION_EXTERNAL_OUT`

**Step 3:** Use the FLOWX Designer to add a new Kafka send event to the correct node in the process definition

**Step 4:** Add the proper configuration to the action, the Kafka topic and message to be sent.