# Advancing Controller setup guide

This guide will walk you through the process of setting up the Advancing Controller and configuring it to meet your needs.

## Infrastructure prerequisites

Advancing controller requires the following components to be set up before it can be started:

* FLOWX.AI Engine deployment - the Advancing Controller is dependent on the FLOWX.AI Engine and must be deployed in the same environment, refer to the FLOWX.AI Engine setup guide for more information on how to set up the Engine
* DB instance - the Advancing Controller uses a PostgreSQL db instance


## Dependencies

* Database
* Datasource
* FLOWX.AI Engine

### Database configuration


A basic Postgres configuration for Advancing:

```yaml
postgresql:
  enabled: true
  postgresqlUsername: "postgres"
  postgresqlPassword: ""
  postgresqlDatabase: "advancing"
  existingSecret: "postgresql-generic"
  postgresqlMaxConnections: 200
  persistence:
    enabled: true
    storageClass: premium-rwo
    size: 20Gi
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

### Datasource configuration

Advancing controller uses a PostgreSQL database as a dependency.

The following configuration details need to be added using environment variables:

`SPRING_DATASOURCE_URL`

`SPRING_DATASOURCE_USERNAME`

`SPRING_DATASOURCE_PASSWORD`

You will need to make sure that the user, password, connection link and db name are configured correctly, otherwise, you will receive errors at start time.

The datasource is configured automatically via a liquibase script inside the engine. All updates will include migration scripts.


