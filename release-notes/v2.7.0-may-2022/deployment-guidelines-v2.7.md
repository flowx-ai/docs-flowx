# Deployment guidelines v2.7.0

## Component versions

| :ballot_box_with_check:        | 2.7.0      | 2.6.0   | 2.5.0   | 2.4.0   | 2.3.0   | 2.2.0   | 2.1.0     | 2.0.0     | 1.16.0  | 1.15    | 1.14    | 1.13.0  | 1.12.0 | 1.11.0  |
| ------------------------------ | ---------- | ------- | ------- | ------- | ------- | ------- | --------- | --------- | ------- | ------- | ------- | ------- | ------ | ------- |
| **Process engine**             | **0.4.42** | 0.4.36  | 0.4.29  | 0.4.22  | 0.4.21  | 0.4.18  | 0.4.13    | 0.4.12    | 0.4.4   | 0.3.26  | 0.3.21  | 0.3.14  | 0.3.9  | 0.3.7   |
| **Designer**                   | **2.23.0** | 2.19.2  | 2.18.2  | 2.17.4  | 2.15.2  | 2.14.4  | 2.11.2    | 2.10.0    | 2.5.0   | 2.1.1   | 1.21.0  | 1.16.3  | 1.15.2 | 1.14.0  |
| **CMS Core**                   | 0.2.23     | 0.2.23  | 0.2.20  | 0.2.20  | 0.2.18  | 0.2.17  | 0.2.17    | 0.2.17    | 0.2.14  | 0.2.9   | 0.2.9   | 0.2.9   | 0.2.5  | 0.2.3   |
| **Scheduler Core**             | 0.0.27     | 0.0.27  | 0.0.24  | 0.0.24  | 0.0.23  | 0.0.23  | 0.0.23    | 0.0.23    | 0.0.19  | 0.0.12  | 0.0.12  | 0.0.12  | NA     | 0.0.6   |
| **flowx-process-renderer**     | **2.23.0** | 2.19.2  | 2.18.2  | 2.17.4  | 2.15.2  | 2.14.4  | 2.11.2    | 2.10.0    | 2.4.2   | 2.1.1   | 1.21.0  | 1.16.3  | 1.15.2 | 1.14.0  |
| **flowx-web-components**       | 0.2.6      | 0.2.6   | 0.2.6   | 0.2.6   | 0.2.6   | 0.2.5   | 0.2.4     | 0.2.1     | 0.2.1   | 0.0.298 | 0.0.298 | 0.0.298 | NA     | 0.0.293 |
| **Admin**                      | **0.3.40** | 0.3.36  | 0.3.34  | 0.3.29  | 0.3.23  | 0.3.21  | 0.3.13    | 0.3.13    | 0.3.3   | 0.2.26  | 0.2.26  | 0.2.26  | 0.2.25 | 0.2.23  |
| **Notification Plugin**        | 1.0.194    | 1.0.194 | 1.0.191 | 1.0.191 | 1.0.190 | 1.0.190 | 1.0.186-1 | 1.0.186-1 | 1.0.186 | 1.0.182 | 1.0.182 | 1.0.182 | NA     | 1.0.179 |
| **Document Plugin**            | 1.0.37     | 1.0.37  | 1.0.35  | 1.0.35  | 1.0.31  | 1.0.31  | 1.0.30    | 1.0.30    | 1.0.26  | 1.0.24  | 1.0.20  | 1.0.18  | NA     | 1.0.15  |
| **OCR Plugin**                 | 0.1.5      | 0.1.5   | 0.1.5   | 0.1.5   | 0.0.109 | 0.0.109 | 0.0.109   | 0.0.109   | 0.0.109 | 0.0.106 |         |         |        |         |
| **License Core**               | 0.1.18     | 0.1.18  | 0.1.15  | 0.1.15  | 0.1.13  | 0.1.13  | 0.1.12    | 0.1.12    | 0.1.10  | 0.1.5   | n/a     |         |        |         |
| **Customer Management Plugin** | 0.1.22     | 0.1.22  | 0.1.20  | 0.1.20  | 0.1.18  | 0.1.18  | 0.1.18    | 0.1.18    | 0.1.16  | 0.1.10  | 0.1.10  | 0.1.10  | NA     | 0.1.6   |
| **Task Management Plugin**     | 0.0.27     | 0.0.27  | 0.0.22  | 0.0.22  | 0.0.21  | 0.0.21  | 0.0.16    | 0.0.16    | 0.0.14  |         |         |         |        |         |

## Additional configuration

:::danger
The access rights-related configuration needs to be set up for each microservice. Default options are preconfigured. They can be overwritten using environment variables.
:::

In order to configure the roles for the users of the designer app, they need to be added to the identity provider solution.

If you are using Keycloak or Red Hat Single Sign-On (RH-SSO) you can import the default roles automatically and create a `superAdmin` group using the following script. This will give users in that group full control of development environments:

:::tip
Python 3 script + Roles, download [here](../assets/importUsers.zip)
:::

You need to edit the script parameters - `baseAuthUrl`, `username`, `password`,  `realm`, and the name of the group for super admins.

The requests package is needed in order to run the script. It can be installed with the following command:

```
pip3 install requests
```

The script can be run with the following command:

```
python3 importUsers.py
```

A complete list of all the default roles:

