# Rendering and UI Designer Changelog

:::caution
This changelog is relevant to the 3.0 release, which introduces significant changes to the UI configuration.
:::

Please be aware that a process (when it comes to UI configuration) may look different from previous releases and that certain updates may not be compatible with older configurations. The migration process may take longer than usual.

## Notes for post-migration

1. Verify font sizes where float values were set.
2. Verify line heights where scale values were set.
3. Verify border radius values where values other than px were set.
4. Review and set padding and margin values where needed. Deleted keys include "margin" : "8px 0" and "padding" : "16px 0 0 16px".
5. Check radio and checkbox elements and update the new label prop.
6. Take advantage of the new column prop for Layout (available for checkbox and radio), which allows for grouping a large number of enumerations.
7. The height prop (from Sizing) has been removed.
8. Update the width prop by configuring the new Fit W prop with values such as fill, fixed, or auto.
9. The Min W and Max W props have been removed.
