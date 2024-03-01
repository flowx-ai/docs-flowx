---
sidebar_position: 2
---

# Adding a new node

Once you create a new [**process definition**](../../terms/flowx-process-definition), you can start configuring it by adding new [**nodes**](../../terms/flowx-node).

You can choose between a series of available node types below. For an overview of what each node represents, see [BPMN 2.0 basic concepts](../../platform-overview/frameworks-and-standards/business-process-industry-standards/intro-to-bpmn/bpmn-basic-concepts.md):

* [Start event](../../building-blocks/node/start-end-node.md)
* [End event](../../building-blocks/node/start-end-node.md)
* [Service Task](../../building-blocks/node/task-node.md)
* [User task](../../building-blocks/node/user-task-node.md)
* [Parallel gateway](../../building-blocks/node/parallel-gateway.md)
* [Exclusive gateway](../../building-blocks/node/exclusive-gateway-node.md)
* [Send message task](../../building-blocks/node/message-send-received-task-node.md)
* [Receive message task](../../building-blocks/node/message-send-received-task-node.md)
* [Start milestone](../../building-blocks/node/milestone-node.md)
* [End milestone](../../building-blocks/node/milestone-node.md)

### Steps for creating a new node

To create a new node on an existing process:

1. Open [**FLOWX Designer**](../../terms/flowx-ai-designer) and from the **Processes** tab select **Definitions**.
2. Open your **process**.
3. Click the **Edit process** button from the process definition.
4. Drag and drop one **node element**.
5. To connect the node that you just created:
   * Click the node, select the **arrow** command
   * Click the node that you wish to link to the newly added node

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/flowx-designer/process_flow_adding_a_node.gif)

For each new [**node**](../../terms/flowx-node), you can set its name, and a set of values (timeout, topic name, key name) and you can also add various [actions](../../building-blocks/actions/actions.md) to it.

[Node](../../building-blocks/node)

Now, check the next section to learn how to add an action to a node.