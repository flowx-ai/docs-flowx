# Search Data Service

The Search Data Service is a microservice that enables data searches within other processes. It facilitates the creation of processes capable of conducting searches and retrieving data by utilizing [Kafka send](../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-send-task-node) / [Kafka receive](../../../building-blocks/node/message-send-received-task-node.md#configuring-a-message-receive-task-node) actions in tandem with Elastic Search mechanisms.

:::tip
The new Search Data microservice leverages Elastic Search to execute searches based on indexed keys, using existing mechanisms.
:::

:::caution
Enabling Elastic Search indexing **requires** activating the configuration in the FLOWX.AI Engine. Refer to the [<u>**Search Data Service Setup Guide**</u>](../../../platform-setup-guides/search-data-service-setup-guide.md) for detailed instructions.
:::


## Using the Search Data Service

#### Use Case

- Search for data within other processes
- Display results indicating where the search key was found in other processes

For our example, two process definitions are necessary:

- one process used to search data in another process - in our example *"search_process_CDN"*

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/search_in_another_proc_34.png)

- one process where we look for data - in our example *"add_new_clients"*

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/search_populate_data.png)

## Add Data Process Example

Firstly, create a process where data will be added. Subsequently, the second process will be used to search for data in this initial process.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/addDataProc.png)

Example of MVEL Business Rule:

```json
output.put ("application", {
  "date": "22.08.2022",
    "client": {
      "identificationData": {
        "firstName": "John",
        "lastName": "Doe",
        "cityOfBirth": "Anytown",
        "primaryDocument": {
          "number": 123456,
          "series": "AB",
          "issuedCountry": "USA",
          "issuedBy": "Local Authority",
          "issuedAt": "01.01.2010",
          "type": "ID",
          "expiresAt": "01.01.2030"
        },
        "countryOfBirth": "USA",
        "personalIdentificationNumber": "1234567890",
        "countyOfBirth": "Any County",
        "isResident": true,
        "residenceAddress": {
          "country": "USA",
          "city": "Anytown",
          "street": "Main Street",
          "streetNumber": 123
        },
        "mailingAddress": {
          "country": "USA",
          "city": "Anytown",
          "street": "Main Street",
          "streetNumber": 123
        },
        "pseudonym": null
      },
    }
    }
);
```

Now we can play with this process and create some process instances with different states.

### Search Process Example

Configure the "Search process" to search data in the first created process instances:

1. Create a process using the [**Process Designer**](../../../terms/flowx-process-designer).
2. **OPTIONAL:** Add a [<u>**Task node**</u>](../../../building-blocks/node/task-node) within the process. Configure this node and add a business rule if you want to customize the display of results, e.g:

```java
output.put("searchResult", {"result": []});
output.put("resultsNumber", 0);
```

3. Add a user task and configure a send event using a [<u>**Kafka send action**</u>](../../../building-blocks/node/message-send-received-task-node.md#example-of-a-message-send-event). Configure the following parameters:
- **Topic name**: The Kafka topic for the search service requests (defined at `KAFKA_TOPIC_DATA_SEARCH_IN` env variable in your deployment).

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/search_in_topic.png)

- **Body message**:

```json
{
	"searchKey": "application.client.identificationData.lastName",
	"value": "12344",
	"processStartDateAfter": "YYY-MM-DD:THH:MM:SS", //optional, standard ISO 8601 date format
	"processStartDateBefore": "YYY-MM-DD:THH:MM:SS", //optional, standard ISO 8601 date format
	"processDefinitionNames": [ "processDef1", "processDef2"],
	"states": ["ANY",...]
}
```

:::info
Check the Understanding the [<u>**Process Status Data**</u>](../../../building-blocks/process/active-process/process-instance.md#understanding-the-process-status-data) for more example of possible states.
:::

* `searchKey` - process key used to search data stored in a process

:::caution
It is mandatory to index this key on the process where resides, so the search data service will be able to localize it. To do this, go to your desired process definition then access **Process Settings → Task Management → Search indexing**.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/indexed_key.png)

:::

* `value` - the dynamic process key added on our input element that will store and send the data entered by a user to the front end

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/searchValue.png)

- **Data to send (key)**: Used for validating data sent from the frontend via an action (refer to User Task configuration section) 
- **Headers**: Mandatory - `{"processInstanceId": ${processInstanceId}}`

:::caution
If you also use callbackActions, you will need to also add the following headers:
`{"destinationId": "search_node", "callbacksForAction": "search_for_client"}`
:::


* Example (dummy values extracted from a process):

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/body_message_search_service.png)

5. A custom microservice (a core extension) will receive this event and search the value in the Elastic Search.
6. It will respond to the engine via a Kafka topic.

:::tip
Define the topic in the Node config of the User task where you added the Kafka Send Action.
:::

The response's body message will look like this:

- If there is no result:

```json
{
	"result": [],
	"searchKey": "application.client.name.identificationData.lastName",
	"tooManyResults": "false",
	"searchValue": "random"

}
```

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/noResults.png)

Example (dummy values extracted from a process):

:::tip
To access the view of your process variables, tokens and subprocesses go to **FLOWX.AI Designer > Active process > Process Instances**. Here you will find the response.
::: 

    
- If there is a list of results:

```json
{

	"searchKey": "application.client.identificationData.personalIdentificationNumber"
	"result":[{
			"processInstanceUUID": "UUID",
			"status": "FINISHED",
			"processStartDate": date,
			"data" : {"all data in elastic for that process"}
	}],
	"tooManyResults": true|false
}
```
**NOTE**: Up to 50 results will be received if `tooManyResults` is true.


Example with dummy values extracted from a process:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/search_data_response.png)


For deployment and service setup instructions, refer to the:

[Search Data Service Setup Guide](../../../platform-setup-guides/search-data-service-setup-guide.md)