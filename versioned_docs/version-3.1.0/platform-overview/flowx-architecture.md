# FLOWX.AI Architecture

Let's go through the main components of the FLOWX.AI platform:

* **FLOWX.AI SDKs** - used in the [Web (Angular)](../platform-deep-dive/core-components/renderer-sdks/angular-renderer.md), [iOS](../platform-deep-dive/core-components/renderer-sdks/ios-renderer.md), and [Android](../platform-deep-dive/core-components/renderer-sdks/android-renderer.md) applications to render the process screens and orchestrate the [custom components](../building-blocks/ui-designer/ui-component-types/root-components/custom.md)
* **FLOWX.AI Designer** - is a collaborative, no-code, web-based application development environment that enables users to create web and mobile applications without having to know how to code:
  * Develop processes based on [BPMN 2.0](./frameworks-and-standards/business-process-industry-standards/intro-to-bpmn)
  * Configure user interfaces for the processes for both generated and custom screens
  * Define business rules and validations via [DMN](./frameworks-and-standards/business-process-industry-standards/intro-to-dmn) files or via the [MVEL](./frameworks-and-standards/business-process-industry-standards/intro-to-mvel), or other supported [scripting languages](../building-blocks/supported-scripts)
  * Create [integration connectors](../platform-deep-dive/integrations) in a visual manner
  * Create data models for your applications
  * Adding new capabilities by using [plugins](../platform-deep-dive/plugins/plugins.md)
  * Manage [users access](../platform-deep-dive/user-roles-management/swimlanes.md)

**Microservices**

* **FLOWX.AI Engine** - is the core of the platform. It runs the business processes, coordinating integrations and the UI
* **FLOWX.AI Admin** - used to store/edit process definitions (FLOWX.AI Admin Microservice connects to the same Postgres / Oracle database as the FLOWX.AI Engine)
* **FLOWX.AI Scheduler** (part of the core components) - used to store/edit process definitions&#x20;
* **FLOWX.AI Content Management** (part of the core components) - can be quickly deployed on the chosen infrastructure, preloaded with the needed taxonomies or contents, and then connected to the FLOWX Engine through Kafka events
* **FLOWX.AI License Manager** (part of the core components) - is used for displaying reports regarding the usage of the platform in the FLOWX.AI Designer
* **FLOWX.AI Plugins** - the platform comes with some ready-made integrations, such as a [document management] solution, a plugin for sending various types of [notifications](../platform-deep-dive/plugins/custom-plugins/notifications-plugin/notifications-plugin.md), an [OCR](../platform-deep-dive/plugins/custom-plugins/ocr-plugin.md) plugin, and a task management plugin

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.1/architecture_diagram.png)

### FLOWX.AI Engine

We call it the engine because it’s a nice analogy, once deployed on an existing stack, FLOWX.AI becomes the core of your digital operating model.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.1/engine_architecture.png)

You can use FLOWX Engine to do the following:

* create any type of external or internal facing application
* redesign business processes from analog, paper-based ones to fully digital and automated processes
* manage integrations, so you can hook it up to existing CRMs, ERPs, KYC, transaction data and many more
* to read process definitions (if it is connected to the same DB as FLOWX.AI Admin)

[FLOWX Engine](../platform-deep-dive/core-components/flowx-engine/flowx-engine.md) runs the business processes, coordinating integrations and the omnichannel UI. It is a [Kafka-based](./frameworks-and-standards/event-driven-architecture-frameworks/intro-to-kafka-concepts) event-driven platform, that is able to orchestrate, generate and integrate with any type of legacy system, without expensive or risky upgrades.&#x20;

This is extremely important because often, digital apps used by a bank’s clients, for example, are limited by the load imposed by the core banking system. And the customers see blocked screens and endlessly spinning flywheels. FLOWX.AI buffers this load, offering a 0.2s response time, thus the customer never has to wait for data to load.


[FLOWX Engine](../platform-deep-dive/core-components/flowx-engine/flowx-engine.md)


### FLOWX.AI Designer

[FLOWX.AI Designer](../flowx-designer/flowx-designer.md) is built to administrate everything in FLOWX.AI. It is a web application that runs in the browser, meaning that it resides out of a FLOWX deployment.

