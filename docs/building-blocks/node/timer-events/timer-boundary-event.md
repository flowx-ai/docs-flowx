---
sidebar_position: 3
---

# Timer Boundary Events

A Timer Boundary Event is a type of event in Business Process Model and Notation (BPMN) that is associated with a specific task or subprocess within a process. It triggers when a predetermined time duration or a specific date is reached while the associated task or subprocess is in progress.

Timer Boundary Events are utilized to incorporate time-related conditions into processes, enabling actions to be taken at specified time intervals, deadlines, or specific dates. This capability is especially valuable for scenarios where time-sensitive actions or notifications need to be integrated seamlessly within process flows.


## Timer Boundary Event - Interrupting

A Timer Boundary Event is an event attached to a specific activity (task or subprocess) that is triggered when a specified time duration or date is reached. It can interrupt the ongoing activity and initiate a transition.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/timer_boundary_event_interrupting.svg#center)

### Configuration

For Timer Boundary Events - Interrupting, the following values can be configured:

| Field      | Validations | Accepted Values                  |
| ---------- | ----------- | -------------------------------- |
| Definition | Mandatory   | ISO 8601 formats (date/duration) |
|            |             | Process param                    |

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/intermediate_timer_event.png)

### General Rules

* When the token enters the parent activity, a scheduler is set, and it waits for the timer event to be triggered.
* When the timer is triggered, the ongoing activity is terminated, and the process continues with the defined transition.

## Timer Boundary Event - Non-Interrupting

A Timer Boundary Event is an event attached to a specific activity (task or subprocess) that is triggered when a specified time duration or date is reached. It can trigger independently of the ongoing activity and initiate a parallel path.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/timer_boundary_event_non_interrupting.svg#center)

### Configuration

For Timer Boundary Events - Non-Interrupting, the following values can be configured:

| Field      | Validations | Accepted Values                  |
| ---------- | ----------- | -------------------------------- |
| Definition | Mandatory   | ISO 8601 formats (date/duration) |
|            |             | Process param                    |

### General Rules

* When a token arrives at a node with a Timer Boundary Event - Non-Interrupting associated:
    * A trigger is scheduled, but the current token execution remains unaffected.
* When the token enters the parent activity, a scheduler is set, and it waits for the timer event to be triggered.
* If the timer is a cycle, it is rescheduled for the specified number of repetitions.
* The scheduler is canceled if the token leaves the activity before it is triggered.