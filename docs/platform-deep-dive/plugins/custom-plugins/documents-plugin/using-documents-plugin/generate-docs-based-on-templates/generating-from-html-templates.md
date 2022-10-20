# Generating from HTML templates

Used to generate documents based on previously defined document templates. The following example covers generating documents using HTML templates.

## Define needed Kafka topics

Kafka topic names can be set by using environment variables:

* `KAFKA_TOPIC_DOCUMENT_GENERATE_HTML_IN`: ai.flowx.in.qa.document.html.generate.v1
* `KAFKA_TOPIC_DOCUMENT_GENERATE_HTML_OUT`: ai.flowx.updates.qa.document.html.generate.v1

:::caution
The Engine is listening for messages on topics with names of a certain pattern, make sure to use an outgoing topic name that matches the pattern configured in the Engine.
:::

## Request to generate document

Values expected in the request body:

* clientType = client type
* documentList = list of documents to be generated with properties (name and value to be replaced in the document templates)
  * customId = client ID
  * templateName = the name of the template to be used
  * language
  * includeBarcode
  * data = a map containing the values that should be replaced in the document template; the keys used in the map should match the ones defined in the HTML template

Example:

```
{
  "clientType": "PF",
  "documentList": [
    {
        "customId": "123456",
        "templateName": "html_test_template",
        "language": "en",
        "data": {
            "offerName": "The greatest offer - deluxe edition",
            "companyName": "Test Company SRL",
            "cui": "RO1234567",
            "firstName": "Michelle Sophie",
            "lastName": "Hughes",
            "offerExpiryDate": "31.12.2099",
            "offerValuesHeader": [
                "Name",
                "Value"
            ],
            "offerValuesRows": [
                {
                    "Name": "Price (USD/MWh)*",
                    "Value": "25"
                },
                {
                    "Name": "Distribution rate (USD/MWh)**",
                    "Value": "C1 category: 27, C2 category: 29"
                },
                {
                    "Name": "Subscription price / day / place of consumption***",
                    "Value": "C1 category: 1.25, C2 category: 1.32"
                },
                {
                    "Name": "Period of validity of the price",
                    "Value": "Validity time fixed price Monday, from the start date of delivery to the date of completion of delivery"
                },
                {
                    "Name": "Payment term",
                    "Value": "90 days"
                }
            ],
            "signature": "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",
            "termTechnicalServices": "Integer vitae felis eu orci malesuada lacinia posuere lobortis nisi. Vestibulum quam justo, placerat eget mauris eu, interdum gravida libero. Proin sollicitudin molestie facilisis. Nunc consectetur felis quis enim fringilla tristique. Morbi porttitor velit vitae dignissim rutrum. Integer ultrices, orci vel egestas laoreet, sem metus gravida turpis, ut dignissim elit diam aliquam nisi. Nam gravida pellentesque pulvinar. Ut condimentum, augue in tempus laoreet, enim ex ultrices eros, vel viverra lorem nisi nec mi.",
            "termInsuranceServices": "Nullam massa dui, blandit quis dignissim ac, rutrum interdum lectus. Praesent et tempor enim, sed faucibus dolor. Sed vitae ipsum dui. Fusce auctor posuere dictum. In quis mi varius, molestie massa in, luctus risus. Sed at egestas enim. Sed nibh enim, aliquam eget venenatis vitae, imperdiet eget est. Integer semper porta sapien in fermentum. Pellentesque vel diam iaculis, malesuada neque a, sodales tellus. Nullam pulvinar ultrices diam, eu consequat leo porttitor a.",
            "consumptionPoints": [
                {
                    "consumptionPoint": [
                        {
                            "consumptionPoint": "Lorem ipsum 1",
                            "distribuitor": "Distributor",
                            "clcCode": "123456",
                            "consumerInputMethod": "Sed semper sit amet",
                            "consumerType": "Type - C1"
                        }
                    ]
                },
                {
                    "consumptionPoint": [
                        {
                            "consumptionPoint": "Lorem ipsum 2",
                            "distribuitor": "Distributor",
                            "clcCode": "131313",
                            "consumerInputMethod": "Nunc consequat",
                            "consumerType": "Type - C1"
                        }
                    ]
                },
                {
                    "consumptionPoint": [
                        {
                            "consumptionPoint": "Lorem ipsum 3",
                            "distribuitor": "Distributor",
                            "clcCode": "343434",
                            "consumerInputMethod": "Duis id sapien velit",
                            "consumerType": "Type - C2"
                        }
                    ]
                },
                {
                    "consumptionPoint": [
                        {
                            "consumptionPoint": "Lorem ipsum 4",
                            "distribuitor": "Distributor",
                            "clcCode": "456567",
                            "consumerInputMethod": "Quisque et sollicitudin",
                            "consumerType": "Type - C2"
                        }
                    ]
                }
            ],
            "pjCLient": true
        },
        "includeBarcode": false
    }
    ]
}
```

## Reply

Response sent back to the engine after generating documents.

Values expected in the event body:

* generatedFiles = list of generated files
  * customId = client ID
  * fileId
  * documentType&#x20;
  * documentLabel
  * minioPath = minio path for the converted file
  * downloadPath = download path for the converted file

Example of generated file response:

```
{
    "generatedFiles": {
        "html_test_template": {
            "customId": "123456",
            "fileId": 111,
            "documentType": "html_test_template",
            "documentLabel": "GENERATED_PDF",
            "minioPath": "MINIO_BUCKET_NAME/123456/111_html_test_template.pdf",
            "downloadPath": "internal/files/111/download",
            "error": null
        }
    }
}
```