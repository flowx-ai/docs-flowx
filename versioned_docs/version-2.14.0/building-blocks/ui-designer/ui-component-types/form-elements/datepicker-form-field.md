# DatePicker Form field

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.14/datepicker_form_field.png)

The DatePicker (Calendar Picker) is a lightweight component that allows end users to enter or select a date value.&#x20;

:::info
The default Date Picker value is `DD.MM.YYYY`
:::

The available configuration options for this form element are:

#### Datepicker settings

1. General
   * **Key** - creates the biding between form element and process data so it can be later used in [decisions](../../../node/exclusive-gateway-node.md), [business rules](../../../node/task-node/task-node.md) or [integrations](../../../node/message-send-received-task-node.md)
2. Flowx props
   * **Field Placeholder** - placeholder when the field has no value
   * **Field Label** - the label of the input
   * **Min Date** - set the minimum valid date selectable in the DatePicker
   * **Max Date** - set the maximum valid date selectable in the DatePicker
   * **Min Date, Max Date error** - when a Date is introduced by typing, define the error message to be displayed
3. **Validators** - multiple validators can be added to a select (more details [here](../../validators.md))
4. **Data source**
   * **Default Value** - the default values of the DatePicker element
5. Expressions
   * **Disabled expressions** - JavaScript expressions that should be evaluated as true or false. It's important to make sure that hidden fields also have the same expression configured under expressions → hide
   * **Hide Expression** - JavaScript expressions used to hide components when they're truthy

#### Datepicker styling

* valid CSS properties (more details [here](../../#styling))

An example of a DatePicker in form, with the DatePicker open:

![DatePicker Form element example](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.14/datepicker_styling.png)