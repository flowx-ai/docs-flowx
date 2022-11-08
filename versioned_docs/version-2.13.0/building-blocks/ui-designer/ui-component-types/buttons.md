---
sidebar_position: 3
---

# Buttons

There are   two types of buttons, similar to each other but with different purposes:

### Button

There are used to do an action, unblock the token to move forward in the process, send an OTP, and open a new tab.

Sections that can be configured regarding general settings:

1. Flowx props
   * Button type: fill/flat
   * Label
2. Styling - where extra CSS can be added
3. Expressions -  you can add here `if` expressions that will be evaluated to be true or false
4. **UI Action -** that defines what action will trigger ([more details on how to configure](../ui-actions.md))

![Button configuration for a save action](../img/button_config.png)



### File Upload Button

This button will be used to select a file and do custom validation on it. Only the Flowx props will be different. Additional properties:

* Accepted file types
* Invalid file type error
* Max file size
* Max file size error

![](../img/file_upload_button.png)