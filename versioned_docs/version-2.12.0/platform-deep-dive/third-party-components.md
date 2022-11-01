# Third-party components

FLOWX.AI uses a number of third-party software components:

### Open-source

* [Keycloak](third-party-components.md#keycloak)
* [Kafka](third-party-components.md#kafka) / [ZooKeeper](third-party-components.md#zookeeper)
* [Jaeger](third-party-components.md#jaeger)
* [AKHQ](third-party-components.md#akhq)
* [PostgreSQL](third-party-components.md#postrgresql)
* [MongoDB](third-party-components.md#mongodb)
* [Redis](third-party-components.md#redis)
* [NGINX](third-party-components.md#nginx)
* [EFK (Elastic Search, Fluentd, Kibana)](third-party-components.md#efk-kibana-fluentd-elastic-search)
* [S3 (MinIO)](third-party-components.md#s3-minio)
* [RabbitMQ (for OCR plugin)](third-party-components.md#rabbitmq)

### Not open-source

* [OracleDB](third-party-components.md#oracledb)

### Third-party open-source components supported/tested versions

| FLOWX.AI Platform Version | Component name           | Supported/tested versions |
| ------------------------- | ------------------------ | ------------------------- |
| 2.5.0 -> 2.10             | Keycloak                 | 9.0.2                     |
| 2.5.0 -> 2.10             | Kafka / Zookeeper        | 2.8.0 (3.5.9)             |
| 2.5.0 -> 2.10             | Jaeger                   | 1.34.1                    |
| 2.5.0 -> 2.10             | AKHQ                     | 0.17.0                    |
| 2.5.0 -> 2.10             | PostgreSQL               | 11.10.0                   |
| 2.5.0 -> 2.10             | MongoDB                  | 4.2.6                     |
| 2.5.0 -> 2.10             | Redis                    | 6.0.1                     |
| 2.5.0 -> 2.10             | NGINX Ingress Controller | 1.2.0                     |
| 2.5.0 -> 2.10             | Elasticsearch            | 7.9.3                     |
| 2.5.0 -> 2.10             | Fluentd                  | 3.3.0                     |
| 2.5.0 -> 2.10             | Kibana                   | 7.9.3                     |
| 2.5.0 -> 2.10             | S3 (Min.IO)              | RELEASE.2021-02-14        |
| 2.5.0 -> 2.10             | RabbitMQ                 | 3.7.17                    |

### Third-party components supported/tested versions

| FLOWX.AI Platform version | Component name | Supported/tested versions |
| ------------------------- | -------------- | ------------------------- |
| 2.5.0 -> 2.10             | OracleDB       | 12C / 18-XE               |

### Summary

#### KeyCloak

Keycloak is an open-source software product to allow single sign-on with Identity and Access Management aimed at modern applications and services.

[Keycloak documentation](https://www.keycloak.org/documentation)

#### **Kafka**

Apache Kafka is an open-source distributed event streaming platform that can handle a high volume of data and enables you to pass messages from one end-point to another.

Kafka is a unified platform for handling all the real-time data feeds. Kafka supports low latency message delivery and gives a guarantee for fault tolerance in the presence of machine failures. It has the ability to handle a large number of diverse consumers.

Kafka is very fast and performs 2 million writes/sec. Kafka persists all data to the disk, which essentially means that all the writes go to the page cache of the OS (RAM). This makes it very efficient to transfer data from a page cache to a network socket.

[Intro to Kafka](../platform-overview/frameworks-and-standards/event-driven-architecture-frameworks/intro-to-kafka-concepts.md)

[Kafka documentation](https://kafka.apache.org/documentation/)

#### ZooKeeper

ZooKeeper is a centralized service for maintaining configuration information, naming, providing distributed synchronization, and providing group services. All of these kinds of services are used in some form or another by distributed applications.

[Zookeeper documentation](https://zookeeper.apache.org/documentation.html)

#### Jaeger

Jaeger is a popular open-source distributed tracing tool that is used to monitor and troubleshoot applications based on microservices architecture.

[Jaeger documentation](https://www.jaegertracing.io/docs/1.36/)

#### AKHQ

AKHQ is a tool used by FlowX to manage and display the data inside the Apache Kafka cluster.

[AKHQ documentation](https://akhq.io/docs/#installation)

#### PostrgreSQL

PostgreSQL, also known as Postgres, is a free and open-source relational database management system emphasizing extensibility and SQL compliance.

[PostgreSQL documentation](https://www.postgresql.org/docs/)

#### MongoDB

MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional [schemas](https://en.wikipedia.org/wiki/Database\_schema).

Used by FLOWX.AI to store business process data and configuration information on the core/plugin components.

[MongoDB documentation](https://www.mongodb.com/docs/)

#### Redis

Redis is a fast, open-source, in-memory key-value data store that is commonly used as a cache to store frequently accessed data in memory so that applications can be responsive to users.

It delivers sub-millisecond response times enabling millions of requests per second for applications.

It is also be used as a Pub/Sub messaging solution, allowing messages to be passed to channels and for all subscribers to that channel to receive that message. This feature enables information to flow quickly through the platform without using up space in the database as messages are not stored.

It is used by FLOWX.AI for caching the process definitions-related data.


[Intro to Redis](../platform-overview/frameworks-and-standards/event-driven-architecture-frameworks/intro-to-redis.md)


[Redis documentation](https://redis.io/docs/)

#### NGINX

Nginx Is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache.

FLOWX utilizes the Nginx engine as a load balancer and for routing the web traffic (API calls) from the SPA (single page application) to the backend service, to the engine, and to various plugins.

The FLOWX.AI Designer SPA will use the backend service to manage the platform via REST calls, will use API calls to manage specific content for the plugins, and will use REST and WebSocket calls to connect to the engine.


[Intro to NGINX](../platform-overview/frameworks-and-standards/event-driven-architecture-frameworks/intro-to-nginx.md)


[NGINX documentation](https://nginx.org/en/docs/)

#### EFK (Kibana, fluentd, Elastic Search)

Elasticsearch is a distributed, RESTful search and analytics engine capable of addressing a growing number of use cases.

As the heart of the Elastic Stack, it centrally stores your data for lightning-fast search, fine‑tuned relevancy, and powerful analytics that scale with ease.

Used by FLOWX.AI in the core component and optionally to allow searching for business process transaction data.

[Elastic stack documentation](https://www.elastic.co/elastic-stack/)

[Fluentd documentation](https://docs.fluentd.org/)

#### S3 (MinIO)

FLOWX.AI uses [Min.IO](http://min.io/) as a cloud storage solution.

[MIN.IO documentation](https://min.io/)

#### RabbitMQ

RabbitMQ is **a messaging broker - an intermediary for messaging**. It gives your applications a common platform to send and receive messages, and your messages a safe place to live until received.

[RabbitMQ documentation](https://www.rabbitmq.com/documentation.html)

#### OracleDB

Oracle Database is a relational database management system (RDBMS).

[Oracle DB documentation](https://www.oracle.com/database/technologies/)