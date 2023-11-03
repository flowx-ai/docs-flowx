---
sidebar_position: 2
---

# Advancing controller

The Advancing Controller is a support service for the [Process Engine](./flowx-engine.md) that enhances the efficiency of advancing operations. It facilitates equal distribution and redistribution of the workload during scale-up and scale-down scenarios.

To achieve its functionality, the Advancing Controller microservice utilizes Postgres triggers in the database configuration.

:::info
A Postgres trigger is a function that is automatically executed whenever specific events, such as inserts, updates, or deletions, occur in the database.
:::


## Usage

The Advancing Controller Service is responsible for managing and optimizing the advancement process in the PostgreSQL/OracleDB databases. It ensures efficient workload distribution, performs cleanup tasks, and monitors the status of worker pods. If a worker pod fails, the service reassigns its work to other pods to prevent process instances from getting stuck. It is essential to have the Advancing Controller Service running alongside the Process Engine for uninterrupted instance advancement.

:::info
It is important to ensure that both the Process Engine and the Advancing Controller microservice are up and running concurrently for optimal performance.
:::


## Configuration

For detailed instructions on how to set up the Advancing Controller microservice, refer to the following guide:

[Advancing controller setup guide](../../platform-setup-guides/flowx-engine-setup-guide/advancing-controller-setup-guide.md)