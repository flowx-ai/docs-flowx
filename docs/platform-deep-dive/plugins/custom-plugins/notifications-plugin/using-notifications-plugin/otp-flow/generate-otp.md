# Generate OTP

There are some cases when you will need to generate an OTP (One Time Password) from a business flow, for example when validating an email account.

The notifications plugin handles both the actual OTP code generation and sending the code to the user using a defined [notification template](../managing-notification-templates.md).

![](../../../../../img/otp_archi.png)

## Define needed Kafka topics

Kafka topic names can be set by using environment variables:

* `KAFKA_TOPIC_OTP_GENERATE_IN`
* `KAFKA_TOPIC_OTP_GENERATE_OUT` - after the OTP is generated and sent to the user, this is the topic used to send the response back to the Engine.

:::caution
The Engine is listening for messages on topics with names of a certain pattern, make sure to use an outgoing topic name that matches the pattern configured in the Engine.
:::

## Request to generate an OTP

Values expected in the request body:

* templateName: the name of the notification template that is used (created using the [WYSIWYG](../../../../wysiwyg.md) editor)
* channel: notification channel: SMS / MAIL
* recipient: notification receiver: email / phone number
* notification template content parameters (ex. clientId): parameters that should be replaced in the [notification template](../managing-notification-templates.md)

![](../../../../../img/notifications_params.png)

## Response from generate OTP

Values expected in the reply body:

* processInstanceId = process instance ID
* clientId = the client id (in this case the SSN number of the client)
* channel = notification channel used
* otpSent = confirmation if the notification was sent: true or false
* error = error description, if any


Example:

![](../../../../../img/otp_response.png)

## Example: generate an OTP from a business flow

It is important to identify what is the business identifier that you are going to use to validate that OTP, it can be, for example, a user identification number.

1. Configure the templates that you want to use (for example, an SMS template).
2. Check that the needed topics are configured correctly: the topic used to generate OTP (`KAFKA_TOPIC_OTP_GENERATE_IN`) and the topic used to receive the response (`KAFKA_TOPIC_OTP_GENERATE_OUT`).
3. Use the FLOWX.AI Designer to add a new Kafka send event to the correct node in the process definition.
4. Add the proper configuration to the action, the Kafka topic, and configure the body message.

![](../../../../../img/kafka_config_otp.png)

5. Add a node to the process definition (for the Kafka receive event).
6. Configure on what key you want to receive the response on the process instance params.

![](../../../../../img/otp_config1.png)