# Deployment guidelines v3.4.0 

:::info
Do not forget, when upgrading to a new platform version, always ensure that your installed component versions match the versions specified in the release notes. To verify this, navigate to **FLOWX.AI Designer > Platform Status**.
:::

:::caution Process compatibility
After updating to **3.4.0** FLOWX.AI release, it is not possible to import old process definitions into the new platform release (available for exports from releases **<= 3.4.0**).
:::

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release-notes/release_platform_version_check.png)

## Component versions   

| 🧩                             | 3.4.0 | 3.3.0   | 3.2.0  | 3.1.0  | 3.0.0  | 2.14.0   | 2.13.0  | 2.12.0  | 2.11.0  | 2.10.0  | 2.9.0   | 2.8.1   | 2.8.0   | 2.7.0   | 2.6.0   | 2.5.0   | 2.4.0   | 2.3.0   | 2.2.0   |
| ------------------------------ | ----- | ------- | ------ | ------ | ------ | -------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| **Admin**                      |       | 2.5.2   | 2.2.2  | 2.1.3  | 2.0.8  | 0.3.119  | 0.3.103 | 0.3.92  | 0.3.81  | 0.3.60  | 0.3.55  | 0.3.47  | 0.3.43  | 0.3.40  | 0.3.36  | 0.3.34  | 0.3.29  | 0.3.23  | 0.3.21  |
| **Designer**                   |       | 3.28.11 | 3.21.1 | 3.15.1 | 3.2.1  | 2.78.4-1 | 2.63.6  | 2.60.7  | 2.48.9  | 2.39.2  | 2.33.0  | 2.28.1  | 2.24.2  | 2.23.0  | 2.19.2  | 2.18.2  | 2.17.4  | 2.15.2  | 2.14.4  |
| **@flowx/ui-sdk**              |       | 3.28.11 | 3.21.1 | 3.15.1 | 3.2.1  | n/a      | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     |
| **@flowx/ui-toolkit**          |       | 3.28.11 | 3.21.1 | 3.15.1 | 3.2.1  | n/a      | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     |
| **@flowx/ui-theme**            |       | 3.28.11 | 3.21.1 | 3.15.1 | 3.2.1  | n/a      | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     |
| **paperflow-web-components**   |       | -       | -      | -      | -      | 2.78.4-1 | 2.63.6  | 2.60.7  | 0.2.10  | 0.2.10  | 0.2.10  | 0.2.6   | 0.2.6   | 0.2.6   | 0.2.6   | 0.2.6   | 0.2.6   | 0.2.6   | 0.2.5   |
| **flowx-process-renderer**     |       | -       | -      | -      | -      | 2.78.4-1 | 2.63.6  | 2.60.7  | 2.48.9  | 2.39.2  | 2.33.0  | 2.28.1  | 2.24.2  | 2.23.0  | 2.19.2  | 2.18.2  | 2.17.4  | 2.15.2  | 2.14.4  |
| **CMS Core**                   |       | 1.3.0   | 1.2.0  | 1.0.3  | 1.0.2  | 0.2.38   | 0.2.36  | 0.2.33  | 0.2.30  | 0.2.25  | 0.2.23  | 0.2.23  | 0.2.23  | 0.2.23  | 0.2.23  | 0.2.20  | 0.2.20  | 0.2.18  | 0.2.17  |
| **Scheduler Core**             |       | 1.0.4   | 1.0.4  | 1.0.4  | 1.0.1  | 0.0.34   | 0.0.34  | 0.0.34  | 0.0.33  | 0.0.28  | 0.0.27  | 0.0.27  | 0.0.27  | 0.0.27  | 0.0.27  | 0.0.24  | 0.0.24  | 0.0.23  | 0.0.23  |
| **events-gateway**             |       | 1.0.2   | -      | -      | -      | -        | -       | -       | -       | -       | -       | -       | -       | -       | -       | -       | -       | -       | -       |
| **Notification Plugin**        |       | 2.0.4   | 2.0.4  | 2.0.3  | 2.0.1  | 1.0.206  | 1.0.206 | 1.0.206 | 1.0.205 | 1.0.200 | 1.0.198 | 1.0.198 | 1.0.197 | 1.0.194 | 1.0.194 | 1.0.191 | 1.0.191 | 1.0.190 | 1.0.190 |
| **Document Plugin**            |       | 2.0.4   | 2.0.3  | 2.0.3  | 2.0.2  | 1.0.53   | 1.0.53  | 1.0.53  | 1.0.52  | 1.0.47  | 1.0.42  | 1.0.41  | 1.0.38  | 1.0.37  | 1.0.37  | 1.0.35  | 1.0.35  | 1.0.31  | 1.0.31  |
| **OCR Plugin**                 |       | 1.0.8   | 1.0.2  | 0.1.33 | 0.1.33 | 0.1.33   | 0.1.33  | 0.1.5   | 0.1.5   | 0.1.5   | 0.1.5   | 0.1.5   | 0.1.5   | 0.1.5   | 0.1.5   | 0.1.5   | 0.1.5   | 0.0.109 | 0.0.109 |
| **License Core**               |       | 1.0.2   | 1.0.2  | 1.0.2  | 1.0.1  | 0.1.28   | 0.1.28  | 0.1.28  | 0.1.27  | 0.1.23  | 0.1.19  | 0.1.18  | 0.1.18  | 0.1.18  | 0.1.18  | 0.1.15  | 0.1.15  | 0.1.13  | 0.1.13  |
| **Customer Management Plugin** |       | 0.2.4   | 0.2.3  | 0.2.3  | 0.2.1  | 0.1.28   | 0.1.28  | 0.1.28  | 0.1.27  | 0.1.23  | 0.1.22  | 0.1.22  | 0.1.22  | 0.1.22  | 0.1.22  | 0.1.20  | 0.1.20  | 0.1.18  | 0.1.18  |
| **Task Management Plugin**     |       | 2.1.2   | 1.0.4  | 1.0.4  | 1.0.1  | 0.0.42   | 0.0.42  | 0.0.40  | 0.0.37  | 0.0.29  | 0.0.28  | 0.0.28  | 0.0.27  | 0.0.27  | 0.0.27  | 0.0.22  | 0.0.22  | 0.0.21  | 0.0.21  |
| **Data search**                |       | 0.2.0   | 0.1.4  | 0.1.4  | 0.1.3  | 0.0.8    | 0.0.8   | 0.0.6   | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     |
| **Audit Core**                 |       | 1.0.6   | 1.0.5  | 1.0.4  | 1.0.1  | 0.0.8    | 0.0.5   | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     |
| **Reporting**                  |       | 0.0.40  | 0.0.40 | 0.0.40 | 0.0.39 | 0.0.39   | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     |
| **advancing-controller**       |       | 0.3.0   | 0.1.4  | 0.1.4  | 0.1.2  | 0.0.6    | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     |
| **iOS renderer**               |       | 2.1.4   | 2.0.7  | 2.0.4  | 2.0.0  | n/a      | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     |
| **Android renderer**           |       | 2.0.1   | 2.0.1  | 2.0.1  | 2.0.1  | n/a      | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     |


