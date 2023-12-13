---
sidebar_position: 3
---

# Adding an action to a node

Actions play a crucial role in embedding business decisions within your [**flow**](../../terms/flowx-process) or connecting your process with custom integrations and [**plugins**](../../terms/flowx-plugins).

## Steps to create an action

:::info
In this example, we will illustrate how to add a business rule, written in MVEL, to validate user input and display specific text based on the input.
:::

To create an action, follow these steps:

1. Start by adding a new **node** or editing an existing one.
2. :exclamation: Depending on the selected action type, you may need to provide specific **action parameters**.
3. Add **an action** to the **task node**, such as a **business rule**.
4. Choose the scripting language, in this case, MVEL.
5. Include the relevant body message along with your defined keys.

![Adding an Action](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/adding_an_action_new.gif)

### Example used

```java
if (input.application.helloWorld == "Hello World") {
    output.put("application", {
        "salutation": {
            "neWsalutation": "Hello!"
        }
    });
} else {
    output.put("application", {
        "salutation": {
            "neWsalutation": "Test"
        }
    });
}
```

The provided Business rule code snippet demonstrates a basic "if-else" conditional statement. It checks the value of `input.application.helloWorld` to determine whether it's equal to "Hello World." 

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/adding_an_action_examp.png)

If the condition is true, it sets the "output" with a salutation of "Hello!" and, if false, it sets the salutation to "Test." This code allows for different output values based on the condition of `input.application.helloWorld`.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/3.5/smth_else.gif)

:::info
Nodes that support actions include [**Task nodes**](../../building-blocks/node/task-node.md), [**User task nodes**](../../building-blocks/node/user-task-node.md), and [**Kafka message send nodes**](../../building-blocks/node/message-send-received-task-node.md).
:::

For a comprehensive understanding of actions, explore the following section:

[Actions](../../building-blocks/actions)
