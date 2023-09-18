
# Managing HTML templates

## Defining an HTML template format

The template can support the following types of parameters:

1. **Text**

Use case: include the company name and registration number in an offer document

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.12/docplugin_managing_html_template.png)

HTML template specifications:

```
<p><strong>Lorem ipsum: <span th:text="${companyName}"></span></strong>, dolor sit amet <strong><span th:text="${cui}"></span></strong>.</p>
```

Data specifications:

```
{
  "data": {
    "companyName": "Test Company SRL",
    "cui": "RO1234567"
  }
}
```

**2. Dynamic tables - repeatable rows**

Use case: display in a table as many rows as the elements of a generated list of objects; in the example below we are listing the name and value of all the benefits included in a commercial offer

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.12/dynamic_tables_plugin_doc.png)

Html template specifications:

```html
<table>
    <thead>
        <tr class="headings">
            <th class="column-title">Name</th>
            <th class="column-title">Value</th>
        </tr>
    </thead>
    <tbody>
        <tr class='even pointer' th:each="row: ${offerValuesRows}" id="tablerow">
            <td th:each="header: ${offerValuesHeader}" th:text="${row.get(header)}">
        </tr>
    </tbody>
</table>
```

Data specifications:

```json
"data": {
   "offerValuesHeader": [ 
     "Name", 
     "Value" 
   ], 
   "offerValuesRows": [ 
     { "Name": "Price (USD/MWh)", "Value": "25" }, 
     { "Name": "Distribution rate (USD/MWh)", "Value": "C1 category: 27, C2 category: 29" }, 
     { "Name": "Subscription price / day / place of consumption", "Value": "C1 category: 1.25, C2 category: 1.32" }, 
     { "Name": "Period of validity of the price", "Value": "Validity time fixed price Monday, from the start date of delivery to the date of completion of delivery" }, 
     { "Name": "Payment term", "Value": "90 days" } 
   ]
 }

```

**3. Dynamic table - repeatable table**

Use case: display a table as many times as the elements of a generated list of objects; in the example below we are listing the consumption points registered through the process

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.12/dynamic_table_reusable_table.png)

HTML template specifications:

```html
<p>Offer:</p>
<div th:each="type: ${consumptionPoints}">
<table> 
    <thead>
       <tr>
          <th> Usage place </th>
          <th> Distributor </th>
          <th> CLC code </th>
          <th> Usage method input </th>
          <th> Usage type </th>
          <th> Usage category \n(MWh) </th>
          <th> Total usage \n(MWh) </th>
       </tr>
    </thead>
    <tbody>
       <tr th:if="${type.consumptionPoint.empty}">
           <td colspan=\"7\"> No information available here! </td>
        </tr>
        <tr th:each=\"consumptionPoint : ${type.consumptionPoint}\=">
           <td><span th:text="${consumptionPoint.consumptionPoint}"> Usage place </span></td>
           <td><span th:text="${consumptionPoint.distribuitor}"> Distributor </span></td>
           <td><span th:text="${consumptionPoint.clcCode}"> Cod CLC </span></td>
           <td><span th:text="${consumptionPoint.consumerInputMethod}"> Usage method input </span></td>
           <td><span th:text="${consumptionPoint.consumerType}"> Usage type </span></td>
           <td><span th:text="${consumptionPoint.consumerCategory}"> Usage category \n(MWh) </span></td>
           <td><span th:text="${consumptionPoint.totalAnnualConsumption}"> Total usage \n(MWh) </span></td>
         </tr>
      </tbody>
   </table>
</div>
```

Data specifications:

```json
  "data": {
    "consumptionPoints": [
      {
        "consumptionPoint": [
          {
            "consumptionPoint": "Lorem ipsum",
            "distribuitor": "Distributor 1",
            "clcCode": "123456",
            "consumerInputMethod": "Lorem ipsum",
            "consumerType": "Lorem ipsum",
            "consumerCategory": "Lorem ipsum",
            "totalAnnualConsumption": "Lorem ipsum"
          }
        ]
      },
      {
        "consumptionPoint": [
          {
            "consumptionPoint": "Lorem ipsum",
            "distribuitor": "Distributor 2",
            "clcCode": "131313",
            "consumerInputMethod": "Lorem ipsum ipsum",
            "consumerType": "Lorem ipsum",
            "consumerCategory": "Lorem ipsum",
            "totalAnnualConsumption": "Lorem ipsum"
          }
        ]
      }
    ]
  }
```

**4. Dynamic sections**

Use case: display a paragraph only when a certain condition is met; in the example below, we display a section only if the client type is PJ

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.12/docplugin_type_of_client.png)

HTML template specifications:

```html
<span th:if="${pjCLient==true}">
    <p><b>PJ section, visible only if pjCLient = true</b></p>
    <p><span th:text="${termTechnicalServices}"></span></p>
</span>
<span th:if="${pjCLient==false}">
    <p><b>PF section, visible only if pjCLient = false</b></p>
    <p><span th:text="${termInsuranceServices}"></span></p>
</span>

```

Data specifications:

```json
 "data": {
    "pjCLient": true
  }
```

**5. Images**

Use case: include in the final document images that are generated throughout the process; in the example below, we are attaching to the document the holograph signature of the client

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.12/docplugin_images.png)

Html template specifications:

```html
<td class='align'><img th:src="*{'data:image/png;base64,'+signature}" alt=\"\" height='100px'/></td>
```

Data specifications:

```json
"data": {
    "signature": "INSERT_BASE64_IMAGE"
  }
```

**6. Barcodes**

 To opt for including a barcode, the parameter `includeBarcode` should be set as true.

**7. Lists**

Use case: display a bulleted list with values from selected items in a checkbox; in the example below we are listing the source of income:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.12/docplugin_income_source.png)

HTML template specifications:

```html
  <div th:if="${incomeSource != null}">
    <h3>Income source:</h3>
    <ul>
       <li th:each="item : ${incomeSource}" th:text="${item}"></li>
    </ul>
  </div>
```

Data specifications:

```json
{
    "data": {
        "incomeSource": [
            "Income 1",
            "Income 2",
            "Income 3",
            "Income 4"
        ]
    }
}
```

## Examples

:::tip
Download a PDF sample generated based on the HTML example, [**here**](../../../../../assets/html_generated_document.pdf).
:::