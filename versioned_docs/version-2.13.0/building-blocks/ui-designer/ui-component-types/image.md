# Image



![](../img/image_generic.png)

### Image settings

*  Flowx props
    * **Source location** - the location from where the image is loaded
        * **Media Library**
        * **Process Data**
        * **External**
        
Depending on which **Source location** is selected, different Flowx props are available.

#### Media library

![](../img/image_media_library.png)

* **Image key** - image key from media library
* **select from media library** - search item by key and select it from media library

![](../img/search_item_by_key.png)

* **upload to media library** - add a new item (upload an image on the spot)
    * **upload item** - supported formats: PNG, JPG, GIF, SVG, WebP; ❗️(maximum size - 1 MB)
    * **key** - the key must be unique and you cannot change it afterwards

![](../img/upload_to_media_lib.png)

#### Process Data

![](../img/image_process_data.png)

* **Source Type** - **URL** or **Base 64 string**
* **Process Data Key** - process key where the image can be found
* **Placeholder URL** - public URL where the image placeholder is available

#### External

![](../img/image_external.png)

* **Image source** - valid URL of the image
* **Placeholder URL** - public URL where the image placeholder is available

### UI actions

![](../img/image_ui_actions.png)

* **add UI action** - add a UI Action (must be configured on the same node) - more details [here](../ui-actions.md)

### Image styling

* **valid CSS properties** - more details [here](../../ui-designer/ui-designer.md#styling)