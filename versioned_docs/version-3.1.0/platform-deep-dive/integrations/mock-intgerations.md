# Mock integrations

In case you need to test the business process flow, but not all integrations are completed, you can still do so by using a mock integrations server included in the platform.

## Setup

Configure DB settings for the microservice, it uses a Postgres DB.

Deploy the mocked adapter microservice.

## Add a new integration

The only thing that needs to be done in order to set up a mocked integration is to add a mock Kafka request and response.

This can be done by adding the info directly to the DB or by using the provided API.

You will need to add a separate entry for each Kafka message exchange between the engine and the integration.

<details>
<summary><span class="postcall"><b>POST</b></span><b> MOCK_ADAPTER_URL/api/kafka-exchanges/ </b></summary>

**add new Kafka exchange mock**

**Parameters**

**Body**

* `sentMessageJson` (string) - the mocked json message that the integration will send
* `receivedMessageJson` (string) - the json message the integration should reply to
* `outgoingTopic` (string) - should match the topic the engine listens on for replies from the integration
* `incomingTopic` (string) - should match the topic name that the integration listens on

**Responses**

200 - the newly added kafka exchange will be returned

</details>


<details>
<summary><span class="getcall"><b>GET</b></span><b> MOCK_ADAPTER_URL/api/kafka-exchanges/ </b></summary>

**view all available Kafka exchanges**

Returns the complete list of all available mocked Kafka exchange messages.

**Parameters**

**Path**

string

**Responses**

200 

</details>