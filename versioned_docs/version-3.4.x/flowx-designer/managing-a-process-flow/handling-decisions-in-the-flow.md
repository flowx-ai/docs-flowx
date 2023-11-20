---
sidebar_position: 4
---

# Handling decisions in the flow

To add business decisions in the flow and use them to pick between a flow branch or another, we can use [exclusive gateways](../../building-blocks/node/exclusive-gateway-node.md).

![Exclusive Gateway](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/node/gateway_exclusive.png#center)

### Steps for creating a flow with exclusive branches

To create flow with exclusive branches:

1. Open [**FLOWX Designer**](../../terms/flowx-ai-designer) and go to the **Definitions** tab.
2. Click on the **New process** button, using the **breadcrumbs** from the top-right corner.
3. Add a **start node** and an **exclusive gateway node**.
4. Add two different **task nodes** and link them after the **exclusive** **gateway node**.
5. Add a new **exclusive gateway** to merge the two flow branches back into one branch.
6. Add a **new rule** to a node to add a **business decision**, for example:

* select a **scripting language** from the dropdown
* `input.get("application.client.creditScore") >= 700` ← proceed to node for premium credit card
* `input.get("application.client.creditScore") < 700` ← proceed to node for standard credit card

7. Add a **closing exclusive gateway** to continue the flow.
8. Add and **end node**.

For [business rules](../../building-blocks/actions/business-rule-action/business-rule-action.md), you need to check certain values from the process and pick an outgoing node in case the condition is met. The gateway node must be connected to the next nodes before configuring the rule.

![Visual Guide Exclusive Gateway](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/flowx-designer/visual_guide_exclusive_gateway.gif)

[Exclusive Gateway Node](../../building-blocks/node/exclusive-gateway-node.md)

