---
sidebar_position: 2
---

# Collection

Similar to a container element, this type of component allows iterating through a list of elements and displays them according to their configuration. 

Configurable properties:

1. `collectionSource` - process key where a list can be found (this must be a valid array of objects)

Example

![Collection configuration for displaying employees ](../../img/collection_example.png)

Source collection data example:

```javascript
employees: [{
    name: 'Sam Davis',
    imageSrc: 'Link to image',
    age: '43'
  },
    {
      name: 'Sara Green',
      imageSrc: 'Link to image',
      age: '23'
    },
    {
      name: 'William Smith',
      imageSrc: 'Link to image',
      age: '67'
    }]
```

The following example will render:

![](../../img/collection_render.png)

:::info
Components used inside a collection use **relative paths** to the collection source. This means that wherever the collection is found inside the process data the components found inside a collection need their keys to be configured relating to that collection.
:::

![](../../img/collection_relative_paths.png)