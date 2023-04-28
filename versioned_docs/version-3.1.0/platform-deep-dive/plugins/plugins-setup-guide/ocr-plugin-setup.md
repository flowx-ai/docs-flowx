# OCR plugin setup

## Infrastructure Prerequisites:

The OCR plugin is available as two docker images, so we need previously to configure:

### RabbitMQ

This infrastructure item is required internally

basic RabbitMQ helm values.yaml

```jsx
  ocr-queue:
    image:
      registry: docker.io
      repository: bitnami/rabbitmq
      tag: 3.7.17-debian-9-r37
    persistence:
      enabled: true
      path: /opt/bitnami/rabbitmq/var/lib/rabbitmq
      size: 1Gi
    rabbitmq:
      clustering:
        address_type: hostname
        k8s_domain: cluster.local
      existingPasswordSecret: svc-ocr-application-config
      username: users
    service:
      distPort: 25672
      managerPort: 15672
      port: 5672
      tlsPort: 5671
      type: ClusterIP
```

### [Min.io](http://min.io/) deployment

A basic configuration for minio:

* A basic helm values.yaml

  ```jsx
  MINIO_ACCESS_KEY: minio.access-key
  MINIO_SECRET_KEY: minio.secret-key
  ```

## Configuration

### OCR

Configuration for the two components should be grouped in a pod with two containers and configurations should be provided for:

* Internal queue system
* Kafka configuration
* Min.io Configuration

```jsx
CELERY_BROKER_URL: amqp://users:users_328947@jx-ocr-queue:5672

KAFKA_ADDRESS: flowxdev-default-noauth-kafka-bootstrap.kafka.svc:9092
KAFKA_CONSUME_SCHEDULE: "30"
KAFKA_INPUT_TOPIC: paperflow-ocr-receive
KAFKA_OCR_CONSUMER_GROUPID: ocr_group
KAFKA_OUTPUT_TOPIC: paperflow-ocr-send

MINIO_HOST: minio-service:9000
MINIO_LOCATION: zone
MINIO_OCR_SCANS_BUCKET: pdf-scans
MINIO_OCR_SIGNATURE_BUCKET: extracted-signatures
MINIO_OCR_SIGNATURE_FILENAME: extracted_signature_{}.png
```

:::caution
The Engine is listening for messages on topics with names of a certain pattern, make sure to use correct outgoing topic names when configuring the notifications plugin.
:::
