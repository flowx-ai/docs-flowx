---
sidebar_position: 6
---

# Creating a user interface

## Creating a user interface with stepper structure

Follow these steps to create a stepper structure for your user interface using [**FLOWX Designer**](../../terms/flowx-ai-designer):

1. Open [**FLOWX Designer**](../../terms/flowx-ai-designer) and navigate to the **Definitions** tab.
2. Click the **New Process** button, located in the top-right corner using the provided **breadcrumbs**.
3. Start by adding a **start node** to initiate your UI configuration.
4. Insert two **user tasks** to represent the two steps within your UI configuration.
5. Conclude your process with an **end node**.
6. Utilize the **Navigation view** to establish a stepper structure consisting of two steps.


For a visual reference, see the image below:

![Stepper Structure](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/stepper_structure.gif)

:::info
All UI elements are configured via the [**UI designer**](../../terms/flowx-ai-ui-designer).
:::

### Testing the flow

1. From the **process definition**, click the **Start process** button.
2. Click **Start Process** and you will see the first step.


![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/ui_config_flow.gif)

## Adding a card with input

1. Go to your **user task** (representing the **first card** of your step).
2. Add a **`CARD`** (the UI card element).
3. Add a **Form** to it (Form elements group inputs together).
4. Add an **input** into the form:
   * Configure the **key** - you can use the key to retrieve the data from this element.
   * Configure a **label**.

![Adding input](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/adding_input_flow.gif)

### Testing the first input

1. **Start** the process again to see the configured UI.
2. The **input** is displayed.
3. Test the **input**.

![Test the input](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/testing_input.gif)

## Adding second input and a submit action

1. Go to your **user task** node and add a new input via **Node UI designer**.
2. Return to the process and add a new [**action rule**](../../building-blocks/actions/actions.md):
   * Configure the action - the action is called when the button is pressed - the action should be **Manual** (not automatic because it is triggered by a user).
   * Remember the name of the action - `saveDataFirstStep`.
3. Go back to the Node UI designer and add a button (link the **button** to the **action** based on the name).

![Second input](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/second_input.gif)
