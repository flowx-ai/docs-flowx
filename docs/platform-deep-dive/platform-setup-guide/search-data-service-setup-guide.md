# Search data service setup guide

The service is available as a docker image.

## Dependencies

### Kafka configuration

The following Kafka related configurations can be set by using environment variables:

`SPRING_KAFKA_BOOTSTRAP_SERVERS` - address of the Kafka server

`KAFKA_TOPIC_DATA_SEARCH_IN` 

`KAFKA_TOPIC_DATA_SEARCH_OUT` 

`KAFKA_CONSUMER_THREADS` - the number of Kafka consumer threads

### Elastic search

`SPRING_ELASTICSEARCH_REST_URIS` 

`SPRING_ELASTICSEARCH_REST_DISABLESSL` 

`SPRING_ELASTICSEARCH_REST_USERNAME`

`SPRING_ELASTICSEARCH_REST_PASSWORD` 


### Authorization configuration & access roles

The following variables need to be set in order to connect to the identity management platform:

`SECURITY_OAUTH2_BASE_SERVER_URL`

`SECURITY_OAUTH2_CLIENT_CLIENT_ID`

`SECURITY_OAUTH2_REALM`

### Logging

The following environment variables could be set in order to control log levels:

`LOGGING_CONFIG_FILE`

`LOGGING_LEVEL_ROOT` - root spring boot microservice logs

`LOGGING_LEVEL_APP` - app level logs