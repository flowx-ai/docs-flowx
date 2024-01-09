---
sidebar_position: 2
title: Creating your first process
---

# Creating Your First Process

## Prerequisites

Let's explore an example: :rocket:

- **Step 1**: [Design a BPMN Process](../flowx-designer/managing-a-process-flow)

- **Step 2**: Define and manage a process flow using [**FLOWX Process Designer**](../terms/flowx-process-designer)

- **Step 3**: Run a process instance in [**FLOWX Engine**](../terms/flowxai-process-engine)

- **Step 4**: Create the [**Front-End App**](../terms/flowx-frontend-application)

- **Step 5**: Connect [**Plugins**](../terms/flowx-plugins)

## Designing the BPMN Process: Requesting a New Credit Card from a Bank App

Let's initiate by designing the BPMN process diagram for a sample use case: requesting a new credit card from a bank app.

## Sample Process Steps

Taking a [**business process example**](../terms/flowx-process) of a credit card application, it involves the following steps:

- A user initiates a request for a new credit card - _**Start Event**_
- The user fills in a form with their personal data - _**User Task**_
- The bank system performs a credit score check automatically using a send event that communicates with the credit score adapter, followed by a receive event to collect the response from the adapter - _**Automatic Task**_
- The process bifurcates based on the credit score using an _**Exclusive Gateway**_
- Each branch entails a service task that saves the appropriate credit card type to the process data - _**Automatic Task**_
- The branches reconvene through a _**Closing Gateway**_
- The user views the credit card details and confirms - _**User Task**_
- After user confirmation, the process divides into two parallel branches - _**Parallel Gateway**_. One registers the request in the bank's systems (bank system adapter/integration), and the other sends a confirmation email (notification plugin) to the user
- An additional automatic task follows: a call to an external API to compute the distance between the user's address and the bank locations ([Google Maps Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/overview)) - _**Automatic Task**_
- A task is utilized to sort the location distances and present the top three to the user - _**Automatic Task**_
- The user selects the card pickup point from the bank location suggestions - _**User Task**_
- A receive task awaits confirmation from the bank that the user has collected the new card, concluding the process flow - _**End Event**_


## Sample Process Diagram

Here's what the [**BPMN**](../terms/bpmn) diagram illustrates:

![Request a new credit card](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/request_a_credit_card_new.png)

:::tip
Download the sample [here](./assets/sample_bpmn_process_new_credit_card.bpmn).
:::
