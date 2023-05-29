# Process Instance Indexing through Kafka transport

For more details about what is elasticsearch and how indexing works, please check the following section first:

[Intro to Elasticsearch](../../platform-overview/frameworks-and-standards/event-driven-architecture-frameworks/intro-to-elasticsearch)

## Configuration Steps

Update the process-engine configuration with the following parameters:

* `flowx.indexing.enabled`: Set this parameter to true to enable indexing with Elastic Search for the entire application.
* `flowx.indexing.processInstance.indexing-type`: Set this parameter to kafka to use the Kafka transport strategy for indexing process instances.
* `flowx.indexing.processInstance.index-name`: Specify the name of the index used for process instances.
* `flowx.indexing.processInstance.shards`: Set the number of shards for the index.
* `flowx.indexing.processInstance.replicas`: Set the number of replicas for the index.

### Example configuration

```json
flowx:
  indexing:
    enabled: true
    processInstance:
      indexing-type: kafka
      index-name: process_instance
      shards: 2
      replicas: 2
```