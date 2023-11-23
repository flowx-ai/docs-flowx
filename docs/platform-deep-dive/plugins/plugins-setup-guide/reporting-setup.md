# Reporting Setup Guide

The reporting plugin, available as a Docker image, relies on specific dependencies:

## Dependencies

- **PostgreSQL** instance dedicated to reporting data.
- **Reporting-plugin Helm Chart**:
  - Utilizes a CronJob to extract data from the FLOWX.AI Engine database and populate the FLOWX.AI Reporting plugin database.
- **Superset**:
  - Requires a dedicated PostgreSQL database for its operation.
  - Needs a [Redis](https://redis.io/) instance for efficient caching.
  - Utilizes an ingress to expose its user interface.

### Postgres Database Configuration

#### Basic Postgres Setup:

```yaml
postgresql:
  enabled: true
  postgresqlUsername: {{userName}}
  postgresqlPassword: ""
  postgresqlDatabase: "reporting"
  existingSecret: {{scretName}}
  persistence:
    enabled: true
    storageClass: standard-rwo
    size: 5Gi
  resources:
    limits:
      cpu: 1000m
      memory: 1024Mi
    requests:
      memory: 256Mi
      cpu: 100m
  metrics:
    enabled: true
    serviceMonitor:
      enabled: false
    prometheusRule:
      enabled: false
  primary:
    nodeSelector:
      preemptible: "false"

```
### Reporting Plugin Helm Chart Configuration

#### Without webhook

:::caution
When opting for Spark Operator deployment without a webhook, leveraging envVars is recommended. This involves managing secrets, which can either be securely mounted or provided in cleartext within the configuration. This approach ensures flexibility in handling sensitive information while maintaining security measures throughout the deployment process.
:::

```yaml
sparkApplication: #Defines the Spark application configuration.
  enabled: "true" #Indicates that the Spark application is enabled for deployment.
  scheduler: "@every 5m" #A cronJob that should run at every 5 minutes.
  driver: # This section configures the driver component of the Spark application.
    envVars: #Environment variables for driver setup.
      ENGINE_DATABASE_USER: flowx
      ENGINE_DATABASE_URL: postgresql:5432
      ENGINE_DATABASE_NAME: process_engine
      ENGINE_DATABASE_TYPE:
      REPORTING_DATABASE_USER: flowx
      REPORTING_DATABASE_URL: postgresql:5432
      REPORTING_DATABASE_NAME: reporting
      ENGINE_DATABASE_PASSWORD: "password"
      REPORTING_DATABASE_PASSWORD: "password"
  executor: #This section configures the executor component of the Spark application.
    envVars: #Environment variables for executor setup.
      ENGINE_DATABASE_USER: flowx
      ENGINE_DATABASE_URL: postgresql:5432
      ENGINE_DATABASE_NAME: process_engine
      REPORTING_DATABASE_USER: flowx
      REPORTING_DATABASE_URL: postgresql:5432
      REPORTING_DATABASE_NAME: reporting
      ENGINE_DATABASE_PASSWORD: "password"
      REPORTING_DATABASE_PASSWORD: "password"
```
:::info
Note: Passwords are currently set as plain strings, which is not secure practice in a production environment.
:::

#### With webhook

:::caution
When deploying the Spark Operator with a webhook, it's recommended to employ environmental variables (env) along with environmental variables sourced from Secrets. These Secrets could be securely mounted or provided within the configuration file, ensuring a balance between convenience and security in handling sensitive information during the deployment process.
:::

```yaml
sparkApplication:
  enabled: "true"
  scheduler: "@every 5m"
  driver:
    env: #Environment variables for driver setup with secrets.
      ENGINE_DATABASE_USER: flowx
      ENGINE_DATABASE_URL: postgresql:5432
      ENGINE_DATABASE_NAME: process_engine
      REPORTING_DATABASE_USER: flowx
      REPORTING_DATABASE_URL: postgresql:5432
      REPORTING_DATABASE_NAME: reporting
    extraEnvVarsMultipleSecretsCustomKeys: 
      - name: postgresql-generic
        secrets: #Secrets retrieved from a generic source.
          ENGINE_DATABASE_PASSWORD: postgresql-password
          REPORTING_DATABASE_PASSWORD: postgresql-password
  executor:
    env: #Environment variables for executor setup with secrets.
      ENGINE_DATABASE_USER: flowx
      ENGINE_DATABASE_URL: postgresql:5432
      ENGINE_DATABASE_NAME: process_engine
      REPORTING_DATABASE_USER: flowx
      REPORTING_DATABASE_URL: postgresql:5432
      REPORTING_DATABASE_NAME: reporting
    extraEnvVarsMultipleSecretsCustomKeys:
      - name: postgresql-generic
        secrets: #Secrets retrieved from a generic source.
          ENGINE_DATABASE_PASSWORD: postgresql-password
          REPORTING_DATABASE_PASSWORD: postgresql-password
```

#### Database type

To set the type of engine database type you must also configure the following environment variable:

* `ENGINE_DATABASE_TYPE` : postgres (default value, could be also set for 'oracle')


### Superset Configuration

Detailed Superset Configuration Guide:

[Superset configuration](https://github.com/apache/superset/blob/master/helm/superset/README.md)

Refer to Superset Documentation for in-depth information:

[Superset documentation](https://superset.apache.org/docs/intro/)

## Post-Installation Steps

After installation, perform the following essential configurations:

### Datasource configuration

For document-related data storage, configure these environment variables:

* `SPRING_DATASOURCE_URL`
* `SPRING_DATASOURCE_USERNAME`
* `SPRING_DATASOURCE_PASSWORD`

Ensure accurate details to prevent startup errors. The Liquibase script manages schema and migrations.

### Redis configuration

The following values should be set with the corresponding Redis-related values:

* `SPRING_REDIS_HOST`
* `SPRING_REDIS_PORT`

## Keycloak configuration


To implement alternative user authentication:

* Override `AUTH_TYPE` in your `superset.yml` configuration file:
  * Set `AUTH_TYPE: AUTH_OID`
* Provide the reference to your `openid-connect` realm:
  * `OIDC_OPENID_REALM: 'flowx'`

With this configuration, the login page changes to a prompt where the user can select the desired OpenID provider.

### Extend the Security Manager

Firstly, you will want to make sure that flask stops using `flask-openid` and starts using `flask-oidc` instead. 

To do so, you will need to create your own security manager that configures `flask-oidc` as its authentication provider. 

```yml
extraSecrets:
  keycloak_security_manager.py: |
    from flask_appbuilder.security.manager import AUTH_OID
    from superset.security import SupersetSecurityManager
    from flask_oidc import OpenIDConnect
```
To enable OpenID in Superset, you would previously have had to set the authentication type to `AUTH_OID`.

The security manager still executes all the behavior of the super class, but overrides the OID attribute with the `OpenIDConnect` object. 

Further, it replaces the default OpenID authentication view with a custom one:

```yml
    from flask_appbuilder.security.views import AuthOIDView
    from flask_login import login_user
    from urllib.parse import quote
    from flask_appbuilder.views import expose
    from flask import request, redirect

    class AuthOIDCView(AuthOIDView):
        @expose('/login/', methods=['GET', 'POST'])
        def login(self, flag=True):
            sm = self.appbuilder.sm
            oidc = sm.oid
            superset_roles = ["Admin", "Alpha", "Gamma", "Public", "granter", "sql_lab"]
            default_role = "Admin"
            @self.appbuilder.sm.oid.require_login
            def handle_login():
                user = sm.auth_user_oid(oidc.user_getfield('email'))
                if user is None:
                    info = oidc.user_getinfo(['preferred_username', 'given_name', 'family_name', 'email', 'roles'])
                    roles = [role for role in superset_roles if role in info.get('roles', [])]
                    roles += [default_role, ] if not roles else []
                    user = sm.add_user(info.get('preferred_username'), info.get('given_name', ''), info.get('family_name', ''),
                                       info.get('email'), [sm.find_role(role) for role in roles])
                login_user(user, remember=False)
                return redirect(self.appbuilder.get_url_for_index)
            return handle_login()
        @expose('/logout/', methods=['GET', 'POST'])
        def logout(self):
            oidc = self.appbuilder.sm.oid
            oidc.logout()
            super(AuthOIDCView, self).logout()
            redirect_url = request.url_root.strip('/')
            # redirect_url = request.url_root.strip('/') + self.appbuilder.get_url_for_login
            return redirect(
                oidc.client_secrets.get('issuer') + '/protocol/openid-connect/logout?redirect_uri=' + quote(redirect_url))
```

On authentication, the user is redirected back to Superset. 

### Configure Superset Authentication

Finally, we need to add some parameters to the superset .yml file:

```yml
    '''
    ---------------------------KEYCLOACK ----------------------------
    '''
    curr  =  os.path.abspath(os.getcwd())
    AUTH_TYPE = AUTH_OID
    OIDC_CLIENT_SECRETS =  curr + '/pythonpath/client_secret.json'
    OIDC_ID_TOKEN_COOKIE_SECURE = True
    OIDC_REQUIRE_VERIFIED_EMAIL = True
    OIDC_OPENID_REALM: 'flowx'
    OIDC_INTROSPECTION_AUTH_METHOD: 'client_secret_post'
    CUSTOM_SECURITY_MANAGER = OIDCSecurityManager
    AUTH_USER_REGISTRATION = False
    AUTH_USER_REGISTRATION_ROLE = 'Admin'
    OVERWRITE_REDIRECT_URI = 'https://{{ .Values.flowx.ingress.reporting }}/oidc_callback'
    '''
    --------------------------------------------------------------
    '''
```
