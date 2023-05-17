# Deployment guidelines v1.13

## Additional Configuration

Let's go through the configuration updates that need to be made in order for the platform upgrade to run smoothly:

#### On flowx-process-engine

A few additional Kafka topics must be added:

* `topicNameLicense: "${KAFKA_LICENSE_TOPIC:ai.flowx.license}"` - Topic used by the licensing module. Must be added to start the engine.

Add a new entry data with the config anonymization

* `data: anonymization: ${ANONYMIZE_DATA:true}`

:::info
Delete from config, element related to **license key, profiles key and liquibase**, see below
:::

```
license :
    documentUrl: ${DOCUMENT_URL:http://localhost:8082}
    defaultKeys: application.client.identificationData.cui, application.client.identificationData.personalIdentificationNumber
    licenseTopic: ${KAFKA_LICENSE_TOPIC:license.topic} 
    pageSize: 100
profiles:
    swagger,liquibaseActive
    #Uncomment to activate TLS for the dev profile
    #- tls
liquibase:
    contexts: dev #, faker
```

#### On svc-flowx-admin

:::info
Delete from config, element related to **the profiles key**, see below
:::

```
profiles:
    swagger,liquibaseActive
    #Uncomment to activate TLS for the dev profile
    #- tls
```

#### On schedular-core

:::info
Delete from config, under spring entry **the profiles key** and everything underneath
:::

```
profiles:
    active: k8s
    include: liquibaseActive
```

#### On svc-customer-management

:::info
Delete from config, under spring entry **the profiles key** and everything underneath
:::

```
profiles:
    active: k8s
    include: liquibaseActive
```

#### On svc-document

:::info
Delete from config, under spring entry **the profiles key and liquibase key** and everything underneath, see below
:::

```
profiles:
    active: k8s
    include: liquibaseActive
Liquibase:
    Remove 'faker' if you do not want to sample data to be loaded automatically contexts: dev
```

#### On svc-notification

:::info
Delete from config, under **spring entry**, under the liquibase key, the context entry
:::

```
profiles:
    active: k8s
    include: liquibaseActive
```

#### On cms-core

:::info
Delete from config, under **spring entry**, under the liquibase key, the context entry
:::

```
profiles:
    active: k8s
    include: liquibaseActive
```

###

### Components Dependencies

|                          :ballot_box_with_check:  | **1.13.0** | 1.12.0 | 1.11.0  |   |
| ---------------------------------------------------- | ---------- | ------ | ------- | 
| **flowx-process-engine**                             | 0.3.14     | 0.3.9  | 0.3.7   |   
| **flowx-designer**                                   | 1.16.3     | 1.15.2 | 1.14.0  |   
| **cms-core**                                         | 0.2.9      | 0.2.5  | 0.2.3   |   
| **schedular-core**                                   | 0.0.12     | NA     | 0.0.6   |   
| **flowx-process-renderer**                           | 1.16.3     | 1.15.2 | 1.14.0  |   
| **flowx-web-components**                             | 0.0.298    | NA     | 0.0.293 |   
| **svc-flowx-admin**                                  | 0.2.26     | 0.2.25 | 0.2.23  |  
| **svc-notification**                                 | 1.0.182    | NA     | 1.0.179 |   
| **svc-document**                                     | 1.0.18     | NA     | 1.0.15  |   
| **svc-customer-management**                          | 0.1.10     | NA     | 0.1.6   |   

