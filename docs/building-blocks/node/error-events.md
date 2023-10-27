# Error Events

Error Events expand the capabilities of process modeling and error handling within BPMN processing. These Error Event nodes enhance the BPMN standard and offer improved control over error management.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/error_event_diagram.png)

## Error Intermediate boundary event (catch)

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/error_event.png#center)

### Key Characteristics

1. **Boundary of an Activity node or Subprocess:**
   - Error Events can only be used on the boundary of an activity, including subprocesses nodes. They cannot be placed in the normal flow of the process.

2. **Always Interrupt the Activity:**
   - It's important to note that Error Events always interrupt the activity to which they are attached. There is no non-interrupting version of Error Events.

3. **Handling Thrown Errors:**
   - A thrown error, represented by an Error Event, can be caught by an Error Catch Event. This is achieved specifically using an Error Boundary Event, which is placed on the boundary of the corresponding activity.

4. **Using error events on Subprocesses nodes**:
    - An error catch event can be linked to a subprocess, with the error source residing within the subprocess itself, denoted by the presence of an error end event, signifying an abnormal termination of the subprocess.


### Configuring an Error Intermediate boundary event

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/error_event_config.png)

* **Name**: Assign a name to the event for easy identification.
* **Condition**: Specify the condition that triggers the error event. Various script languages can be used for defining conditions, including:
    - MVEL
    - JavaScript
    - Python
    - Groovy


:::info
When crafting a condition, use a predefined key as illustrated below:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/error_events_key.gif)

For instance, in the example provided, we've taken a process key defined on a switch UI element and constructed a user-defined condition like this: input.application.switch == true.
:::

* **Priority**: Determine the priority level of this error event in relation to other error events added on the same node.

When multiple error events are configured for a node, and multiple conditions simultaneously evaluate to true, only one condition can interrupt the ongoing activity and advance the token to the next node. The determination of which condition takes precedence is based on the "priority" field.

If the "priority" field is set to "null," the system will randomly select one of the active conditions to trigger the interruption.

:::info
* `input.application.switch`: This represents a key to bind a value to the Switch UI element within the "application" part of the "input". It is used in this example to capture input or configuration from a user.

* `==`: This is an equality operator, and it checks if the value on the left is equal to the value on the right.

* `true` is a boolean value, which typically represents a state of "true" or "on."

So, when you put it all together, the statement is checking if the value of the "input.application.switch" is equal to the string "true." If the value of "input.application.switch" is indeed "true" (as a string), the condition is considered true. If the value is anything other than "true," the condition is false and the error is triggered.
:::

### Use Case: Handling Errors during User Task Execution

**Description:** This use case pertains to a page dedicated to collecting client contact data. Specifically, it deals with scenarios where users are given the opportunity to verify their email addresses and phone numbers.

:::info
In this scenario will create a process to validate a dummy card depending on the CVV entered.
:::

### Configuration:

1. **Error Boundary Events:** We will set up two error boundary events associated with a user task.

2. **Error Nodes:** These nodes will be responsible to redirect the user to other flows after the user's email address and phone number are validated based on the conditions defined.

3. **Flow Control:** Depending on the outcome of the validation process, users will be directed to different flows, which may involve displaying error modals as appropriate.

### Use matrix