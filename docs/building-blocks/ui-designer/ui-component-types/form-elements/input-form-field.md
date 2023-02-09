---
sidebar_position: 1
---

# Input field

![Input](../../img/input_form_field.png)

## What is an input field?

An input field is a form element that enables users to input data with validations and can be hidden or disabled.

## Configuring the Input element

### Input settings

The Input Field offers the following configuration options:

   - [**General**](#general)
   - [**Properties**](#flowx-props)
   - [**Datasource**](#datasource)
   - [**Validators**](#validators)
   - [**Expressions**](#expressions)
   - [**UI Actions**](#ui-actions)
   - [**Input styling**](#input-styling)

#### General
   
* ** Process data key** - creates the binding between form element and process data, so it can be later used in [decisions](../../../node/exclusive-gateway-node.md), [business rules](../../../node/task-node/task-node.md) or [integrations](../../../node/message-send-received-task-node.md)

#### Properties

* **Label** - the label that appears on the input field
* **Placeholder** - the placeholder text that appears in the input field when it is empty
* **Type** - the type of data that the input field can accept, such as text, number, email, or password
* **Prefix** - a label that appears as a prefix to the input field
* **Suffix** - a label that appears as a suffix to the input field
* **Helpertext** - additional information about the input field (can be hidden inside an infopoint)

![](../../img/input_props.png)

#### **Datasource** 

The default value for the element can be configured here, this will autofill the input field when you will run the process.

![](../../img/input_datasource1.png)

![](../../img/input_datasource.png)

#### **Validators** 

There are multiple validators can be added to an input (more details [here](../../validators.md)).

![](../../img/input_validators.png)

#### **Expressions**  

The input field's behavior can be defined using JavaScript expressions for hiding or disabling the element. The following properties can be configured for expressions:
   
* **Hide** - JavaScript expression used to hide the Input Field when it returns a truthy value
* **Disabled** - JavaScript expression used to disable the Input Field when it returns a truthy value

:::info
It's important to make sure that disabled fields have the same expression configured under the path expressions → hide.
:::

![](../../img/input_expressions.png)

#### UI Actions

UI actions can be added to the Input Field to define its behavior and interactions.

![](../../img/input_ui_actions.gif)

You can find more information on how to configure a UI Action by checking the following section:

[UI Actions](../../ui-actions.md)

### Input styling

* The Input Field can be styled using valid CSS properties (more details [here](../../#styling))

![](../../img/input_form_field_styling.gif)
