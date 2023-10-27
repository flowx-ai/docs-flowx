---
sidebar_position: 4
---

# Implementing decision logic in the workflow

Incorporating business decisions into your workflow and using them to select between different flow branches can be achieved using [exclusive gateways](../../building-blocks/node/exclusive-gateway-node.md).

![Exclusive Gateway](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/node/gateway_exclusive.png#center)

## Steps for creating a workflow with exclusive branches

To create a workflow with exclusive branches, follow these steps:

1. Begin by adding a user task to capture input.
2. Add an **exclusive gateway node**.
3. Configure the exclusive gateway node's rule to make a decision based on the input captured in the initial user task.
4. Integrate two distinct **user task nodes** and connect them after the **exclusive gateway node**.
5. Include a new **exclusive gateway** to merge the two flow branches back into a single branch.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/xor_gateways_new.png)

For implementing [business rules](../../building-blocks/actions/business-rule-action/business-rule-action.md), it is essential to examine specific values within the process and select the appropriate outgoing node when the conditions are met. Ensure that the gateway node is connected to the subsequent nodes before configuring the rule.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/xor_flow_rule.png)


### Example used

* Language: MVEL.

MVEL is the scripting language used to define the rules or expressions for this node.


* **`input.application.helloWorld == "Hello World"`** - This indicates that the rules defined in the node will be evaluated when the specified condition is met.

* **Go To Node:"match_user_input"** - This is the condition or expression that is evaluated to determine the next node to go to if it evaluates to "true." In this case, it checks whether the value of "input.application.helloWorld" is equal to "Hello World."

* **Otherwise go to: "other"** - This specifies the next node to go to if the condition in the "Go To Node" section (input.application.helloWorld == "Hello World") is not met. In this case, if the condition is false, the workflow will proceed to the node named "other."

In summary, this node is a decision point in a workflow where it checks if the value of "input.application.helloWorld" is "Hello World." If the condition is true, it will proceed to another node (not specified in the provided information). If the condition is false, it will go to a node named "other." This allows for branching in the workflow based on the evaluation of the specified condition.

Learn more about Exclusive Gateways:

[Exclusive Gateway Nodes](../../building-blocks/node/exclusive-gateway-node.md)
