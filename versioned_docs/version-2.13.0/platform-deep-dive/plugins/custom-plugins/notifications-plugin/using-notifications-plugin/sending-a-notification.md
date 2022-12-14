---
sidebar_position: 2
---

# Sending a notification

The plugin can be used for sending many kinds of notifications such as emails or SMS notifications. It can be easily integrated in one of your business processes.

## **Configuring the process**

To configure a business process that sends notifications you must follow the next steps:

* use FLOWX.AI Designer app to create/edit a [notification template](./managing-notification-templates.md)
* use Process Designer to add a [**Message send task**](../../../../../building-blocks/node/message-send-received-task-node.md#message-send-task) and a [**Message received task**](../../../)
* configure the needed [actions](../../../../../building-blocks/actions.md)
* configure the request body
* configure the needed [Kafka topics](../../../plugins-setup-guide/notifications-plugin-setup/notifications-plugin-setup.md)

The following values are expected in the request body:

|        Key        |                                          Definition                                         |                |
| :---------------: | :-----------------------------------------------------------------------------------------: | :------------: |
|      language     |                               The language that should be used                              |    Mandatory   |
|    templateName   |                      The name of the notification template that is used                     |    Mandatory   |
|      channel      |                             Notification channel: SMS/MAIL                                  |    Mandatory   |
|     receivers     |                          Notification receivers: email/phone number                         |    Mandatory   |
|    senderEmail    |                                  Notification sender email                                  |    Optional    |
|     senderName    |                                   Notification sender name                                  |    Optional    |
|    attachments    | Attachments that are sent with the notification template (only used for MAIL notifications) |    Optional    |

:::info
Check the detailed example below.
:::

![](../../../../img/notification_archi_send.png)

### Define needed Kafka topics

Kafka topic names can be set by using environment variables:

* `KAFKA_TOPIC_NOTIFICATION_INTERNAL_IN` - topic used to trigger the request to send a notification
* `KAFKA_TOPIC_NOTIFICATION_INTERNAL_OUT` - topic used for sending replies after sending the notification


## Example: send a notification from a business flow

![](../../../../img/send_a_notification_proc.png)

Let's pick a simple use-case, say we need to send a new welcome letter when we onboard a new customer. The steps are the following:

1. Configure the template that you want to use for the welcome email, see the previous section, [Managing notification templates](managing-notification-templates.md) for more information.

![](../../../../img/send_a_notif_from_business_flow.gif)

2. Use the FLOWX.AI Designer to add a [**Message send task**](../../../../../building-blocks/node/message-send-received-task-node.md#message-send-task) and a [**Message received task**](../../../).
3. On the **Message send task** add a proper configuration to the action, the Kafka topic and request body message to be sent:

* **Topics** - `KAFKA_TOPIC_NOTIFICATION_INTERNAL_IN` - `flowx-notifications-qa`
* **Message** (expected parameters):
    * templateName
    * channel
    * language
    * receivers
* **Headers** - it is always `{"processInstanceId": ${processInstanceId}}`

![](../../../../img/notif_params_send.png)

4. On the **Message received task** add the needed topic to receive the kafka response - `KAFKA_TOPIC_NOTIFICATION_INTERNAL_OUT` - `ai.flowx.updates.qa.notification.request.v1`.

![](../../../../img/generate_notif_receive.png)

5. Run the process and look for the response (you can view it via the **Audit log**) or checking the responses on the Kafka topic defined at `KAFKA_TOPIC_NOTIFICATION_INTERNAL_OUT` variable.

![](../../../../img/notif_send_resp.png)


Response example at `KAFKA_TOPIC_NOTIFICATION_INTERNAL_OUT`:

```json
{
  "identifier": null,
  "templateName": "welcomeLetter",
  "language": "en",
  "error": null
}
```
