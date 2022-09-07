# Configuring access rights for CMS

Granular access rights can be configured for restricting access to the CMS component.

Two different access authorizations are provided, each with specified access scopes:

1. **Manage-contents** - for configuring access for manipulating CMS contents

Available scopes:

* import - users are able to import enumeration/substitution tags/ content models
* read - users are able to show enumeration/substitution tags/ content models, export enumeration/substitution tags/ content models
* edit - users are able to create/edit enumeration/substitution tags/ content models
* admin - users are able to delete enumeration/substitution tags/ content models

2. **Manage-taxonomies** - for configuring access for manipulating taxonomies

Available scopes

* read - users are able to show languages/source systems
* edit - users are able to edit languages/source systems
* admin - users are able to delete languages/source systems

The CMS service is preconfigured with the following default users roles for each of the access scopes mentioned above:

* manage-contents
  * import - ROLE\_CMS\_CONTENT\_IMPORT
  * read - ROLE\_CMS\_CONTENT\_READ
  * edit - ROLE\_CMS\_CONTENT\_EDIT
  * admin - ROLE\_CMS\_CONTENT\_ADMIN
* manage-taxonomies
  * read - ROLE\_CMS\_TAXONOMIES\_READ
  * edit - ROLE\_CMS\_TAXONOMIES\_EDIT
  * admin - ROLE\_CMS\_TAXONOMIES\_ADMIN

:::caution
The needed roles should be defined in the chosen identity provider solution.
:::

In case other custom roles are needed, you can configure them using environment variables. More than one role can be set for each access scope.

To configure access for each of the roles above, adapt the following input:

`SECURITY_ACCESSAUTHORIZATIONS_AUTHORIZATIONNAME_SCOPES_SCOPENAME_ROLESALLOWED: NEEDED_ROLE_NAMES`

Possible values for AUTHORIZATIONNAME: MANAGECONTENTS, MANAGETAXONOMIES.

Possible values for SCOPENAME: import, read, edit, admin.

For example, if you need to configure role access for import, insert this:

```
SECURITY_ACCESSAUTHORIZATIONS_MANAGECONTENTS_SCOPES_IMPORT_ROLESALLOWED: ROLE_CMS_CONTENT_IMPORT
```
