# Audit setup guide

The service is available as a docker image.

The audit core service comes with most of the needed configuration properties filled in, but there are a few that need to be set up using some custom environment variables.

The audit core service is available as a Docker image and is designed to make it easy to collect and analyze audit logs.

This guide will walk you through the process of setting up the service and configuring it to meet your needs.

## Dependencies 

* Docker engine: version 17.06 or higher
* Kafka: version 2.5 or higher
* Elasticsearch: version 7.11.0 or higher


## Configuration

* [**Kafka configuration**](../platform-setup-guides.md#kafka) 
* [**Authorization & access roles**](../platform-setup-guides.md#authorization--access-roles)
* [**Elastic search**](#elastic-search)
* [**Logging**](../platform-setup-guides.md#logging)

### Kafka configuration 

To configure the Kafka server, you need to set the following environment variables:

* `SPRING_KAFKA_BOOTSTRAP_SERVERS` - address of the Kafka server, it should be in the format "host:port"

* `SPRING_KAFKA_CONSUMER_GROUP_ID` - the consumer group ID to be used for the audit logs

* `KAFKA_CONSUMER_THREADS` - the number of Kafka consumer threads to be used for processing audit logs

* `KAFKA_TOPIC_AUDIT_IN` - the topic key for receiving audit logs

### Elastic search configuration 

To configure Elasticsearch, you need to set the following environment variables:

* `SPRING_ELASTICSEARCH_REST_URIS` - the URL(s) of one or more Elasticsearch nodes to connect to

* `SPRING_ELASTICSEARCH_REST_DISABLESSL` - a boolean value that determines whether SSL should be disabled for Elasticsearch connections
   
* `SPRING_ELASTICSEARCH_REST_USERNAME` - the username to use for basic authentication when connecting to Elasticsearch

* `SPRING_ELASTICSEARCH_REST_PASSWORD` - he password to use for basic authentication when connecting to Elasticsearch

* `SPRING_ELASTICSEARCH_INDEX_SETTINGS_DATASTREAM` (used if ES is used across all dev environments) - the index settings for the datastreams that will be created in Elasticsearch 



### Logging

The following environment variables could be set in order to control log levels:

* `LOGGING_LEVEL_ROOT` - the log level for the root spring boot microservice logs

* `LOGGING_LEVEL_APP` - the log level for app-level logs

:::caution
Make sure to overwrite the placeholders (where needed) with the appropriate values before starting the service.
:::

