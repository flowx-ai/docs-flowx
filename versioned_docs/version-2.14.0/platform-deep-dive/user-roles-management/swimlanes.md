---
sidebar_position: 1
--- 

# Swimlanes

:::info
**What is it?** Swimlanes provide a way of grouping process nodes by process participants.

**Why is it useful?** Using swimlanes we can make sure only certain user roles have access to certain process nodes.
:::

In some cases it might be necessary to restrict access to process nodes based on user roles. This can be done by adding the nodes on different swimlanes. The swimlanes will be configured to only allow access for certain user roles defined in the chosen identity provider platform.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.14/swimlanes.png)

Depending on the type of node added in a swimlane, only the users that have the necessary swimlane roles will be able to start process instances, view process instances and execute actions on process instances.

When creating a new process definition, a default swimlane will automatically be added.

While the token moves from one node to the next, it might move from one swimlane to another. If the user that interacts with the process instance no longer has access on the new swimlane, they will view the process in read-only mode and not be able to interact with it until the token returns on a swimlane they have access to.

The users will be notified when they can no longer interact with the process or when they can resume actions on the process.

[Configuring access roles for processes](../../platform-setup-guides/flowx-engine-setup-guide/configuring-access-roles-for-processes.md)