:::danger IMPORTANT
With the release of **FLOWX.AI 3.0**, there have been some changes that you need to be aware when upgrading to the latest version:
* The `flowx-process-renderer` has been migrated to `@flowx\ui-sdk`.
* The `paperflow-web-components` library is no longer maintained. Instead, use the new components available in `@flowxai/ui-toolkit@3.0`.
:::


### Recommended Versions for FLOWX.AI 3.4.0 ☑️

| FLOWX.AI Platform Version | Component name               | Recommended version (tested versions) |
| ------------------------- | ---------------------------- | ------------------------------------- |
| 3.4                       | Keycloak                     | 18.0.x                                |
| 3.4                       | Kafka                        | 3.2.0                                 |
| 3.4                       | PostgreSQL                   | 14.3.0                                |
| 3.4                       | MongoDB                      | 5.0.8                                 |
| 3.4                       | Redis                        | 6.2.6                                 |
| 3.4                       | Elasticsearch                | 7.17                                  |
| 3.4                       | S3 (Min.IO) / minio-operator | 2022-05-26T05-48-41Z / 4.5.4          |
| 3.4                       | OracleDB                     | 19.8.0.0.0                            |
| 3.4                       | Angular (Web SDK)            | 15.0.0                                |


:::info compatibility
FlowX.AI supports any version of the third-party components listed as prerequisites.

For optimal performance and reliability, our internal QA process validates new releases using specific versions as indicated in the provided table.
While exploring alternative versions that suit your company's specific requirements, we recommend referring to the compatibility matrix for guidance.

In the unlikely event that you encounter any compatibility issues with FlowX.AI, please open a support ticket [**here**](https://support.flowx.ai/), and our dedicated team will address and resolve any identified bugs following our standard support process.

Compatibility Matrix:

* FLOWX.AI Platform: Recommended and tested versions
* Third-Party Components: Supported versions based on specific requirements and client preferences
:::


## Additional configuration

This section describes the additional configuration that is required to use the new features in FlowX.AI.

### Access rights for Fonts

New access rights to be configured in order to use the new fonts feature in the CMS microservice:

| Module        | Scope  | Role default value | Microservice       |
| ------------- | ------ | ------------------ | ------------------ |
| manage-themes | import | ROLE_THEMES_IMPORT | Content Management |
|               | import | ROLE_THEMES_EDIT   | Content Management |
|               | import | ROLE_THEMES_ADMIN  | Content Management |
| manage-themes | read   | ROLE_THEMES_READ   | Content Management |
|               | read   | ROLE_THEMES_EDIT   | Content Management |
|               | read   | ROLE_THEMES_ADMIN  | Content Management |
|               | read   | ROLE_THEMES_IMPORT | Content Management |
| manage-themes | edit   | ROLE_THEMES_EDIT   | Content Management |
|               | edit   | ROLE_THEMES_ADMIN  | Content Management |
| manage-themes | admin  | ROLE_THEMES_ADMIN  | Content Management |

### Markdown support

`marked@^5.0.0` refers to a specific version of the "marked" library or package in the npm ecosystem. "marked" is a popular open-source JavaScript library used for parsing and rendering Markdown text into HTML.

To install the lib please make sure to run the following command:

`npm install marked@^5.0.0`



