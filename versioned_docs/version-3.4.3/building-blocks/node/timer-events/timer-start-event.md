---
sidebar_position: 1
---

# Timer Start Event (Interrupting)

A Timer Start Event initiates a process instance based on a specified time or schedule. 


:::caution
Please note that a process definition version can accommodate only one Timer Start Event.
:::

:::caution
If a process definition contains versions with Start Timer Event nodes, only for the published version will generate a scheduler.
:::

## Configuration

Depending on the node type, the following timer types can be configured:

| Node Type         | Date | Duration | Cycle |
| ----------------- | ---- | -------- | ----- |
| Timer Start Event | Yes  | No       | Yes   |

### Timer Type Values

* Date
* Cycle

#### Date

Specifies an exact date and time for triggering the event. You can use ISO 8601 date format for accurate date-time representation.

#### Scenario: Employee Onboarding Reminder

In this scenario, the Timer Start Event is used to trigger an employee onboarding process at a specific date and time.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/employee_onboarding_reminder.png)

* Start Event (Timer Start Event) - New Hire Start Date
  - Timer Definition: 2023-09-01T09:00:00Z (ISO 8601 format) → This means the process will initiate automatically at the specified date and time.
  - This event serves as the trigger for the entire process.
  - Transition: → Employee Onboarding Notification
![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/start_timer_date.png)
* Employee Onboarding Notification
  - Notify new employee about onboarding requirements by sending an email notification with a template called "Important Onboarding Information"
  - Actions: The HR team or automated system sends out necessary email information/documents, and instructions to the new employee.
  - After the notification is sent, the process transitions to the Complete Onboarding node.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/onboarding_notification.png)

* Complete Onboarding
  - Employee onboarding completed
  - At this point, the employee's onboarding process is considered complete.
  - Actions: The employee may have completed required tasks, paperwork, or orientation sessions.


#### Cycle

Specifies a repeating interval for triggering the event. The cycle can be defined using ISO 8601 repeating intervals or cron expressions.

### Configuration According to Timer Type

For each timer type, the following values can be configured:

| Field             | Validations        | Accepted Values                    |
| ----------------- | ------------------ | ---------------------------------- |
| Definition        | Mandatory          | - Process param                    |
|                   |                    | - ISO 8601 formats (date/duration) |
|                   |                    | - Cron expressions (cycle)         |
| Start Time        | Only for Cycle     | - ISO 8601 format (date-time)      |
|                   |                    | - Process param                    |
| End Time          | Only for Cycle     | - ISO 8601 format (date-time)      |
|                   |                    | - Process param                    |
| Active/ Suspended | Default: Suspended | - Active                           |
|                   |                    | - Suspended                        |

:::info
The Start Timer Event supports either ISO 8601 formats or spring cron expressions for defining timer values.
:::

### General Rules

* A process definition version can have a single published version, which can be a committed or a WIP version.
* Only the published version generates a scheduler when it contains Start Timer Event nodes.
* When a new committed version is published or when a WIP published version is updated with new Start Timer Event settings:
    * The scheduler is updated based on the settings in the published version.
    * The scheduler state (active or suspended) remains the same as before.
