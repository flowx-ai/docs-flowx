---
sidebar_position: 1
---

# Business Rule actions

:::info
**What is it?**  A business rule is an action type that allows you to configure a script on a [**BPMN**](../../../terms/bpmn) task [**node**](../../../terms/flowx-node). When the [**process instance**](../../../terms/flowx-process-instance) [**token**](../../../terms/token) reaches this task, the defined script will be executed.

**Why is it useful?** The script can read and write the data available on the process at the moment the script is executed. For this reason, it is very important to understand what data is available on the process when the script is executed.
:::

## Supported languages

Business rules can be attached to a node by using actions with [**action rules**](../actions.md#action-rules) on them. These can be specified using [DMN rules](dmn-business-rule-action.md), [MVEL](../../../platform-overview/frameworks-and-standards/business-process-industry-standards/intro-to-mvel.md) expressions, or scripts written in JavaScript, Python, or Groovy.

[Supported scripts](../../supported-scripts.md)

![Business rule action](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/business_rule_action.png)


You can also test your rules by using the **Test Rule** function.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/test_rule_function.png)

## Configuration

To use a Business Rules Action, follow these steps:

1. **Select a BPMN Task Node**: Choose the BPMN task node to which you want to attach the Business Rules Action. This could be a Service Task, User Task, or another task type that supports actions.
2. **Define the Action**: In the task node properties, configure the "Business Rules Action" field and select the desired language (MVEL, Java, JavaScript or Python).
3. **Write the Business Rule**: In the selected language, write the business rule or decision logic. This rule should take input data, process it, and possibly generate an output or result.
4. **Input and Output Variables**: Ensure that the task node can access the necessary input variables from the BPMN process context and store any output or result variables as needed.
5. **Execution**: When the BPMN process reaches the task node, the attached Business Rules Action is executed, and the defined business rule is evaluated.
6. **Result**: The result of the business rule execution may affect the flow of the BPMN process, update process variables, or trigger other actions based on the logic defined in the rule.

Let's take look at the following example. We have some data about the gender of a user and we need to create a business rule that computes the formal title based on the gender:

1.  This is how the process instance data looks like before it reaches the business rule:

    ```json
    {
        "application" : {
            "client" : 
            {
                "firstName" : "David",
                "surName" : "James",
                "gender" : "M",
                
            }
        }
    }
    ```
2.  When the token reaches this node the following script (defined for the business rule is executed). The language used here for scripting is MVEL.

```java
if (input.application.client.gender == 'F') {
    output.put("application", {
        "client": {
            "salutation": "Ms"
        }
    });
} else if (input.application.client.gender == 'M') {
    output.put("application", {
        "client": {
            "salutation": "Mr"
        }
    });
} else {
    output.put("application", {
        "client": {
            "salutation": "Mx"
        }
    });
}
```

3. After the script is executed, the process instance data will look like this:

```json
{
    "application": {
        "client": {
            "firstName": "David",
            "surName": "James",
            "gender": "M",
            "salutation": "Mr"
        }
    }
}
```

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/mvel_example.gif)

## :warning: Flattened vs unflattened keys

:::warning
With version [**2.5.0**](/release-notes/v2.5.0-april-2022) we introduced unflattened keys inside business rules. Flattened keys are now obsolete. You are notified when you need to delete and recreate a business rule so it contains an unflattened key.
:::

![Obsolete business rule](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/obsolete_business_rule.png)

## MVEL example

:::success
Example available for [**v2.5.0**](/release-notes/v2.5.0-april-2022) version and higher
:::

```java
if (input.application.client.gender == 'F') {
    output.put("application", {
        "client": {
            "salutation": "Ms"
        }
    });
} else if (input.application.client.gender == 'M') {
    output.put("application", {
        "client": {
            "salutation": "Mr"
        }
    });
} else {
    output.put("application", {
        "client": {
            "salutation": "Mx"
        }
    });
}
```
In the given unflattened structure, the code is organized hierarchically using nested objects (typically represented as dictionaries or maps in programming languages). Let's break down the structure step by step:

1. Input and Output:

    * There are two primary objects, input and output, representing the input data and the output data, respectively.

2. Application Object:

    * Within the input object, there is an application object.
    * Within the output object, there is also an application object.

3. Client Object:

    * Inside the application object, there is a client object.
    * This client object contains information related to the client.

4. Gender Property:

    * Inside the client object, there is a gender property.
    * The value of the gender property is checked in conditional statements.

5. Conditional Statements:

    * The code contains conditional statements (if, else if, and else) based on the value of `input.application.client.gender`.
    * If the gender is 'F' (female), the code sets the salutation property to "Ms" inside the `output.application.client` object.
    * If the gender is 'M' (male), the code sets the salutation property to "Mr" inside the `output.application.client` object.
    * If the gender is neither 'F' nor 'M', the code sets the salutation property to "Mx" inside the `output.application.client` object.
    * In summary, this unflattened structure represents a data hierarchy with nested objects, mirroring the organization of information within the input and output objects, with a focus on client-related data and conditional logic based on the client's gender to determine the appropriate salutation to be included in the output.

For more information about each type of Business Rule Action, check the following sections:

[DMN Business Rule Action](dmn-business-rule-action.md)