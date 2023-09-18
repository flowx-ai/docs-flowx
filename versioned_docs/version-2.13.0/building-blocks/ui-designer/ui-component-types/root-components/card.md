# Card

A card is a simple element that allows component grouping and alignment. It has the option to enable/disable an accordion element.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release-notes/card_element1.gif)

Properties that can be configured:

#### **Settings**

1. **General** - where you define the **Message**
    * **Message** - describes the data pushed to the frontend application when the process reaches this user task; should be a valid JSON
2. **FLOWX props** - title and subtitle
3. **Has accordion?** - The Bootstrap accordion is a component that organizes content within collapsible items. Accordion allows the display of only one collapsed item at a time.

:::caution
Accordion element is not available for mobile.
:::

<div className= "image-scaled">

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/card_component_settings.png)

</div>

#### Styling

**Layout** - available for components that group children, more details about layouts can be found here. The following styling properties can be edited:

* Direction - Vertical (column)
* Alignment - Align(H): start; Align(V): end
* other CSS properties