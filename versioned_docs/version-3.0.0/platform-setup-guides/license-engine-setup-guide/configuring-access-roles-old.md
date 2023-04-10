# Configuring access roles

:::caution
Deprecated since platform version 1.16.0
:::

The License engine is able to offer different levels of accessing license  related information.

In order to restrict API calls by user role you will need to add the user roles in the application config. You can configure separate roles for the provided API base routes:

```
    - path: "/api/report"
      rolesAllowed: ${LICENSE_VIEW}
    - path: "/api/license-model"
      rolesAllowed: ${LICENSE_MANAGER}
    - path: "/api/sync/**"
      rolesAllowed: ${LICENSE_SUPER_MANAGER}
    - path: "/api/data/**"
      rolesAllowed: ${LICENSE_SUPER_USER}
```

* `LICENSE_VIEW` - users with this role will be able to view the status of the license (just the usage info, no extra details)
* `LICENSE_MANAGER` - users with this role will be able to configure the license
* `LICENSE_SUPER_MANAGER` - users with this role will be able to trigger sync for the existing license
* `LICENSE_SUPER_USER` - users with this role will be able to request a detailed report with details of custom identifiers and dates when they appear (this can contain personal data)
