# Advancing Controller setup guide

## Introduction

This guide will walk you through the process of setting up the Advancing Controller and configuring it to meet your needs.

## Infrastructure Prerequisites

Advancing controller requires the following components to be set up before it can be started:

* **FLOWX.AI Engine deployment** - the Advancing Controller is dependent on the FLOWX.AI Engine and must be deployed in the same environment, refer to the [FLOWX.AI Engine setup guide](../flowx-engine-setup-guide/flowx-engine-setup-guide.md) for more information on how to set up the Engine
* **DB instance** - the Advancing Controller uses a PostgreSQL database instance


## Dependencies

* [**Database**](#database---postgres)
* [**Datasource**](#configuring-datasource)
* [**FLOWX.AI Engine**](../flowx-engine-setup-guide/flowx-engine-setup-guide.md)

### Database - Postgres

A basic Postgres configuration for the Advancing Controller can be set up using a Helm values.yaml file as follows:

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

### Configuring datasource

* the user, password, connection link, and database name need to be configured correctly, if these details are not configured correctly, errors will occur at startup
* the datasource is configured automatically via a Liquibase script inside the engine. All updates will include migration scripts.

:::info
For more details on what environment variables must to be configured, click [**here**](../platform-setup-guides.md#datasource-configuration).
:::

:::caution
It's important to keep in mind that the Advancing Controller is tightly integrated with the FLOWX.AI Engine. Therefore, it is important to ensure that both the Engine and the Advancing Controller are configured correctly and are in sync.
:::






