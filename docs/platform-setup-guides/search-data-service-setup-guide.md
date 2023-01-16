# Data search service setup guide


## Introduction

This guide will walk you through the process of setting up the Search Data service using a Docker image.

## Infrastructure prerequisites

Before proceeding with the setup, ensure that the following components have been set up:

* **Redis** - version 6.0 or higher 
* **Kafka** - version 2.8 or higher
* **Elasticsearch** - version 7.11.0 or higher

## Dependencies

* **Kafka** - used for communication with the engine
* **Elasticsearch** - used for indexing and searching data
* **Redis** - used for caching

## Configuration

### Configuring Kafka

Set the following Kafka-related configurations using environment variables:

* `SPRING_KAFKA_BOOTSTRAP_SERVERS` - address of the Kafka server

* `KAFKA_TOPIC_DATA_SEARCH_IN` 

* `KAFKA_TOPIC_DATA_SEARCH_OUT` 

* `KAFKA_CONSUMER_THREADS` - the number of Kafka consumer threads

### Configuring Elasticsearch

Set the following Elasticsearch-related configurations using environment variables:

* `SPRING_ELASTICSEARCH_REST_URIS` 

* `SPRING_ELASTICSEARCH_REST_DISABLESSL` 

* `SPRING_ELASTICSEARCH_REST_USERNAME`

* `SPRING_ELASTICSEARCH_REST_PASSWORD` 


### Configuring authorization & access roles

Set the following environment variables to connect to the identity management platform:

* `SECURITY_OAUTH2_BASE_SERVER_URL`

* `SECURITY_OAUTH2_CLIENT_CLIENT_ID`

* `SECURITY_OAUTH2_REALM`

### Configuring logging

The following environment variables could be set in order to control log levels:

* `LOGGING_LEVEL_ROOT` - for root spring boot microservice logs

* `LOGGING_LEVEL_APP` - for app level logs

