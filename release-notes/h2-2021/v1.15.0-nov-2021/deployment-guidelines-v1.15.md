# Deployment guidelines v1.15

## Additional Configuration <a href="#additional-configuration" id="additional-configuration"></a>

Let's go through the configuration updates that need to be made in order for the platform upgrade to run smoothly:

#### On **flowx-process-engine** <a href="#on-flowx-process-engine" id="on-flowx-process-engine"></a>

A new Kafka topic must be added: `KAFKA_LICENSE_TOPIC`

:::caution
This should match the topic name configured on the licensing engine.
:::

#### On **document plugin** <a href="#on-svc-flowx-admin" id="on-svc-flowx-admin"></a>

Two new Fafka topics need to be configured: one for receiving Combine requests `KAFKA_COMBINE_FILES_IN` and one for replying to these requests `KAFKA_COMBINE_FILES_OUT`

```
topicNameCombineFiles: ${KAFKA_COMBINE_FILES_IN:flowx.in.copo.combine.files.v1}
topicNameCombineFilesReply: ${KAFKA_COMBINE_FILES_OUT:flowx.out.copo.combine.files.v1}
```

### Components Dependencies <a href="#components-dependencies" id="components-dependencies"></a>

|                          :ballot_box_with_check:  | 1.15    | 1.14    | 1.13.0 | 1.12.0 | 1.11.0  |
| ---------------------------------------------------- | ------- | ------- | ---------- | ------ | ------- |
| **flowx-process-engine**                             | 0.3.26  | 0.3.21  | 0.3.14     | 0.3.9  | 0.3.7   |
| **flowx-designer**                                   | 2.1.1   | 1.21.0  | 1.16.3     | 1.15.2 | 1.14.0  |
| **cms-core**                                         | 0.2.9   | 0.2.9   | 0.2.9      | 0.2.5  | 0.2.3   |
| **schedular-core**                                   | 0.0.12  | 0.0.12  | 0.0.12     | NA     | 0.0.6   |
| **flowx-process-renderer**                           | 2.1.1   | 1.21.0  | 1.16.3     | 1.15.2 | 1.14.0  |
| **flowx-web-components**                             | 0.0.298 | 0.0.298 | 0.0.298    | NA     | 0.0.293 |
| **svc-flowx-admin**                                  | 0.2.26  | 0.2.26  | 0.2.26     | 0.2.25 | 0.2.23  |
| **svc-notification**                                 | 1.0.182 | 1.0.182 | 1.0.182    | NA     | 1.0.179 |
| **svc-document**                                     | 1.0.24  | 1.0.20  | 1.0.18     | NA     | 1.0.15  |
| **svc-ocr**                                          | 0.0.106 |         |            |        |         |
| **license-core**                                     | 0.1.5   | n/a     |            |        |         |
| **svc-customer-management**                          | 0.1.10  | 0.1.10  | 0.1.10     | NA     | 0.1.6   |
