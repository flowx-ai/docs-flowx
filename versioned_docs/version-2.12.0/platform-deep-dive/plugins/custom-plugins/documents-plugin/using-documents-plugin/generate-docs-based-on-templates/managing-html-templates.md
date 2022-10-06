
# Managing HTML templates

## Defining a HTML template format

The template can support the following types of parameters:

1. **Text**

Use case: include the company name and registration number in an offer document

![](../../../../../img/docplugin_managing_html_template.png)

Html template specifications:

```
<p><strong>Lorem ipsum: <span th:text=\"${companyName}\"></span></strong>, dolor sit amet <strong><span th:text=\"${cui}\"></span></strong>.</p>
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

![](../../../../../img/dynamic_tables_plugin_doc.png)

Html template specifications:

```
<table>
    <thead>
        <tr class=\"headings\">
            <th class=\"column-title\">Name</th>
            <th class=\"column-title\">Value</th>
        </tr>
    </thead>
    <tbody>
        <tr class='even pointer' th:each=\"row: ${offerValuesRows}\" id=\"tablerow\">
            <td th:each=\"header: ${offerValuesHeader}\" th:text=\"${row.get(header)}\" />
        </tr>
    </tbody>
</table>
```

Data specifications:

```
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

![](../../../../../img/dynamic_table_reusable_table.png)

Html template specifications:

```
<p>Oferta Denumire oferta este aplicabila urmatoarelor locuri de consum:</p>
<div th:each=\"type: ${consumptionPoints}\">
<table> 
    <thead>
       <tr>
          <th> Loc de consum </th>
          <th> Distribuitor </th>
          <th> Cod CLC </th>
          <th> Modalitatate introducere consum </th>
          <th> Tip consum </th>
          <th> Categorie consum \n(MWh) </th>
          <th> Consum total anual \n(MWh) </th>
       </tr>
    </thead>
    <tbody>
       <tr th:if=\"${type.consumptionPoint.empty}\">
           <td colspan=\"7\"> Acest loc de consum nu contine informatii! </td>
        </tr>
        <tr th:each=\"consumptionPoint : ${type.consumptionPoint}\">
           <td><span th:text=\"${consumptionPoint.consumptionPoint}\"> Loc de consum </span></td>
           <td><span th:text=\"${consumptionPoint.distribuitor}\"> Distribuitor </span></td>
           <td><span th:text=\"${consumptionPoint.clcCode}\"> Cod CLC </span></td>
           <td><span th:text=\"${consumptionPoint.consumerInputMethod}\"> Modalitatate introducere consum </span></td>
           <td><span th:text=\"${consumptionPoint.consumerType}\"> Tip consum </span></td>
           <td><span th:text=\"${consumptionPoint.consumerCategory}\"> Categorie consum \n(MWh) </span></td>
           <td><span th:text=\"${consumptionPoint.totalAnnualConsumption}\"> Consum total anual \n(MWh) </span></td>
         </tr>
      </tbody>
   </table>
</div>
```

Data specifications:

```
  "data": {
    "consumptionPoints": [
      {
        "consumptionPoint": [
          {
            "consumptionPoint": "Lorem ipsum",
            "distribuitor": "Distribuitor 1",
            "clcCode": "123456",
            "consumerInputMethod": "Lorem ipsum kghf",
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
            "distribuitor": "Distribuitor 2",
            "clcCode": "131313",
            "consumerInputMethod": "Lorem ipsum tryuty",
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

![](../../../../../img/docplugin_type_of_client.png)

Html template specifications:

```
<span th:if=\"${pjCLient==true}\">
    <p><b>PJ section, visible only if pjCLient = true</b></p>
    <p><span th:text=\"${termTechnicalServices}\"></span></p>
</span>
<span th:if=\"${pjCLient==false}\">
    <p><b>PF section, visible only if pjCLient = false</b></p>
    <p><span th:text=\"${termInsuranceServices}\"></span></p>
</span>

```

Data specifications:

```
 "data": {
    "pjCLient": true
  }
```

**5. Images**

Use case: include in the final document images that are generated throughout the process; in the example below, we are attaching to the document the holograph signature of the client

![](../../../../../img/docplugin_images.png)

Html template specifications:

```
<td class='align'><img th:src=\"*{'data:image/png;base64,'+signature}\" alt=\"\" height='100px'/></td>
```

Data specifications:

```
"data": {
    "signature": "INSERT_BASE64_IMAGE"
  }
```

**6. Barcodes**

In order to opt for including a barcode, the parameter `includeBarcode` should be set as true.

**7. Lists**

Use case: display a bulleted list with values from selected items in a checkbox; in the example below we are listing the source of income:

![](../../../../../img/docplugin_income_source.png)

Html template specifications:

```
  <div th:if=\"${incomeSource != null}\">
    <h3>Income source:</h3>
    <ul>
       <li th:each=\"item : ${incomeSource}\" th:text=\"${item}\"></li>
    </ul>
  </div>
```

Data specifications:

```
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

## Managing HTML templates

### **REST API**

POST `{{documentUrl}}/internal/html/templates` - create a template

PUT `{{documentUrl}}/internal/html/templates` - update the template

GET `{{documentUrl}}/internal/html/templates` - get all templates

GET `{{documentUrl}}/internal/html/templates/HTML_TEMPLATE_NAME` - get a template by name

DELETE `{{documentUrl}}/internal/html/templates/HTML_TEMPLATE_NAME` - delete a tempalte by name

POST `{{documentUrl}}/internal/html/templates/generate` - generate a new docs based on a template

POST `{{documentUrl}}/internal/html/templates/convert` - converts a docx file to html

## Examples

:::tip
Download pdf generated based on the html example, [**here**](../../../../../assets/html_generated_document.pdf).
:::