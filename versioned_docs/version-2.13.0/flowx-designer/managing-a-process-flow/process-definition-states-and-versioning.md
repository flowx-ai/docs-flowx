# Process definition states & versioning

Process Definitions in FLOWX.AI Designer can be edited with ease. To keep track of updates and changes, each definition is assigned a version number and state.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/pf_proc_def_state.png)

A Process Definition is unique and can be identified by its name and version number. It can have one of the following states:

* **draft** - in progress and can't be used to create new instances, can only be started in test mode
* **published** - only one version can be published at a time, and it will be used to instantiate new processes; published versions can be edited
* **deleted** - not visible or usable in the platform
* **deprecated** - old versions

At any time, there can only be one draft and one published version for a specific process definition. A new definition can be created by adding it in FLOWX.AI Designer, importing an existing one, or cloning an existing definition. A newly created definition will be in the draft state.

Deleting a draft or published version will automatically delete all versions of that definition. When a new version is set to published, the previous published version becomes deprecated. A published version cannot be reset to draft.

When a new version is obtained through cloning or importing, the old versions become deprecated. Importing or cloning a definition increments the maximum version number. If importing/cloning for the first time in a new environment, the definition will be saved with the version number in the imported content. If no version number is present, it will be automatically set to 1.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.13/pf_proc_def_archi.png)

## Testing draft versions

A separate REST endpoint is available for starting process instances from draft process definitions:

<details>
<summary><span class="getcall"><b>GET</b></span><b> ENGINE_URL/api/internal/process/processDefinitionId/start </b></summary>

**start draft process**

used for testing draft process definitions

**Parameters**

**Path**

`processDefinitionId` (number) - the ID of the process definition

**Responses**

200 

</details>
