---
sidebar_position: 3
---

# Checkbox Form field

![](../../img/checkbox_form_field.png)

A checkbox is a form element that allows users to select one or more options from the given options.

The available configuration options for this form element are:

#### Checkbox settings

1. **General**
   * **Key** - creates the biding between form element and process data so it can be later used in [decisions](../../../node/nodes-types/exclusive-gateway-node.md), [business rules ](../../../node/nodes-types/task-node/)or [integrations](../../../node/nodes-types/message-send-received-task-node.md)
2. **Validators** - multiple validators can be added to a select (more details [here](../../validators.md))
3. **Data source**
   * **Default Value** - the default value of the checkbox
   * **Source Type** - it can be Static, Enumeration, or Process Data
4. **Expressions**
   * **Hide** - javascript expressions used to hide components when they're truthy
   * **Disabled expressions** - javascript expressions that should be evaluated as true or false. It's important to make sure that hidden fields also have the same expression configured under expressions -> hide

#### Checkbox styling

* valid CSS properties (more details [here](../../#styling))

A checkbox with three options and a column layout will look like this.&#x20;

![](../../img/checkbox_styling.png)