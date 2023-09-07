---
sidebar_position: 5
---

# Exclusive gateway

In the world of process [flows](../../terms/flowx-process), decisions play a crucial role, and that's where the Exclusive Gateway comes into play. This powerful tool enables you to create conditional pathways with ease.

## Configuring an Exclusive gateway node

![Exclusive gateway](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/node/gateway_exclusive.png#center)

To configure this node effectively, it's essential to set up both the **input** and **output** sequences within the gateway process.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/gateway_exclusive_diagram.png)

#### General Configuration

* **Node name**: Give your node a meaningful name.
* **Can go back**: Enabling this option allows users to revisit this step after completing it.

:::info
When a step has "Can Go Back" set to false, all preceding steps become inaccessible.
:::

* [**Swimlane**](../../platform-deep-dive/user-roles-management/swimlanes.md): Choose a swimlane, ensuring that specific user roles have access only to certain process nodes. If there are no multiple swimlanes, the value is **Default**.

* [**Stage** ](../../platform-deep-dive/plugins/custom-plugins/task-management/using-stages.md): Assign a stage to the node.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/node/gateway_exclusive_stages.png)

#### Gateway Decisions

* **Language**: When configuring conditions, you can use [MVEL](/docs/platform-overview/frameworks-and-standards/business-process-industry-standards/intro-to-mvel.md) (or [DMN](#configuring-a-dmn-exclusive-gateway-node)) expressions that evaluate to either **true** or **false**.
* **Conditions**: In the **Gateway Decisions** tab, you can see that the conditions (**if, else if, else**) are already built-in and you can **select** the destination node when the condition is **true**.

:::warning
The order of expressions matters; the first **true** evaluation stops execution, and the token moves to the selected node.
:::

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/gateway_rule.png)

After the exclusive portion of the process, where one path is chosen over another, you'll need to either end each path (as in the example below) or reunite them into a single process (as in the example above) using a new exclusive gateway without any specific configuration.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/end_other_FLOW.png)

### MVEL Example

Let's take the following example, we need to create a process displaying 2 screens and one modal, the gateway will move the token either to a path where a switch element (in our case the VAT) is toggled to true or false. If it 


### DMN Example

#### Configuring a DMN Exclusive Gateway Node

If you prefer to use [DMN](/docs/platform-overview/frameworks-and-standards/business-process-industry-standards/intro-to-dmn.md) for defining gateway decisions, you can do so using exclusive gateways.

![Gateway Decisions](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/node/exclusive_gateway_DMN.gif)

**Gateway Decision - DMN example** [(applicable only for Exclusive Gateway - XOR)](exclusive-gateway-node.md)

![Gateway Decision](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/node/exclusive_gateway_decision.png)