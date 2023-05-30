# Process instance indexing

This section provides configuration steps for enabling process instance indexing using the Kafka transport strategy. Before proceeding, it is recommended to familiarize yourself with Elasticsearch and its indexing process by referring to the Intro to Elasticsearch section:

[Intro to Elasticsearch](../../platform-overview/frameworks-and-standards/event-driven-architecture-frameworks/intro-to-elasticsearch)


## Configuration updates

To enable Kafka indexing strategy, the previous configuration parameter `flowx.use-elasticsearch` is being replaced. However, to ensure backward compatibility, it will still be preserved in the configuration. Below is an example of how to configure it:

```json
spring:
  elasticsearch:
    index-settings:
      name: process_instance
      shards: 1
      replicas: 1

```

Instead of the removed configuration, a new configuration area has been added:

```json
flowx:
  indexing:
    enabled: true  // true | false - specifies if the indexing with Elastic Search for the whole app is enabled or disabled.
    processInstance:  // set of configurations for indexing process instances. Can be duplicated for other objects.
      indexing-type: kafka  // no-indexing | http | kafka - the chosen indexing strategy.
      index-name: process_instance  // the index name that is part of the search pattern.
      shards: 1
      replicas: 1
```

The `flowx.indexing.enabled` property determines whether indexing with Elasticsearch is enabled. When set to false or missing, no indexing will be performed for any entities defined below. When set to true, indexing with Elasticsearch is enabled.


:::info
If the `FLOWX_INDEXING_ENABLED` configuration is set to false, the following configuration information and guidelines are not applicable to your use case.
:::

The `flowx.indexing.processInstance.indexing-type` property defines the indexing strategy for process instances. It can have one of the following values:

* **no-indexing**: No indexing will be performed for process instances.
* **http**: Direct connection from the process engine to Elasticsearch through HTTP calls.
* **kafka**: Data will be sent to be indexed via a Kafka topic using the new strategy. To implement this strategy, the Kafka Connect with Elasticsearch Sink Connector must be deployed in the infrastructure.

## Configuration Steps

To enable indexing with Elasticsearch for the entire application, update the process-engine configuration with the following parameters:

* `FLOWX_INDEXING_ENABLED`: set this parameter to `true` to enable indexing with Elastisearch for the entire application

| Variable Name          | Enabled | Description                                                |
| ---------------------- | ------- | ---------------------------------------------------------- |
| FLOWX_INDEXING_ENABLED | true    | Indexing with Elastic Search for the whole app is enabled  |
| FLOWX_INDEXING_ENABLED | false   | Indexing with Elastic Search for the whole app is disabled |

* `FLOWX_INDEXING_PROCESSINSTANCE_INDEXING_TYPE`: set this parameter to `kafka` to use the Kafka transport strategy for indexing process instances

| Variable Name                                | Indexing Type - Values | Definition                                                                                                                          |
| -------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| FLOWX_INDEXING_PROCESSINSTANCE_INDEXING_TYPE | no-indexing            | No indexing is performed for process instances                                                                                      |
| FLOWX_INDEXING_PROCESSINSTANCE_INDEXING_TYPE | http                   | Process instances are indexed via HTTP (direct connection from process-engine to Elastic Search thorugh HTTP calls)                 |
| FLOWX_INDEXING_PROCESSINSTANCE_INDEXING_TYPE | kafka                  | Process instances are indexed via Kafka (send data to be indexed through a kafka topic - the new strategy for the applied solution) |

:::warning
For Kafka indexing, the Kafka Connect with Elastic Search Sink Connector must be deployed in the infrastructure.
:::

