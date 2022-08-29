# Plugins Setup guide

In order to set up a plugin in your environment, you will have to go through the following steps:

* make sure you have all the prerequisites deployed on your environment (for example a Redis cache instance, a DB instance, etc)
* make the necessary configurations for each plugin (DB connection data, related Kafka topic names, etc)

Once you have deployed the necessary plugins in your environment, you can start integrating them in your process definitions.

All of them listen for Kafka events sent by the Engine and performed certain actions depending on the received data. They can also send data back to the Engine.

Some of them require some custom templates to be configured, for these cases, REST APIs are provided.

Let's go into more details on setting up and using each of them:

#### More details about the notification plugin

[notifications-plugin-setup](notifications-plugin-setup/)

#### More details about the customer management plugin


[customer-management-plugin-configuration](customer-management-plugin-configuration)


#### More details about the OCR plugin


[ocr-plugin-setup](ocr-plugin-setup)


#### More details about the document management plugin


[documents-plugin-setup](documents-plugin-setup/)


#### More details about the task management plugin


[task-management-plugin-setup](task-management-plugin-setup/)
