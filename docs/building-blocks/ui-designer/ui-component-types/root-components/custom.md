---
sidebar_position: 3
---

# Custom Component

## Overview

Custom components are developed in the web application and referenced here by component identifier. This will dictate where the component is displayed in the component hierarchy and what actions are available for the component.

To add a custom component in the template config tree, we need to know its unique identifier and the data it should receive from the process model.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/ui-designer/ui_designer_custom.png)

The customizable properties include:

* **Identifier**: Defines display placement and available actions for the custom component.
* **Input Keys**: Specifies paths within the process model from which components draw their data.
* **UI Action**: Empowers the custom component by defining accessible actions.

<div className= "image-scaled">

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/ui-designer/ui_designer_custom_settings.png#center)

</div>

## Prerequisites before Creation

* **Angular Knowledge**: You should have a solid understanding of Angular for creating and importing custom components.
* **Angular CLI**: Ensure Angular CLI is installed.
* **Development Environment**: Set up a development environment for Angular, including Node.js and npm (Node Package Manager).
* **Component Identifier**: You'll need a unique identifier for your custom component, used for referencing within the application.

## Creating a Custom Component

Follow these steps to craft a custom Angular component:

1. Navigate to your preferred directory within the FLOWX.AI project.
2. Generate a new Angular component, either manually or through Angular CLI:

```bash
ng generate component loader
```
:::info
The title 'loader' is used for our custom component. You can choose any name.
:::

This generates a structure similar to the following:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/loader_comp%20copy.png)

In the above example, a custom loader component was created:

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
For detailed guidance on creating an Angular component, refer to the [**<u>Angular official documentation</u>**](https://angular.io/tutorial/tour-of-heroes/toh-pt3).
:::

3. Define HTML layout, TypeScript functionalities, and SCSS styles to specify appearance and behavior.

## Importing the Custom Component

Once created, import the Custom Component into your application.

#### Import statement

In your **`app.module.ts`** file (located at **`src → app → app.module.ts`**), add the import statement:

```ts
import { LoaderComponent } from './components/loader/loader.component';
```

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/import_cus.gif)

## Declaring in AppModule

Within the same **`app.module.ts`** file, declare your Custom Component in the `@NgModule` decorator's `declarations` array:

```ts
@NgModule({
  declarations: [
    // ...other components
    LoaderComponent,
  ],
  // ...other module configurations
})

```

## Declaring in FlxProcessModule

To ensure accessibility of your Custom Component in processes within FLOWX Designer, declare it within `FlxProcessModule`.

#### Import Statement

In your **`process.module.ts`** file (located at **`src > app > modules > process > process.module.ts`**), add the import statement:

```ts
import {LoaderComponent} from '@app/components/loader/loader.component';
```

#### Declaring in FlxProcessModule.forRoot

Subsequently, declare your Custom Component within the `FlxProcessModule.forRoot` function in the same **`process.module.ts`** page:

```ts
FlxProcessModule.forRoot({
  components: {
    // ...other components
    LoaderComponent: LoaderComponent
  },
  // ...other module configurations
})

```

## Using the Custom Component

Once declared, you can configure and interact with your Custom Component in your application.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/loader_component.gif)

### Data Input and Actions

The Custom Component accepts input data from processes and can include actions extracted from a process, enabling dynamic configuration and interaction.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/cst_input_data.png)

### Extracting Data from Processes

Extract data from processes to use within your Custom Component. Utilize process-provided data or map BPMN process actions to Angular actions within your component.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/cst_loader_input.png)

:::danger
Ensure Angular actions match process action names.
:::   

## Styling with CSS

Apply CSS classes to UI elements within your Custom Component by identifying the UI element identifiers in your component's HTML structure. Apply defined CSS classes to style these elements as desired.

Example:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/Screenshot%202023-10-10%20at%2012.29.51.png)

## Custom Component Example

Below is an example of a container app running the basic custom loader component built with Angular:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/2023-10-10%2012.01.58.gif)

## Additional Considerations:

* **Naming Conventions**: Maintain consistency in component, identifier, and action names. Ensure Angular actions match process actions as per documentation.

* **Component Hierarchy**: Understand how the component fits into the overall application's component hierarchy for proper display and action availability.

* **Documentation and Testing**: Thoroughly document your custom component for future reference. Testing is crucial to ensure expected behavior in various scenarios.

* **Security**: Implement security measures if the component deals with sensitive data or performs critical actions to protect against vulnerabilities.

* **Integration with FLOWX Designer**: Ensure seamless integration of your custom component with FLOWX Designer as part of the application's process modeling capabilities.