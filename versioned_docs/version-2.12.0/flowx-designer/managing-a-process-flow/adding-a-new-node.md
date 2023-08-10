---
sidebar_position: 2
---

# Adding a new node

Once you create a new process definition, you can start configuring it by adding new nodes.

You can choose between a series of available node types below. For an overview of what each node represents, see [BPMN 2.0 basic concepts](../../platform-overview/frameworks-and-standards/business-process-industry-standards/intro-to-bpmn/bpmn-basic-concepts/bpmn-basic-concepts.md):

* [start event](../../building-blocks/node/start-end-node.md)
* [end event](../../building-blocks/node/start-end-node.md)
* [service task](../../building-blocks/node/task-node/task-node.md)
* [user task](../../building-blocks/node/user-task-node/user-task-node.md)
* [parallel gateway](../../building-blocks/node/parallel-gateway.md)
* [exclusive gateway](../../building-blocks/node/exclusive-gateway-node.md)
* [message send event](../../building-blocks/node/message-send-received-task-node.md)
* [message receive event](../../building-blocks/node/message-send-received-task-node.md)
* [start milestone](../../building-blocks/node/milestone-node.md)
* [end milestone](../../building-blocks/node/milestone-node.md)

### Steps for creating a new node

To create a new node on an existing process:

1. Open **FLOWX.AI Designer** and from the **Processes** tab select **Definitions**.
2. Open your **process**.
3. Click the **Edit process** button from the process definition.
4. Drag and drop one **node element**.
5. To connect the node that you just created:
   * Click the node, select the **arrow** command
   * Click the node that you wish to link to the newly added node

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.12/process_flow_adding_a_node.gif)

For each new node, you can set its name, and a set of values (timeout, topic name, key name) and you can also add various [actions](../../building-blocks/actions.md) to it.

[Node](../../building-blocks/node)

Now, check the next section to learn how to add an action to a node.