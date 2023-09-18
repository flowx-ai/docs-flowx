---
sidebar_position: 2
---

# Card

A card is a graphical component that allows grouping and alignment of other components. It can also include an accordion element for expanding and collapsing content.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.0/card_element1.gif)

The following properties that can be configured:

### **Settings**

* **Message** - a valid JSON that describes the data pushed to the frontend application when the process reaches a specific user task
* **Title** - the title of the card
* **Subtitle** - the subtitle of the card
* **Card style** - you can choose between a border or raised style
* **Has accordion?** - this feature allows you to add a Bootstrap accordion, which organizes content within collapsible items and displays only one collapsed item at a time

:::caution
Accordion element is not available for mobile.
:::

<div className= "image-scaled">

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.0/ui_designer_settings.png)

</div>

### **Styling**

* **Layout** - This property is available for components that group children and includes the following options:

    * Direction - Horizontal / Vertical (for example, select *Vertical*)
    * Justify (H) - (for example, select *center*)
    * Align (V) - this option allows you to align components vertically
    * Gap - you can set the gap between components

More layout demos available below:

[Layout Demos](https://tburleson-layouts-demos.firebaseapp.com/#/docs)

This example will generate a card with the following layout configuration:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.0/card_layout.png)

For more information about styling and layout configuration, check the following section:

[UI Designer](../../ui-designer.md#styling)

### **Validating elements**

To validate all form elements under a card, you need to set the key of the form/element on the property of the button: _Forms To Validate._

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.0/card_validate.png)