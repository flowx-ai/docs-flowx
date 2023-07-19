/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * This file is copied from docusaurus-plugin-content-docs.
 * (from version 2.0.0-beta.5)
 * It is needed in the also copied file sidebars.ts
 *
 */
import { SidebarItemsGenerator } from './pluginContentDocsTypes';
export declare const CategoryMetadataFilenameBase = "_category_";
export declare const CategoryMetadataFilenamePattern = "_category_.{json,yml,yaml}";
export declare type CategoryMetadatasFile = {
    label?: string;
    position?: number;
    collapsed?: boolean;
    collapsible?: boolean;
};
export declare const DefaultSidebarItemsGenerator: SidebarItemsGenerator;
//# sourceMappingURL=sidebarItemsGenerator.d.ts.map