# OCR plugin setup

The OCR plugin is a docker image that can be deployed using the following infrastructure prerequisites:

## Infrastructure Prerequisites:

* S3 bucket or alternative (eg. minio)
* Kafka cluster

:::caution
Starting with `ocr-plugin 1.X` it no longer requires RabbitMQ.
:::


## Deployment/Configuration

To deploy the OCR plugin, you will need to deploy `ocr-plugin` helm chart with custom values file.

Most important sections are these, but more can be extracted from helm chart. 

```
image:
  repository: <repository>/ocr-plugin

applicationSecrets: {}

replicaCount: 2

resources: {}
  
env: []
```

### Credentials

S3 bucket:
```
applicationSecrets:
  enable: true
  envSecretKeyRef:
    STORAGE_S3_ACCESS_KEY: access-key
    STORAGE_S3_SECRET_KEY: secret-key
  existingSecret: true
  secretName: ocr-plugin-application-config
```

### Kafka configuration
You can override the following environment variables:

* `KAFKA_ADDRESS`- for example: `['kafka-server1:9092']`
* `ENABLE_KAFKA_SASL` - default `False`
* `KAFKA_CONSUME_SCHEDULE` - default: `"30"`
* `KAFKA_OCR_CONSUMER_GROUPID` - default: `ocr_group`
* `KAFKA_INPUT_TOPIC` - default empty
* `KAFKA_OUTPUT_TOPIC` - default empty

:::caution
When configuring the OCR plugin, make sure to use the correct outgoing topic names that match [**the pattern expected by the Engine**](../../../platform-setup-guides/flowx-engine-setup-guide/flowx-engine-setup-guide.md#configuring-kafka), which listens for messages on topics with specific names.
:::

### S3 configuration

You can override the following environment variables:

* `STORAGE_S3_HOST` - for example: `minio:9000`,`https://s3.eu-west-1.amazonaws.com/`
* `STORAGE_S3_SECURE_CONNECTION`: default False
* `STORAGE_S3_LOCATION` - for example:`eu-west-1`
* `STORAGE_S3_OCR_SCANS_BUCKET` - default empty, example: `pdf-scans`
* `STORAGE_S3_OCR_SIGNATURE_BUCKET` - default empty, example: `extracted-signatures`
* `STORAGE_S3_OCR_SIGNATURE_FILENAME` - default empty, example `extracted_signature_{}.png`


