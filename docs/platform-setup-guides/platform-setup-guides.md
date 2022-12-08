---
sidebar_position: 1
---

# Overview

The setup guides in this section will provide information on how to install, configure, and use FLOWX.AI services.

Deploying microservices typically involves breaking down the application into smaller, modular components. Each microservice should be independently deployable, with all the necessary dependencies and configurations included. 

Once the microservices have been created, they can be deployed using a container management system such as Docker or Kubernetes. These systems allow for the deployment of multiple microservices in a single environment.

## Environment variables

Environment variables are variables that are set in the system environment and can be used by applications and services to store and access configuration information. Environment variables typically include settings such as paths to directories, file locations, settings for the operating system and applications, and more. 

Environment variables are used to store and access configuration information in a secure and efficient manner. Below you will find some examples of common/shared environment variables that need to be set for different services and components.

## Authorization & access roles

An identity management platform is a software system that helps you manage authorization & access roles, including user accounts, passwords, access control, and authentication. Identity management platforms typically offer features such as user provisioning, identity federation, and single sign-on. 

The following variables need to be set in order to connect to the identity management platform:

`SECURITY_OAUTH2_BASE_SERVER_URL`

`SECURITY_OAUTH2_CLIENT_CLIENT_ID`

`SECURITY_OAUTH2_REALM`

## Management Tools

Additional you can check details about (the platform will start without these components):

### Logging via Elasticsearch

Logging via elasticSearch is a way of collecting, storing, and analyzing log data from various sources in a distributed, searchable repository.

`SPRING_ELASTICSEARCH_REST_URIS`

`SPRING_ELASTICSEARCH_REST_DISABLESSL`

`SPRING_ELASTICSEARCH_INDEX_SETTINGS_NAME`

`SPRING_ELASTICSEARCH_REST_USERNAME`

`SPRING_ELASTICSEARCH_REST_PASSWORD`

### Monitoring

### Tracing via Jaeger

Tracing via Jaeger involves collecting timing data from the components in a distributed application. This allows you to better identify bottlenecks and latency issues.

The following FLOWX.AI services use Jaeger tracing:

* scheduler-core
* customer-management-plugin
* document-plugin
* notification-plugin
* process-engine

`APPLICATION_JAEGER_ENABLED` - to enable or disable jaeger tracing


## Datasource configuration

Datasource configuration is the process of configuring a data source, such as a database, file, or web service, so that an application can connect to it and use the data. This typically involves setting up the connection parameters, such as the host, port, username, and password. 

In some cases, additional configuration settings may be required, such as specifying the type of data source (e.g. Oracle, MySQL, etc.) or setting up access control for data access.

:::caution
Some microservices ([**Admin**](../flowx-designer/designer-setup-guide) microservice, for example, connects to the same Postgres / Oracle database as the **Engine**).
:::

The following variables need to be set in order to set the datasource:

`SPRING_DATASOURCE_URL`

`SPRING_DATASOURCE_USERNAME`

`SPRING_DATASOURCE_PASSWORD`

:::caution
You will need to make sure that the user, password, connection link and db name are configured correctly, otherwise, you will receive errors at start time.
:::

## Redis configuration 

Redis configuration involves setting up the connection parameters, such as the host, port, username, and password. In some cases, additional configuration settings may be required, such as specifying the type of data store or setting up access control for data access.

`SPRING_REDIS_HOST`

`SPRING_REDIS_PASSWORD`

`REDIS_TTL`

## Kubernetes related configs

Kubernetes-related configs might include the following configuration:

* Pod configuration
* Service configuration
* Deployment configuration
* Networking configuration
* Storage configuration
* Security configuration
* Ingress configuration
* Logging configuration
* Metrics configuration

## Third-party components

Third-party components are software components or libraries that are not part of FLOWX.AI but are instead created by another company or individual and used in a development project. 

These components can range from databases and operating systems to user interface components and libraries that provide support for a specific feature or task.

Third party components are components such as libraries, frameworks, APIs, etc.





