# Listing stored files

If you are using an S3-compatible cloud storage solution such as [MinIO](https://min.io/), the stored files are organized into buckets. A bucket serves as a container for objects stored in Amazon S3. The Documents Plugin provides a REST API that allows you to easily view the files stored in the buckets.

To determine the partitioning strategy used for storing generated documents, you can access the following key in the configuration:

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

The `partition-strategy` property can have two possible values:

* **NONE**: In this case, documents are saved in separate buckets for each process instance, following the previous method.
**PROCESS_DATE**: Documents are saved in a single bucket with a subfolder structure based on the process date. For example: `bucket/2022/2022-07-04/process-id-xxxx/customer-id/file.pdf`.



## REST API

The Documents Plugin provides the following REST API endpoints for interacting with the stored files:

### List buckets

<summary><span class="getcall"><b>GET</b></span><b> documentURL/internal/storage/buckets </b></summary>

<br></br>

This endpoint returns a list of available buckets.

### List Objects in a Bucket

<summary><span class="getcall"><b>GET</b></span><b> documentURL/internal/storage/buckets/BUCKET_NAME </b></summary>

<br></br>

This endpoint retrieves a list of objects stored within a specific bucket. Replace `BUCKET_NAME` with the name of the desired bucket.

### Download File

<summary><span class="getcall"><b>GET</b></span><b> documentURL/internal/storage/download </b></summary>

<br></br>

This endpoint allows you to download a file by specifying its path or key.
