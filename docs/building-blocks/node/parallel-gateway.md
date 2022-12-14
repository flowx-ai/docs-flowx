---
sidebar_position: 6
---

# Parallel Gateway

If multiple operations can be done in parallel a Parallel Gateway can be used. This kind of node will open a parallel section of the process, very useful for integrations that can be done in parallel, without waiting for each other. Each parallel section should be also closed by another parallel Gateway node.

## Configuring a Parallel Gateway node

![](./img/gateway_parallel.png#center)

This kind of node has no special configuration and can start 2 or more parallel paths. It is important to keep in mind that the close Parallel node, required to close the parallel section will wait for all branches to finish before moving to next node.

![](./img/gateway_parallel_config.png)
