# Demonstrating intermediate message events in business processes

Business processes often involve dynamic communication and coordination between different stages or departments. Intermediate Message Events play an important role in orchestrating information exchange, ensuring effective synchronization, and enhancing the overall efficiency of these processes.

In the following example, we'll explore a credit card request process that encompasses the initiation of a customer's request, verification based on income rules, approval or rejection pathways, and communication between the client and back office. 

## Credit card request process example

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/throw_catch_intermediate_process.png)

## Activities

### Default swimlane (client)

- **Start Event:** Marks the commencement of the process.
- **User Task 1:** Customer Requests New Credit Card - Involves the customer submitting a request for a new credit card.
- **Exclusive Gateway:** The process diverges based on the verification result (dependent on income rules).
  - **Path A (Positive Verification):**
    - **User Task 2:** Approve Credit Card Application - The bank approves the credit card application.
    - **End Event:** Denotes the conclusion of the process for approved applications.
  - **Path B (Negative Verification):**
    - **Parallel Gateway Open:** Creates two parallel zones.
    - **First Zone:**
      - **User Task 3:** Reject Credit Card Application - The bank rejects the credit card application.
      - **Message Throw Intermediate Event:** Signals the rejection, throwing a message to notify the back office department.
      - **End Event:** Signifies the end of the process for rejected applications.
    - **Second Zone:**
      - **User Task 3:** Reject Credit Card Application - The bank rejects the credit card application.
      - **Message Catch Intermediate Event:** The back office department is notified about the rejection.
      - **Send Message Task**: A notification is sent via email to the user about the rejection.
      - **End Event:** Signifies the end of the process for rejected applications.


#### Backoffice swimlane

- **Message Catch Intermediate Event:** The back office department awaits a message to proceed with credit card issuance.
- **Send Message Task:** Send Rejection Letter - Involves sending a rejection letter to the customer.


## Sequence flow

```mermaid
graph TD
  Start -->|Start Event| UserTask1[User Task 1: Customer Requests New Credit Card]
  UserTask1 -->|Income Verification| Gateway1{Exclusive Gateway}
  Gateway1 -->|Positive Verification| UserTask2[User Task 2: Approve Credit Card Application]
  UserTask2 -->|Approved| endA[End Event: Approved Applications]
  Gateway1 -->|Negative Verification| ParallelGateway{Parallel Gateway}
  ParallelGateway -->|First Zone| UserTask3A[User Task 3: Reject Credit Card Application]
  UserTask3A -->|Credit Card Rejected| MessageThrow[Message Throw Intermediate Event]
  MessageThrow -->|Notify Back Office| endB[End Event: Rejected Applications]
  ParallelGateway -->|Second Zone| UserTask3B[User Task 3: Reject Credit Card Application]
  UserTask3B -->|Credit Card Rejected| MessageCatch[Message Catch Intermediate Event]
  MessageCatch -->|Notify User| SendEmailTask[Send Message Task: Send Rejection Letter]
  SendEmailTask -->|Email Sent| endC[End Event: Rejected Applications]
```


## Message flows

A message flow connects the Message Throw Intermediate Event to the Message Catch Intermediate Event, symbolizing the communication of credit card approval from the credit card approval task to the card issuance department.

In summary, when a customer initiates a new credit card request, the bank verifies the information. If approved, a message is thrown to trigger the credit card issuance process. The Message Catch Intermediate Event in the credit card issuance department awaits this message to proceed with issuing and sending the credit card to the customer.

# Configuring the BPMN Process

To implement the illustrated BPMN process for the credit card request, follow these configuration steps:

1. **FLOWX.AI Designer**: Open FLOWX.AI Designer.

2. **Draw BPMN Diagram**: Import the provided BPMN diagram into FLOWX.AI Designer or recreate it by drawing the necessary elements. 

3. **Customize Swimlanes**: Set up the "Default" and "Backoffice" swimlanes to represent different departments or stakeholders involved in the process. This helps visually organize and assign tasks to specific areas.

4. **Define User Tasks**: Specify the details for each user task. Configure User Task 1, User Task 2, and User Task 3 with appropriate screens. 

* **User Task 1** - *customer_request_new_credit_card*

:::tip
We will use the value from `application.income` key added on the slider UI element to create an MVEL business rule in the next step.
:::

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/user_task1_interm.gif)

* **User Task 2** - *approve_credit_card_request*

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/user_task2_interm.gif)

In this screen, we configured a modal to display the approval.

* **User Task 3** - *reject_credit_card_request*

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/user_task3_interm.gif)

5. **Configure Gateways**: Adjust the conditions for the Exclusive Gateway based on your business rules. Define the conditions for positive and negative verifications, guiding the process down the appropriate paths. 

