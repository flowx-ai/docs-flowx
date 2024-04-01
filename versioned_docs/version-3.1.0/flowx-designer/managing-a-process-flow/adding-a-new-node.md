---
sidebar_position: 2
---

# Adding a new node

Once you create a new process definition, you can start configuring it by adding new nodes.

You can choose between a series of available node types below. For an overview of what each node represents, see [BPMN 2.0 basic concepts](../../platform-overview/frameworks-and-standards/business-process-industry-standards/intro-to-bpmn/bpmn-basic-concepts/bpmn-basic-concepts.md):

* [Start Event](../../building-blocks/node/start-end-node.md)
* [End Event](../../building-blocks/node/start-end-node.md)
* [Service Task](../../building-blocks/node/task-node.md)
* [User Task](../../building-blocks/node/user-task-node.md)
* [Parallel Gateway](../../building-blocks/node/parallel-gateway.md)
* [Exclusive Gateway](../../building-blocks/node/exclusive-gateway-node.md)
* [Send Message Task](../../building-blocks/node/message-send-received-task-node.md)
* [Receive Message Task](../../building-blocks/node/message-send-received-task-node.md)
* [Start Milestone](../../building-blocks/node/milestone-node.md)
* [End Milestone](../../building-blocks/node/milestone-node.md)

### Steps for creating a new node

To create a new node on an existing process:

1. Open **FLOWX Designer** and from the **Processes** tab select **Definitions**.
2. Open your **process**.
3. Click the **Edit process** button from the process definition.
4. Drag and drop one **node element**.
5. To connect the node that you just created:
   * Click the node, select the **arrow** command
   * Click the node that you wish to link to the newly added node

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.1/process_flow_adding_a_node.gif)

For each new node, you can set its name, and a set of values (timeout, topic name, key name) and you can also add various [actions](../../building-blocks/actions/actions.md) to it.

[Node](../../building-blocks/node)

Now, check the next section to learn how to add an action to a node.