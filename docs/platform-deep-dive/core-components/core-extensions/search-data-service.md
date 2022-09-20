# Search data service

Search data is a microservice that searches for data in an another processes.

The search data service enables you to create a process that is able to perform a search/look for data (using  Kafka Send/ Kafka receive actions) in another process.

:::tip
Using elastic search the service will be able to search for keys that are indexed there via existing mechanics.
::: 

:::caution
Elastic Search indexing must be switched on the FLOWX.AI Engine configuration. This can be done by adding the following variable: `
:::

## Using search data

Use case:
* search for data in other processes
* display results about other processes where the search key was found

1. Create a process using Process Designer.
2. From the newly created process where you want to perform the search, configure a send event via a Kafka send action
3. Configure the following items:
    + Topic name: in
    + Headers - required
    + Body message:

```javascript
{
	"searchKey": "application.client.name",
	"value": "12344",
	"processStartDateAfter": "formatDeDataStandard", (opt)
	"processStartDateBefore": "formatDeDataStandard", (opt)
	"processDefinitionNames": [ "processDef1", "processDef2" ],
	"status": ["ANY",...]
}
```

4. A custom microservice (a core extension) will receive this event and will search the value of the process in the elastic search.
    * this microservice will have a service account for secure interactions with elasticsearch.

5. It will respond to engine via a Kafka topic:
    + topic name - out
    + Headers - will be thrown back
    + Body message will look like this:
        + if there is no result:

```javascript
{
	"searchKey": "application.client.name",
	"result": [],
	"processStartDate": date,
	"toManyResults": true|false
}
```
    
* if there is a list of results - up to 50 - if toManyResults is true

```javascript
{
	"searchKey": "application.client.name"
	"result":[{
			"processInstanceUUID": "UUID",
			"status": "CREATED",
			"processStartDate": date,
			"data" : {"all data in elastic for that process"}
	}],
	"toManyResults": true|false
}
```

## Example

Let's assume we have 3 processes:
1. One that adds data
2. One for data identification
3. One used for searching data in other process.

### Configure the add data process

### Configure the identification  process

### Configure the search data process

#### Topics

* Topic Name (address) - the Kafka topic on which the search service listens for requests

##### Message

* searchKey  -  it will hold the result received from the elastic search
* value - 
* processDefinitionNames
* processStartDateAfter 

#### Advanced configuration

* Show headers:

#### Data to send
* searchValue2 - (key) are used when data is sent from the frontend via an action to validate the data (you can find more information in the User Task configuration section)