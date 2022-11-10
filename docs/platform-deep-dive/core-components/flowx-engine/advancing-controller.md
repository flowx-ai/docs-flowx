# Advancing controller

Advancing Controller microservice is a separate service, deployed outside FLOWX.AI Engine (but strictly recommended being used together). 

The microservice has the following responsibilities:

* holds the Liquibase DB scripts for the advancing PostgreSQL
* clean-ups in the advancing PostgreSQL when the parallel advancing is quite
* monitoring if a process-engine worker pod is down (in which case reacts by reassigning the work of the dead pod), to be picked up by other pods and therefore avoiding process instances to be stuck in advancing

If all pods of Advancing Controller are down, and a process-engine pod that advances instances goes down also, the process instances assigned to this process-engine pod remain assigned to it, and will no longer be advanced, which means they will appear stuck in the UI. As soon as an Advancing Controller pod goes up again, it will see the process-engine pod down, and it will unassign the instances assigned to this dead process-engine pod. 

:::info
The advanced controller microservice should always be up, if process-engine is up and working (advancing instances).
:::