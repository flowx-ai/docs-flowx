# Collection Prototype

## Description

This additional container type is needed to allow multiple prototypes to be defined for a single [Collection](./). This allows elements from the same collection to be displayed differently.&#x20;

For example, suppose you are creating a piece of UI in which the user is presented a list of possible products from which to choose, but you want one of the products to be highlighted as the recommended one. This example requires a collection with two **collection prototypes** (one for the normal product and one for the recommended one).

## Configurable properties:

1. Prototype Identifier Key - the key where to look in the iterated object to determine the prototype to be shown - in the below example the key is "type"
2. Prototype Identifier Value - the value that should be present at the **Prototype Identifier Key** when this `COLLECTION_PROTOTYPE` should be displayed - in the below example the value is "normal" or "recommended"

## Example

![Collection with two prototypes](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/collection_prototype.png)

![Collection prototype for normal product](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/collection_prototype1.png) 

![Collection prototype for recommended product](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/collection_prototype2.png)

Source collection data example for products:

```javascript
products: [
    {
      name: 'Product One Plus',
      description: 'The plus option'
      type: 'normal'
    },
    {
      name: 'Product Two Premium',
      description: 'This is premium product'
      type: 'recommended',
    },
    {
      name: 'Product Basic',
      description: 'The most basic option'
      type: 'normal'
    },
    {
      name: 'Gold Product',
      description: 'The gold option'
      type: 'normal',
    }
  ]
```

The above configuration will render:

![Collection with two prototypes as rendered by the SDK](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/collection_prototype_render.png)

## Adding elements with UI Actions

There are a few differences you need to take into consideration when configuring elements that make use of **UI Actions** inside a **Collection Prototype**.

To showcase these differences, we'll use the next example:

![Rendered Collection which lists two employees](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/collection_prototype_elements.png)

We have a [Collection](./collection.md) with two employees and we want to provide the user with the option of selecting one of the employees (e.g.: to allow for further processing in the next steps of the process).

### Step 1 - Defining the Node Action

To select one employee from the list, we first must add an [Action](../../../actions.md) to the [User Task Node](../../../node/user-task-node/user-task-node.md) this UI is attached to:

![Node Action that saves the selected employee to the process's data.](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/col_prototype_node_action.png)

This **save-item** action is **manual** (since it will be triggered by the user) and **optionally** (since selecting an employee is not a requirement to go to the next [Node](../../../node/) in the process).

To allow the user to change his mind about the selected employee, this action is also marked as **Repeatable**.

Keep in mind to check the **Data to send** section. Here we are telling the platform where we want the selected employee (for which the user pressed the **Select** button) to be saved in the **process data**. In this example, we want it to be saved under the `selectedEmployee` key.

### Step 2 - Adding the Button & UI Action

Now that we have a [Node Action](../../../actions.md) defined, we can go ahead and add the **Select** button in the UI of the [User Task](../../../node/user-task-node/user-task-node.md) which contains the Employees Collection.

![Select employee button and its UI Action configuration](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/col_prototype_add_button.png)

**Collection Item Save Key** field has an important role in the UI Action configuration of the **Select** button. This field represents how we pass the value of the **Employee** that the user has selected to the [Node Action](../../../actions.md) that we created in [**Step 1**](#step-1---defining-the-node-action), named _save-item_.

In our example, we set **Collection Item Save Key** to be `selectedEmployee`.

:::warning
**IMPORTANT:** `selectedEmployee` key is how we expose the data from the **Collection** to the [Node Action](../../../actions.md). It is **imperative** that the name in the **Collection Item Save Key** is the same as the one used in the **Data to send** input in the Node Action.
:::

The button and UI action are mostly configured as any other Button and UI Action would be configured.

### Result

This is how the process data looked before we pressed the **Select** button for an employee:

![Process data before selecting an employee](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/col_prototype_result.png)

This is how the process data looks after we selected an employee from the list (notice the new field `selectedEmployee`):

![Process data after selecting an employee](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/col_prototype_result1.png)
