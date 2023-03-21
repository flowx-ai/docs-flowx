---
sidebar_position: 5
---

# Switch

![](../../img/switch_form_field.gif)

A switch, a toggle switch, is another form element that can be utilized to create an intuitive user interface. The switch allows users to select a response by toggling it between two states. Based on the selection made by the user, the corresponding Boolean value of either true or false will be recorded and stored in the process instance values for future reference.

## Configuring the switch element

### Switch settings

The available configuration options for this form element are:

- [**General**](#general)
- [**Properties**](#properties)
- [**Datasource**](#datasource)
- [**Validators**](#validators)
- [**Expressions**](#expressions)
- [**UI actions**](#ui-actions)
- [**Switch styling**](#switch-styling)


#### General
   
* **Process data key** - creates the binding between form element and process data so it can be later used in [decisions](../../../node/exclusive-gateway-node.md), [business rules](../../../node/task-node/task-node.md) or [integrations](../../../node/message-send-received-task-node.md)

#### Properties

* **Label** - the label of the switch
* **Helpertext** - additional information about the radio (can be hidden inside an infopoint)

#### Datasource

* **Default Value** - the default value of the switch form field (it can be switched on or switched off)

#### Validators

The following validators can be added to a radio: `requiredTrue` and `custom` (more details [here](../../validators.md)).

![](../../img/switch_details.png)

#### Expressions

* **Hide** - JavaScript expression used to hide the Switch element when it returns a truthy value
* **Disabled** - JavaScript expression used to disable the Switch element when it returns a truthy value

#### UI actions

UI actions can be added to the switch element to define its behavior and interactions.

* Event - possible value: CHANGE
* Action Type - select the action type

:::info
For more details on how to configure a UI action, click [here](../../ui-actions.md).
:::

#### Switch styling

The label of the switch can be positioned either as `start` or `end`.

![](../../img/switch_styling.gif)

:::info
For more valid CSS properties, click [here](../../#styling).
:::

