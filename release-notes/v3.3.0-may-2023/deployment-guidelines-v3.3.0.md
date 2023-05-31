# Deployment guidelines v3.3.0

:::info
Do not forget, when upgrading to a new platform version, always check and make sure your installed component versions match the versions stated in the release. To do that, go to **FLOWX.AI Designer > Platform Status**.
:::

:::caution Process compatibility
After updating to **3.3.0** FLOWX.AI release, importing old processes definitions in the new platform release is not possible (available for exports from **<= 3.3.0** releases).
:::

![](../img/release_platform_version_check.png)

## Component versions

| :ballot_box_with_check:        | 3.3.0      | 3.2.0  | 3.1.0  | 3.0.0  | 2.14.0   | 2.13.0  | 2.12.0  | 2.11.0  | 2.10.0  | 2.9.0   | 2.8.1   | 2.8.0   | 2.7.0   | 2.6.0   | 2.5.0   | 2.4.0   | 2.3.0   | 2.2.0   | 2.1.0     |
| ------------------------------ | ---------- | ------ | ------ | ------ | -------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | --------- |
| **Process engine**             | **3.2.0**  | 2.2.1  | 2.1.2  | 2.0.7  | 0.4.104  | 0.4.95  | 0.4.90  | 0.4.83  | 0.4.60  | 0.4.49  | 0.4.44  | 0.4.42  | 0.4.42  | 0.4.36  | 0.4.29  | 0.4.22  | 0.4.21  | 0.4.18  | 0.4.13    |
| **Admin**                      | **2.3.6**  | 2.2.2  | 2.1.3  | 2.0.8  | 0.3.119  | 0.3.103 | 0.3.92  | 0.3.81  | 0.3.60  | 0.3.55  | 0.3.47  | 0.3.43  | 0.3.40  | 0.3.36  | 0.3.34  | 0.3.29  | 0.3.23  | 0.3.21  | 0.3.13    |
| **Designer**                   | **3.26.0** | 3.21.1 | 3.15.1 | 3.2.1  | 2.78.4-1 | 2.63.6  | 2.60.7  | 2.48.9  | 2.39.2  | 2.33.0  | 2.28.1  | 2.24.2  | 2.23.0  | 2.19.2  | 2.18.2  | 2.17.4  | 2.15.2  | 2.14.4  | 2.11.2    |
| **@flowx/ui-sdk**              | **3.26.0** | 3.21.1 | 3.15.1 | 3.2.1  | n/a      | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a       |
| **@flowx/ui-toolkit**          | **3.26.0** | 3.21.1 | 3.15.1 | 3.2.1  | n/a      | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a       |
| **@flowx/ui-theme**            | **3.26.0** | 3.21.1 | 3.15.1 | 3.2.1  | n/a      | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a       |
| **paperflow-web-components**   | -          | -      | -      | -      | 2.78.4-1 | 2.63.6  | 2.60.7  | 0.2.10  | 0.2.10  | 0.2.10  | 0.2.6   | 0.2.6   | 0.2.6   | 0.2.6   | 0.2.6   | 0.2.6   | 0.2.6   | 0.2.5   | 0.2.4     |
| **flowx-process-renderer**     | -          | -      | -      | -      | 2.78.4-1 | 2.63.6  | 2.60.7  | 2.48.9  | 2.39.2  | 2.33.0  | 2.28.1  | 2.24.2  | 2.23.0  | 2.19.2  | 2.18.2  | 2.17.4  | 2.15.2  | 2.14.4  | 2.11.2    |
| **CMS Core**                   | 1.2.0      | 1.2.0  | 1.0.3  | 1.0.2  | 0.2.38   | 0.2.36  | 0.2.33  | 0.2.30  | 0.2.25  | 0.2.23  | 0.2.23  | 0.2.23  | 0.2.23  | 0.2.23  | 0.2.20  | 0.2.20  | 0.2.18  | 0.2.17  | 0.2.17    |
| **Scheduler Core**             | 1.0.4      | 1.0.4  | 1.0.4  | 1.0.1  | 0.0.34   | 0.0.34  | 0.0.34  | 0.0.33  | 0.0.28  | 0.0.27  | 0.0.27  | 0.0.27  | 0.0.27  | 0.0.27  | 0.0.24  | 0.0.24  | 0.0.23  | 0.0.23  | 0.0.23    |
| **events-gateway**             | **1.0.2**  | -      | -      | -      | -        | -       | -       | -       | -       | -       | -       | -       | -       | -       | -       | -       | -       | -       | -         |
| **Notification Plugin**        | 2.0.4      | 2.0.4  | 2.0.3  | 2.0.1  | 1.0.206  | 1.0.206 | 1.0.206 | 1.0.205 | 1.0.200 | 1.0.198 | 1.0.198 | 1.0.197 | 1.0.194 | 1.0.194 | 1.0.191 | 1.0.191 | 1.0.190 | 1.0.190 | 1.0.186-1 |
| **Document Plugin**            | 2.0.3      | 2.0.3  | 2.0.3  | 2.0.2  | 1.0.53   | 1.0.53  | 1.0.53  | 1.0.52  | 1.0.47  | 1.0.42  | 1.0.41  | 1.0.38  | 1.0.37  | 1.0.37  | 1.0.35  | 1.0.35  | 1.0.31  | 1.0.31  | 1.0.30    |
| **OCR Plugin**                 | 1.0.2      | 1.0.2  | 0.1.33 | 0.1.33 | 0.1.33   | 0.1.33  | 0.1.5   | 0.1.5   | 0.1.5   | 0.1.5   | 0.1.5   | 0.1.5   | 0.1.5   | 0.1.5   | 0.1.5   | 0.1.5   | 0.0.109 | 0.0.109 | 0.0.109   |
| **License Core**               | 1.02.      | 1.0.2  | 1.0.2  | 1.0.1  | 0.1.28   | 0.1.28  | 0.1.28  | 0.1.27  | 0.1.23  | 0.1.19  | 0.1.18  | 0.1.18  | 0.1.18  | 0.1.18  | 0.1.15  | 0.1.15  | 0.1.13  | 0.1.13  | 0.1.12    |
| **Customer Management Plugin** | **0.2.4**  | 0.2.3  | 0.2.3  | 0.2.1  | 0.1.28   | 0.1.28  | 0.1.28  | 0.1.27  | 0.1.23  | 0.1.22  | 0.1.22  | 0.1.22  | 0.1.22  | 0.1.22  | 0.1.20  | 0.1.20  | 0.1.18  | 0.1.18  | 0.1.18    |
| **Task Management Plugin**     | **2.0.0**  | 1.0.4  | 1.0.4  | 1.0.1  | 0.0.42   | 0.0.42  | 0.0.40  | 0.0.37  | 0.0.29  | 0.0.28  | 0.0.28  | 0.0.27  | 0.0.27  | 0.0.27  | 0.0.22  | 0.0.22  | 0.0.21  | 0.0.21  | 0.0.16    |
| **Data search**                | **0.2.0**  | 0.1.4  | 0.1.4  | 0.1.3  | 0.0.8    | 0.0.8   | 0.0.6   | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a       |
| **Audit Core**                 | **1.0.5**  | 1.0.5  | 1.0.4  | 1.0.1  | 0.0.8    | 0.0.5   | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a       |
| **Reporting**                  | 0.0.40     | 0.0.40 | 0.0.40 | 0.0.39 | 0.0.39   | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a       |
| **advancing-controller**       | **0.2.0**  | 0.1.4  | 0.1.4  | 0.1.2  | 0.0.6    | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a       |
| **iOS renderer**               | **2.0.27** | 2.0.7  | 2.0.4  | 2.0.0  | n/a      | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a       |
| **Android renderer**           | 2.0.1      | 2.0.1  | 2.0.1  | 2.0.1  | n/a      | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a     | n/a       |


