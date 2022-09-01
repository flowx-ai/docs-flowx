# Deployment guidelines v1.16

## Additional Configuration

Let's go through the configuration updates that need to be made in order for the platform upgrade to run smoothly:

#### On **flowx-process-engine**

A few additional Kafka topics must be added:

* `topicNameNotifyTaskManagement: "${KAFKA_NOTIFY_TASK_TOPIC:ai.flowx.task.in}"`
* `topicNameProcessOperations: "${KAFKA_TOPIC_PROCESS_OPERATIONS:ai.flowx.process.operations}"`

#### On svc-flowx-admin

:::info
A service account must be configured in the OpenID provider to be able to access the new feature, please see the [configuration details](../../../flowx-designer/designer-setup-guide/#access-roles).
:::

### Components Dependencies

|                          :ballot_box_with_check:  | 1.16.0  | 1.15    | 1.14    | **1.13.0** | 1.12.0 | 1.11.0  |
| ---------------------------------------------------- | ------- | ------- | ------- | ---------- | ------ | ------- |
| **flowx-process-engine**                             | 0.4.4   | 0.3.26  | 0.3.21  | 0.3.14     | 0.3.9  | 0.3.7   |
| **flowx-designer**                                   | 2.5.0   | 2.1.1   | 1.21.0  | 1.16.3     | 1.15.2 | 1.14.0  |
| **cms-core**                                         | 0.2.14  | 0.2.9   | 0.2.9   | 0.2.9      | 0.2.5  | 0.2.3   |
| **schedular-core**                                   | 0.0.19  | 0.0.12  | 0.0.12  | 0.0.12     | NA     | 0.0.6   |
| **flowx-process-renderer**                           | 2.4.2   | 2.1.1   | 1.21.0  | 1.16.3     | 1.15.2 | 1.14.0  |
| **flowx-web-components**                             | 0.2.1   | 0.0.298 | 0.0.298 | 0.0.298    | NA     | 0.0.293 |
| **svc-flowx-admin**                                  | 0.3.3   | 0.2.26  | 0.2.26  | 0.2.26     | 0.2.25 | 0.2.23  |
| **svc-notification**                                 | 1.0.186 | 1.0.182 | 1.0.182 | 1.0.182    | NA     | 1.0.179 |
| **svc-document**                                     | 1.0.26  | 1.0.24  | 1.0.20  | 1.0.18     | NA     | 1.0.15  |
| **svc-ocr**                                          | 0.0.109 | 0.0.106 |         |            |        |         |
| **license-core**                                     | 0.1.10  | 0.1.5   | n/a     |            |        |         |
| **svc-customer-management**                          | 0.1.16  | 0.1.10  | 0.1.10  | 0.1.10     | NA     | 0.1.6   |
| **task-management**                                  | 0.0.14  |         |         |            |        |         |

