---
sidebar_position: 2
---

# Collection

Similar to a container element, this type of component allows iterating through a list of elements and displays them according to their configuration. 

Configurable properties:

* `collectionSource` - process key where a list can be found (this must be a valid array of objects)

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/collection_source_key1.png)

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/%20collection_source_key.png)

#### Example

![Collection configuration for displaying employees](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/collection_example.png)

Source collection data example:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/collection_mvel.png)

```java
output.put("processData",
{
  "products": [
    {
      "name": "Product One Plus",
      "description": "The plus option",
      "type": "normal"
    },
    {
      "name": "Product Two Premium",
      "description": "This is premium product",
      "type": "recommended"
    },
    {
      "name": "Product Basic",
      "description": "The most basic option",
      "type": "normal"
    },
    {
      "name": "Gold Product",
      "description": "The gold option",
      "type": "normal"
    }
  ]
}
);
```

The following example will render:

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/render_collection.gif)

:::info
Components used inside a collection use **relative paths** to the collection source. This means that wherever the collection is found inside the process data the components found inside a collection need their keys to be configured relating to that collection.
:::

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/building-blocks/ui-designer/collection_relative_paths.png)