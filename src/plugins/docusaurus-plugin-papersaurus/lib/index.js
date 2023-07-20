"use strict";
/**
 * Copyright (c) Bucher + Suter.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generate_1 = require("./generate");
const import_fresh_1 = __importDefault(require("import-fresh"));
const fs = __importStar(require("fs"));
function loadConfig(configPath) {
    if (!fs.existsSync(configPath)) {
        throw new Error(`Config file "${configPath}" not found`);
    }
    const loadedConfig = (0, import_fresh_1.default)(configPath);
    return loadedConfig;
}
function default_1(_context, pluginOptions) {
    return {
        name: 'docusaurus-plugin-papersaurus',
        injectHtmlTags() {
            if (!pluginOptions.addDownloadButton) {
                return {};
            }
            const CWD = process.cwd();
            const siteConfig = loadConfig(`${CWD}/docusaurus.config.js`);
            return {
                headTags: [`
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

        <script>

          const slugFunction = function(unformattedString) {
            var whitespace = /\\s/g;
            var specials = /[\\u2000-\\u206F\\u2E00-\\u2E7F\\\'!"#$%&()*+,./:;<=>?@[\\]^\`{|}~’]/g;
            if (typeof unformattedString !== 'string') {
              return ''
            }
            unformattedString = unformattedString.toLowerCase();
          
            return unformattedString.trim()
              .replace(specials, '')
              .replace(whitespace, '-');
          }


          const getPdfPath = function() {
            var pdfPath = document.location.pathname;
            if (pdfPath.endsWith('/')) {
              pdfPath = pdfPath.substr(0, pdfPath.length-1);
            }
            const checkRootDoc = new RegExp("/docs(((\/[0-9]+\.[0-9]+)|\/next)?)$");
            if (!checkRootDoc.test(pdfPath)) {
              // ends with document (not with /docs or /docs/x.x or /docs/next), remove document 
              var lastSlashPos = pdfPath.lastIndexOf('/');
              pdfPath = pdfPath.substr(0, lastSlashPos);
            }
            pdfPath = pdfPath + '/';
            pdfPath = pdfPath.replace('/docs/', '/pdfs/');
            return pdfPath;
          }


          const getDownloadItems = function() {
            var activePageSidebarLink;
            $("a").filter(".menu__link").filter(function() {
              if ($(this).attr('href') === document.location.pathname ||
                  ($(this).attr('href') + '/') === document.location.pathname) {
                activePageSidebarLink = $(this);
              }
            });
            if (!activePageSidebarLink) {
              return [];
            }
            let pdfname = activePageSidebarLink[0].pathname
            
            if (pdfname.indexOf('/') >= 0) {
              pdfname = pdfname.substr(pdfname.lastIndexOf('/') + 1);
            }


            var downloadItems = [];
            downloadItems.push({
              title: 'Download this chapter (' + activePageSidebarLink.text() +')',
              slug: pdfname,
              type: 'page'
            });

            var parentMenuItem = activePageSidebarLink.parent().parent().parent();
            while (parentMenuItem && parentMenuItem.length > 0) {
              if (parentMenuItem.hasClass("menu__list-item")) {
                var activePageSidebarLinkQuery = parentMenuItem.find(".menu__link");
                if (activePageSidebarLinkQuery.length > 0) {
                  activePageSidebarLink = activePageSidebarLinkQuery.first();
                 
                  slug = activePageSidebarLink[0].pathname.substr(activePageSidebarLink[0].pathname.lastIndexOf('/') + 1);
                  downloadItems.forEach(function(downloadItem) {
                    downloadItem.slug = slug + '/' + downloadItem.slug;
                  });
                  downloadItems.push({
                    title: 'Download section (' + activePageSidebarLink.text() +')',
                    slug: slug,
                    type: 'section'
                  });
                }
                parentMenuItem = activePageSidebarLink.parent().parent().parent();
              }
              else {
                parentMenuItem = null;
              }
            }

            downloadItems.push({
              title: 'Download complete documentation',
              slug: slugFunction('${siteConfig.projectName}'),
              type: 'page'
            });
            console.log('DownloadItems', downloadItems);
            return downloadItems;
          }

          const fillDownloadDropdownMenu = function() {
            $('#pdfDownloadMenuList').empty();

            const downloadItems = getDownloadItems();
            //const pdfPath = getPdfPath();
            const pdfPath = '/pdfs/';

            var printPopupContent = '';
            downloadItems.forEach(function(downloadItem) {
              printPopupContent += '<li>';
              console.log('pdfPath', pdfPath, downloadItem.slug);
              printPopupContent += '<a class="dropdown__link" href="' + pdfPath + downloadItem.slug + '.pdf" download>' + downloadItem.title + '</a>';
              printPopupContent += '</li>';
            });
            if (printPopupContent.length === 0) {
              printPopupContent = '<li>No PDF downloads on this page</li>';
            }

            $("#pdfDownloadMenuList").append(printPopupContent);
          }

          const fillDownloadSidebarMenu = function() {
            $('#pdfLinkSidebarMenu').empty();

            const downloadItems = getDownloadItems();
            const pdfPath = getPdfPath();

            var printMenuContent = '';
            downloadItems.forEach(function(downloadItem) {
              printMenuContent += '<li class="menu__list-item">';
              printMenuContent += '<a class="menu__link" href="' + pdfPath + downloadItem.slug + '.pdf" download>' + downloadItem.title + '</a>';
              printMenuContent += '</li>';
            });
            if (printMenuContent.length === 0) {
              printMenuContent = '<li>No PDF downloads on this page</li>';
            }
            $('#pdfLinkSidebarMenu').append(printMenuContent);
          }

          const checkAndInsertPdfButtons = function() {

            if ( !$("#pdfLink").length ) {
              var pdfDownloadButton = $('' +
              '<div class="navbar__item dropdown dropdown--hoverable dropdown--right" id="pdfDownloadMenu">' +
              '  <a class="navbar__item navbar__link pdfLink" id="pdfLink" href="#">${pluginOptions.downloadButtonText}</a>' +
              '  <ul class="dropdown__menu" id="pdfDownloadMenuList"></ul>' +
              '</div>');
              $(".navbar__items--right").prepend(pdfDownloadButton);

              $("#pdfDownloadMenu").mouseenter(fillDownloadDropdownMenu);
            }

            if (!$("#pdfLinkSidebar").length) {
              var pdfDownoadButtonSidebar = $('<li class="menu__list-item menu__list-item--collapsed" id="pdfLinkSidebar"><a role="button" class="menu__link menu__link--sublist">${pluginOptions.downloadButtonText}</a><ul class="menu__list" id="pdfLinkSidebarMenu" style=""></ul></li>');
              $('.navbar-sidebar__items > .menu > .menu__list').append(pdfDownoadButtonSidebar);
              $('#pdfLinkSidebar').click(function() {
                $('#pdfLinkSidebar').toggleClass('menu__list-item--collapsed');
              });
              $('.navbar__toggle').click(fillDownloadSidebarMenu);
            }
          }
  
          $(window).on('load', function () {
            setInterval(checkAndInsertPdfButtons, 1000);
          });

        </script>
        `
                ],
            };
        },
        extendCli(cli) {
            cli
                .command('papersaurus:build')
                .description('Generate pdf files for website')
                .action(() => {
                const CWD = process.cwd();
                const siteConfig = loadConfig(`${CWD}/docusaurus.config.js`);
                (async () => {
                    (0, generate_1.generatePdfFiles)(pluginOptions, siteConfig);
                })();
            });
        },
        async postBuild(props) {
            if (pluginOptions.autoBuildPdfs) {
                await (0, generate_1.generatePdfFiles)(pluginOptions, props.siteConfig);
            }
        },
    };
}
exports.default = default_1;
