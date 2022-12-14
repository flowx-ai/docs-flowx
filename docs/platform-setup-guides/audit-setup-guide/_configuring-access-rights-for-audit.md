<!--
# Configuring access rights for Audit

Granular access rights can be configured for restricting access to the Audit component.

The following access authorizations are provided, with the specified access scopes:

1. **manage-audit** - for configuring access for managing audit related details

Available scopes:

* read - users are able to view the audit logs

The audit component is preconfigured with the following default users roles for each of the access scopes mentioned above:
  
* read - `ROLE_AUDIT_READ` ; `ROLE_AUDIT_EDIT`; `ROLE_AUDIT_ADMIN`

:::warning
These roles need to be defined in the chosen identity provider solution.
:::

In case other custom roles are needed, you can configure them using environment variables. More than one role can be set for each access scope.

To configure access for each of the roles above, adapt the following input:

`SECURITY_ACCESSAUTHORIZATIONS_AUTHORIZATIONNAME_SCOPES_SCOPENAME_ROLESALLOWED: NEEDED_ROLE_NAMES`

Possible values for `AUTHORIZATIONNAME: MANAGEAUDIT`.

Possible values for `SCOPENAME`: read 

For example, if you need to configure role access for read, insert this:

```
SECURITY_ACCESSAUTHORIZATIONS_MANAGELICENSES_SCOPES_READ_ROLESALLOWED: ROLE_NAME_TEST
```
-->