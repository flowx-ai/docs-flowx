# Reporting setup guide

The reporting plugin is available a docker image, and it has the following dependencies:

## Dependencies

* a reporting [postgresql](https://www.postgresql.org/) instance
* reporting-plugin helm chart - containing cronJob which performs the following actions:
  * reads from FLOWX.AI Engine db 
  * writes in the FLOWX.AI Reporting plugin db
* Superset:
  * a Superset postgresql db
  * a [redis](https://redis.io/) instance for caching
  * exposes the UI through an ingress -> host needed

### Postgres database

Basic Postgres configuration - helm values.yaml

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

The datasource is configured automatically via a liquibase script inside the engine. All updates will include migration scripts.

:::info
Database schema is managed by a liquibase script that will create, manage and migrate future versions.
:::




