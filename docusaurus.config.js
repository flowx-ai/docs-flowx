// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require('dotenv').config();

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const urlEmbed = require('./src/remark/url-embed');

const papersaurus = require('./src/plugins/docusaurus-plugin-papersaurus')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'FLOWX.AI Docs',
  tagline: 'Meet FLOWX.AI',
  url: process.env.URL,
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon2.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'flowxai', // Usually your GitHub org/user name.
  projectName: 'FLOWX.AI', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          lastVersion: 'current',
          versions:{
            current:{
              label: '3.5.0',
              path: '',
              badge: true,
            },
          },
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          remarkPlugins: [urlEmbed],
          showLastUpdateTime: true,
          },

        theme: {
          customCss: [
          require.resolve('./src/css/custom.css'),
          require.resolve('./src/css/rubik.css'),
          ]
        },


        
      }),
    ],
  ],

  scripts: [
    {
      src: 'https://app.happyreact.com/widget/reactions.js',
      defer: true,
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    
    ({

      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true,
        },
      },

      announcementBar: {
        id: 'banner_release',
        content:
         '🆕  Check our latest release <a target="_blank" rel="noopener noreferrer" href="https://docs.flowx.ai/release-notes/v3.4.0-september-2023/"> 3.4.0 </a>  🔍',
        backgroundColor: '#E7A811',
        textColor: '#FFFF',
        isCloseable: true,
      },

      
      
      
      navbar: {
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo-big.svg',
          width: 105
        },
        items: [

          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },

          {
            type: 'doc',
            docId: 'overview',
            docsPluginId: 'release-notes',
            position: 'left',
            label: 'Release Notes',
          },

          {
            type: 'docsVersionDropdown',
            position: 'left',
            dropdownItemsAfter: [{to: '/release-notes', label: 'All versions'}],
            dropdownActiveClassDisabled: true,
          },
       
          {to: 'https://flowxai.canny.io/documentation-feedback', label: 'Feedback', position: 'right'},
          {to: 'https://discord.gg/ERMfJCADJR', label: 'Discord', position: 'right', className: 'discord-link' },

          {
            type: 'search',
            position: 'right',
          }
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'What is FLOWX.AI?',
                to: '/docs/intro',
              },
              {
                label: 'Getting Started',
                to: '/docs/getting-started/building-your-first-proc',
              },
              {
                label: 'Platform Overview',
                to: '/docs/platform-overview/frameworks-and-standards/',
              },
          
              
            ],
          },

          {
            title: 'More',
            items: [

              {
                label: 'About',
                to: 'https://www.flowx.ai/#about',
              },
              {
                label: 'Contact',
                to: 'mailto:gotaquestion@flowx.ai',
              },

              {
                label: 'Platform',
                to: 'https://www.flowx.ai/#platform',
              },
            ],
          },

          {
            title: 'Resources',
            items: [
              {
                label: 'Academy',
                to: 'https://academy.flowx.ai/',
              },

              {
                label: 'Support',
                to: 'https://support.flowx.ai/',
              },
              {
                label: 'FAQs',
                to: '/faqs',
              },
            ],
          },
        ],
        logo: {
          alt: 'FLOWX.AI logo',
          src: '/img/logo_footer2.svg',
          href: 'https://flowx.ai',
        },
        copyright: `Copyright © FLOWX.AI ${new Date().getFullYear()}`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },

      zoom: {
        selector: '.markdown :not(em) > img',
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)'
        },
        // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
        config: {}
      }

    }),

  
    plugins: [
      require.resolve('docusaurus-plugin-image-zoom'),
      [
        require.resolve("@easyops-cn/docusaurus-search-local"),
        {
          indexPages: true,
          indexDocs: true,
          docsRouteBasePath: "/",
          docsDir: "versioned_docs",
          hashed: true,
          language: ["en"],
          highlightSearchTermsOnTargetPage: false,
          searchResultContextMaxLength: 35,
          searchResultLimits: 10,
          searchBarShortcut: true,
          searchBarShortcutHint: true,
        }
      ],

      [
        "@docusaurus/plugin-content-docs",
        {
          id: "release-notes",
          sidebarPath: require.resolve("./releases.sidebars.js"),
          routeBasePath: "release-notes",
          path: "release-notes",
          showLastUpdateTime: true,
          remarkPlugins: [urlEmbed],
        },

      ],

      [
        '@docusaurus/plugin-google-gtag',
        {
          trackingID: 'G-CGW0FVK9YM',
          anonymizeIP: true,
        },
      ],
      
    ['@grnet/docusaurus-terminology', {
      termsDir: './docs/terms',
      docsDir: './docs',
      glossaryFilepath: './docs/glossary.md'
    }],

    [
      require.resolve('./src/plugins/docusaurus-plugin-papersaurus/lib'),
      {
        keepDebugHtmls: false,
        sidebarNames: ['tutorialSidebar','releaseNotes'],
        rootDocIds: [
          { version: 'current', rootDocId: '/docs/intro'},
          { version: 'default', rootDocId: '/release-notes'}
        ],
        addDownloadButton: true,
        autoBuildPdfs: false,
        downloadButtonText: 'Download PDF',
        ignoreDocs: ['licenses', 'glossary','survey'],
        stylesheets: [],
        scripts: [],
        coverPageHeader: '',
        coverPageFooter: '',
        getPdfCoverPage: (siteConfig, pluginConfig, pageTitle, version) => {
          return  `
          <!DOCTYPE html>
          <html>
          <head>
            
          </head>
      
            <body>
              <div style="margin: 2cm;border-top:5px solid #FEB913; padding-top:24px">
              <img 
              style='display:block; width:6cm;' 
              id='base64image'                 
              src='data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMTE2IiBoZWlnaHQ9IjE3IiB2aWV3Qm94PSIwIDAgMTE2IDE3IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNC4wNzkwOCA0Ljc2NDE4VjcuNjE3MDRIMTIuOTEyOVYxMS4wMjA0SDQuMDc5MDhWMTYuMzEzMkgwVjEuMzIzMjRIMTQuNjUyMVY0Ljc3NjdINC4wNzkwOFY0Ljc2NDE4WiIgZmlsbD0iIzIzMUYyMCIvPgo8cGF0aCBkPSJNMzAuMjc5OCAxMi43OTcyVjE2LjMxMzJIMTYuNzc4OFYxLjMyMzI0SDIwLjg1NzlWMTIuNzk3MkgzMC4yNzk4WiIgZmlsbD0iIzIzMUYyMCIvPgo8cGF0aCBkPSJNMzAuOTkyNyA4LjgxNzk0QzMwLjk5MjcgMy43Mzc4NiAzNC41NzEzIDAuODM0OTYxIDQwLjExNDMgMC44MzQ5NjFDNDUuNjU3MyAwLjgzNDk2MSA0OS4yNDg0IDMuNzUwMzcgNDkuMjQ4NCA4LjgxNzk0QzQ5LjI0ODQgMTMuODg1NSA0NS42NDQ4IDE2LjgwMDkgNDAuMTE0MyAxNi44MDA5QzM0LjU3MTMgMTYuODAwOSAzMC45OTI3IDEzLjg5OCAzMC45OTI3IDguODE3OTRaTTQ1LjA5NDMgOC44MTc5NEM0NS4wOTQzIDUuOTkwMTEgNDMuMTkyNCA0LjM4ODUxIDQwLjExNDMgNC4zODg1MUMzNy4wNjEyIDQuMzg4NTEgMzUuMTM0MyA1Ljk5MDExIDM1LjEzNDMgOC44MTc5NEMzNS4xMzQzIDExLjY0NTggMzcuMDM2MiAxMy4yNDc0IDQwLjExNDMgMTMuMjQ3NEM0My4xOTI0IDEzLjI0NzQgNDUuMDk0MyAxMS42NDU4IDQ1LjA5NDMgOC44MTc5NFoiIGZpbGw9IiMyMzFGMjAiLz4KPHBhdGggZD0iTTc0LjUyMyAxLjMyMzI0TDY5LjQzMDQgMTYuMzEzMkg2NS4zNzY0TDYyLjEyMzEgNS44Nzc3OUw1OC44NDQ4IDE2LjMxMzJINTQuODI4M0w0OS43MTA3IDEuMzIzMjRINTMuODg5OUw1Ni45NDI5IDExLjYyMUw2MC4yODM4IDEuMzIzMjRINjQuMDM3NUw2Ny4zNzg0IDExLjYyMUw3MC40MzE0IDEuMzIzMjRINzQuNTIzWiIgZmlsbD0iIzIzMUYyMCIvPgo8cGF0aCBkPSJNODcuMDIyMSAxMy4yODQ3SDc1LjQ4NTZWMTYuMzEyN0g4Ny4wMjIxVjEzLjI4NDdaIiBmaWxsPSIjRkNCODEzIi8+CjxwYXRoIGQ9Ik04My4wMTgzIDUuNjY1MDhMODcuMDIyMyAxMC4yNTcySDgzLjMzMTFMODEuMTUzOSA3LjcwNDYyTDc4Ljk3NjggMTAuMjU3Mkg3NS40OTgzTDc5LjQ4OTggNS43MTUxM0w3NS41OTg0IDEuMzIzMjRINzkuMzAyMUw4MS4zNjY2IDMuNzM4MTVMODMuNDMxMiAxLjMyMzI0SDg2LjkyMjJMODMuMDE4MyA1LjY2NTA4WiIgZmlsbD0iIzIzMUYyMCIvPgo8cGF0aCBkPSJNODkuNzg3MSAxNS42MjQzQzg5Ljc4NzEgMTUuMTM2MyA5MC4xNSAxNC43NzM0IDkwLjY4OCAxNC43NzM0QzkxLjIyNiAxNC43NzM0IDkxLjU4ODkgMTUuMTM2MyA5MS41ODg5IDE1LjYyNDNDOTEuNTg4OSAxNi4xMTIzIDkxLjIyNiAxNi40NzUxIDkwLjY4OCAxNi40NzUxQzkwLjE1IDE2LjQ4NzcgODkuNzg3MSAxNi4xMjQ4IDg5Ljc4NzEgMTUuNjI0M1oiIGZpbGw9IiMyMzFGMjAiLz4KPHBhdGggZD0iTTEwOC4wMTggMTEuODgzOEg5Ny40MTk4TDk0Ljk1NDggMTYuMzEzMkg5My43MTYxTDEwMi4xMTIgMS4zMjMyNEgxMDMuMzUxTDExMS43NDcgMTYuMzEzMkgxMTAuNTA4TDEwOC4wMTggMTEuODgzOFpNMTA3LjQ1NSAxMC44NTc4TDEwMi43IDIuMzQ5MjdMOTcuOTcwMyAxMC44NTc4SDEwNy40NTVaIiBmaWxsPSIjMjMxRjIwIi8+CjxwYXRoIGQ9Ik0xMTQuODg2IDE2LjMxMzJWMS4zMjMyNEgxMTZWMTYuMzEzMkgxMTQuODg2WiIgZmlsbD0iIzIzMUYyMCIvPgo8L3N2Zz4K' 
            />
              <h2 style="color:#000;font-size:16px;font-family:sans-serif;margin-top:48px;">${(pageTitle || siteConfig.tagline)}<h2>
      
              
              </div>
            </body>
      
          </html>
        `;
        },
        getPdfPageHeader: (siteConfig, pluginConfig, pageTitle) => {
          return ` <div style="justify-content: center;align-items: center;height:2.5cm;display:flex;margin: 0 1.5cm;color: #000;font-size:9px;font-family:sans-serif;width:100%;">
          <div style="flex-grow: 1; width: 50%; text-align:left;margin-left:-3px">
            <img 
              style='display:block; width:2cm;' 
              id='base64image'                 
              src='data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMTE2IiBoZWlnaHQ9IjE3IiB2aWV3Qm94PSIwIDAgMTE2IDE3IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNC4wNzkwOCA0Ljc2NDE4VjcuNjE3MDRIMTIuOTEyOVYxMS4wMjA0SDQuMDc5MDhWMTYuMzEzMkgwVjEuMzIzMjRIMTQuNjUyMVY0Ljc3NjdINC4wNzkwOFY0Ljc2NDE4WiIgZmlsbD0iIzIzMUYyMCIvPgo8cGF0aCBkPSJNMzAuMjc5OCAxMi43OTcyVjE2LjMxMzJIMTYuNzc4OFYxLjMyMzI0SDIwLjg1NzlWMTIuNzk3MkgzMC4yNzk4WiIgZmlsbD0iIzIzMUYyMCIvPgo8cGF0aCBkPSJNMzAuOTkyNyA4LjgxNzk0QzMwLjk5MjcgMy43Mzc4NiAzNC41NzEzIDAuODM0OTYxIDQwLjExNDMgMC44MzQ5NjFDNDUuNjU3MyAwLjgzNDk2MSA0OS4yNDg0IDMuNzUwMzcgNDkuMjQ4NCA4LjgxNzk0QzQ5LjI0ODQgMTMuODg1NSA0NS42NDQ4IDE2LjgwMDkgNDAuMTE0MyAxNi44MDA5QzM0LjU3MTMgMTYuODAwOSAzMC45OTI3IDEzLjg5OCAzMC45OTI3IDguODE3OTRaTTQ1LjA5NDMgOC44MTc5NEM0NS4wOTQzIDUuOTkwMTEgNDMuMTkyNCA0LjM4ODUxIDQwLjExNDMgNC4zODg1MUMzNy4wNjEyIDQuMzg4NTEgMzUuMTM0MyA1Ljk5MDExIDM1LjEzNDMgOC44MTc5NEMzNS4xMzQzIDExLjY0NTggMzcuMDM2MiAxMy4yNDc0IDQwLjExNDMgMTMuMjQ3NEM0My4xOTI0IDEzLjI0NzQgNDUuMDk0MyAxMS42NDU4IDQ1LjA5NDMgOC44MTc5NFoiIGZpbGw9IiMyMzFGMjAiLz4KPHBhdGggZD0iTTc0LjUyMyAxLjMyMzI0TDY5LjQzMDQgMTYuMzEzMkg2NS4zNzY0TDYyLjEyMzEgNS44Nzc3OUw1OC44NDQ4IDE2LjMxMzJINTQuODI4M0w0OS43MTA3IDEuMzIzMjRINTMuODg5OUw1Ni45NDI5IDExLjYyMUw2MC4yODM4IDEuMzIzMjRINjQuMDM3NUw2Ny4zNzg0IDExLjYyMUw3MC40MzE0IDEuMzIzMjRINzQuNTIzWiIgZmlsbD0iIzIzMUYyMCIvPgo8cGF0aCBkPSJNODcuMDIyMSAxMy4yODQ3SDc1LjQ4NTZWMTYuMzEyN0g4Ny4wMjIxVjEzLjI4NDdaIiBmaWxsPSIjRkNCODEzIi8+CjxwYXRoIGQ9Ik04My4wMTgzIDUuNjY1MDhMODcuMDIyMyAxMC4yNTcySDgzLjMzMTFMODEuMTUzOSA3LjcwNDYyTDc4Ljk3NjggMTAuMjU3Mkg3NS40OTgzTDc5LjQ4OTggNS43MTUxM0w3NS41OTg0IDEuMzIzMjRINzkuMzAyMUw4MS4zNjY2IDMuNzM4MTVMODMuNDMxMiAxLjMyMzI0SDg2LjkyMjJMODMuMDE4MyA1LjY2NTA4WiIgZmlsbD0iIzIzMUYyMCIvPgo8cGF0aCBkPSJNODkuNzg3MSAxNS42MjQzQzg5Ljc4NzEgMTUuMTM2MyA5MC4xNSAxNC43NzM0IDkwLjY4OCAxNC43NzM0QzkxLjIyNiAxNC43NzM0IDkxLjU4ODkgMTUuMTM2MyA5MS41ODg5IDE1LjYyNDNDOTEuNTg4OSAxNi4xMTIzIDkxLjIyNiAxNi40NzUxIDkwLjY4OCAxNi40NzUxQzkwLjE1IDE2LjQ4NzcgODkuNzg3MSAxNi4xMjQ4IDg5Ljc4NzEgMTUuNjI0M1oiIGZpbGw9IiMyMzFGMjAiLz4KPHBhdGggZD0iTTEwOC4wMTggMTEuODgzOEg5Ny40MTk4TDk0Ljk1NDggMTYuMzEzMkg5My43MTYxTDEwMi4xMTIgMS4zMjMyNEgxMDMuMzUxTDExMS43NDcgMTYuMzEzMkgxMTAuNTA4TDEwOC4wMTggMTEuODgzOFpNMTA3LjQ1NSAxMC44NTc4TDEwMi43IDIuMzQ5MjdMOTcuOTcwMyAxMC44NTc4SDEwNy40NTVaIiBmaWxsPSIjMjMxRjIwIi8+CjxwYXRoIGQ9Ik0xMTQuODg2IDE2LjMxMzJWMS4zMjMyNEgxMTZWMTYuMzEzMkgxMTQuODg2WiIgZmlsbD0iIzIzMUYyMCIvPgo8L3N2Zz4K' 
            />
          </div>
          <span style="color:#000; flex-grow: 1; width: 50%; text-align:right;">${pageTitle}</span>
        </div>`;
        },
        getPdfPageFooter: (siteConfig, pluginConfig, pageTitle) => {
          return ` <div style="height:1cm;display:flex;margin: 0 1.5cm;color: #000;font-size:9px;font-family:sans-serif;width:100%;">
          <span style="flex-grow: 1; width: 33%;">© FLOWX.AI</span>
          <span style="flex-grow: 1; width: 33%; text-align:center;">${new Date().toISOString().substring(0,10)}</span>
          <span style="flex-grow: 1; width: 33%; text-align:right;">Page <span class='pageNumber'></span> / <span class='totalPages'></span></span>
        </div>`;
        },
        author: '',
        footerParser: `Copyright © FLOWX.AI ${new Date().getFullYear()}`,
      },
    ],

    ],

    
};

module.exports = config;