---
sidebar_position: 1
---

# Input field

![Input](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.14/input_form_field.png)

## What is Input field?

This is a simple element that allows to input data, it has validations, and can be hidden or disabled.

## Configuring the Input element

### Input settings

The available configuration options for this form element are the following:


   - [**General**](#general)
   - [**Flowx props**](#flowx-props)
   - [**Validators**](#validators)
   - [**Datasource**](#datasource)
   - [**Expressions**](#expressions)
   - [**UI Actions**](#ui-actions)
   - [**Input styling**](#input-styling)

#### General
   
* **Key** - creates the binding between form element and process data, so it can be later used in [decisions](../../../node/exclusive-gateway-node.md), [business rules](../../../node/task-node/task-node.md) or [integrations](../../../node/message-send-received-task-node.md)

#### **Flowx props**
   
* **Placeholder** - placeholder when the field has no value
* **Label** - the label of the input
* **Type** - text/number/email/password - based on this configuration look and feel will expect a string or a number
* **Display as** - it can be displayed as box or line
* **Suffix** - a label that will be added as a suffix
* **Prefix** - a label that will be added like a prefix

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.14/input_props.png)

#### **Validators** 

There are multiple validators can be added to an input (more details [here](../../validators.md)).

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.14/input_validators.png)

#### **Datasource** 

The default value for the element can be configured here, this will autofill the input field when you will run the process.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.14/input_datasource1.png)

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.14/input_datasource.png)

#### **Expressions**  

The following properties can be configured for expressions:
   
* **Hide** - JavaScript expressions used to hide components when they're truthy
* **Disabled** - JavaScript expressions that should be evaluated as true or false. It's important to make sure that disabled fields have the same expression configured under the path expressions → hide

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.14/input_expressions.png)

#### UI Actions

You can add UI actions to the input element.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.14/input_ui_actions.png)

You can find more information on how to configure a UI Action by checking the following section:

[UI Actions](../../ui-actions.md)

#### Input styling

* valid CSS properties (more details [here](../../#styling))

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.14/input_form_field_styling.png)
