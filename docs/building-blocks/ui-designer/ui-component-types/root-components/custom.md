---
sidebar_position: 3
---

# Custom Component

## Overview

Custom components are developed in the web application and referenced here by component identifier. This will dictate where the component is displayed in the component hierarchy and what actions are available for the component.

To add a custom component in the template config tree, we need to know its unique identifier and the data it should receive from the process model.


![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/ui-designer/ui_designer_custom.png)

The customizable properties encompass:

* **Identifier**: Defines the display placement and available actions for the custom component.
* **Input Keys**: Specifies the paths within the process model from which the components draw their data.
* **UI Action**: Empowers the custom component by defining actions accessible to it.

<div className= "image-scaled">

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/ui-designer/ui_designer_custom_settings.png#center)

</div>


## Prerequisites before creation

* **Angular Knowledge**: You should have a good understanding of Angular, as custom components are created and imported using Angular.

* **Angular CLI**: Ensure that you have Angular CLI installed.

* **Development Environment**: Set up a development environment for Angular development, including Node.js and npm (Node Package Manager).

* **Component Identifier**: You need a unique identifier for your custom component. This identifier is used for referencing the component within the application.

## Creating a Custom component

Follow these steps to craft a custom component in Angular:

1. Navigate to your preferred directory within the FLOWX.AI project.
2. Generate a new Angular component either manually or through Angular CLI:

```bash
ng generate component your-component 
```

This will create a structure akin to the following:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/loader_comp%20copy.png)

In the above example we created a custom loader component:

```typescript 
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input() showLoader: boolean = false;
}
```

:::info
For detailed guidance on creating an Angular component, refer to the Angular official documentation:

[**<u>Create a feature component</u>**](https://angular.io/tutorial/tour-of-heroes/toh-pt3)
:::

3. Define the necessary HTML layout, TypeScript functionalities, and SCSS styles to specify the appearance and behavior of your custom component.

## Importing the custom component

Once you've created your Custom Component, the next step is to import it into your application.

#### Import statement

In your **`app.module.ts`** file (located at **`src → app → app.module.ts`**), add the following import statement:

```ts
import { YourComponent } from '@app/components/YourComponent/YourComponent.component'
```

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/import_cus.gif)

## Declaring in AppModule

Within the same **`app.module.ts`** file, declare your Custom Component within the **`declarations`** array in the **`@NgModule`** decorator:

```ts
@NgModule({
  declarations: [
    // ...other components
    YourComponent
  ],
  // ...other module configurations
})

```

## Declaring in FlxProcessModule

To ensure your Custom Component is accessible for use in processes within FLOWX Designer, it must be declared within `FlxProcessModule`.

#### Import Statement

In your **`process.module.ts`** file (located at **`src > app > modules > process > process.module.ts`**), add the following import statement:

```ts
import { YourComponent } from '@app/components/YourComponent/YourComponent.component';
```

## Declaring in FlxProcessModule.forRoot

Subsequently, declare your Custom Component within the n the `FlxProcessModule.forRoot` function:

```ts
FlxProcessModule.forRoot({
  components: {
    // ...other components
    yourComponent: YourComponent
  },
  // ...other module configurations
})

```

## Using the custom component

Once your Custom Component is declared, you can use it for configuration within your application. 

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/loader_component.gif)

### Data input and actions

The Custom Component accepts input data from processes and can also include actions extracted from a process. These inputs and actions allow you to configure and interact with the component dynamically.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/cst_input_data.png)

### Extracting Data from Processes

There are multiple ways to extract data from processes to use within your Custom Component. You can utilize the data provided by the process or map actions from the BPMN process to Angular actions within your component.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/cst_loader_input.png)

:::danger
Make sure that the Angular actions that you declare match the names of the process actions.
:::

## Styling with CSS

To apply CSS classes to UI elements within your Custom Component, you first need to identify the UI element identifiers within your component's HTML structure. Once identified, you can apply defined CSS classes to style these elements as desired.

Example:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/Screenshot%202023-10-10%20at%2012.29.51.png)

## Custom component example

Below you can see an example of a basic custom loader component built with Angular:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/2023-10-10%2012.01.58.gif)

## Additional Considerations:

* **Naming Conventions**: Be consistent with naming conventions for components, identifiers, and actions. Ensure that Angular actions match the names of process actions as mentioned in the documentation.

* **Component Hierarchy**: Understand how the component fits into the overall component hierarchy of your application. This will help determine where the component is displayed and what actions are available for it.

* **Documentation and Testing**: Document your custom component thoroughly for future reference. Additionally, testing is crucial to ensure that the component behaves as expected in various scenarios.

* **Security**: If your custom component interacts with sensitive data or performs critical actions, consider security measures to protect the application from potential vulnerabilities.

* **Integration with FLOWX Designer**: Ensure that your custom component integrates seamlessly with FLOWX Designer, as it is part of the application's process modeling capabilities.