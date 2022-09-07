# Configuring access rights for Documents

Granular access rights can be configured for restricting access to the Documents plugin component.



The following access authorizations is provided, with the specified access scopes:

1. **Manage-document-templates** - for configuring access for managing document templates

Available scopes:

* import - users are able to import document templates
* read - users are able to view document templates
* edit - users are able to edit document templates
* admin - users are able to publish or delete document templates



The Document plugin is preconfigured with the following default users roles for each of the access scopes mentioned above:

* manage-document-templates
  * import - ROLE\_DOCUMENT\_TEMPLATES\_IMPORT
  * read - ROLE\_DOCUMENT\_TEMPLATES\_READ
  * edit - ROLE\_DOCUMENT\_TEMPLATES\_EDIT
  * admin - ROLE\_DOCUMENT\_TEMPLATES\_ADMIN

:::cautions
These roles need to be defined in the chosen identity provider solution.
:::

In case other custom roles are needed, you can configure them using environment variables. More than one role can be set for each access scope.

To configure access for each of the roles above, adapt the following input:

**`SECURITY_ACCESSAUTHORIZATIONS_AUTHORIZATIONNAME_SCOPES_SCOPENAME_ROLESALLOWED: NEEDED_ROLE_NAMES`**

Possible values for AUTHORIZATIONNAME: MANAGEDOCUMENTTEMPLATES.

Possible values for SCOPENAME: import, read, edit, admin.

For example, if you need to configure role access for read, insert this:

```
SECURITY_ACCESSAUTHORIZATIONS_MANAGEDOCUMENTTEMPLATES_SCOPES_READ_ROLESALLOWED: ROLE_NAME_TEST
```
