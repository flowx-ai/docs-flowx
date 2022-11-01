# Customer management plugin example

## Integrate a customer search in a business flow

Follow the next steps to use the user personal number to perform a search query in the customer management plugin.

1. Open FLOWX.AI Designer web app and create a process.
2. Add a [**Kafka send event**](../../../../building-blocks/node/message-send-received-task-node.md#message-send-task) node.
3. Configure the [**Kafka send event**](../../../../building-blocks/node/message-send-received-task-node.md#message-send-task) node by adding the following elements:
* Kafka topic - defined at `KAFKA_TOPIC_CUSTOMER_SEARCH_IN` environment variable
* Message body:
  * 


**Step 3**: Go to the FLOWX.AI Designer and add a Kafka receive event

**Step 4**: Configure on what key you want to receive the response from the CRM, on the value of `KAFKA_TOPIC_CUSTOMER_SEARCH_OUT`

