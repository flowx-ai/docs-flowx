# Using the plugin

After deploying the notifications plugin in your infrastructure, you can start sending notifications by configuring related actions in your [**process flow definitions**](../../../../../terms/flowx-process-definition).

Before adding the corresponding [**actions**](../../../../../terms/flowx-actions) in your process definition, you will need to follow a few steps:

* make sure all prerequisites are prepared, for example, the [notification templates](managing-notification-templates.md) you want to use
* the database is configured properly
* for each [**kafka**](../../../../../terms/flowx-kafka) event type, you will need two Kafka topics: 
    * one for the request sent from the [**engine**](../../../../../terms/flowxai-process-engine) to the plugin 
    * one for the corresponding reply

[Kafka configuration for Notifications plugin](../../../plugins-setup-guide/notifications-plugin-setup/notifications-plugin-setup.md#kafka-configuration)

:::info
The topic names configured for the plugin should match the ones used when configuring the engine and when adding plugin-related process actions:

* the Engine is listening for messages on topics with names of a certain pattern, make sure to use an outgoing topic name that matches the pattern configured in the Engine

More details: [here](../../../../../platform-setup-guides/flowx-engine-setup-guide/flowx-engine-setup-guide.md#configuring-kafka)

* to make a request to the plugin, the process definition needs to have an action of type `Kafka send` that has an action parameter with key `topicName` and the needed topic name as a value
* to receive a reply from the plugin, the process definition needs to have a receiving node with a node value with key `topicName` and the topic name as the value

:::
    
After all the setup is in place, you can start adding custom actions to the processes.

Let's go through a few examples. These examples cover both the configuration part, and the integration with the engine for all the use cases.

[Managing notification templates](managing-notification-templates.md)

[Send a notification](sending-a-notification.md)

[Send an email with attachments](sending-an-email-with-attachments.md)

[Forward notifications to an external system](forwarding-notifications-to-an-external-system.md)

[OTP flow](./otp-flow/otp-flow.md)
