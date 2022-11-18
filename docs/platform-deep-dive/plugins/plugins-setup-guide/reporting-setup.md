# Reporting setup guide

The reporting plugin is available a docker image, and it has the following dependencies:

## Dependencies

* a reporting [PostgreSQL](https://www.postgresql.org/) instance
* reporting-plugin helm chart - containing cronJob which performs the following actions:
  * reads from FLOWX.AI Engine db 
  * writes in the FLOWX.AI Reporting plugin db
* Superset:
  * a Superset PostgreSQL db
  * a [Redis](https://redis.io/) instance for caching
  * exposes the UI through an ingress -> host needed

### Postgres database

Basic Postgres configuration:

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
### Reporting plugin helm chart (containing CRON)

reporting-plugin helm.yaml 

```yaml
sync:
  cronjob:
    image:
      repository: {{env}}/reporting-plugin

    schedule: "*/5 * * * *"

    extraEnvVarsMultipleSecretsCustomKeys:
      - name: process-engine-application-config
        secrets:
          ENGINE_DATABASE_PASSWORD: {{db paswword}}
        secrets:
          REPORTING_DATABASE_PASSWORD: {{db password}}

    env:
      ENGINE_DATABASE_USER: {{engine db user}}
      ENGINE_DATABASE_URL: {{engine db URL}}
      ENGINE_DATABASE_NAME: {{engine db name}}

      REPORTING_DATABASE_USER: {{reporting db user}}
      REPORTING_DATABASE_URL: {{reporting db URL}}
      REPORTING_DATABASE_NAME: {{reporting db name}}

```


### Superset 

[Superset configuration](https://github.com/apache/superset/blob/master/helm/superset/README.md)

[Superset documentation](https://superset.apache.org/docs/intro/)

## After installation

* datasource URL -> FLOWX.AI Reporting db
* Datasets
* Dashboards

### Datasource configuration

To store data related to document templates and documents the service uses a Postgres / Oracle database.

The following configuration details need to be added using environment variables:

`SPRING_DATASOURCE_URL`

`SPRING_DATASOURCE_USERNAME`

`SPRING_DATASOURCE_PASSWORD`

You will need to make sure that the user, password, connection link and db name are configured correctly, otherwise you will receive errors at start time.

The datasource is configured automatically via a liquibase script inside the service. All updates will include migration scripts.

:::info
Database schema is managed by a liquibase script that will create, manage and migrate future versions.
:::




