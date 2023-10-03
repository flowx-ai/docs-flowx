---
sidebar_position: 2
---

# Timer Intermediate Event

A Timer Intermediate Event is an event that is triggered based on a specified time duration or date. It is placed within the flow of a process and serves as a point of interruption and continuation.

## Configuring a timer intermediate event

| Field      | Validations | Accepted Values                  |
| ---------- | ----------- | -------------------------------- |
| Definition | Mandatory   | ISO 8601 formats (Date/Duration) |
|            |             | Process Parameters               |

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/intermediate_timer_event.png)

### Timer Types

#### Date-based timer
    
* This timer triggers an event at a specific date and time.
* It follows the ISO 8601 format, for example: `2019-10-01T12:00:00Z` (UTC time) or `2019-10-02T08:09:40+02:00` (UTC with a two-hour zone offset).

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/intermediate_timer_date.png)

#### Duration-based timer

- This timer triggers an event after a specified duration from when the token reaches the timer node (or its parent node).
- Example: `PT6S` for 6 seconds.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/6seconds.gif)

##### ISO

:::info
Example using ISO expressions.
:::

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/intermediate_definition_iso.png)


##### Process parameters

Timers can be configured using process parameters. In this example, we used a service task node to send data to the `timer.expression` key attached to the timer intermediate.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/intermediate_process_param.png)

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/intermediate_process_param.gif)

## General Rules

* A Timer Intermediate Event is triggered based on its duration or date definition.
* When the token enters a Timer Intermediate Event, a scheduler is set, and it waits for the timer event to be triggered.
* After the timer is triggered, the process instance continues.

