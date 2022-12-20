// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require('dotenv').config();

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const urlEmbed = require('./src/remark/url-embed');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'FLOWX.AI Docs',
  tagline: 'Find out more',
  url: process.env.URL,
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'flowxai', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

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
              label: '2.14.0',
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
         '🆕  Check our latest release <a target="_blank" rel="noopener noreferrer" href="https://docs.flowx.ai/release-notes/v2.14.0-november-2022/"> 2.14.0</a>  🔍',
        backgroundColor: '#E7A811',
        textColor: '#FFFF',
        isCloseable: true,
        
        
      },
      
      navbar: {
        title: 'FLOWX.AI DocPortal',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
          width: 40,
        },
        items: [
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownItemsAfter: [{to: '/release-notes', label: 'All versions'}],
            dropdownActiveClassDisabled: true,
          },
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'doc',
            docId: 'release-notes',
            docsPluginId: 'release-notes',
            position: 'left',
            label: 'Release Notes',
          },
          {to: '/faqs', label: 'FAQs', position: 'left'},
          {to: 'https://support.flowx.ai/', label: 'Support', position: 'right'},
          {to: 'https://www.flowx.ai/contact-us', label: 'Contact', position: 'right'},
          {to: 'https://flowxai.canny.io/documentation-feedback', label: 'Feedback', position: 'right'},

          {
            type: 'search',
            position: 'left',
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
                label: 'Contact Us',
                to: 'https://www.flowx.ai/contact-us',
              },
              {
                label: 'Newsroom',
                to: 'https://blog.flowx.ai/newsroom',
              },
              {
                label: 'Request Demo',
                to: 'https://www.flowx.ai/',
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
                label: 'Platform',
                to: 'https://www.flowx.ai/platform',
              },
              {
                label: 'Podcasts',
                to: 'https://unbounded.flowx.ai/',
              },
            ],
          },
        ],
        logo: {
          height: 100,
          alt: 'FLOWX.AI logo',
          src: '/img/FlowX_logo_footer.svg',
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
    ],

  
};

module.exports = config;

