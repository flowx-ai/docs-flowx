---
sidebar_position: 8
---

# Subprocess run node

:::info
There might be cases when extra functionality is needed on certain nodes.
::::

A node that provides advanced options for starting subprocesses.

![](./img/subprocess_run_node.png#center)


[Subprocess](../process/subprocess.md)


It contains a default action for starting a sub-process.

A subprocess can be started in two modes:

* **async mode** - the parent process will continue without waiting for the sub-process to finish

:::info
Select if this task should be invoked asynchronously. Make tasks asynchronous if they cannot be executed instantaneously, for example, a task performed by an outside service.
:::

* **sync mode** - the parent process must wait for the subprocess to finish before advancing

The start mode can be chosen when configuring the sub-process run node.

In case the parent process needs to wait for the sub-process to finish and retrieve some results from it, the parent process key that will hold the results must be defined using the _output key_ node config value_._

![](./img/subprocess_run_config.png)

This node type can also be used for starting a set of subprocesses that will be started and run at the same time. This will prove useful in case we have an array of values in the parent process parameters and we want to start a sub-process for each of the elements in that array.

![](./img/subprocess_run_config1.png)

In order to do this, we need to select the parallel multi instance option. The _collection key_ name from the parent process also needs to be specified.

:::info
When designing such a subprocess that will be started in a loop, you need to keep in mind that the input value for the sub-process (that is, one of the values from the array in the parent process) will be stored in the sub-process parameter values under they key named _item_. This will have to be used inside the sub-process. If this sub-process produces any results, they should be stored under a key named _result_ in order to be sent back to the parent process.
:::
