# Using allocation rules

Allocation rules are meant to define when tasks should be auto-assigned to users when they reach a [swimlane](../../../user-roles-management/swimlanes.md) that has a specific role configured (for example, specific tasks will be assigned for the _front office_ and specific tasks for the _back office_ only).

![](../../../img/allocation_rules.png)

:::info
Tasks will always be allocated depending on the users load (number of tasks) from current/other processes. If there are two or more users with the same number of assigned tasks, the task will be randomly assigned to one of them.
:::

### Accessing allocation rules

To access the allocation rules, follow the next steps:

1. Open **FLOWX.AI Designer**.
2. From the side menu, under **Task Management**, select the **Allocation rules** entry.

![](../../../img/access_allocation_rules.png)

### **Adding process and allocation rules**

To add process and allocation rules, follow the next steps:&#x20;

1. Click **Add process** button, in the top-right corner. (More details on how to create/configure a process are [here](../../../../flowx-designer/managing-a-process-flow/creating-a-new-process-definition.md).


![](../../../img/adding_process_and_allocation.png)

2.  Select a [**process definition**](../../../../building-blocks/process/process-definition/process-definition.md) from the drop-down list.

3.  Click **Add swimlane allocations button (+)** to add allocations.

![](../../../img/add_swimlane_allocation.png)

:::caution
**NOTE**! If there are no users with execute rights in the swimlane you want to add (`hasExecute: false`), the following error message will be displayed:
:::

![](../../../img/add_task_allocation_rules.png)

4.  **Option 1**: Allocate all users with `execute rights`.

![](../../../img/allocate_execute_rights.png)

5.  **Option 2**: Allocate only users you choose from the drop-down list. You can use the search function to filter users by name.

![](../../../img/allocate_execute_rights1.png)

6.  Click **Save**.

:::info
Users with out-of-office status will be skipped by automatic allocation. More information about out-of-office feature, [here](using-out-of-office-records).
:::

### Editing allocation rules

To edit allocation rules, follow the next steps:

1. Click **Edit** button.

![](../../../img/edit_allocation_rules.png)

2.  Change the allocation method.

![](../../../img/change_allocation_method.gif)

3.  Click **Save.**

### Viewing allocation rules&#x20;

The allocation rules list displays all the configured swimlanes grouped by process:

1. **Process** - the process definition name where the swimlanes were configured
2. **Swimlane** - the name of the swimlane
3. **Allocation** - applied allocation rules
4. **Edited at** - the last time when an allocation was edited
5. **Edited by** - the user who edited/created the allocation rules

![](../../../img/view_allocation_rules.png)

### **Exporting/importing process allocation rules**

To copy process allocation rules and move them between different environments, you can use the export/import feature.&#x20;

You can export process allocation rules as JSON files directly from the allocation rules list:

![](../../../img/export_import_allocations.gif)