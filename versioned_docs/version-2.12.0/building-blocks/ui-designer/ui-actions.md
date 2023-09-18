---
sidebar_position: 2
---

# UI Actions

A generated [button](./ui-component-types/buttons.md) or [custom component](./ui-component-types/root-components/custom.md) can be linked to an [action](../actions.md) via a UI Action. If the action is just a method to interact with the process the UI Action adds information about how that UI should react: should a loader appear after executing the action, should a modal be dismissed, or if some default data should be sent back to the process.

UI actions create a link between an [**action**](../actions.md) and a [**button**](./ui-component-types/buttons.md) component or a [**custom component**](./ui-component-types/root-components/custom.md). This informs the button to execute the given action when pressed. Other options are available for configuration when setting an action to a button and are detailed below:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/ui-designer/ui_actions.gif)

There are two main types of UI Actions:

#### Process UI Actions

This is a UI Action that describes how a Button (generated or custom) should interact with a process Manual action.

First, we need to configure the (manual) Action that will be referred from the UI Action. For this Action the important elements that we need to configure from a User task point of view are:

The first thing before configuring the UI action is to create the [Action](../actions.md) from the Actions tab in Process Designer. For more information on how to add an action to a node check the following section:


[Adding an action to a node](../../flowx-designer/managing-a-process-flow/adding-an-action-to-a-node.md)

1. The action **type** should be **manual**
2. **Keys** - it has two important implications
   * Firstly, this is a prefix of the keys that will send back by the UI Action link to this action. For example, if we have a big form with a lot of elements but we need an action that just sends the email back (maybe creating email validation functionality) we will add just the key of that field: `application.client.email`; if we need a button that will send back all the form elements that have keys that start with `application.client` we can add just this part
   * Second, a backend validation will be run to accept and persist just the data that start with this prefix. If we have three explicit keys, `application.client.email`, `application.client.phone`, `application.client.address` and we send `application.client.age`this key will not be persisted

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/ui-designer/ui_action_key.png)

When this prerequisite is ready we can define the UI Action (:exclamation:**Important: UI Actions and Actions should be configured on the same node**).

Multiple configurations are available:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/ui-designer/ui_actions_multiple_configs.png)

1. **Events** - you can add an event depending on the element that you select (CLICK, CHANGE, SCROLL) :exclamation:not available for _UI Actions_ on [Custom Components](./ui-component-types/root-components/custom.md)
2. **Action Type** - this dropdown will be pre-filled for Process UI Actions: DISMISS, ACTION, START\_PROCESS\_INHERIT, UPLOAD, [EXTERNAL](ui-actions.md#external-ui-actions)
3. **Node Action Name** - dropdown with available actions for this node. If the dropdown is empty please add a manual action that is required before we create the UI Action.
4. **UI Action Name** - **this becomes** important when the action is used in a [**Custom component**](./ui-component-types/root-components/custom.md) as it will be used to trigger the action. For UI actions added on a generated button component this name is just descriptive
5. **Custom Body** - this is the default response in JSON format that will be merged with any extra parameters added explicitly when executing the action, by a web application (from a custom component)
6. **Form To Validate** - can be a key of a form group or a key of a generated form element and will be used to validate all elements under that key
7. **Show loader?** - a loader will be displayed if this option is true until a web-socket event will be received (new screen or data)
8. **Dismiss Process?** - if the UI Actions is added on a subprocess and this parameter is true, triggering this UI action will dismiss the subprocess view (useful for modals subprocess)

#### External UI Actions

Used to create an action that will open a link in a new tab

If we toggle the EXTERNAL type a few new options are available:

1. **URL** - web URL that will be used for the external action
2. **Open in new tab** - this option will be available to decide if we want to run the action in the current tab or open a new one

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/ui-designer/ui_action_external.png)

For more information on how to add actions and how to configure a UI, check the following section:

[Managing a process flow](../../flowx-designer/managing-a-process-flow/managing-a-process-flow.md)