:::danger IMPORTANT
With the release of **FLOWX.AI 3.0**, there have been some changes that you need to be aware when upgrading to the latest version:
* The `flowx-process-renderer` has been migrated to `@flowx\ui-sdk`.
* As of **FLOWX.AI 3.0**, the `paperflow-web-components` library is no longer being maintained. Instead, the new components can be found in `@flowxai/ui-toolkit@3.0`.
:::


### 3.3.0 recommended versions

| FLOWX.AI Platform Version | Component name               | Recommended version (tested versions) |
| ------------------------- | ---------------------------- | ------------------------------------- |
| 3.3                       | Keycloak                     | 18.0.x                                |
| 3.3                       | Kafka                        | 3.2.0                                 |
| 3.3                       | PostgreSQL                   | 14.3.0                                |
| 3.3                       | MongoDB                      | 5.0.8                                 |
| 3.3                       | Redis                        | 6.2.6                                 |
| 3.3                       | Elasticsearch                | 7.17                                  |
| 3.3                       | S3 (Min.IO) / minio-operator | 2022-05-26T05-48-41Z / 4.5.4          |
| 3.3                       | OracleDB                     | 19.8.0.0.0                            |
| 3.3                       | Angular (Web SDK)            | 15.0.0                                |


## Additional configuration

