---
sidebar_position: 1
---

# Root components

Root components are used to group different types of components, each having a different purpose:

* [**Form Group**](form-group.md) - used to group and configure the layout for multiple [**form elements**](../form-elements/)
* [**Container**](container.md) - used to group and configure the layout for multiple **components** of any type
* [**Custom** ](custom.md)- these are Angular components developed in the container application and passed to the SDK at runtime, identified here by the component name

![](../../img/root_components.gif)

The root component can hold a hierarchical component structure as follows

![](../../img/root_components_structure.png)

Available children for **Form Group** and **Container** are:

1. [**Container**](container.md) - used to group and align its children
2. [**Form**](../form-elements/) - used to group and align form field elements (**inputs**, **radios**, **checkboxes**, etc)
3. **Image** - allows you to configure an image in the document
4. **Text** - a simple text can be configured via this component, a basic configuration is available ([check here for more details](../../))
5. **Hint** - multiple types of hints can be configured via this component ([check here for more details](../../))
6. **Link** - used to configure a hyperlink that opens in a new tab
7. [**Button**](../buttons.md) - Multiple options are available for configuration, the most important part being the possibility to add actions
8. [**File Upload**](../buttons.md) - A specific type of button that allows you to select a file
9. [**Custom** ](custom.md)- custom components&#x20;

For more information about the available children for Form Group, check the following section:


[Form elements](../form-elements/form-elements.md)
