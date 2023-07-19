/**
 * Copyright (c) Bucher + Suter.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export declare type PapersaurusPluginOptions = {
    addDownloadButton: boolean;
    autoBuildPdfs: boolean;
    downloadButtonText: string;
    ignoreDocs: string[];
    stylesheets: string[];
    scripts: string[];
    coverPageHeader: string;
    coverPageFooter: string;
    getPdfCoverPage: (siteConfig: any, pluginConfig: PapersaurusPluginOptions, pageTitle: string, version: string) => string;
    getPdfPageHeader: (siteConfig: any, pluginConfig: PapersaurusPluginOptions, pageTitle: string) => string;
    getPdfPageFooter: (siteConfig: any, pluginConfig: PapersaurusPluginOptions, pageTitle: string) => string;
    author: string;
    footerParser: string;
    keepDebugHtmls: boolean;
    sidebarNames: string[];
    rootDocIds: RootDocIds;
};
export declare type RootDocIds = {
    version: string;
    rootDocId: string;
}[];
export declare type TocInfo = {
    link: string;
    href: string;
    text: string;
};
export declare type VersionInfo = {
    version: string;
    urlAddIn: string;
    sidebarFile: string;
};
//# sourceMappingURL=types.d.ts.map