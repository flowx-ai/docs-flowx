# Default Roles

Below you can find the list of all the default roles that you can add or import into the Identity and Access Management solution to properly manage the access to all the FLOWX.AI microservices.

### Default roles

A complete list of all the default roles based on modules (access scope):

| Module                              | Feature | Role default value                    | Microservice    |
| ----------------------------------- | ------- | ------------------------------------- | --------------- |
| manage-platform                     | read    | ROLE_ADMIN_MANAGE_PLATFORM_READ   | Admin           |
| manage-platform                     | admin   | ROLE_ADMIN_MANAGE_PLATFORM_ADMIN  | Admin           |
| manage-processes                    | import  | ROLE_ADMIN_MANAGE_PROCESS_IMPORT  | Admin           |
| manage-processes                    | read    | ROLE_ADMIN_MANAGE_PROCESS_READ    | Admin           |
| manage-processes                    | edit    | ROLE_ADMIN_MANAGE_PROCESS_EDIT    | Admin           |
| manage-processes                    | admin   | ROLE_ADMIN_MANAGE_PROCESS_ADMIN   | Admin           |
| <p></p><p>manage-configurations</p> | import  | ROLE_ADMIN_MANAGE_CONFIG_IMPORT   | Admin           |
| manage-configurations               | read    | ROLE_ADMIN_MANAGE_CONFIG_READ     | Admin           |
| manage-configurations               | edit    | ROLE_ADMIN_MANAGE_CONFIG_EDIT     | Admin           |
| manage-configurations               | admin   | ROLE_ADMIN_MANAGE_CONFIG_ADMIN    | Admin           |
| manage-users                        | read    | ROLE_ADMIN_MANAGE_USERS_READ      | Admin           |
| manage-users                        | edit    | ROLE_ADMIN_MANAGE_USERS_EDIT      | Admin           |
| manage-users                        | admin   | ROLE_ADMIN_MANAGE_USERS_ADMIN     | Admin           |
| manage-processes                    | edit    | ROLE_ENGINE_MANAGE_PROCESS_EDIT   | Engine          |
| manage-instances                    | read    | ROLE_ENGINE_MANAGE_INSTANCE_READ  | Engine          |
| manage-instances                    | admin   | ROLE_ENGINE_MANAGE_INSTANCE_ADMIN | Engine          |
| manage-licenses                     | read    | ROLE_LICENSE_MANAGE_READ           | License         |
| manage-licenses                     | edit    | ROLE_LICENSE_MANAGE_EDIT           | License         |
| manage-licenses                     | admin   | ROLE_LICENSE_MANAGE_ADMIN          | License         |
| manage-contents                     | import  | ROLE_CMS_CONTENT_IMPORT            | CMS             |
| manage-contents                     | read    | ROLE_CMS_CONTENT_READ              | CMS             |
| manage-contents                     | edit    | ROLE_CMS_CONTENT_EDIT              | CMS             |
| manage-contents                     | admin   | ROLE_CMS_CONTENT_ADMIN             | CMS             |
| manage-taxonomies                   | admin   | ROLE_CMS_TAXONOMIES_ADMIN          | CMS             |
| manage-tasks                        | read    | ROLE_TASK_MANAGER\_TASKS\_READ      | Task management |
| manage-hooks                        | import  | ROLE\_TASK\_MANAGER\_HOOKS\_IMPORT    | Task management |
| manage-hooks                        | read    | ROLE\_TASK\_MANAGER\_HOOKS\_READ      | Task management |
| manage-hooks                        | edit    | ROLE\_TASK\_MANAGER\_HOOKS\_EDIT      | Task management |
| manage-hooks                        | admin   | ROLE\_TASK\_MANAGER\_HOOKS\_ADMIN     | Task management |
| manage-notification-templates       | import  | ROLE\_NOTIFICATION\_TEMPLATES\_IMPORT | Notifications   |
| manage-notification-templates       | read    | ROLE\_NOTIFICATION\_TEMPLATES\_READ   | Notifications   |
| manage-notification-templates       | edit    | ROLE\_NOTIFICATION\_TEMPLATES\_EDIT   | Notifications   |
| manage-notification-templates       | admin   | ROLE\_NOTIFICATION\_TEMPLATES\_ADMIN  | Notifications   |
| manage-document-templates           | import  | ROLE\_DOCUMENT\_TEMPLATES\_IMPORT     | Documents       |
| manage-document-templates           | read    | ROLE\_DOCUMENT\_TEMPLATES\_READ       | Documents       |
| manage-document-templates           | edit    | ROLE\_DOCUMENT\_TEMPLATES\_EDIT       | Documents       |
| manage-document-templates           | admin   | ROLE\_DOCUMENT\_TEMPLATES\_ADMIN      | Documents       |

### Importing roles

:::info
You can import a super admin group and its default roles in Keycloak using the following script file.
:::

:::info download the script + roles:
[**Import Script**](../../platform-deep-dive/assets/importUsers.zip)
:::


You need to edit the following script parameters:

* `baseAuthUrl`
* `username`
* `password`
* `realm`
* `the name of the group for super admins`

The requests package is needed in order to run the script. It can be installed with the following command:

```
pip3 install requests
```

The script can be run with the following command:

```
python3 importUsers.py
```