| Module                        | Feature | Role default value                    | Microservice    |
| ----------------------------- | ------- | ------------------------------------- | --------------- |
| manage-platform               | read    | ROLE\_ADMIN\_MANAGE\_PLATFORM\_READ   | Admin           |
| manage-platform               | admin   | ROLE\_ADMIN\_MANAGE\_PLATFORM\_ADMIN  | Admin           |
| manage-processes              | import  | ROLE\_ADMIN\_MANAGE\_PROCESS\_IMPORT  | Admin           |
| manage-processes              | read    | ROLE\_ADMIN\_MANAGE\_PROCESS\_READ    | Admin           |
| manage-processes              | edit    | ROLE\_ADMIN\_MANAGE\_PROCESS\_EDIT    | Admin           |
| manage-processes              | admin   | ROLE\_ADMIN\_MANAGE\_PROCESS\_ADMIN   | Admin           |
| manage-configurations         | import  | ROLE\_ADMIN\_MANAGE\_CONFIG\_IMPORT   | Admin           |
| manage-configurations         | read    | ROLE\_ADMIN\_MANAGE\_CONFIG\_READ     | Admin           |
| manage-configurations         | edit    | ROLE\_ADMIN\_MANAGE\_CONFIG\_EDIT     | Admin           |
| manage-configurations         | admin   | ROLE\_ADMIN\_MANAGE\_CONFIG\_ADMIN    | Admin           |
| manage-users                  | read    | ROLE\_ADMIN\_MANAGE\_USERS\_READ      | Admin           |
| manage-users                  | edit    | ROLE\_ADMIN\_MANAGE\_USERS\_EDIT      | Admin           |
| manage-users                  | admin   | ROLE\_ADMIN\_MANAGE\_USERS\_ADMIN     | Admin           |
| manage-processes              | edit    | ROLE\_ENGINE\_MANAGE\_PROCESS\_EDIT   | Engine          |
| manage-instances              | read    | ROLE\_ENGINE\_MANAGE\_INSTANCE\_READ  | Engine          |
| manage-instances              | admin   | ROLE\_ENGINE\_MANAGE\_INSTANCE\_ADMIN | Engine          |
| manage-licenses               | read    | ROLE\_LICENSE\_MANAGE\_READ           | License         |
| manage-licenses               | edit    | ROLE\_LICENSE\_MANAGE\_EDIT           | License         |
| manage-licenses               | admin   | ROLE\_LICENSE\_MANAGE\_ADMIN          | License         |
| manage-contents               | import  | ROLE\_CMS\_CONTENT\_IMPORT            | CMS             |
| manage-contents               | read    | ROLE\_CMS\_CONTENT\_READ              | CMS             |
| manage-contents               | edit    | ROLE\_CMS\_CONTENT\_EDIT              | CMS             |
| manage-contents               | admin   | ROLE\_CMS\_CONTENT\_ADMIN             | CMS             |
| manage-taxonomies             | admin   | ROLE\_CMS\_TAXONOMIES\_ADMIN          | CMS             |
| manage-tasks                  | read    | ROLE\_TASK\_MANAGER\_TASKS\_READ      | Task management |
| manage-hooks                  | import  | ROLE\_TASK\_MANAGER\_HOOKS\_IMPORT    | Task management |
| manage-hooks                  | read    | ROLE\_TASK\_MANAGER\_HOOKS\_READ      | Task management |
| manage-hooks                  | edit    | ROLE\_TASK\_MANAGER\_HOOKS\_EDIT      | Task management |
| manage-hooks                  | admin   | ROLE\_TASK\_MANAGER\_HOOKS\_ADMIN     | Task management |
| manage-notification-templates | import  | ROLE\_NOTIFICATION\_TEMPLATES\_IMPORT | Notifications   |
| manage-notification-templates | read    | ROLE\_NOTIFICATION\_TEMPLATES\_READ   | Notifications   |
| manage-notification-templates | edit    | ROLE\_NOTIFICATION\_TEMPLATES\_EDIT   | Notifications   |
| manage-notification-templates | admin   | ROLE\_NOTIFICATION\_TEMPLATES\_ADMIN  | Notifications   |
| manage-document-templates     | import  | ROLE\_DOCUMENT\_TEMPLATES\_IMPORT     | Documents       |
| manage-document-templates     | read    | ROLE\_DOCUMENT\_TEMPLATES\_READ       | Documents       |
| manage-document-templates     | edit    | ROLE\_DOCUMENT\_TEMPLATES\_EDIT       | Documents       |
| manage-document-templates     | admin   | ROLE\_DOCUMENT\_TEMPLATES\_ADMIN      | Documents       |

For more details you can check the next links:


[Configuring access rights for admin](../../docs/flowx-designer/designer-setup-guide/configuring-access-rights-for-admin)

[Configuring access rights for engine](../../docs/platform-setup-guides/flowx-engine-setup-guide/configuring-access-rights-for-engine)

[Configuring access rights for license](../../docs/platform-setup-guides/license-engine-setup-guide/configuring-access-rights-for-license)

[Configuring access rights for CMS](../../docs/platform-setup-guides/cms-setup-guide/configuring-access-rights-for-cms)

[Configuring access rights for Task Management](../../docs/platform-deep-dive/plugins/plugins-setup-guide/task-management-plugin-setup/configuring-access-rights-for-task-management)

[Configuring access rights for notifications](../../docs/platform-deep-dive/plugins/plugins-setup-guide/notifications-plugin-setup/configuring-access-rights-for-notifications)

[Configuring access rights for documents](../../docs/platform-deep-dive/plugins/plugins-setup-guide/documents-plugin-setup/configuring-access-rights-for-documents)

