---
sidebar_position: 3
---

# 📦 Task management

### What is Task management plugin?

Task management is a plugin that enables back-officers and supervisors to easily track and assign tasks within a company. It provides a business-oriented view of a process defined using FLOWX.AI Designer and allows interactions at the assignment level.

![Task Manager](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.1/task_management_overview.gif)

Inside the **Task Manager → All tasks** you can find the **Activities** tab which consists of the following items:

* **Title** - title of the task
* **Stage** - specific [stages](./using-stages.md) during the execution of a process
* **Assignee** - assignee of the process
* **Status** - status of the process, more details [here](#process-status-updates)
* **Priority** - to prioritize the tasks
* **Last updated** - timestamp for latest updates
* **Search** - the search function is used to look for keys stored on the process

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.1/indexed_keys.png)

The **Task details** tab within the **Task Manager** displays key information about a process, such as:

* **Priority** - to prioritize the tasks
* **Status** - the status of a process
* **Stage** - specific stages during the execution of a process
* **Comments** - comments left by the users
* **History** - information like who created a task, when a task was created or when the status changed

![Task details](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.1/task_mngmnt_task_details.png)

:::caution
It is important to note that specific roles must be defined in a process to use all the task management features. More information about configuring access roles for processes can be found in the [Configuring access roles for processes](../../../../platform-setup-guides/flowx-engine-setup-guide/configuring-access-roles-for-processes.md) section.
:::

:::caution
To enable Task Manager to retrieve information about tasks performed on a process make sure **Use process in task management** toggle is switched on. To do this go to **Process definition → Settings → General**.
:::


### Statuses & Definitions in Task Manager

Task Manager displays multiple statuses, depending on the state of the process.

#### Process status updates

| Status        | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Created**   | This status is visible only if it is a problem with process creation. If the process has no error in the configuration you will see the **Started** status instead.                                                                                                                                                                                                                                                                                                                                                       |
| **Started**   | It shows that the process is in progress (it is running).                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Finished**  | The process reached an end node and finished the execution.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Failed**    | This status is displayed when a [CronJob](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/) is configured and enabled inside the [FLOWX engine](../../../core-components/flowx-engine/). For example, if the CronJob is triggered at a particular hour, and the instance is not finished by then, all the tasks will be moved to `FAILED` status.                                                                                                                                                     |
| **Expired**   | <p>This status is displayed when <code>expiryTime</code> field is defined inside the process definition. A user can set up an <code>expiryTime</code> function, by following these steps:</p><ol><li>Go to <strong>FLOWX Designer > Processes > Definitions</strong>.</li><li>Select a process and then click on the "<strong>⋮</strong>" <strong></strong> button then select <strong>Settings.</strong></li><li>Inside the <strong>General</strong> tab, you can edit the <strong>Expiry time</strong> field.</li></ol> |
| **Aborted**   | This status is available for processes that also contain subprocesses. When a subprocess is running (and the [token is moved backward](https://docs.flowx.ai/flowx-designer/managing-a-process-flow/moving-a-token-backwards-in-a-process) to redo a series of previous actions) - the subprocess will be aborted.                                                                                                                                                                                                        |
| **Dismissed** | This status is available for processes that also contain subprocesses. This status is displayed when a user stops a subprocess                                                                                                                                                                                                                                                                                                                                                                                            |
| **On hold**   | The process cannot be edited anymore. A superuser can trigger this status, so he can block actions on the process until further clarification - unfreeze.                                                                                                                                                                                                                                                                                                                                                                 |
|               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

#### Swimlanes updates

| Status             | Definition                            |
| ------------------ | ------------------------------------- |
| **Swimlane enter** | When the token enters a new swimlane. |
| **Swimlane exit**  | When the token exits a swimlane.      |


#### Stages updates 

| Status          | Definition                         |
| --------------- | ---------------------------------- |
| **Stage enter** | When the token enters a new stage. |
| **Stage exit** | When the token exits a stage.      |


### Using the plugin

The Task Manager plugin allows users to view a list of tasks and perform various actions based on their roles:

* Assign/unassign a task
* Put the process on HOLD
* Add comments
* View Application - the URL of your application (could be also a generic parameter defined as a URL)

:::info
You can also set Task Manager to send more information about your process by switching on **Update task management?** button at node level. This will enable the Task manager plugin to send additional information like title, priority, or metadata. You can set up this action for multiple nodes.
:::

Standard information that is sent to Task Management plugin:

**To set up Task Management to send extra updates on your process, follow the next steps:**

1. Go to **Flowx.AI Designer** and open your **process definition**.
2. Click **Edit** button.
3. Select a **node** (after reaching this particular node task manager will trigger the updates).
4. Switch on the **Update task management?** button.

![Update task management](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.1/task_mngmnt_response.png)

:::info
Some actions might not be available as they can be performed based on user roles/access rights.
:::

For more information about configuring the Task Manager plugin, refer to the [Task Management plugin setup](../../plugins-setup-guide/task-management-plugin-setup/) section.

[Task Management plugin setup](../../plugins-setup-guide/task-management-plugin-setup/)
