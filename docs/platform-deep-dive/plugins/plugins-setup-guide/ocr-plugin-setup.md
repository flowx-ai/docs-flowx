# OCR plugin setup

The OCR plugin is a docker image that can be deployed using the following infrastructure prerequisites:

## Infrastructure Prerequisites:

### S3 deployment

To deploy the OCR plugin, you will need to configure S3 with the following:

* A basic helm values.yaml file

You can override the following environment variables and their default values:

* `STORAGE_S3_ACCESS_KEY` - default value: `minio.access-key`
* `STORAGE_S3_SECRET_KEY` - default value: `minio.secret-key`

## Configuration

Configure the plugin in a pod with one container, and provide the following configurations:

* Kafka configuration
* S3 Configuration

### Kafka configuration

You can override the following environment variables and their default values:

* `KAFKA_ADDRESS`- default value: `[kafka-server1:9092]`
* `KAFKA_CONSUME_SCHEDULE` - default value: `"30"`
* `KAFKA_INPUT_TOPIC` - default value: `flowx-ocr-receive-{{environment}}`
* `KAFKA_OCR_CONSUMER_GROUPID` - default value: `ocr_group`
* `KAFKA_OUTPUT_TOPIC` - default value: `ai.flowx.updates.{{environment}}.ocr.send`

### S3 configuration

You can override the following environment variables and their default values:

* `STORAGE_S3_HOST` - default value: `minio:9000`
* `STORAGE_S3_LOCATION` - default value: `zone`
* `STORAGE_S3_OCR_SCANS_BUCKET` - default value: `pdf-scans`
* `STORAGE_S3_OCR_SIGNATURE_BUCKET` - default value: `extracted-signatures`
* `STORAGE_S3_OCR_SIGNATURE_FILENAME` - default value: `extracted_signature_{}.png`

:::caution
When configuring the OCR plugin, make sure to use the correct outgoing topic names that match [**the pattern expected by the Engine**](../../../platform-setup-guides/flowx-engine-setup-guide/flowx-engine-setup-guide.md#configuring-kafka), which listens for messages on topics with specific names.
:::
