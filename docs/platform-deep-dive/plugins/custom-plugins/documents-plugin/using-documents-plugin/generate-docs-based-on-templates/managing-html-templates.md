
# Managing HTML templates

The Document Management Plugin offers the flexibility to define and manage HTML templates for document generation, enabling customization through various parameter types. 

Additionally, the platform incorporates a What You See Is What You Get (WYSIWYG) editor, allowing users to have a real-time, visual representation of the document or content during the editing process. Furthermore, you have the capability to test and review your template by downloading it as a PDF.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/wysiwyg_example.gif)

Explore the different parameter types and their specifications:

## Configuring HTML Templates

1. **Open the WYSIWYG Editor**:

Access the WYSIWYG editor within the Document Management Plugin, found in the **FLOWX Designer → Plugins → Document templates** section.

2. **Design the Document Header**:

Begin by creating a header section for the document, including details such as the company logo and title.

```html
<header>
   <img src="https://d22tnnndi9lo60.cloudfront.net/devmain/flowx/flowxlogo/1669299027205_FLOWX.AI%20main%20logo.png" alt="Company Logo" width="150px" height="auto">
   <h1 th:text="${offerTitle}">Offer Document</h1>
</header>
```

Data Specifications (process data):

```json
"data": {
    "companyLogo": "INSERT_BASE64_IMAGE",
    "offerTitle": "Client Offer"
}

```
3. **Text Parameters for Client Information**:

Include a section for client-specific information using text parameters.

:::info
Text parameters enable the inclusion of dynamic text in templates (like the name of the company), allowing for personalized content.
:::

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/docplugin_managing_html_template.png)

```html
<section>
   <h2>Client Information</h2>
   <p><strong>Client Name:</strong> <span th:text="${clientName}"></span></p>
   <p><strong>Client ID:</strong> <span th:text="${clientId}"></span></p>
</section>
```

Data Specifications:

```json
"data": {
    "clientName": "John Doe",
    "clientId": "JD123456"
}
```

4. **Dynamic Table for Offer Details:**

Create a dynamic table to showcase various details of the offer. 

```html
<section>
   <h2>Offer Details</h2>
   <table>
      <thead>
         <tr>
            <th>Item</th>
            <th>Description</th>
            <th>Price</th>
         </tr>
      </thead>
      <tbody>
         <tr th:each="item : ${offerItems}">
            <td th:text="${item.name}"></td>
            <td th:text="${item.description}"></td>
            <td th:text="${item.price}"></td>
         </tr>
      </tbody>
   </table>
</section>

```

Data Specifications:

```json
"data": {
    "offerItems": [
        { "name": "Product A", "description": "Description A", "price": "$100" },
        { "name": "Product B", "description": "Description B", "price": "$150" },
        { "name": "Product C", "description": "Description C", "price": "$200" }
    ]
}
```

5. **Dynamic Sections for Certain Conditions:**

Dynamic sections allow you to display specific content based on certain conditions. For example, you can display a paragraph only when a certain condition is met. Here's an example of HTML template specifications:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/docplugin_type_of_client.png)

```html
<section>
    <h2>Dynamic Sections for Certain Conditions</h2>
    
    <span th:if="${isPreferredClient}">
        <p>This is a preferred client. They are eligible for special discounts!</p>
    </span>
    
    <span th:if="${hasSpecialRequest}">
        <p>The client has specific requests. Please review them carefully.</p>
    </span>
    
    <span th:if="${isActiveContract}">
        <p>The client has an active contract with us.</p>
    </span>
</section>
```

Data specifications:

```json
"data": {
    "clientName": "John Doe",
    "clientId": "JD123456",
    "isPreferredClient": true,
    "hasSpecialRequest": false,
    "isActiveContract": true
}
```

6. **Lists**:

Lists are useful for displaying values from selected items in a checkbox as a bulleted list. Here's an example of HTML template specifications:

```html
<section>
    <h2>Lists</h2>
    
    <div th:if="${incomeSources != null}">
        <h3>Income Sources:</h3>
        <ul>
            <li th:each="source : ${incomeSources}" th:text="${source}"></li>
        </ul>
    </div>
</section>
```
Data Specifications:

```json
"data": {
    "incomeSources": ["Source 1", "Source 2", "Source 3"]
}
```

7. **Include Image for Authorized Signature:**

Embed an image for the authorized signature at the end of the document.

```html
<footer>
   <p>Authorized Signature:</p>
   <img th:src="*{'data:image/png;base64,' + signature}" alt="Authorized Signature" width="200px" height="auto">
</footer>

```

Data Specifications:

```json
"data": {
    "signature": "INSERT_BASE64_IMAGE"
}
```

7. **Barcodes**:

Set the `includeBarcode` parameter to true if you want to include a barcode.For information on how to use barcodes and OCR plugin, check the following section:

[OCR plugin](../../../ocr-plugin.md)

8. **Lists**:

Lists are useful for displaying values from selected items in a checkbox as a bulleted list. Here's an example of HTML template specifications:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/platform-deep-dive/docplugin_income_source.png)

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