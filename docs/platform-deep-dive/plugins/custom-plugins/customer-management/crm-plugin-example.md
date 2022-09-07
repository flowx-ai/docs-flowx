# Customer management plugin example

## Integrate a customer search in a business flow

Follow the steps below in order to used the user personal number to perform a search query in the customer management plugin.

**Step 1**: Go to the Visual Flow Designer and add a Kafka send event

**Step 2**: Configure the Kafka send event with the name of the template, `KAFKA_TOPIC_CUSTOMER_SEARCH_IN` value for the Kafka topic and the specific body

**Step 3**: Go to the FLOWX.AI Designer and add a Kafka receive event

**Step 4**: Configure on what key you want to receive the response from the crm, on the value of `KAFKA_TOPIC_CUSTOMER_SEARCH_OUT`