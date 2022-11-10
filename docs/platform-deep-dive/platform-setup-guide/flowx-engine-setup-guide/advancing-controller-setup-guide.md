# Advancing Controller setup guide

## Infrastructure Prerequisites

There are some components that are mandatory to start the advancing controller:

### FLOWX.AI Engine deployment

Check the FLOWX.AI Engine setup guide for more information:

[FLOWX.AI Engine setup guide](./flowx-engine-setup-guide.md)


### Database - Postgres

A basic Postgres configuration:

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

To store process definition and the data about the process instances the advancing controller uses a Postgres database.

The following configuration details need to be added using environment variables:

`SPRING_DATASOURCE_URL`

`SPRING_DATASOURCE_USERNAME`

`SPRING_DATASOURCE_PASSWORD`

You will need to make sure that the user, password, connection link and db name are configured correctly, otherwise, you will receive errors at start time.

The datasource is configured automatically via a liquibase script inside the engine. All updates will include migration scripts.
