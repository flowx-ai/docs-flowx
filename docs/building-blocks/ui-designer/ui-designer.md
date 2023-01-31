---
sidebar_position: 3
---
# UI Designer

## What is UI Designer?

The FLOWX.AI platform offers a variety of ready-to-use [UI components](./ui-component-types/ui-component-types.md) that can be used to create rich web interfaces. These include common form elements like [input fields](./ui-component-types/form-elements/input-form-field.md), [dynamic dropdown menus](./ui-component-types/form-elements/select-form-field.md#example---dynamic-dropdowns), [checkboxes](./ui-component-types/form-elements/checkbox-form-field.md), [radio](./ui-component-types/form-elements/radio-form-field.md), and [switch buttons](./ui-component-types/form-elements/switch-form-field.md), as well as other UI elements like image, text, anchor links, etc. The properties of each component can be customized further using the details tab, and [design flexibility](./#styling) is achieved by adding styles or CSS classes to the pre-defined components. The UI templates are built in a hierarchical structure, with a root component at the top.

The FLOWX.AI platform includes an intuitive **UI Designer** for creating diverse UI templates. You can use various elements such as basic buttons, indicators, and forms, as well as predefined [collections](./ui-component-types/collection/collection.md) and [prototypes](./ui-component-types/collection/collection_prototype.md). To access the UI Designer, follow these steps:


1. Open **FLOWX Designer** and select **Definitions** from the **Processes** tab.
2. Select a **process** from the process definitions list.
3. Click the **Edit** **process** button.
4. Select a **node** then click the **brush icon** in the Process Designer navigation menu to open the **UI Designer**.


![](./img/access_ui_designer.gif)

:::caution
The UI designer is available for [**User task**](../node/user-task-node/user-task-node.md) nodes and [**Milestone**](../node/milestone-node.md) nodes (nodes that require human interaction).
:::

## Using the UI Designer

After adding a specific component to the node, the right-side menu will display more configuration options.

:::caution
Depending on the component type different properties are available for configuration.
:::

![](./img/use_ui_designer.gif)

For example, for a [card](./ui-component-types/root-components/card.md) element (as in the example above), the following properties can be configured:

#### Settings

1.  **Message** - :exclamation:available for [Root components](./ui-component-types/root-components/root-components.md); describes the data pushed to the frontend application when the process reaches this [user task](../node/user-task-node/user-task-node.md); should be a valid JSON
2. **Properties** - depending on the component type, custom properties will be available here
3. **Has Accordion** (available only for **Card** component) - the Bootstrap accordion is a component that organizes content within collapsible items. Accordion allows the display of only one collapsed item at a time. 

<div className= "image-scaled">

![](./img/ui_designer_settings.png)

</div>

#### Styling

2. **Layout** - available for components that group children, more details about layouts can be found [here](https://tburleson-layouts-demos.firebaseapp.com/#/docs). The following properties can be edited:
   * Direction
   * Alignment
   * Gap
4. **Sizing** - use sizing to edit width, height, min W/H, max W/H or overflow
3. **Spacing** - margin, and padding can be adjusted using spacing
5. **Typography** - use to manipulate fonts, font color, text indentation etc.
6. **Background** - set the color of a background
7. **Border** - set the radius, borders style, width or color
8. **Advanced** - add CSS classes to each of the pre-defined components

<div className= "image-scaled">

![](./img/ui_designer_styling.gif)

</div>

#### Tree view

This panel is used for displaying component hierarchy. Clicking on a specific component in the component tree will highlight the selection in the editor.

![](./img/ui_designer_tree.gif)

For more information about Component types, check the next section:

[Component types](./ui-component-types/ui-component-types.md)
