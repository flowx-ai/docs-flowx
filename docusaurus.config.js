// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const urlEmbed = require('./src/remark/url-embed');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'What is FLOWX.AI?',
  tagline: 'Find out more',
  url: 'https://flowx.ai',
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
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          remarkPlugins: [urlEmbed],

          },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    
    ({
      
      navbar: {
        title: 'FLOWX.AI DocPortal',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
          
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          {to: '/release-notes', label: 'Release Notes', position: 'left'},
          {to: '/faqs', label: 'FAQs', position: 'left'},
          {to: 'https://support.flowx.ai/', label: 'Support', position: 'right'},
          {to: 'https://www.flowx.ai/contact-us', label: 'Contact', position: 'right'},
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
                label: 'Academy',
                to: 'https://academy.flowx.ai/',
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
        ],
        copyright: `Copyright © ${new Date().getFullYear()} FLOWX.AI `,
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
        require.resolve("@cmfcmf/docusaurus-search-local"),
        {
          indexDocs: true,
          indexBlog: false,
          indexPages: true,
          language: "en"
        }
      ],
    ],
    
    
};

module.exports = config;

