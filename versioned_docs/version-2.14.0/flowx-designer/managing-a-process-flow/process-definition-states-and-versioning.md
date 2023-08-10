# Process definition states & versioning

Process definitions can be easily edited using the FLOWX Designer. To be able to update existing definitions and keep track of the changes, we also store a version number and a state on each definition.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.14/pf_proc_def_state.png)

A process definition is uniquely identified by its name and version number.

A process definition can have one of the following states:

* **draft** - is considered as in progress and no new instances can be created based on it; it can be started only in test mode
* **published** - only one version of a process definition can be published at any time, this is the one that will be instantiated when a new process is started; published process definition versions cannot be edited
* **deleted** - they will no longer be visible or used in the platform
* **deprecated** - old versions

At any time there can only be one published and one draft version for a certain process definition.

A new process definition can be created:

* by adding it to the FLOWX Designer
* by importing an existing definition
* by cloning an existing definition

A newly created process definition will be in the draft state.

Deleting a draft or published version of a process definition will automatically set as deleted all versions of that definition.

When a new version of a process is set to published, the previously published version is automatically set to deprecated. Before setting a process version as published, make sure that it is properly set up. A published version cannot be reset back to a draft.

When a new version of a process is obtained by cloning an existing version or importing a process definition, the old versions are automatically set as deprecated.

Importing and cloning a process definition will increment the existing maximum version number. If the process was imported/cloned on a new environment for the first time (no other versions exist in that environment), the definition will be saved with the version number that is set in the import content. If the version number is not present in the imported JSON, it will automatically be set to 1.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/2.14/pf_proc_def_archi.png)

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
