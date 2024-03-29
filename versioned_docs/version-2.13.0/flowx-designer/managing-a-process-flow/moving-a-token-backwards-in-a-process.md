---
sidebar_position: 7
---

# Moving a token backwards in a process

:::info
**What is it?** Back in process is a functionality that allows you to go back in a business process redo a series of previous actions in the process.

**Why is it useful?** Brings a whole new level of flexibility in using a business flow or journey, allowing the user to go back a step without losing all the data he/she inputed so far.
:::

In most cases, the token instance will just need to advance forward in the process as the actions on the process are completed.

[Token](../../building-blocks/token)

But there might be cases when the token will need to be moved backward in order to redo a series of previous actions in the process.

We will call this behavior **resetting the token**.

The token can only be reset to certain actions on certain process nodes. These actions will be marked accordingly with a flag `allowTokenReset`. When such an action is triggered from the application, the current process token will be marked as aborted and a new one will be created and placed on the node that contains the action that was executed. If any sub-processes were started between the two token positions, they will also be aborted when the token is reset.

The newly created token will copy from the initial token all the information regarding the actions that were performed before the reset point.

There are a few configuration options available in order to decide which of the data to keep when resetting the token:

* `restartFromSnapshot` - if set to true, the process parameter values will be reset to the values they had before the first execution of that action
* `keysForRestart`- an array of process parameter values keys to be copied from the initial execution of that process part

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/pf_moving_token_bw.gif)