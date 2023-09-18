---
sidebar_position: 7
---
# Languages

The FLOWX Headless CMS can store and manage languages. You can add a language and use it in almost any content management configuration.

![Languages](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.1/languages.png)

On the main screen inside **Languages**, you have the following elements:

* **Code** - not displayed in the end-user interface, but used to assure value uniqueness
* **Name** - the name of the language
* **Default** - you can set a language as **Default** (default values can't be deleted)

:::caution
When working with [substitution tags](./substitution-tags.md) or other elements that imply values from other languages defined in the CMS, when running a process, the default values extracted will be the ones marked by the default language.
:::

![Default values](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.1/lang_default_values.png)

* **Edit** - button used to edit a language

![Edit](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.1/edit_languages.png)

* **Delete** - button used to delete a language

:::warning
Before deleting a language make sure that this is not used in any content management configuration.
:::

* **New** - button used to add a new language

### Adding a new language

To add a new language, follow the next steps:

1. Go to **FLOWX Designer** and select the **Content Management** tab.
2. Select **Languages** from the list.
3. Choose a new **language** from the list.
4. Click **Add** after you finish.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.1/adding_new_language.gif)