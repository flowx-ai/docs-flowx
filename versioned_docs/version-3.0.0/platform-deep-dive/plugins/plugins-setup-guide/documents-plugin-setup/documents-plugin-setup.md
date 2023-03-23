# Documents plugin setup

The plugin is available as a docker image.

It has the following dependencies:

* a [postgres](https://www.postgresql.org/) database
* a [mongodb](https://www.mongodb.com/2) database in case the html templates feature is needed
* needs to be able to connect to the Kafka instance used by the engine
* a [redis](https://redis.io/) instance for caching&#x20;
* an S3 compatible file storage solution (we have successfully used [Min.io](https://min.io/))

The plugin comes with most of the needed configuration properties filled in, but there are a few that need to be set up using some custom environment variables.

## Dependencies <a href="#2939ce6e-c291-40c2-b3d6-1e789b1617d7" id="2939ce6e-c291-40c2-b3d6-1e789b1617d7"></a>

### **Postgres database**

Basic Postgres configuration - helm values.yaml

```yaml
documentdb:
  existingSecret: {{secretName}}
  metrics:
    enabled: true
    service:
      annotations:
        prometheus.io/port: {{phrometeus port}}
        prometheus.io/scrape: "true"
      type: ClusterIP
    serviceMonitor:
      additionalLabels:
        release: prometheus-operator
      enabled: true
      interval: 30s
      scrapeTimeout: 10s
  persistence:
    enabled: true
    size: 4Gi
  postgresqlDatabase: document
  postgresqlUsername: postgres
  resources:
    limits:
      cpu: 500m
      memory: 512Mi
    requests:
      cpu: 200m
      memory: 256Mi
  service:
    annotations:
      fabric8.io/expose: "false"
```

### **Redis server** <a href="#faa668e8-966f-468a-8009-f4e903e01d14" id="faa668e8-966f-468a-8009-f4e903e01d14"></a>

The plugin can use the [Redis component](https://app.gitbook.com/@flowx-ai/s/flowx-docs/flowx-engine/setup-guide#2-redis-server) already deployed for the engine.

### Document storage <a href="#4ea81105-00b4-4bf4-95f9-a55d87ea7b61" id="4ea81105-00b4-4bf4-95f9-a55d87ea7b61"></a>

You need to have an S3 compatible file storage solution deployed in your setup.

## Configuration <a href="#bad24571-ff23-4ec3-83d9-8a2ace74a6b4" id="bad24571-ff23-4ec3-83d9-8a2ace74a6b4"></a>

### Authorization configuration

The following variables need to be set in order to connect to the identity management platform:

`SECURITY_OAUTH2_BASE_SERVER_URL`

`SECURITY_OAUTH2_CLIENT_CLIENT_ID`

`SECURITY_OAUTH2_REALM`

### Enable HTML template types <a href="#d3bc9c7c-bb00-4525-9dab-c790ff72b3bd" id="d3bc9c7c-bb00-4525-9dab-c790ff72b3bd"></a>

In case you want to use html templates for documents, you need to override the following config by setting the `FLOWX_HTML_TEMPLATES_ENABLED` environment variable to true.

### Datasource configuration

To store data related to document templates and documents the service uses a Postgres / Oracle database.

The following configuration details need to be added using environment variables:

`SPRING_DATASOURCE_URL`

`SPRING_DATASOURCE_USERNAME`

`SPRING_DATASOURCE_PASSWORD`

`SPRING_JPA_PROPERTIES_HIBERNATE_DEFAULT_SCHEMA` - used to overwrite the name of the database schema

You will need to make sure that the user, password, connection link and db name are configured correctly, otherwise you will receive errors at start time.

The datasource is configured automatically via a liquibase script inside the engine. All updates will include migration scripts.

:::info
Database schema is managed by a liquibase script that will create, manage and migrate future versions.
:::

### MongoDB configuration

The only thing that needs to be configured is the DB access info, the rest will be handled by the plugin.&#x20;

`SPRING_DATA_MONGODB_URI` - the URI for the MongoDB database

### Redis configuration

The following values should be set with the corresponding Redis related values.&#x20;

`SPRING_REDIS_HOST`

`SPRING_REDIS_PASSWORD`

`REDIS_TTL`

### **Kafka configuration**

The following Kafka related configurations can be set by using environment variables:

`SPRING_KAFKA_BOOTSTRAP_SERVERS` - address of the Kafka server

`SPRING_KAFKA_CONSUMER_GROUP_ID` - group of consumers

`KAFKA_CONSUMER_THREADS` - the number of Kafka consumer threads

`KAFKA_AUTH_EXCEPTION_RETRY_INTERVAL` - the interval between retries after `AuthorizationException` is thrown by `KafkaConsumer`

`KAFKA_MESSAGE_MAX_BYTES` - this is the largest size of the message that can be received by the broker from a producer.

Each action available in the service corresponds to a Kafka event. A separate Kafka topic must be configured for each use case.

#### Generate

`KAFKA_TOPIC_DOCUMENT_GENERATE_HTML_IN`

`KAFKA_TOPIC_DOCUMENT_GENERATE_HTML_OUT`

`KAFKA_TOPIC_DOCUMENT_GENERATE_PDF_IN`

`KAFKA_TOPIC_DOCUMENT_GENERATE_PDF_OUT`


#### Persist

`KAFKA_TOPIC_FILE_PERSIST_IN`

`KAFKA_TOPIC_FILE_PERSIST_OUT`

`KAFKA_TOPIC_DOCUMENT_PERSIST_IN`

`KAFKA_TOPIC_DOCUMENT_PERSIST_OUT`

#### Split

`KAFKA_TOPIC_DOCUMENT_SPLIT_IN`

`KAFKA_TOPIC_DOCUMENT_SPLIT_OUT`

#### Combine

`KAFKA_TOPIC_FILE_COMBINE_IN`

`KAFKA_TOPIC_FILE_COMBINE_OUT`

#### Get 

`KAFKA_TOPIC_DOCUMENT_GET_URLS_IN`

`KAFKA_TOPIC_DOCUMENT_GET_URLS_OUT`

#### Delete

`KAFKA_TOPIC_FILE_DELETE_IN`

`KAFKA_TOPIC_FILE_DELETE_OUT`

#### OCR

`KAFKA_TOPIC_OCR_OUT`

`KAFKA_TOPIC_OCR_IN`

:::caution
The Engine is listening for messages on topics with names of a certain pattern, make sure to use correct outgoing topic names when configuring the documents plugin.
:::

### File storage configuration

Based on use case you can use directly a file system or an S3 compatible cloud storage solution (for example [min.io](http://min.io/)).

The file storage solution can be configured using the following environment variables:

`APPLICATION_FILE_STORAGE_S3_SERVER_URL`

`APPLICATION_FILE_STORAGE_S3_ACCESS_KEY`

`APPLICATION_FILE_STORAGE_S3_SECRET_KEY`

`APPLICATION_FILE_STORAGE_S3_BUCKET_PREFIX`

`APPLICATION_FILESTORAGE_PARTITIONSTRATEGY`

:::info
Make sure to follow the recommended [bucket naming rules](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html) when choosing the bucket prefix name.
:::

The maximum file size allowed for uploads can be set by using the `SPRING_SERVLET_MULTIPART_MAX_FILE_SIZE` & `SPRING_SERVLET_MULTIPART_MAX_REQUEST_SIZE` variables.

### **Custom font path for pdf templates** <a href="#ec30c696-d67d-473d-adf0-130fdf06254b" id="ec30c696-d67d-473d-adf0-130fdf06254b"></a>

The following config needs to be set in order to choose the font to be used when generating documents based on pdf templates: `FLOWX_PDF_GENERATION_FONT_PATH`

### Custom font paths for HTML templates

In case you want to use some specific fonts in your HTML templates, you need to override the following config: `FLOWX_HTML_TEMPLATES_FONT_PATHS`

If you don't override `FLOWX_HTML_TEMPLATES_PDFFONTPATHS`, you have Calibri and DejaVuSans as default fonts that you can use.

After making this configuration, these fonts will become available to be used inside the HTML template.

### Logging

The following environment variables could be set in order to control log levels:

`LOGGING_LEVEL_ROOT` - root spring boot microservice logs

`LOGGING_LEVEL_APP` - app-level logs

`LOGGING_LEVEL_MONGO_DRIVER` - MongoDB driver logs