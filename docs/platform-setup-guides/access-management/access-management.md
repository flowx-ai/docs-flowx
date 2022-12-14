# Access Management

### **What is Identity and Access Management?**

Identity and access management (IAM) is **a framework of business processes, policies and technologies that facilitates the management of electronic or digital identities**. With an IAM framework in place, you can control user access to critical information/components within an organization.

:::info
We support Keycloak, an Open Source Identity and Access Management solution (or other solutions based on the Keycloak project).
:::

### What is an Identity Provider (IdP)?

The IdP, Identity-as-a-Service (IDaaS), Privileged Identity/Access Management (PIM/PAM), Multi-factor/Two-factor Authentication (MFA/2FA), and numerous other subcategories are included in the IAM category.

IdP is a subset of an IAM solution that is dedicated to handling fundamental user IDs. The IdP serves as the authoritative source for defining and confirming user identities.

The IdP can be considered maybe the most important subcategory of the IAM field because it often lays the foundation of an organization's overall identity management infrastructure. In fact, other IAM categories and solutions, such as [IDaaS](https://jumpcloud.com/blog/identity-as-a-service-idaas), PIM/PAM, MFA/2FA, and others are often layered on top of the core IdP and serve to federate core user identities from the IdP to various endpoints. Therefore, your choice in IdP will have a profound influence on your overall IAM architecture.

### Configuring access rights

Granular access rights can be configured for restricting access to the FLOWX.AI components and their features or to define allowed actions for each type of user. Access rights are based on user roles that need to be configured in the identity provider management solution.

:::caution
To configure the roles for the users, they need to be added first to an identity provider (IdP) solution. **The access rights-related configuration needs to be set up for each microservice**. Default options are preconfigured. They can be overwritten using environment variables.
:::

For more details you can check the next links:

[Configuring access rights for Admin](../../../flowx-designer/designer-setup-guide/)

[Configuring access rights for Engine](../flowx-engine-setup-guide/configuring-access-rights-for-engine.md)

[Configuring access rights for License](../license-engine-setup-guide/configuring-access-rights-for-license.md)

[Configuring access rights for CMS](../cms-setup-guide/configuring-access-rights-for-cms.md)

[Configuring access rights for Task Management](../../plugins/plugins-setup-guide/task-management-plugin-setup/configuring-access-rights-for-task-management.md)

[Configuring access rights for Notifications plugin](../../plugins/plugins-setup-guide/notifications-plugin-setup/configuring-access-rights-for-notifications.md)

[Configuring access rights for Documents plugin](../../plugins/plugins-setup-guide/documents-plugin-setup/configuring-access-rights-for-documents.md)

:::info
For more information on how to add roles and how to configure an IdP solution, check the next section:
:::

[Configuring an IAM solution](./configuring-an-iam-solution)

### Using Keycloak with an external IdP

In all cases, IdP authentication is mandatory but otherwise, all attribute mapping is configurable, including roles and groups or the entire authorization can be performed by keycloak.

![](../../platform-deep-dive/img/LDAP_keycloak.png)

#### AD or LDAP provider

In Lightweight Directory Access Protocol (LDAP) and Active Directory, Keycloak functionality is called federation or external storage. Keycloak includes an LDAP/AD provider.

![](../../platform-deep-dive/img/LDAP_federation.png)

More details:

[Server admin LDAP](https://www.keycloak.org/docs/latest/server_admin/#_ldap)

Configuration examples:

[Setup user federation LDAP](https://documentation.abas.cloud/en/abas-keycloak/setup-user-federation-ldap.html)

[LDAP Keycloak](https://blog.please-open.it/ldap-keycloak/)

#### SAML, OpenID Connect, OAuth 2.0

Keycloak functionality is called brokering. Synchronization is performed during user login.

More details:

[Identity broker](https://www.keycloak.org/docs/latest/server_admin/#_identity_broker_first_login)

Configuration examples for ADFS:

[SAML for React SPA](https://blog.samlsecurity.com/post/saml-for-react-spa/)

[Keycloak ADFS-OIDC](https://www.michaelboeynaems.com/keycloak-ADFS-OIDC.html)