The platform has **no-code/full-code capabilities**, meaning applications can be developed in a visual way, available for anyone with a powerful business idea. So we’re talking about business analysts, product managers - people without advanced programming skills, and also experienced developers.

The process visual designer works on [BPMN 2.0 standard](../platform-overview/frameworks-and-standards/business-process-industry-standards/business-process-industry-standards.md) - meaning that the learning curve for business analysts or product managers is quite fast. Thus, creating new applications (e.g. onboarding an SME client for banks) or adding new functionality (allow personal data changes in an app) takes only 10 days, instead of 6 to 8 months.

However, we do support custom CSS or custom screens. Because we’re aware each brand is different and each has its own CI, so you need to have the ability to create UIs that respect your brand guidelines.


[FLOWX.AI Designer](../flowx-designer/flowx-designer.md)
 

### FLOWX.AI SDKs

Also, we provide web and native mobile SDKs, so that every app you create is automatically an omnichannel one: it can be displayed in a browser, embedded in an internet banking interface, or in a mobile banking app. Or even deployed as a standalone app in Google Play or AppStore.

Unlike other no-code/full-code platforms which provide templates or building blocks for the UI, ours is generated on the fly, as a business analyst creates the process and the data points. This feature reduces the need to use UX/UI expertise, the UI being generated respecting state-of-the-art UI frameworks.


[Renderer SDKs](../platform-deep-dive/core-components/renderer-sdks/angular-renderer.md)


### FLOWX.AI Content management

This is another Java microservice that enables you to store and manage content. **The go-to place for all taxonomies.** The extension offers a convenient way of managing various content pieces such as lists or content translations. Anything that is under content management is managed by the [CMS backend service](../platform-setup-guides/cms-setup-guide/cms-setup-guide.md). To store content, the service will use a MongoDB database (unstructured database). For example, each time you edit an [enumeration](../platform-deep-dive/core-components/core-extensions/content-management/enumerations.md), the FLOWX.AI Designer will send an HTTP request to the microservice.


[Content Management](../platform-deep-dive/core-components/core-extensions/content-management/content-management.md)


### FLOWX.AI Scheduler

If you need to **set a timer on** a process that needs to end after X days, you can use the FLOWX.AI Scheduler microservice. It is a service that is able to receive requests (like a reminder application) to remind you in X amount of time to do something.

:::info
When you start a process, the process must have an expiry date.
:::

Scheduler microservice communicates with the FLOWX.AI Engine through Kafka Event Queue ⇾ it creates a new message (write some data) then will send that message to Kafka (with the scheduler address) → when the reminder time comes up, the scheduler will put back a new message in the Kafka layer with engine's destination (time + ID of the process).


[Scheduler](../platform-deep-dive/core-components/core-extensions/scheduler.md)


### Authorization & session manager

We recommend Keycloak, a component that allows you to create users and store credentials. It can be also used for authorization - defining groups, and assigning roles to users.

Every communication that comes from a consumer application, goes through a public entry point (API Gateway). To communicate with this component, the consumer application tries to start a process and the public entry point will check for authentication (Keycloak will send you a token) and the entry point validates it.

[Keycloak Documentation](https://www.keycloak.org/documentation)


### Plugins

Plugins are bits of functionality that allow you to expand the functionality of the platform - for example, we have the following custom plugins:

* [FLOWX Notifications Plugin](../platform-deep-dive/plugins/custom-plugins/notifications-plugin/notifications-plugin.md)
* [FLOWX Documents Plugin](../platform-deep-dive/plugins/custom-plugins/documents-plugin/documents-plugin.md)
* [FLOWX OCR Plugin](../platform-deep-dive/plugins/custom-plugins/ocr-plugin.md)
* [FLOWX Task Management Plugin](../platform-deep-dive/plugins/custom-plugins/task-management/task-management.md)

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.1/plugins_architecture.png)

[Plugins](../platform-deep-dive/plugins/plugins.md)


### Integrations

Connecting your legacy systems or third-party apps to the FLOWX.AI Engine is easily done through [custom integrations](../platform-deep-dive/integrations/integrations.md). These can be developed using your preferred tech stack, the only requirement is that they connect to Kafka. These could include legacy APIs, custom file exchange solutions, or RPA.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.1/integrations_architecture.png)


[Integrations](../platform-deep-dive/integrations/integrations.md)
