# Advancing Controller setup guide

## Infrastructure Prerequisites

There are some components that are mandatory to start the advancing controller:

### FLOWX.AI Engine deployment

Check the FLOWX.AI Engine setup guide for more information:

[FLOWX.AI Engine setup guide](./flowx-engine-setup-guide.md)


##  Dependencies

Advancing controller uses a PostgreSQL database as a dependency.

### Database - Postgres

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

## Configuration

The following configuration details need to be added using environment variables:

* [**Datasource configuration**](../platform-setup-guides.md#datasource-configuration)

:::caution
You will need to make sure that the user, password, connection link and db name are configured correctly, otherwise, you will receive errors at start time.
:::

:::info
The datasource is configured automatically via a liquibase script inside the engine. All updates will include migration scripts.
:::


