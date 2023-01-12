# Audit setup guide

The service is available as a docker image.

The audit core service comes with most of the needed configuration properties filled in, but there are a few that need to be set up using some custom environment variables.

## Dependencies 

### Kafka configuration 

`SPRING_KAFKA_BOOTSTRAP_SERVERS` - address of the Kafka server

`SPRING_KAFKA_CONSUMER_GROUP_ID` - a group of consumers

`KAFKA_CONSUMER_THREADS` - the number of Kafka consumer threads

`KAFKA_TOPIC_AUDIT_IN` - topic key for receiving audit logs - default value: `ai.flowx.audit.log`


### Elastic search

`SPRING_ELASTICSEARCH_REST_URIS`

`SPRING_ELASTICSEARCH_REST_DISABLESSL`
  
`SPRING_ELASTICSEARCH_REST_USERNAME`

`SPRING_ELASTICSEARCH_REST_PASSWORD`

### Authorization & access roles

The following variables need to be set in order to connect to the identity management platform:

`SECURITY_OAUTH2_BASE_SERVER_URL`

`SECURITY_OAUTH2_CLIENT_CLIENT_ID`

`SECURITY_OAUTH2_CLIENT_CLIENT_SECRET`

`SECURITY_OAUTH2_REALM`

### Logging

The following environment variables could be set in order to control log levels:

`LOGGING_LEVEL_ROOT` - root spring boot microservice logs

`LOGGING_LEVEL_APP` - app level logs