:::tip
In our example, we used an MVEL rule to determine eligibility based on the income of the user. We used the `application.income` key configured in the first user task to create the rule.
:::

![MVEL Example](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/mvel_example_gateway.png)

Also, add Parallel gateways to open/close parallel paths.

![Parallel](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/parallel_open_close.gif)

6. **Set Message Events**: Configure the Message Throw and Message Catch Intermediate Events in the "Default" and "Backoffice" swimlanes, respectively. Ensure that the Message Catch Intermediate Event in the "Backoffice" swimlane is set up to wait for the specific message thrown by the Message Throw event. This facilitates communication between different stages of the process.

7. **Define End Events**: Customize the End Events for approved and rejected applications in the "Default" swimlane. Also, set an end event in the "Backoffice" swimlane to indicate the completion of the back-office tasks. 

8. **Configure Send Message Task**: Set up the Send Message Task in the "Backoffice" swimlane to send a rejection letter as a notification to the user. 

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/sending_a_notification.png)

Define the content of the rejection letter, the method of notification, and any additional details required for a seamless user experience. More details on how to configure a notification can be found in the following section:

[Sending a notification](../../../../platform-deep-dive/plugins/custom-plugins/notifications-plugin/using-notifications-plugin/sending-a-notification.md)

9. **Validate and Test**: Validate the BPMN diagram for correctness and completeness. Test the process flow by simulating different scenarios, such as positive and negative verifications.


##  Configuring the intermediate message events

Configuring message events is a crucial step in orchestrating effective communication and synchronization within a business process. Whether you are initiating a message throw or awaiting a specific message with a catch, the configuration process ensures seamless information exchange between different components of the workflow. 

In this section, we explore the essential steps and parameters involved in setting up message events to optimize your BPMN processes. 

From correlating events to defining data structures, each configuration choice plays a pivotal role in shaping the flow and coordination of your business processes.

### Message throw intermediate event

A Message Throw Intermediate Event is an event in a process where a message is sent to trigger communication or action with another part of the process (can be correlated with a catch event). It represents the act of throwing a message to initiate a specific task or notification. The event creates a connection between the sending and receiving components, allowing information or instructions to be transmitted. Once the message is thrown, the process continues its flow while expecting a response or further actions from the receiving component.

<div class= "image-scaled">

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/message_throw_intrmdt.png)

</div>

#### General Configuration

* **Can go back?** - Setting this to true allows users to return to this step after completing it. When encountering a step with `canGoBack` false, all steps found behind it will become unavailable.

* **Correlate with catch message events** - The dropdown contains all catch messages from the process definitions accessible to the user, in our example: `throwcatchsequenceloan`

:::info
It is imperative to define the message for the catch event first. This ensures its availability in the dropdown menu when configuring the throw intermediate event. 
:::

* **Correlation key** - This is a process key that uniquely identifies the instance to which the message is sent. In our example, we utilized the `processInstanceId` as the identifier, dynamically generated at runtime. This key is crucial for establishing a clear and distinct connection between the sender and recipient in the messaging process.


:::info
A correlation key is a key that can have the same value across multiple instances, and it is used to match instances based on their shared value. It is not important what the attribute's name is (even though we map based on this attribute), but rather the value itself when performing the matching between instances.
:::

* **The Send data field** - This feature empowers you to define a JSON structure containing the data to be transmitted alongside the message. In our illustrative example, we utilized dynamic data originating from user input, specifically bound to a slider UI element.

```json
{"value": "${application.income}"}
```

* **Stage** - Assign a stage to the node.

In the end, this is what we have:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/message_throw_config.png)


### Message catch intermediate event

A Message Catch Intermediate Event is a type of event in a process that waits for a specific message before continuing with the process flow. It enables the process to synchronize and control the flow based on the arrival of specific messages, ensuring proper coordination between process instances.

<div class= "image-scaled">

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/message_catch_intrmdt.png)

</div>

#### General Configuration

* **Can go back?** - Setting this to true allows users to return to this step after completing it. When encountering a step with `canGoBack` false, all steps found behind it will become unavailable.
* **Correlate with throwing events** - The dropdown contains all catch messages from the process definitions accessible to the user (must be the same as the one assigned in Message throw intermediate event)
* **Correlation key** - Process key used to establish a correlation between the received message and a specific process instance (must be the same as the one assigned in Message throw intermediate event).
* **Receive data** - The process key that will be used to store the data received from the throw event along with the message.
* **Stage** - Assign a stage to the node.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/message_catch_intrmdt_cfg.png)


## Testing the final result

After configuring the BPMN process and setting up all the nodes, it is crucial to thoroughly test the process to ensure its accuracy and effectiveness. 

:::info
We will test the path where the user gets rejected.
:::

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/testing_the_proc_interm.gif)

In the end, the user will receive this notification via email:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/notification_received.png)