### Process engine

#### Process Instance Indexing through Kafka transport

Adding new Kafka transport strategy for sending details about process instances to be indexed in Elastic Search. Check the following environment variables and their values to set up the indexing accordingly:

* `FLOWX_INDEXING_ENABLED`

| Variable Name          | Values | Description                                                |
| ---------------------- | ------ | ---------------------------------------------------------- |
| FLOWX_INDEXING_ENABLED | true   | Indexing with Elastic Search for the whole app is enabled  |
| FLOWX_INDEXING_ENABLED | false  | Indexing with Elastic Search for the whole app is disabled |

* `FLOWX_INDEXING_PROCESSINSTANCE_INDEXING_TYPE`

| Variable Name                                | Indexing Type - Values | Definition                                                                                                                          |
| -------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| FLOWX_INDEXING_PROCESSINSTANCE_INDEXING_TYPE | no-indexing            | No indexing is performed for process instances                                                                                      |
| FLOWX_INDEXING_PROCESSINSTANCE_INDEXING_TYPE | http                   | Process instances are indexed via HTTP (direct connection from process-engine to Elastic Search thorugh HTTP calls)                 |
| FLOWX_INDEXING_PROCESSINSTANCE_INDEXING_TYPE | kafka                  | Process instances are indexed via Kafka (send data to be indexed through a kafka topic - the new strategy for the applied solution) |

:::warning
For Kafka indexing, the Kafka Connect with Elastic Search Sink Connector must be deployed in the infrastructure.
:::

* `FLOWX_INDEXING_PROCESSINSTANCE_INDEX_NAME`: specify the name of the index used for process instances

| Variable Name                                      | Values           | Definition                                                                                      |
| -------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------- |
| FLOWX_INDEXING_PROCESSINSTANCE_INDEXING_INDEX_NAME | process_instance | The name of the index used for storing process instances. It is also part of the search pattern |

* `FLOWX_INDEXING_PROCESSINSTANCE_SHARDS`: set the number of shards for the index

| Variable Name                         | Values | Definition                                                                 |
| ------------------------------------- | ------ | -------------------------------------------------------------------------- |
| FLOWX_INDEXING_PROCESSINSTANCE_SHARDS | 1      | The number of shards for the Elasticsearch index storing process instances |

* `FLOWX_INDEXING_PROCESSINSTANCE_REPLICAS`: set the number of replicas for the index

| Variable Name                           | Values | Definition                                                                   |
| --------------------------------------- | ------ | ---------------------------------------------------------------------------- |
| FLOWX_INDEXING_PROCESSINSTANCE_REPLICAS | 1      | The number of replicas for the Elasticsearch index storing process instances |


#### Topics related to process event messages

| Default parameter (env var)   | Default FLOWX.AI value (can be overwritten) |
| ----------------------------- | ------------------------------------------- |
| KAFKA_TOPIC_PROCESS_INDEX_OUT | ai.flowx.dev.core.index.process.v1          |

For more details please check the following section:

[Process Instance Indexing through Kafka transport](../../docs/platform-setup-guides/flowx-engine-setup-guide/configuring-elasticsearch-indexing)

### Events gateway

Added new **events-gateway** microservice, the following configuration is needed:

#### Kafka topics

* KAFKA_TOPIC_EVENTSGATEWAY_OUT_MESSAGE: ai.flowx.eventsgateway.engine.commands.message-100p
* KAFKA_TOPIC_EVENTSGATEWAY_OUT_DISCONNECT: ai.flowx.eventsgateway.engine.commands.disconnect-100p
* KAFKA_TOPIC_EVENTSGATEWAY_OUT_CONNECT: ai.flowx.eventsgateway.engine.commands.connect-100p

### SSE 

:::caution WebSocket Protocol Removal
Starting with the 3.3 platform release, the WebSocket protocol has been removed. Therefore, if you are using `socket.io-client`, you will need to make some changes. Here's what you should do:
:::

1. Uninstall `socket.io-client`:

Before proceeding, ensure that you uninstall `socket.io-client` from your project. You can do this using the following command:

```bash
npm uninstall socket.io-client
```

2. Install `event-source-polyfill@1.0.31`:

To replace the functionality provided by socket.io-client, you will need to use a new package called `event-source-polyfill@1.0.31` (as mentioned in the [Installing the library](#installing-the-library)). This package serves as a polyfill for the EventSource API, which enables servers to send events to clients over HTTP. The EventSource API is commonly used for server-sent events (SSE) and real-time web applications.

```bash
npm install event-source-polyfill@1.0.31
```