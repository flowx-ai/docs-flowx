// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require('dotenv').config();

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const urlEmbed = require('./src/remark/url-embed');


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
              label: '3.2.0',
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

    {
      src: 'https://cdn.jsdelivr.net/gh/RelevanceAI/ask-relevance-widget/dist/bundle.min.js',
      config:'eyJ1cmwiOiJodHRwczovL2FwaS1kN2I2MmIuc3RhY2sudHJ5cmVsZXZhbmNlLmNvbS9sYXRlc3QvZGF0YXNldHMvZmxvd3gtZG9jcy9zaW1wbGVfc2VhcmNoIiwiZmllbGQiOiJmaWxlX2NvbnRlbnQiLCJ2ZWN0b3JfZmllbGQiOiJmaWxlX2NvbnRlbnRfdmVjdG9yXyIsImF1dGhfaGVhZGVyIjoiODM0MmIxZjM0NGNjLTQwOWQtODc0OC0wNDQyY2NhNGYwNjU6TXpkbE56TXdNak10Wm1FelpDMDBOMlpqTFdFMlpERXRNVEJoT0dJeE0yRTVaREk0IiwicmVmZXJlbmNlX3RpdGxlX2ZpZWxkIjoidGl0bGUiLCJyZWZlcmVuY2VfdXJsX2ZpZWxkIjoidXJsIiwic2hvd0RvY3VtZW50cyI6dHJ1ZX0', 
      defer: true,
    }

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
         '🆕  Check our latest release <a target="_blank" rel="noopener noreferrer" href="https://docs.flowx.ai/release-notes/v3.2.0-april-2023/"> 3.2.0 </a>  🔍',
        backgroundColor: '#E7A811',
        textColor: '#FFFF',
        isCloseable: true,
        
        
      },
      
      navbar: {
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo-big.svg',
          width: 110
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
            docId: 'release-notes',
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
       
          {to: '/faqs', label: 'FAQs', position: 'right'},
          {to: 'https://www.flowx.ai/contact-us', label: 'Contact', position: 'right'},
          {to: 'https://flowxai.canny.io/documentation-feedback', label: 'Feedback', position: 'right'},
          {to: 'https://discord.gg/6ejETBkj', label: 'Discord', position: 'right', className: 'discord-link' },

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

      [
        '@docusaurus/plugin-sitemap',
        {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      ],

    ],
  
};

module.exports = config;

