# Intro to MVEL

MVEL, short for MVFLEX Expression Language, serves as a powerful tool for defining intricate business rules beyond the scope of DMN. Its syntax, reminiscent of Java, facilitates the creation of complex rule sets involving multiple parameters and sub-calculations.

## Understanding MVEL

MVEL empowers you to craft sophisticated business rules that may surpass the capabilities of DMN. Its runtime execution offers two modes: interpretive execution and a pre-compilation process featuring runtime byte-code generation. Leveraging pre-compilation optimizes the flow of processes for swift advancement.

## Example

```java
if( input.get("user.credit_score") >= 700 ) { 
    output.setNextNodeName("TASK_SET_CREDIT_CARD_TYPE_PREMIUM"); 
} else { 
    output.setNextNodeName("TASK_SET_CREDIT_CARD_TYPE_STANDARD"); 
}
```

Here's a breakdown of what this example does:

* Conditional Statement: The if-else construct allows the program to make a decision based on a condition.
* Condition: input.get("user.credit_score") >= 700 checks if the user's credit score, obtained from the input, is greater than or equal to 700.

Actions:

- If the condition is true, meaning the user's credit score is 700 or higher, the program sets the output to the node named "TASK_SET_CREDIT_CARD_TYPE_PREMIUM".
- If the condition is false, indicating the user's credit score is below 700, the program sets the output to the node named "TASK_SET_CREDIT_CARD_TYPE_STANDARD".
- In essence, this snippet demonstrates a basic business rule where, based on the user's credit score, it directs the process flow to different nodes, setting the next node name accordingly.

## Dive Deeper

For a comprehensive understanding and detailed guidance, refer to the [<u>**MVEL Documentation**</u>](http://mvel.documentnode.com/).