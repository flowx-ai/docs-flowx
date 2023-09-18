---
sidebar_position: 3
---

# 📦 Task management

### **What is Task management plugin?**

:::info
**What is it?** Task Management is a plugin suitable for back-officers and supervisors as it can be used to easily track and assign activities/tasks inside a company.

**Why is it useful?** The Task Management plugin has the scope to show a process that you defined using FLOWX Designer, using a more business-oriented view. It also offers interactions at the assignment level.
:::

![Task Manager](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/task_management_overview.gif)

Inside the **Task details** tab you can find the following information about a process:

* **Priority** - to prioritize the tasks
* **Status** - the status of a process
* **Stage** - specific stages during the execution of a process
* **Comments** - comments left by the users
* **History** - information like who created a task, when a task was created or when the status changed

![Task details](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/task_mngmnt_task_details.png)

:::caution
Specific roles need to be defined in a process to use all the task management features. For more details, check the [Configuring access roles for processes](../../../../platform-setup-guides/flowx-engine-setup-guide/configuring-access-roles-for-processes.md) section.
:::

### Statuses & definitions in Task Manager

There are multiple statuses that Task Manager could display, depending on the state of the process.

| Status        | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Created**   | This status is visible only if it is a problem with process creation. If the process has no error in the configuration you will see the **Started** status instead.                                                                                                                                                                                                                                                                                                                                                       |
| **Started**   | It shows that the process is in progress (it is running).                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Finished**  | The process reached an end node and finished the execution.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Failed**    | This status is displayed when a [CronJob](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/) is configured and enabled inside the [FLOWX engine](../../../core-components/flowx-engine/). For example, if the CronJob is triggered at a particular hour, and the instance is not finished by then, all the tasks will be moved to `FAILED` status.                                                                                                                                                     |
| **Expired**   | <p>This status is displayed when <code>expiryTime</code> field is defined inside the process definition. A user can set up an <code>expiryTime</code> function, by following these steps:</p><ol><li>Go to <strong>FLOWX Designer > Processes > Definitions</strong>.</li><li>Select a process and then click on the "<strong>⋮</strong>" <strong></strong> button then select <strong>Settings.</strong></li><li>Inside the <strong>General</strong> tab, you can edit the <strong>Expiry time</strong> field.</li></ol> |
| **Aborted**   | This status is available for processes that also contain subprocesses. When a subprocess is running (and the [token is moved backward](https://docs.flowx.ai/flowx-designer/managing-a-process-flow/moving-a-token-backwards-in-a-process) to redo a series of previous actions) - the subprocess will be aborted.                                                                                                                                                                                                        |
| **Dismissed** | This status is available for processes that also contain subprocesses. This status is displayed when a user stops a subprocess                                                                                                                                                                                                                                                                                                                                                                                            |
| **On hold**   | The process cannot be edited anymore. A superuser can trigger this status so he can block actions on the process until further clarification - unfreeze.                                                                                                                                                                                                                                                                                                                                                                  |

### Using the plugin

The Task Manager plugin allows its users to see a list of tasks and perform the required actions. Based on their roles, users can perform the following actions using Task Manager:

* Assign/unassign a task
* Put the process on HOLD
* Add comments
* View Application

:::info
You can also set Task Manager to send more information about your process by switching on **Update task management?** button. This will enable the Task manager plugin to send additional information like title, priority, or metadata. You can set up this action for multiple nodes.
:::

**To set up Task Management to send extra updates on your process, follow the next steps:**

1. Go to **Flowx.AI Designer** and open your **process definition**.
2. Click **Edit** button.
3. Select a **node** (after reaching this particular node task manager will trigger the updates).
4. Switch on the **Update task management?** button.

![Update task management](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/task_mngmnt_response.png)

:::info
Some actions might not be available as they can be performed based on user roles/access rights.
:::

To find out more about how to configure the Task Manager plugin, check the [Task Management plugin setup](../../plugins-setup-guide/task-management-plugin-setup/) section.

[Task Management plugin setup](../../plugins-setup-guide/task-management-plugin-setup/)
