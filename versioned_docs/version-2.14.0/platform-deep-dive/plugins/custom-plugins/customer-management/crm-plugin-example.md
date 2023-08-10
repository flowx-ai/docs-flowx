# Customer management plugin example

## Integrate a customer search in a business flow

Follow the next steps to use the user personal number to perform a search query in the customer management plugin.

1. First make sure the details about customers are indexed in the search engine (for example, elasticSearch).
2. Open FLOWX.AI Designer web app and create a process.
3. Add a [**Kafka send event**](../../../../building-blocks/node/message-send-received-task-node.md#message-send-task) node.
4. Configure the [**Kafka send event**](../../../../building-blocks/node/message-send-received-task-node.md#message-send-task) node by adding the following elements:
* Kafka topic - defined on the `KAFKA_TOPIC_CUSTOMER_SEARCH_IN` environment variable
* Message body (example of identifiers for an indexed customers):

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/crm_params.png)

:::info
For more examples of keys, check [**Using the customer management plugin**](using-the-crm-plugin.md).
:::

5. Add a [**Kafka receive event**](../../../../building-blocks/node/message-send-received-task-node.md#message-receive-task).
6. Configure the topic on which you want to receive the response from the CRM, on the value of `KAFKA_TOPIC_CUSTOMER_SEARCH_OUT` environment variable.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/crm_response.png)

Response example:

```json

"searchResults" : {
    "customers" : [ {
      "id" : "ID3456",
      "firstName" : "Jane Doe",
      "lastName" : "Doe",
      "birthDate" : "27.02.1980",
      "cui" : "1820227103840_84",
      "companyName" : "",
      "clientCategory" : "PF_INTL",
      "clientType" : "PF",
      "idSeries" : "RT",
      "idNumber" : "879948",
      "idDocType" : "CI",
      "idExpiryDate" : "27.02.2023",
      "legalForm" : "",
      "listId" : "4691602",
      "mobilePhone" : "0711111111",
      "attributes" : null,
      "type" : "PF"}],
    "hasMore" : false,
    "error" : null
  }

  ```