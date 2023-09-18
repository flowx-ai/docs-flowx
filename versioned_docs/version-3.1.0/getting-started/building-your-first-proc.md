---
sidebar_position: 2
title: Building your first process
---

# Building your first process

## Prerequisites

Let's dive into an example. :rocket:

- [x] **Step 1**: [Design a BPMN process](../flowx-designer/managing-a-process-flow)

- [x] **Step 2**: Define and manage a process flow using FLOWX Process Designer

- [x] **Step 3**: Run a process instance in FLOWX Engine

- [x] **Step 4**: Create the front-end app

- [x] **Step 5**: Connect plugins


## Designing the BPMN process: request a new credit card from a bank app

Let's start with designing the BPMN process diagram for our sample use case: requesting a new credit card from a bank app.

## Sample process steps

We'll take as a business process example a credit card application. It will have the following steps:

* a user makes a request for a new credit card - _**start event**_
* the user has to fill in a form with their personal data - _**user task**_
* the bank system must check the users credit score, this is done automatically using a send event that sends a credit score check request to the credit score adapter and a receive event that waits for the reply from the adapter - _**automatic task**_
* the process is split in two branches depending on the credit score - _**exclusive gateway**_
* on each of those branches are a service task that saves the appropriate credit card type to the proces data - _**automatic task**_
* the two branches are merged back into one by a _**closing gateway**_
* the user is shown the details of the credit card and they have to confirm it - _**user task**_
* after the user confirmation, the process is split again into two branches, this time they take place in parallel - _**parallel gateway**_. An action to register the request in the banks systems (bank system adapter / integration) and a confirmation email (notification plugin) to be sent to the user
* another automatic task follows, a call to an external API to compute the distance between the users address and the bank locations ([https://developers.google.com/maps/documentation/distance-matrix/overview](https://developers.google.com/maps/documentation/distance-matrix/overview)) - _**automatic task**_
* a new task is used to sort the location distances and pick the top three to be displayed to the user - _**automatic task**_
* the user has to pick the card pickup point from the bank location suggestions - _**user task**_
* a receive task will wait to the confirmation from the bank that the user has picked up the new card and the process flow ends _- **end event**_

## Sample process diagram

This is what the BPMN diagram looks like:

![Request a new credit card](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.1/request_a_new_credit_card.png)

:::tip
Download sample [here](./assets/sample_bpmn_process_new_credit_card.bpmn).
:::
