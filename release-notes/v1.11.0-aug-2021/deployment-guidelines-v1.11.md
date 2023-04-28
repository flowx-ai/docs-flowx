# Deployment guidelines v1.11

## Additional Configuration

Let's go through the configuration updates that need to be made in order for the platform upgrade to run smoothly:

#### Application configuration

A new role name needs to be configured in order to allow a user to see all the process instances in the FLOWX Designer. The following key must be added in the application configuration file or an appropriate environment value needs to be set.

```
application:
  flowXAdminRoleName: ${FLOWX_ADMIN_ROLE_NAME:FLOWX_ADMIN}
```

The new role must also be configured in the identity provider and set to the users that should be granted this permission.

:::caution
If this role is not configured in your identity provider solution, the users will not see any process instances in the FLOWX Designer.
:::

[Configuring access roles for processes](../../docs/platform-setup-guides/flowx-engine-setup-guide/configuring-access-roles-for-processes)

We now introduced more advanced **debugging features**, in this version, there is the possibility to take a snapshot of the process status after each action, this comes with an exponential increase of database usage so the next flag I suggest you have it true on debugging media and false production ones

```
application:
    debug: ${PROCESS_DEBUG:false} 
```
[Flowx engine setup guide](../../docs/platform-setup-guides/flowx-engine-setup-guide)

#### New Kafka topics

A few additional Kafka topics must be added:

* `topicNameStartProcess: "${KAFKA_TOPIC_START_PROCESS_IN}"` - Topic used to start a process without human interaction, useful for cron processes
* `topicNameResponseStartProcess: "${KAFKA_TOPIC_START_PROCESS_OUT}"` - Topic that waits for the response to the above event
* `topicNameRunScheduledAction: "${KAFKA_TOPIC_ACTION_RUN}"` - Topic used in the scheduler interaction (all timers are no longer run by the engine but by the scheduler service)
* `topicNameParentNotify: "${KAFKA_TOPIC_PARENT_NOTIFY}"` - Topic used for sub-processes to notify parent process when finished


[Flowx engine setup guide](../../docs/platform-setup-guides/flowx-engine-setup-guide)

### On notifications

#### Application configuration

Some more granular log levels were added, please see [the setup guide](../../docs/platform-deep-dive/plugins/plugins-setup-guide/notifications-plugin-setup#logging) for the complete list of logging related configuration options.&#x20;

The Redis related configuration options have been enhanced to add the possibility of specifying the cache key where the entries should be stored. Please see the complete [Redis related configuration options](../../docs/platform-deep-dive/plugins/plugins-setup-guide/notifications-plugin-setup#redis-configuration).

[Notifications plugins setup](../../docs/platform-deep-dive/plugins/plugins-setup-guide/notifications-plugin-setup)

### Components Dependencies

|                          :ballot_box_with_check:  | **1.11.0** | 
| ---------------------------------------------------- | ---------- |
| **flowx-process-engine**                             | 0.3.7      |       
| **flowx-designer**                                   | 1.14.0     |       
| **cms-core**                                         | 0.2.3      |        
| **scheduler-core**                                   | 0.0.6      |       
| **flowx-process-renderer**                           | 1.14.0     |       
| **flowx-web-components**                             | 0.0.293    |      
| **svc-flowx-admin**                                  | 0.2.23     |       
| **svc-notification**                                 | 1.0.179    |        
| **svc-document**                                     | 1.0.15     |        
| **svc-customer-management**                          | 0.1.6      |     

