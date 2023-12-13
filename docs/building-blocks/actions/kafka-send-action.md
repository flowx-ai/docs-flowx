---
sidebar_position: 6
---

# Kafka Send Action 

Multiple options exist for this action type, adjustable via the FLOWX.AI Designer. Utilize the [**Actions**](../../terms/flowx-actions) tab at the node level for configuration, offering:

- [Action Edit](#action-edit)
- [Parameters](#parameters)


![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/kafka_send_action_confg.gif)

### Action Edit

- **Name** - internally used for distinguishing between different [actions](../actions/actions.md) within the process. Establish a clear naming convention for easy identification.
- **Order** - sets the running order for multiple actions on the same node.
- **Timer expression** - facilitates a delay if necessary, using [ISO 8601 duration format](../node/timer-events/timer-expressions.md#iso-8601) (e.g., `PT30S` for a 30-second delay).
- **Action type** - designate as **Kafka Send Action** for sending messages to external systems.
- **Trigger type** - set to Automatic.

:::info
The Kafka Send Action type is always **Automatic**. Typically, Kafka Send Actions are triggered automatically when the process reaches this step.
:::

- **Required type** (Mandatory/Optional) - **automatic** actions are typically set as **mandatory**. Manual actions can be either mandatory or optional.
- **Repeatable** - allows triggering the action multiple times if required.
- **Autorun Children** - when activated, child actions (mandatory and automatic) execute immediately after the parent action concludes.

### Parameters

Parameters can be added via the **Custom** option or by importing pre-defined parameters from an integration.

:::info
For detailed information on **Integrations management**, refer to [<u>**this link**</u>](../../platform-deep-dive/core-components/core-extensions/integration-management).
:::

- **Topics** - specifies the Kafka topics listened to by the external system for requests.
- **Message** - contains the message payload to be dispatched.
- **Advanced configuration (headers)** - represents a JSON value sent within the Kafka message headers.

![Parameters](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/message_send_parameters.png)

## Kafka Send Action scenarios

The Kafka Send action serves as a versatile tool, facilitating seamless communication across various systems and plugins. It enables efficient data transfer, robust document management, notifications, and initiation of processes.

This action finds application in numerous scenarios while configuring processes:

- **Communicating with External Services**
- **Interacting with Connectors** - For instance, integrating a connector in the FlowX.ai Designer [here](../../platform-deep-dive/integrations/building-a-connector.md#integrating-a-connector-in-flowxai-designer).
- **Engaging with Plugins:**
    - **Document Plugin:**
        - Generating, uploading, converting, and splitting documents - Explore examples [here](../../platform-deep-dive/plugins/custom-plugins/documents-plugin/using-documents-plugin).
        - Updating/deleting documents - Find an example [here](../../platform-deep-dive/plugins/custom-plugins/documents-plugin/using-documents-plugin/updating-deleting-document-files.md).
        - Optical Character Recognition (OCR) integration - View an example [here](../../platform-deep-dive/plugins/custom-plugins/ocr-plugin.md#scenario-for-flowxai-generated-documents).
    - **Notification Plugin:**
        - Sending notifications - Example available [here](../../platform-deep-dive/plugins/custom-plugins/notifications-plugin/using-notifications-plugin/sending-a-notification.md) and emails with attachments [here](../../platform-deep-dive/plugins/custom-plugins/notifications-plugin/using-notifications-plugin/sending-an-email-with-attachments.md).
        - One-Time Password (OTP) validation - Refer to this [example](../../platform-deep-dive/plugins/custom-plugins/notifications-plugin/using-notifications-plugin/otp-flow/).
        - Forwarding notifications to external systems - Explore this [example](../../platform-deep-dive/plugins/custom-plugins/notifications-plugin/using-notifications-plugin/forwarding-notifications-to-an-external-system.md).
    - **OCR Plugin**
    - **Customer Management Plugin**
    - **Task Management Plugin:**
        - Bulk operations update - Find an example [here](../../platform-deep-dive/plugins/custom-plugins/task-management/task-management.md#bulk-updates).
- **Requesting Process Data for Forwarding or Processing** - For instance, Data Search [here](../../platform-deep-dive/core-components/core-extensions/search-data-service.md).
- **Initiating Processes** - Starting a process via Kafka or using hooks. Find examples [here](../../flowx-designer/managing-a-process-flow/starting-a-process.md).

The Kafka Send action stands as a versatile facilitator, enabling smooth operations in communication, document management, notifications, and process initiation across diverse systems and plugins.
