---
sidebar_position: 7
---

# Milestone node

A **milestone node** is used to define how [user tasks](./user-task-node/user-task-node.md) (which are placed between two milestones - **start milestone** and **end milestone**) will be displayed.

![Start milestone node](./img/milestone_node_start.png#center)
![End milestone node](./img/milestone_node_end.png#center)

Multiple options are available for displaying the content:

* [Modal](milestone-node.md#modal)
* [Page](milestone-node.md#page)
* [Stepper + Steps](milestone-node.md#stepper--steps)
* [Container](milestone-node.md#container)

## Configuring a Milestone node

A combination of [**start**](../node/start-end-node.md#configuring-a-start-node) and [**end**](./start-end-node.md#configuring-an-end-node) nodes can be used to achieve all kinds of a grouping of multiple user task nodes.

To configure a user task to be displayed in a Modal:

1. Open **Process Designer** and start configuring a process.
2. Add a **user task** that you want to display.
3. Add a **start milestone** before the user task.
4. Add an **end milestone** after the user task.

![](./img/milestone_node_modal_config.gif)

5. Select the **start milestone node** and open [UI Designer](../ui-designer/ui-designer.md) - here you can choose from multiple templates of how to display the content.

6. For example, drag and drop the **modal** template to the canvas.

7. No additional information is required for displaying a **user task** in a modal view but you can do multiple customizations via the different configurations using the UI Designer.

![Modal template](./img/milestone_node_modal_config1.gif)

## Available Components

### Modal

You can configure a start milestone node and an end milestone node before and after a [user task](user-task-node/). After adding the milestones, you can add a modal template to the start milestone node to display a modal screen (like in the example above).

![Modal screen](./img/modal_screen.png)

### Page

A basic full page content can be displayed using this kind of template on a milestone start.

![Page template](./img/milestone_page.png)

### Stepper + Steps

To create a stepper architecture:

1. First define a **milestone start node**.
2. Then add a **Stepper template** on the first node (and a **milestone end** after the **first node**).
3. In between the **stepper milestones** add for each **step** a **milestone start** and a **milestone end** node with a **Step** configuration.

![Example of a Stepper configuration with two steps](./img/stepper_config_two_steps.png)

For more information about how to create a process with a Stepper + Steps structure, and how to configure the UI, check the following section:

[Create a User Interface](../../flowx-designer/managing-a-process-flow/creating-a-user-interface.md)

### Container

Containers allows us to display multiple user task on the same Page/Modal/Step with a different layout, other than the basic one. You can use **Layout** tab to play with multiple alignments.

![Container template](./img/milestone_container.png)