[Elasticsearch Service Sink Connector](https://docs.confluent.io/kafka-connectors/elasticsearch/current/overview.html)

* `FLOWX_INDEXING_PROCESSINSTANCE_INDEX_NAME`: specify the name of the index used for process instances
* `FLOWX_INDEXING_PROCESSINSTANCE_SHARDS`: set the number of shards for the index
* `FLOWX_INDEXING_PROCESSINSTANCE_REPLICAS`: set the number of replicas for the index

### Configuration examples

#### Example configuration for applying the solution with Kafka Connect:

```json
flowx:
  indexing:
    enabled: true
    processInstance:
      indexing-type: kafka
      index-name: process_instance
      shards: 1
      replicas: 1
```

#### Kafka Connect configuration

```json
body:
{
    "connector.class": "io.confluent.connect.elasticsearch.ElasticsearchSinkConnector",
    "tasks.max": "1",
    "topics": "process_instance-minute-test", //Source Kafka topic. Must be the same as the one declared in the process defined as ${kafka.topic.naming.prefix}.core.index.process${kafka.topic.naming.suffix}
    "key.ignore": "false", //This tells Kafka Connect (KC) to process the key of the message - it will be used as the ID of the object in Elasticsearch. 
    "schema.ignore": "true", //This tells KC to ignore the mapping from the Kafka message. Elasticsearch will use internal mapping. See below. 
    "connection.url": "https://elasticsearch-es-http:9200", // URL to Elasticsearch
    "connection.username": "elastic", 
    "connection.password": "in config files",
    "elastic.security.protocol": "SSL",
    "elastic.https.ssl.keystore.location": "/opt/kafka/external-configuration/elasticsearch-keystore-volume/keystore.jks",
    "elastic.https.ssl.keystore.password": "in config files",
    "elastic.https.ssl.key.password": "in config files",
    "elastic.https.ssl.keystore.type": "JKS",
    "elastic.https.ssl.truststore.location": "/opt/kafka/external-configuration/elasticsearch-keystore-volume/keystore.jks",
    "elastic.https.ssl.truststore.password": "in config files",
    "elastic.https.ssl.truststore.type": "JKS",
    "elastic.https.ssl.protocol": "TLS",
    "batch.size": 1000,   //The size of the message batch that KC will process.
    "linger.ms": 1,
    "read.timeout.ms": 10000,  //Increased to 10000 from the default 3000 due to flush.synchronously = true.
    "flush.synchronously": "true",   //The way of writing to Elasticsearch. It must stay "true" for the router below to work.
    "drop.invalid.message": "true",   //If false, the connector will wait for a configuration that allows processing the message. If true, the connector will drop the invalid message.
    "behavior.on.null.value": "IGNORE",  // Must be IGNORE to avoid blocking the processing of null messages.
    "behavior.on.malformed.documents": "IGNORE",  //Must be IGNORE to avoid blocking the processing of invalid JSONs.
    "write.method": "UPSERT",   //UPSERT to create or update the index.
    "type.name": "_doc",
    "key.converter": "org.apache.kafka.connect.storage.StringConverter", 
    "key.converter.schemas.enable": "false",  // No schema defined for the key in the message.
    "value.converter": "org.apache.kafka.connect.json.JsonConverter",
    "value.converter.schemas.enable": "false",  // No schema defined for the value in the message body.
    "transforms":"routeTS",  // The router that helps create indices dynamically based on the timestamp (process instance start date).
    "transforms.routeTS.type":"org.apache.kafka.connect.transforms.TimestampRouter",  
    "transforms.routeTS.topic.format":"process_instance-${timestamp}", // It is important that this value must start with the value defined in process-engine and data-search in config: spring.elasticsearch.index-settings.name. The name of the index will start with a prefix ("process_instance-" in this example) and must have the timestamp appended after for dynamically creating indices. For backward compatibility (utilizing the data in the existing index), the prefix must be "process_instance-". However, backward compatibility isn't specifically required here.
    "transforms.routeTS.timestamp.format":"yyyyMMddHHmm" // This format ensures that the timestamp is represented consistently and can be easily parsed when creating or searching for indices based on the process instance start date.
}
```
```yaml
spec:
  class: io.confluent.connect.elasticsearch.ElasticsearchSinkConnector
  tasksMax: 2
  config:
    tasks.max: "2" # The maximum number of tasks that can be run in parallel for this connector, which is 2 in this case.
    topics: "ai.flowx.core.index.process.v1" # Source Kafka topic. Must be the same as the one declared in the process defined as ${kafka.topic.naming.prefix}.core.index.process${kafka.topic.naming.suffix}
    key.ignore: "false" # This tells Kafka Connect (KC) to process the key of the message - it will be used as the ID of the object in Elasticsearch. 
    schema.ignore: "true" # This tells KC to ignore the mapping from the Kafka message. Elasticsearch will use internal mapping. See below. 
    connection.url: "https://elasticsearch-es-http:9200" # URL to Elasticsearch
    connection.username: "elastic"
    connection.password: "Yyh03ZI66310Hyw59MXcR8xt"
    elastic.security.protocol: "SSL"
    elastic.https.ssl.keystore.location: "/opt/kafka/external-configuration/elasticsearch-keystore-volume/keystore.jks"
    elastic.https.ssl.keystore.password: "MPx57vkACsRWKVap"
    elastic.https.ssl.key.password: "MPx57vkACsRWKVap"
    elastic.https.ssl.keystore.type: "JKS"
    elastic.https.ssl.truststore.location: "/opt/kafka/external-configuration/elasticsearch-keystore-volume/keystore.jks"
    elastic.https.ssl.truststore.password: "MPx57vkACsRWKVap"
    elastic.https.ssl.truststore.type: "JKS"
    elastic.https.ssl.protocol: "TLS"
    batch.size: 1000 # The size of the message batch that KC will process.
    linger.ms: 1
    read.timeout.ms: 30000 # Increased to 30000 from the default 3000 due to flush.synchronously = true.
    flush.synchronously: "true" # The way of writing to Elasticsearch. It must stay "true" for the router below to work.
    drop.invalid.message: "true" # If false, the connector will wait for a configuration that allows processing the message. If true, the connector will drop the invalid message.
    behavior.on.null.values: "IGNORE" #Must be IGNORE to avoid blocking the processing of null messages.
    behavior.on.malformed.documents: "IGNORE" #Must be IGNORE to avoid blocking the processing of invalid JSONs.
    write.method: "UPSERT" # UPSERT to create or update the index.
    type.name: "_doc"
    key.converter: "org.apache.kafka.connect.storage.StringConverter"
    key.converter.schemas.enable: "false" # No schema defined for the key in the message.
    value.converter: "org.apache.kafka.connect.json.JsonConverter"
    value.converter.schemas.enable: "false" # No schema defined for the value in the message body.
    transforms: "routeTS" # The router that helps create indices dynamically based on the timestamp (process instance start date).
    transforms.routeTS.type: "org.apache.kafka.connect.transforms.TimestampRouter"
    transforms.routeTS.topic.format: "process_instance-${timestamp}" #It is important that this value must start with the value defined in process-engine and data-search in config: spring.elasticsearch.index-settings.name. The name of the index will start with a prefix ("process_instance-" in this example) and must have the timestamp appended after for dynamically creating indices. For backward compatibility (utilizing the data in the existing index), the prefix must be "process_instance-". However, backward compatibility isn't specifically required here.
    transforms.routeTS.timestamp.format: "yyyyMMdd" #This format ensures that the timestamp is represented consistently and can be easily parsed when creating or searching for indices based on the process instance start date.
```

#### Example configuration for using HTTP indexing

```yaml
flowx:
  indexing:
    enabled: true
    processInstance:
      indexing-type: http
      index-name: process_instance
      shards: 1
      replicas: 1
```

If you don't want to remove the existing configuration parameters, you can use the following example:

```yaml
spring:
  elasticsearch:
    index-settings:
      name: process_instance
      shards: 1
      replicas: 1
flowx.use-elasticsearch: true
flowx:
  indexing:
    enabled: ${flowx.use-elasticsearch}
    processInstance:
      indexing-type: http
      index-name: ${spring.elasticsearch.index-settings.name}
      shards: ${spring.elasticsearch.index-settings.shards}
      replicas: ${spring.elasticsearch.index-settings.replicas}

```

### Querying Elasticsearch

To read from multiple indices, queries in Elasticsearch have been updated. The queries now run against an index pattern that identifies multiple indices instead of a single index. The index pattern is derived from the value defined in the configuration property:

`spring.elasticsearch.index-settings.name`

### Kafka topics

#### Process event message topic

This topic is used for sending the data to be indexed from Process engine. The data from this topic will be read by Kafka Connect.

- Key: `${kafka.topic.process.index.out}`
- Value: `${kafka.topic.naming.prefix}.core.index.process${kafka.topic.naming.suffix}`


| Default parameter (env var)   | Default FLOWX.AI value (can be overwritten) |
| ----------------------------- | ------------------------------------------- |
| KAFKA_TOPIC_PROCESS_INDEX_OUT | ai.flowx.dev.core.index.process.v1          |

:::caution IMPORTANT

- the topic name, defined in the value, will be used by Kafka Connect as source for the messages to be sent to Elastic Search for indexing.
- the attribute: **indexLastUpdatedTime** is new and will be populated for the kafka-connect strategy. This will tell have the timestamp when last operation was done on the object in the index.

:::

### Elasticsearch Update (Index Template)

Since mappings between messages and Elasticsearch data types are unknown, a mapping needs to be specified. This is achieved through an index template created by the process engine during startup. The template applies to indices starting with the value defined in `spring.elasticsearch.index-settings.name` config. Here's an example of the index template:

```json 
//process_instance_template
{
    "index_patterns": ["process_instance*"],
    "priority": 300,
    "template":  
    {
	  "mappings": {
	    "_doc": {
	      "properties": {
	        "_class": {
	          "type": "keyword",
	          "index": false,
	          "doc_values": false
	        },
	        "dateStarted": {
	          "type": "date",
	          "format": "date_optional_time||epoch_millis"
	        },
	        "id": {
	          "type": "text",
	          "fields": {
	            "keyword": {
	              "type": "keyword",
	              "ignore_above": 256
	            }
	          }
	        },
	        "indexLastUpdatedTime": {
	          "type": "date",
	          "format": "date_optional_time||epoch_millis"
	        },
	        "keyIdentifiers": {
	          "type": "nested",
	          "include_in_parent": true,
	          "properties": {
	            "_class": {
	              "type": "keyword",
	              "index": false,
	              "doc_values": false
	            },
	            "key": {
	              "type": "text",
	              "fields": {
	                "keyword": {
	                  "type": "keyword",
	                  "ignore_above": 256
	                }
	              }
	            },
	            "originalValue": {
	              "type": "text",
	              "fields": {
	                "keyword": {
	                  "type": "keyword",
	                  "ignore_above": 256
	                }
	              }
	            },
	            "path": {
	              "type": "text",
	              "fields": {
	                "keyword": {
	                  "type": "keyword",
	                  "ignore_above": 256
	                }
	              }
	            },
	            "value": {
	              "type": "text",
	              "fields": {
	                "keyword": {
	                  "type": "keyword",
	                  "ignore_above": 256
	                }
	              }
	            }
	          }
	        },
	        "processDefinitionName": {
	          "type": "text",
	          "fields": {
	            "keyword": {
	              "type": "keyword",
	              "ignore_above": 256
	            }
	          }
	        },
	        "state": {
	          "type": "text",
	          "fields": {
	            "keyword": {
	              "type": "keyword",
	              "ignore_above": 256
	            }
	          }
	        }
	      }
	    }
	  },
        "settings":{
        "number_of_shards":5,
        "number_of_replicas":1
        }
    }
}
```

