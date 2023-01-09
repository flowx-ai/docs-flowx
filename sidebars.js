/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  "tutorialSidebar": [
    'intro',
    {
      type: 'html',
      value: '&nbsp;', // This is a spacer.
      className: 'sidebar-spacer',
    },
    {
      type: 'html',
      value: '<b>GETTING STARTED</b>',  // This is the "Title" item
      className: 'sidebar-title',
    },
    
    {
      type: 'autogenerated', // This is a folder of documentation - point it at the folder holding all the docs for the title above.
      dirName: 'getting-started'
    },
    {
      type: 'html',
      value: '&nbsp;', // This is a spacer.
      className: 'sidebar-spacer',
    },

    {
      type: 'html',
      value: '<b>PLATFORM OVERVIEW</b>', // This is the "Title" item.
      className: 'sidebar-title',
    },
   
    {
      type: 'autogenerated', // This is a folder of documentation - point it at the folder holding all the docs for the title above.
      dirName: 'platform-overview'
    },

    {
      type: 'html',
      value: '&nbsp;', // This is a spacer.
      className: 'sidebar-spacer',
    },

    {
      type: 'html',
      value: '<b>BUILDING BLOCKS</b>', // This is the "Title" item.
      className: 'sidebar-title',
    },
  
    {
      type: 'autogenerated', // This is a folder of documentation - point it at the folder holding all the docs for the title above.
      dirName: 'building-blocks',
    },

    {
      type: 'html',
      value: '&nbsp;', // This is a spacer.
      className: 'sidebar-spacer',
    },

    {
      type: 'html',
      value: '<b>FLOWX.AI DESIGNER</b>', // This is the "Title" item.
      className: 'sidebar-title',
    },
  
    {
      type: 'autogenerated', // This is a folder of documentation - point it at the folder holding all the docs for the title above.
      dirName: 'flowx-designer',
    },

    {
      type: 'html',
      value: '&nbsp;', // This is a spacer.
      className: 'sidebar-spacer',
    },

    {
      type: 'html',
      value: '<b>PLATFORM DEEP DIVE</b>', // This is the "Title" item.
      className: 'sidebar-title',
    },
  
    {
      type: 'autogenerated', // This is a folder of documentation - point it at the folder holding all the docs for the title above.
      dirName: 'platform-deep-dive',
    },

    {
      type: 'html',
      value: '&nbsp;', // This is a spacer.
      className: 'sidebar-spacer',
    },

    {
      type: 'html',
<<<<<<< HEAD
      value: '<b>PLATFORM SETUP GUIDES</b>', // This is the "Title" item.
=======
      value: 'PLATFORM SETUP GUIDES', // This is the "Title" item.
>>>>>>> 135aea4 (new setup section + overview)
      className: 'sidebar-title',
    },
  
    {
      type: 'autogenerated', // This is a folder of documentation - point it at the folder holding all the docs for the title above.
      dirName: 'platform-setup-guides',
    },
  ],

};


module.exports = sidebars;