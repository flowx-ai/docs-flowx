---
sidebar_position: 5
---

# Adding more flow branches

To split the [**process flow**](../../terms/flowx-process) into more steps, you just need to use a [parallel gateway](../../building-blocks/node/parallel-gateway.md) node type.

![Parallel Gateway](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/flowx-designer/process_flowx_parallel.png#center)

### Steps for creating a flow with two branches

To create a flow with two branches, follow these steps:

1. Start by adding a **parallel gateway node** to open the parallel processing zone.
2. Next, introduce two different nodes: **a user task** and a **task node**, and establish connections after the **parallel gateway node**.
3. Conclude the process by adding another **parallel gateway** to merge the two flow branches back into a single branch.


![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/parallel_process.png)

In the provided example, a user task and a service task execute in parallel when the process begins, resulting in the following outcome:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/parallel_var.png)


:::info
In the context of parallel gateways, a parent token is initially divided into new child tokens. These child tokens become inactive once all of them have reached the closing node of the parallel gateway, and the parent token is then reactivated.
:::

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/parallel_tokens.png)


[Parallel Gateway](../../building-blocks/node/parallel-gateway.md)
