---
sidebar_position: 3
---
# UI Designer

## What is UI Designer?

The FLOWX.AI platform offers a variety of ready-to-use [UI components](./ui-component-types/ui-component-types.md) that can be used to create rich web interfaces. These include common form elements like [input fields](./ui-component-types/form-elements/input-form-field.md), [dynamic dropdown menus](./ui-component-types/form-elements/select-form-field.md#example---dynamic-dropdowns), [checkboxes](./ui-component-types/form-elements/checkbox-form-field.md), [radio](./ui-component-types/form-elements/radio-form-field.md), and [switch buttons](./ui-component-types/form-elements/switch-form-field.md), as well as other UI elements like image, text, anchor links, etc. The properties of each component can be customized further using the details tab, and [design flexibility](./#styling) is achieved by adding styles or CSS classes to the pre-defined components. The UI templates are built in a hierarchical structure, with a root component at the top.

## Using UI designer

The FLOWX.AI platform includes an intuitive **UI Designer** for creating diverse UI templates. You can use various elements such as basic buttons, indicators, and forms, as well as predefined [collections](./ui-component-types/collection/collection.md) and [prototypes](./ui-component-types/collection/collection_prototype.md). To access the UI Designer, follow these steps:

1. Open **FLOWX.AI Designer** and select **Definitions** from the **Processes** tab.
2. Select a **process** from the process definitions list.
3. Click the **Edit** **process** button.
4. Select a **node** then click the **brush icon** in the Process Designer navigation menu to open the **UI Designer**.

![](./img/access_ui_designer.gif)

:::caution
The UI designer is available for [**User task**](../node/user-task-node/user-task-node.md) nodes and [**Milestone**](../node/milestone-node.md) nodes (nodes that require human interaction).
:::

After adding a specific component to the node, the right-side menu will display more configuration options.

:::caution
Depending on the [component type](./ui-component-types) different properties are available for configuration.
:::

![](./img/use_ui_designer3.gif)

## UI components

FLOWX.AI offers a wide range of [UI components](./ui-component-types) that can be customized using the UI Designer. For example, when configuring a [card](./ui-component-types/root-components/card) element (which is a root component), the following properties can be customized:


#### Settings

* **Message** - a valid JSON string that is pushed to the frontend application when the process reaches [user task](../node/user-task-node/user-task-node.md); this property is only available for [Root components](./ui-component-types/root-components/root-components.md)
* **Properties** - custom properties that vary depending on the component type
* **Has Accordion** (available only for **Card** component) - a Bootstrap accordion is a component that organizes content within collapsible items, allowing only one collapsed item to be displayed at a time

<div className= "image-scaled">

![](./img/ui_designer_settings.png)

</div>

[Root components](./ui-component-types/root-components)

By utilizing the UI Designer, users can easily create rich web interfaces with customizable UI components.

## Styling

In FLOWX.AI, styling options are available for components that group children, which can be found under the styling section. 

Users can customize the direction, alignment, gap, sizing, and spacing of their layout. These properties help to create well-organized and visually pleasing user interfaces.

For example, for a [card](./ui-component-types/root-components/card) component, the following properties are available for configuration:

* **Layout** - available for components that group children (more details about layouts can be found [here](https://tburleson-layouts-demos.firebaseapp.com/#/docs)):
   * Direction
   * Alignment
   * Wrap
   * Gap
* **Sizing** - fill, fixed or auto
* **Spacing** - margin and padding
* **Typography** - typography options allow users to set font styles, colors, text indentation, and other formatting options; these properties can be found under the **Typography** section
* **Background** - the Background section allows users to set the background color for their components
* **Border** - border properties can be customized under the **Border** section, users can set the radius, width, or color of their component's borders
* **Advanced** - for advanced customization, users can add CSS classes to pre-defined components, this option is available under the **Advanced** section

<div className= "image-scaled">

![](./img/ui_designer_styling.gif#center)

</div>

By utilizing these styling options in FLOWX.AI, users can create unique and visually appealing interfaces that meet their design requirements.

## Tree view

The Tree View panel displays the component hierarchy, allowing users to easily navigate through the different levels of their interface. 

Clicking on a specific component in the tree will highlight the selection in the editor, making it easy to locate and modify.

![](./img/ui_designer_tree1.gif)

For more information on the different types of components available in FLOWX.AI, please refer to the next section:

[Component types](./ui-component-types/ui-component-types.md)


