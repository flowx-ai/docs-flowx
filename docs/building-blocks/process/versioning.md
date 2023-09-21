# Versioning 

## Process Definition list

 You can easily track your process definition's evolution. 

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/versioning.png)

1. **Overview:**
   - The tab provides a summary of all accessible process definitions in the current environment.

2. **Streamlined Data Display:**
   - Information displayed in the list is retrieved from both the published version and work in progress.

3. **Key Information Included:**
   - View details like process definition name, published version branch name, and published version state with the following convention: 

        - work in progress - dotted
        - submitted - full
        - main branch - blue 
        - secondary branch - yellow

4. **Actions:**
   - Interact with each process definition through actions such as opening the BPMN tab in edit mode, starting instances, and displaying branching options.
   - Contextual menu actions offer options to edit, open settings, view data modal, and delete process definitions.

## Branching and Committing

"Branching Modal" feature provides more visibility and control over the process definitions. The process definition header includes details about the current version, such as its state (work in progress or submitted changes) and branch name.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/process_definition_header.png)

A "publish icon" will be displayed if the current version is set as published. You can access the branching modal using a button, and it can also be closed from the right corner close button.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/branching_modal.gif)

### Starting a new version (work-in-progress)

The Work-in-Progress (WIP) Versioning feature enhances the version control capabilities by allowing you to manage ongoing updates without interfering with already submitted versions.

You can initiate a new work-in-progress version while keeping the submitted version intact. A work-in-progress version is automatically created under the following circumstances:

* **New Process Definition**: When you create a new process definition, a corresponding work-in-progress version is initiated. This ensures that ongoing changes are tracked separately from the submitted version.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/wip_process_definition.png)

* **New Branch Creation**: The creation of a new branch in the system also triggers the creation of a work-in-progress version. This streamlines the process of branching and development, allowing for parallel progress without impacting the main submitted version.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/wip_new_branch.png)

* **Manual WIP Version Creation**: Users also have the flexibility to initiate a new work-in-progress version manually. This is particularly useful when building upon the latest version available on a branch.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/manual_wip.gif)


### Submitting changes

You can submit changes exclusively on work-in-progress (WIP) versions. Changes can be submitted using the designated action within the version menu. Upon triggering the submission action, a modal window appears, prompting you to provide a commit message.

:::info
A string of maximum 50 characters, mandatory for submission. Only letters, numbers, and characters [] () . _ - / are allowed.
:::

The placeholder indicating work-in-progress is replaced with a "submitted" state within the graph view.

#### Updating submit messages

You have the flexibility to modify submit messages after changes are submitted. This can be accomplished using the action available in the version menu.

### Creating a new branch

Using versioning you can work on a stable copy of the process definition, isolated from ongoing updates by other users. You can create a new branch starting from a specific submit point.
The initiation of new branches is achieved using the dedicated action located in the left menu of the chosen submit point (used as the starting point for the branch).

:::caution
A string of maximum 16 characters, mandatory for branch creation.
:::

### Merging changes

You can incorporate updates made on a secondary branch into the main branch or another secondary branch. To ensure successful merging of changes, adhere to the following criteria:

* You can merge the latest version from a secondary branch into either its direct or indirect parent branch.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/merge_child.gif)

* Versions from the Side Menu can be merged, streamlining the process.
* Upon triggering the merge action, a modal window appears, giving the possibility to make the following selection:
   * Branch - displays the branches to which the current branch is a child (direct or indirect), if branches contain WIP, they are graded out and they cannot be merged

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/merge_not_possible.png)

   * Message - a string of maximum 50 characters: limited to letters, numbers and the following characters: [] () . _ - /

<div class = "image-scaled">

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/merge_changes.png)

</div>

The graph representation is updated to display the new version on the selected parent branch and the merged version is automatically selected, facilitating further development and tracking.

### Managing conflicts

The Conflict Resolution and Version Comparison feature provides a mechanism to identify and address conflicts between two process versions that, if merged, could potentially disrupt the integrity of the process definition. 

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/conflict.png)

The system displays both the version to be merged and the current version on a single screen, providing a clear visual representation of the differences. Conflicts and variations between the two versions are highlighted, enabling users to readily identify areas requiring attention.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/merge_conflict.gif)

:::info
Not all changes are considered conflicts, changes in node positions are not treated as conflicts. Primary causes lie in identifying differences within business rules, expressions, and other scripts.
:::

### Setting published version

You can specify which version will run by default from a container app.

When a process is created, the default published version settings are as follows:

* **Branch**: Main
* **Version**: Work in progress on the Main branch.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/main_wip.png)


You can change the branch and version used as the default by the container app. 

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/set_publish_info.gif)

This is done through the following settings:

* Branch: A dropdown menu displaying available branches (both opened and merged).
* Version: The type of version that should be used:
   
   * **Latest Work in Progress**
      * Displayed if the selected branch is not merged into another branch.
      * This configuration is used when there is a work-in-progress (WIP) version on the selected branch or when there is no WIP version on the selected branch due to either work in progress being submitted or the branch being merged.
      * In such cases, the latest available configuration on the selected branch is used as the default.

   * **Latest Submitted Work**
      * Displayed if the selected branch contains submitted versions.
      * This configuration is used when there is submitted work on the selected branch, and the current branch has been submitted on another branch (latest submitted work on the selected branch is not the merged version).

   * **Custom Version**
      * Displayed if the selected branch contains submitted versions.
      * Users can select from a dropdown menu containing submitted versions on the selected branch.
      * Each option in the dropdown includes:
         * Submit message
         * Submit date and time
         * Submit author

:::info
Options are ordered reverse chronologically by submit datetime.
:::

### Read-only state

The Read-Only State feature allows you to access and view submitted versions of your process definitions while safeguarding the configuration from unintended modifications. By recognizing the visual indicators of the read-only state, you can confidently work within a controlled environment, ensuring the integrity of process definitions.

![](https://s3.eu-west-1.amazonaws.com/docx.flowx.ai/release34/versioning_read_only.png)