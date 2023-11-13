---
sidebar_position: 2
---

# Adding a new node to your process

Once you've created a new [**process definition**](../../terms/flowx-process-definition), you can begin configuring it by adding various [**nodes**](../../terms/flowx-node).

You can choose from a selection of node types below. For a detailed explanation of each node type, refer to [BPMN 2.0 Basic Concepts](../../platform-overview/frameworks-and-standards/business-process-industry-standards/intro-to-bpmn/bpmn-basic-concepts.md):

<<<<<<< HEAD
* [Start/End nodes](../../building-blocks/node/start-end-node.md)
* [Service Task](../../building-blocks/node/task-node.md)
* [User Task](../../building-blocks/node/user-task-node.md)
* [Parallel Gateway](../../building-blocks/node/parallel-gateway.md)
* [Exclusive Gateway](../../building-blocks/node/exclusive-gateway-node.md)
* [Message Send/Receive (Kafka)](../../building-blocks/node/message-send-received-task-node.md)
* [Message Events](../../building-blocks/node/message-events/)
* [Error Events](../../building-blocks/node/error-events.md)
=======
* [start event](../../building-blocks/node/start-end-node.md)
* [end event](../../building-blocks/node/start-end-node.md)
* [service task](../../building-blocks/node/task-node.md)
* [user task](../../building-blocks/node/user-task-node.md)
* [parallel gateway](../../building-blocks/node/parallel-gateway.md)
* [exclusive gateway](../../building-blocks/node/exclusive-gateway-node.md)
* [message send event](../../building-blocks/node/message-send-received-task-node.md)
* [message receive event](../../building-blocks/node/message-send-received-task-node.md)
>>>>>>> fd311b9 (resolved conflicts)


## Steps to add a new node

To create a new node within an existing process, follow these steps:

1. Open your **process**.
2. Ensure that your process is in an editable state.
3. Drag and drop the desired **node element** onto your canvas.
4. To connect the newly created node:
   - Click the node, then select the **arrow** command.
   - Click the node you want to link to the newly added node.

![Adding a New Node](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/adding_a_new_node.gif)

For each new [**node**](../../terms/flowx-node) you can assign a name and define a set of values (flow names, stages, topic name, key name, depending on the node type). Additionally, you can attach various [actions](../../building-blocks/actions/actions.md) to it.

Learn more about [Nodes](../../building-blocks/node) and proceed to the next section to discover how to add actions to a node.
