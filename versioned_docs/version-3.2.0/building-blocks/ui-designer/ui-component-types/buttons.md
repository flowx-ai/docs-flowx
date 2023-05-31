---
sidebar_position: 3
---

# Buttons

There are two types of buttons available, each with a different purpose. These types are:

* [Basic button](#basic-button)
* [File upload button](#file-upload)

![](../img/basic_buttons.png#center)

## Basic button

Basic buttons are used to perform an action such as unblocking a token to move forward in the process, sending an OTP, and opening a new tab.

### Configuring a basic button

When configuring a basic button, you can customize the button's settings by using the following options:

- [**Properties**](#properties)
- [**UI action**](#ui-action)
- [**Button styling**](#button-styling)


Sections that can be configured regarding general settings:

#### Properties
   
* **Label** - it allows you to set the label that appears on the button

#### UI action 

Here, you can define the UI action that the button will trigger.

* **Event** - possible value: `CLICK`
* **Action Type** - select the action type

![](../img/button1.png)


More details on how to configure UI actions can be found [here](../ui-actions.md).

### Button styling

#### Properties

This section enables you to select the type of button using the styling tab in the UI Designer. There are four types available:

* Primary
* Secondary
* Ghost
* Text

![](../img/button_type.gif)


:::info
For more information on valid CSS properties, click [here](../ui-designer.md#styling)
:::

## File upload 

This button will be used to select a file and do custom validation on it. Only the Flowx props will be different. 


### Configuring a file upload button

When configuring a file upload button, you can customize the button's settings by using the following options:

- [**Properties**](#properties)
- [**UI action**](#ui-actions)
- [**Button styling**](#button-styling)


Sections that can be configured regarding general settings:

#### Properties
   
* **Label** - it allows you to set the label that appears on the button
* **Accepted file types** - the accept attribute takes as its value a string containing one or more of these unique file type specifiers, [separated by commas](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#set-of-comma-separated-tokens), may take the following forms:

| Value                                                                                                                     | Defintion                                                           |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| audio/*                                                                                                                   | Indicates that sound files are accepted                             |
| image/*                                                                                                                   | Indicates that image files are accepted                             |
| video/*                                                                                                                   | Indicates that video files are accepted                             |
| [MIME type](https://html.spec.whatwg.org/multipage/infrastructure.html#valid-mime-type-with-no-parameters) with no params | Indicates that files of the specified type are accepted             |
| string starting with U+002E FULL STOP character (.)  (for example, .doc, .docx, .xml)                                    | Indicates that files with the specified file extension are accepted |

* **Invalid file type error**
* **Max file size**
* **Max file size error**

Example of an upload file button that accepts image files:

![](../img/file_upload_img.png)

#### UI action 

Here, you can define the UI action that the button will trigger.

* **Event** - possible value: `CLICK`
* **Action Type** - select the action type

![](../img/file_upload_action.png)

:::info
More details on how to configure UI actions can be found [here](../ui-actions.md).
:::

### Button styling

The file upload button can be styled using valid CSS properties (more details [here](../ui-designer.md#styling)
