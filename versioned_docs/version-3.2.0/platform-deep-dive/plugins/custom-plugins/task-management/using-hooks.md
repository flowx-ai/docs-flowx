# Using hooks

Hooks allow you to extract stateful logic from a component, so it can be tested and reused independently.

Users with task management permissions can create hooks to trigger specific process instances, such as sending notifications when events occur. Follow the instructions below to set up roles for hooks scope usage:

[Manage hooks roles](../../plugins-setup-guide/task-management-plugin-setup/task-management-plugin-setup.md)

![Hooks](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.2/hooks.png)

Hooks can be linked to different events and define what will happen when they are triggered. Below you can find a list of all possible triggers for each hook.

import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

<Tabs>

<TabItem value="process" label="Process">
<ul>
<li>unique result</li>
<li>only one rule will match, or no rule</li>
</ul>
</TabItem>

<TabItem value="swimlane" label="Swimlane">
<ul>
<li>rule outputs are prioritized</li>
<li>rules may overlap, but only match with the highest output priority counts </li>
</ul>
</TabItem>

<TabItem value="stage" label="Stage">
<ul>
<li> unique results </li>
<li>multiple rules can be satisfied </li>
<li>all satisfied rules must generate the same output, otherwise the rule is violated</li>
</ul>
</TabItem>

</Tabs>


### Creating a hook

To create a new hook, follow the next steps:

1. Open **FLOWX.AI Designer**.
2. Go to Task Manager and select **Hooks**.
3. Click **New Hook** (you can also import or export a hook).
4. Fill in the required details.

![Create a new hook](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.2/creating_a_hook.png)

### Types of hooks

There are three types of hooks you can create in Task Manager:

* process hooks
* swimlane hooks
* stage hooks

:::info
Swimlane and stage hooks can be configured with an SLA (time when a triggered process is activated).
:::

![SLA hooks](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.2/hook_types.png)

:::info
Dismiss SLA is available only for hooks configured with SLA.
:::

[Here](https://www.digi.com/resources/documentation/digidocs/90001437-13/reference/r\_iso\_8601\_duration\_format.htm) you can find more information about the SLA - duration formatting.