# Listing stored files

If you choose the use an S3-compatible cloud storage solution, like [min.io](https://min.io/), the files will be grouped in buckets (a bucket is a container for objects stored in Amazon S3). The plugin offers a REST API for easily viewing the stored files.

You can find the partitioning strategy used (where the generated documents are stored) by accessing the following key:

`application.file-storage.partition-strategy`

```yaml
application:
  defaultLocale: en
  supportedLocales: en, ro
  jaeger.prefix: document
  #fileStorageType is the configuration that activates one FileContentService implementation. Valid values: minio / fileSystem
  file-storage:
    type: s3
    disk-directory: MS_SVC_DOCUMENT
    partition-strategy: NONE

```

There are two possible values for `partition-strategy`: **NONE** and **PROCESS_DATE**

| Property                                    | Value         | Explanation                                                                                                                              |
| ------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| APPLICATION_FILESTORAGE_PARTITIONSTRATEGY | NONE          | saving documents in minio/amazon-s3 will be done as before in a bucket for each process instance                                         |
| APPLICATION_FILESTORAGE_PARTITIONSTRATEGY | PROCESS_DATE | documents will be saved in a single bucket, with a subfolder, for example: `bucket/2022/2022-07-04/process-id-xxxx/customer-id/file.pdf` |

## REST API

Examples of RETP API endpoints:


<summary><span class="getcall"><b>GET</b></span><b> documentURL/internal/storage/buckets </b></summary>

<br></br>

<summary><span class="getcall"><b>GET</b></span><b> documentURL/internal/storage/buckets/BUCKET_NAME </b></summary>

<br></br>

<summary><span class="getcall"><b>GET</b></span><b> documentURL/internal/storage/download </b></summary>


