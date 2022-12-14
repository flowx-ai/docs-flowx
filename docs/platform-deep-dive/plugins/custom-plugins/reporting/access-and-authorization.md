# Authorization & access roles

## 

## IAM solution

:::info
Superset is using be default flask-openid, as implemented in flask-security.
:::

Superset can be integrated Keycloak, an open-source identity and access management solution. This integration enables users to manage authentication and authorization for their Superset dashboards. 

[Configuring an IAM solution](../../../platform-setup-guide/access-management/configuring-an-iam-solution)

### Prerequisites

* Keycloak server
    * Keycloak Realm
    * Keycloak Client & broker configured with OIDC protocols
    * client_secret.json
* admin username & password of postgres instance
* Superset Database created in postgresql 
* optionally Cert-manager if you want to have SSL certificates on hostnames.

[Superset + Keycloak configuration](../../plugins-setup-guide/reporting-setup.md#keycloak-configuration)