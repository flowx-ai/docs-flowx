/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

const { doc } = require('prettier');

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: "doc",
      id: "intro",
      className: "sidebar-title"
    },
    {
      type: "category",
      label: "GETTING STARTED", // This is the "Title" item.
      link: {
        type: 'generated-index',
      },
      collapsed:false,
      collapsible:false,
      items: [
        {
          type: 'doc',
          id: 'getting-started/building-your-first-proc'
        },
        {
          type: 'doc',
          id: 'getting-started/learn-more'
        },
      ],
      className: "sidebar-title"
    },


    {
      type: "category",
      label: "PLATFORM OVERVIEW", // This is the "Title" item.
      link: {
        type: 'generated-index',
      },
      collapsed:false,
      collapsible:false,
      items: [
        {
          type: "category",
          label: "Frameworks and standards",
          link: {
            type: "doc",
            id: "platform-overview/frameworks-and-standards/frameworks-and-standards",
          } ,
          items: [
              {
                type: "category",
                label: "Business process industry and standards",
                link: 
                {
                  type: "doc",
                  id: "platform-overview/frameworks-and-standards/business-process-industry-standards/business-process-industry-standards",
                },
                
                items: 
              [ 
                {
                    type: "category",
                    label: "Intro to BPMN",
                    link: 
                    {
                      type: "doc",
                      id: "platform-overview/frameworks-and-standards/business-process-industry-standards/intro-to-bpmn/intro-to-bpmn",
                    } ,
                    items: 
                    
                  [
                    {
                    type: "doc",
                    id: "platform-overview/frameworks-and-standards/business-process-industry-standards/intro-to-bpmn/bpmn-basic-concepts"
                    }
                  ]
                },

                  "platform-overview/frameworks-and-standards/business-process-industry-standards/intro-to-dmn",
                  "platform-overview/frameworks-and-standards/business-process-industry-standards/intro-to-mvel",          
                  
              ],
              },

              {
                type: "category",
                label: "Event-driven architecture frameworks",
                link: {
                  type: "generated-index",
                } ,
                items: 
                [ 
                  { 
                    type: "doc",
                    id: "platform-overview/frameworks-and-standards/event-driven-architecture-frameworks/intro-to-elasticsearch"
                  },
                  { 
                    type: "doc",
                    id: "platform-overview/frameworks-and-standards/event-driven-architecture-frameworks/intro-to-kafka-concepts"
                  },
                  { 
                    type: "doc",
                    id: "platform-overview/frameworks-and-standards/event-driven-architecture-frameworks/intro-to-kubernetes"
                  },
                  { 
                    type: "doc",
                    id: "platform-overview/frameworks-and-standards/event-driven-architecture-frameworks/intro-to-nginx"
                  },
                  {
                    type: "doc",
                    id: "platform-overview/frameworks-and-standards/event-driven-architecture-frameworks/intro-to-redis"
                  }
                
                ],
              },

              {
                type: "doc",
                id: "platform-overview/frameworks-and-standards/timer-expressions"
              }

          ],
          
        },

        {
          type: "doc",
          id: "platform-overview/flowx-architecture"
          }
        

      ],
      className: "sidebar-title"
    },

    {
      type: "category",
      label: "BUILDING BLOCKS", // This is the "Title" item.
      link: {
        type: 'generated-index',
      },
      collapsed:false,
      collapsible:false,
      items: [
        {
          type: "category",
          label: "Process Designer",
          link: {
            type: "doc",
            id: "building-blocks/process/process",
          },

          items: [
            {
              type: "doc",
              id: "building-blocks/process/process-definition"
            },

            {
              type: "category",
              label: "Active process",
              link: {
                type: "generated-index",
              } ,
              items: 
              [ 
                { 
                  type: "doc",  
                  id: "building-blocks/process/active-process/process-instance"
                },
                { 
                  type: "doc",
                  id: "building-blocks/process/active-process/failed-process-start"
                }              
              ],
            },

            {
              type: "doc",
              id: "building-blocks/process/subprocess"
            },

            {
              type: "doc",
              id: "building-blocks/process/versioning"
            },

          ]

          
        
        },
        {
          type: "category",
          label: "Node",
          link: {
            type: "doc",
            id: "building-blocks/node/node",
          },

          items: [
            {
              type: "doc",
              id: "building-blocks/node/start-end-node"
            },

            {
              type: "doc",
              id: "building-blocks/node/message-send-received-task-node"
            },

            {
              type: "doc",
              id: "building-blocks/node/task-node"
            },

            {
              type: "doc",
              id: "building-blocks/node/user-task-node"
            },

            {
              type: "doc",
              id: "building-blocks/node/exclusive-gateway-node"
            },

            {
              type: "doc",
              id: "building-blocks/node/parallel-gateway"
            },

            {
              type: "doc",
              id: "building-blocks/node/milestone-node"
            },

            {
              type: "doc",
              id: "building-blocks/node/subprocess-run-node"
            },

            {
              type: "category",
              label: "Message events",
              link: {
                type: "doc",
                id: "building-blocks/node/message-events/message-events"
              } ,
              items: 
              [ 
                { 
                  type: "doc",
                  id: "building-blocks/node/message-events/message-throw-intermediate-event"
                },

                { 
                  type: "doc",
                  id: "building-blocks/node/message-events/message-catch-boundary-event"
                },  
                
                { 
                  type: "doc",
                  id: "building-blocks/node/message-events/message-catch-intermediate-event"
                },      

                { 
                  type: "doc",
                  id: "building-blocks/node/message-events/message-catch-start-event"
                }      
              ],
            },

           

          ]
        
        },

        {
          type: "category",
          label: "Actions",
          link: {
            type: "doc",
            id: "building-blocks/actions/actions"
          } ,
          items: 
          [ 
            {
              type: "category",
              label: "Business Rule action",
              link: {
                type: "doc",
                id: "building-blocks/actions/business-rule-action/business-rule-action"
              } ,
              items: 
              [ 
                { 
                  type: "doc",
                  id: "building-blocks/actions/business-rule-action/dmn-business-rule-action"
                },
              ],
            },

            { 
              type: "doc",
              id: "building-blocks/actions/send-data-to-user-interface"
            },  
            
            { 
              type: "doc",
              id: "building-blocks/actions/upload-file-action"
            },      

            { 
              type: "doc",
              id: "building-blocks/actions/start-subprocess-action"
            },
            
            { 
              type: "doc",
              id: "building-blocks/actions/append-params-to-parent-process"
            }  
          ],
        },

        {
          type: "category",
          label: "UI Designer",
          link: {
            type: "doc",
            id: "building-blocks/ui-designer/ui-designer"
          } ,
          items: 
          [ 
            {
              type: "category",
              label: "UI component types",
              link: {
                type: "doc",
                id: "building-blocks/ui-designer/ui-component-types/ui-component-types"
              } ,
              items: 
              [ 
                {
                  type: "category",
                  label: "Root components",
                  link: {
                    type: "doc",
                    id: "building-blocks/ui-designer/ui-component-types/root-components/root-components"
                  } ,
                  items: 
                  [ 
                    { 
                      type: "doc",
                      id: "building-blocks/ui-designer/ui-component-types/root-components/container"
                    },

                    { 
                      type: "doc",
                      id: "building-blocks/ui-designer/ui-component-types/root-components/card"
                    },
                    
                    { 
                      type: "doc",
                      id: "building-blocks/ui-designer/ui-component-types/root-components/custom"
                    } 
                  ],
                },

                {
                  type: "category",
                  label: "Collection",
                  link: {
                    type: "doc",
                    id: "building-blocks/ui-designer/ui-component-types/collection/collection"
                  } ,
                  items: 
                  [ 
                    { 
                      type: "doc",
                      id: "building-blocks/ui-designer/ui-component-types/collection/collection_prototype"
                    },
                  ],
                },

                { 
                  type: "doc",
                  id: "building-blocks/ui-designer/ui-component-types/buttons"
                },

                { 
                  type: "doc",
                  id: "building-blocks/ui-designer/ui-component-types/file-preview"
                },

                {
                  type: "category",
                  label: "Form elements",
                  link: {
                    type: "doc",
                    id: "building-blocks/ui-designer/ui-component-types/form-elements/form-elements"
                  } ,
                  items: 
                  [ 
                    { 
                      type: "doc",
                      id: "building-blocks/ui-designer/ui-component-types/form-elements/input-form-field"
                    },

                    { 
                      type: "doc",
                      id: "building-blocks/ui-designer/ui-component-types/form-elements/text-area"
                    },

                    { 
                      type: "doc",
                      id: "building-blocks/ui-designer/ui-component-types/form-elements/select-form-field"
                    },

                    { 
                      type: "doc",
                      id: "building-blocks/ui-designer/ui-component-types/form-elements/checkbox-form-field"
                    },

                    { 
                      type: "doc",
                      id: "building-blocks/ui-designer/ui-component-types/form-elements/radio-form-field"
                    },

                    { 
                      type: "doc",
                      id: "building-blocks/ui-designer/ui-component-types/form-elements/switch-form-field"
                    },

                    { 
                      type: "doc",
                      id: "building-blocks/ui-designer/ui-component-types/form-elements/datepicker-form-field"
                    },

                    { 
                      type: "doc",
                      id: "building-blocks/ui-designer/ui-component-types/form-elements/slider"
                    },

                    { 
                      type: "doc",
                      id: "building-blocks/ui-designer/ui-component-types/form-elements/segmented-button"
                    },
                  ],
                },

                { 
                  type: "doc",
                  id: "building-blocks/ui-designer/ui-component-types/image"
                },

                {
                  type: "doc",
                  id: "building-blocks/ui-designer/ui-component-types/indicators"
                }
              ],
            },

            { 
              type: "doc",
              id: "building-blocks/ui-designer/ui-actions"
            },  
            
            { 
              type: "doc",
              id: "building-blocks/ui-designer/validators"
            },      

            { 
              type: "doc",
              id: "building-blocks/ui-designer/dynamic-and-computed-values"
            },
            
            { 
              type: "doc",
              id: "building-blocks/ui-designer/layout-configuration"
            },

            { 
              type: "doc",
              id: "building-blocks/ui-designer/render-ui-designer-changelog"
            } 
          ],
        },

        {
          type: 'doc',
          id: 'building-blocks/token'
        },

        {
          type: 'doc',
          id: 'building-blocks/supported-scripts'
        },
        
        
      ],
      className: "sidebar-title"
    },


   
    {
      type: "category",
      label: "FlOWX.AI DESIGNER", // This is the "Title" item.
      link: {
        type: 'generated-index',
      },
      collapsed:false,
      collapsible:false,
      items: [
        {
          type: 'doc',
          id: 'flowx-designer/designer'
        },

        {
          type: 'doc',
          id: 'flowx-designer/overview'
        },

        {
          type: "category",
          label: "Managing a process flow",
          link: {
            type: "doc",
            id: "flowx-designer/managing-a-process-flow/managing-a-process-flow"
          } ,
          items: 
          [ 
            { 
              type: "doc",
              id: "flowx-designer/managing-a-process-flow/creating-a-new-process-definition"
            },

            { 
              type: "doc",
              id: "flowx-designer/managing-a-process-flow/adding-a-new-node"
            },  
            
            { 
              type: "doc",
              id: "flowx-designer/managing-a-process-flow/adding-an-action-to-a-node"
            },      

            { 
              type: "doc",
              id: "flowx-designer/managing-a-process-flow/handling-decisions-in-the-flow"
            },
            
            { 
              type: "doc",
              id: "flowx-designer/managing-a-process-flow/adding-more-flow-branches"
            },

            { 
              type: "doc",
              id: "flowx-designer/managing-a-process-flow/creating-a-user-interface"
            },

            { 
              type: "doc",
              id: "flowx-designer/managing-a-process-flow/moving-a-token-backwards-in-a-process"
            },

            { 
              type: "doc",
              id: "flowx-designer/managing-a-process-flow/export-import-a-process-definition"
            },

          ],
        },


        {
          type: "category",
          label: "Designer setup guide",
          link: {
            type: "doc",
            id: "flowx-designer/designer-setup-guide/designer-setup-guide"
          } ,
          items: 
          [ 
            { 
              type: "doc",
              id: "flowx-designer/designer-setup-guide/configuring-access-rights-for-admin"
            },
         
          ],
        },


    
      ],
      className: "sidebar-title"
    },

  
    {
      type: "category",
      label: "PLATFORM DEEP DIVE", // This is the "Title" item.
      link: {
        type: 'generated-index',
      },
      collapsed:false,
      collapsible:false,
      items: [
        {
          type: "category",
          label: "Core components",
          link: {
            type: "generated-index",
          } ,
          items: 
          [ 
            { 
              type: "doc",
              id: "platform-deep-dive/core-components/flowx-engine"
            },

            { 
              type: "doc",
              id: "platform-deep-dive/core-components/advancing-controller"
            },
            
            { 
              type: "doc",
              id: "platform-deep-dive/core-components/events-gateway"
            },

            {
              type: "category",
              label: "Core extensions",
              link: {
                type: "generated-index",
              } ,
              items: 
              [ 
                {
                  type: "category",
                  label: "Content management",
                  link: {
                    type: "doc",
                    id: "platform-deep-dive/core-components/core-extensions/content-management/content-management"
                  } ,
                  items: 
                  [ 
                    { 
                      type: "doc",
                      id: "platform-deep-dive/core-components/core-extensions/content-management/using-the-service"
                    },
        
                    { 
                      type: "doc",
                      id: "platform-deep-dive/core-components/core-extensions/content-management/enumerations"
                    },  
                    
                    { 
                      type: "doc",
                      id: "platform-deep-dive/core-components/core-extensions/content-management/substitution-tags"
                    }, 
                    
                    { 
                      type: "doc",
                      id: "platform-deep-dive/core-components/core-extensions/content-management/content-models"
                    },

                    { 
                      type: "doc",
                      id: "platform-deep-dive/core-components/core-extensions/content-management/languages"
                    },

                    { 
                      type: "doc",
                      id: "platform-deep-dive/core-components/core-extensions/content-management/source-systems"
                    },

                    { 
                      type: "doc",
                      id: "platform-deep-dive/core-components/core-extensions/content-management/media-library"
                    },

                    { 
                      type: "doc",
                      id: "platform-deep-dive/core-components/core-extensions/content-management/font-files"
                    },
                    
                    
                  ],
                },
    
                { 
                  type: "doc",
                  id: "platform-deep-dive/core-components/core-extensions/generic-parameters"
                },
                
                {
                  type: "category",
                  label: "Integration management",
                  link: {
                    type: "doc",
                    id: "platform-deep-dive/core-components/core-extensions/integration-management/integration-management"
                  } ,
                  items: 
                  [ 
                    { 
                      type: "doc",
                      id: "platform-deep-dive/core-components/core-extensions/integration-management/configuring-access-rights-for-intgr-mngmnt"
                    },
                    
                  ],
                },
    
                { 
                  type: "doc",
                  id: "platform-deep-dive/core-components/core-extensions/license-engine"
                },

                { 
                  type: "doc",
                  id: "platform-deep-dive/core-components/core-extensions/audit"
                },

                { 
                  type: "doc",
                  id: "platform-deep-dive/core-components/core-extensions/scheduler"
                },

                { 
                  type: "doc",
                  id: "platform-deep-dive/core-components/core-extensions/search-data-service"
                },
    
              ],
            },

            {
              type: "category",
              label: "Renderer SDKs",
              link: {
                type: "generated-index",
              } ,
              items: 
              [ 
                { 
                  type: "doc",
                  id: "platform-deep-dive/core-components/renderer-sdks/angular-renderer"
                },
    
                { 
                  type: "doc",
                  id: "platform-deep-dive/core-components/renderer-sdks/ios-renderer"
                },
                
                { 
                  type: "doc",
                  id: "platform-deep-dive/core-components/renderer-sdks/android-renderer"
                },
    
              ],
            },
          ],
        },

        {
          type: "category",
          label: "Plugins",
          link: {
            type: "doc",
            id: "platform-deep-dive/plugins/plugins"
          } ,
          items: 
          [ 
            {
              type: "category",
              label: "Custom Plugins",
              link: {
                type: "doc",
                id: "platform-deep-dive/plugins/custom-plugins/custom-plugins"
              } ,
              items: 
              [ 
                {
                  type: "category",
                  label: "Documents plugin",
                  link: {
                    type: "doc",
                    id: "platform-deep-dive/plugins/custom-plugins/documents-plugin/documents-plugin"
                  } ,
                  items: 
                  [ 
                    {
                      type: "category",
                      label: "Using the plugin",
                      link: {
                        type: "doc",
                        id: "platform-deep-dive/plugins/custom-plugins/documents-plugin/using-documents-plugin/using-documents-plugin"
                      } ,
                      items: 
                      [ 
                        {
                          type: "category",
                          label: "Generating docs based on templates",
                          link: {
                            type: "doc",
                            id: "platform-deep-dive/plugins/custom-plugins/documents-plugin/using-documents-plugin/generate-docs-based-on-templates/generate-docs-based-on-templates"
                          } ,
                          items: 
                          [ 
                            { 
                              type: "doc",
                              id: "platform-deep-dive/plugins/custom-plugins/documents-plugin/using-documents-plugin/generate-docs-based-on-templates/generating-from-html-templates"
                            },

                            { 
                              type: "doc",
                              id: "platform-deep-dive/plugins/custom-plugins/documents-plugin/using-documents-plugin/generate-docs-based-on-templates/managing-html-templates"
                            },
                      
                          ],
                        },
                        
                        { 
                          type: "doc",
                          id: "platform-deep-dive/plugins/custom-plugins/documents-plugin/using-documents-plugin/uploading-a-new-document"
                        },
                        
                        { 
                          type: "doc",
                          id: "platform-deep-dive/plugins/custom-plugins/documents-plugin/using-documents-plugin/converting-documents-to-different-formats"
                        }, 

                        { 
                          type: "doc",
                          id: "platform-deep-dive/plugins/custom-plugins/documents-plugin/using-documents-plugin/splitting-a-document"
                        }, 

                        { 
                          type: "doc",
                          id: "platform-deep-dive/plugins/custom-plugins/documents-plugin/using-documents-plugin/updating-deleting-document-files"
                        }, 

                        { 
                          type: "doc",
                          id: "platform-deep-dive/plugins/custom-plugins/documents-plugin/using-documents-plugin/getting-urls-to-documents"
                        }, 

                        { 
                          type: "doc",
                          id: "platform-deep-dive/plugins/custom-plugins/documents-plugin/using-documents-plugin/listing-stored-files"
                        }, 


                      ],
                    },
              
                  ],
                },
    
                {
                  type: "category",
                  label: "Notifications plugin",
                  link: {
                    type: "doc",
                    id: "platform-deep-dive/plugins/custom-plugins/notifications-plugin/notifications-plugin"
                  } ,
                  items: 
                  [ 
                    {
                      type: "category",
                      label: "Using the plugin",
                      link: {
                        type: "doc",
                        id: "platform-deep-dive/plugins/custom-plugins/notifications-plugin/using-notifications-plugin/using-notifications-plugin"
                      } ,
                      items: 
                      [
                        
                        { 
                          type: "doc",
                          id: "platform-deep-dive/plugins/custom-plugins/notifications-plugin/using-notifications-plugin/managing-notification-templates"
                        },
                        
                        { 
                          type: "doc",
                          id: "platform-deep-dive/plugins/custom-plugins/notifications-plugin/using-notifications-plugin/sending-a-notification"
                        }, 

                        { 
                          type: "doc",
                          id: "platform-deep-dive/plugins/custom-plugins/notifications-plugin/using-notifications-plugin/sending-an-email-with-attachments"
                        }, 

                        { 
                          type: "doc",
                          id: "platform-deep-dive/plugins/custom-plugins/notifications-plugin/using-notifications-plugin/forwarding-notifications-to-an-external-system"
                        }, 

                        {
                          type: "category",
                          label: "OTP flow",
                          link: {
                            type: "doc",
                            id: "platform-deep-dive/plugins/custom-plugins/notifications-plugin/using-notifications-plugin/otp-flow/otp-flow"
                          } ,
                          items: 
                          [ 
                            { 
                              type: "doc",
                              id: "platform-deep-dive/plugins/custom-plugins/notifications-plugin/using-notifications-plugin/otp-flow/generate-otp"
                            },

                            { 
                              type: "doc",
                              id: "platform-deep-dive/plugins/custom-plugins/notifications-plugin/using-notifications-plugin/otp-flow/validate-otp"
                            },
                      
                          ],
                        },

                      ],
                    },
              
                  ],
                },  
                
                {
                  type: "category",
                  label: "Task management",
                  link: {
                    type: "doc",
                    id: "platform-deep-dive/plugins/custom-plugins/task-management/task-management"
                  } ,
                  items: 
                  [ 
                    {
                      type: "doc",
                      id: "platform-deep-dive/plugins/custom-plugins/task-management/using-allocation-rules"
                    },

                    {
                      type: "doc",
                      id: "platform-deep-dive/plugins/custom-plugins/task-management/using-hooks"
                    },

                    {
                      type: "doc",
                      id: "platform-deep-dive/plugins/custom-plugins/task-management/using-out-of-office-records"
                    },

                    {
                      type: "doc",
                      id: "platform-deep-dive/plugins/custom-plugins/task-management/using-stages"
                    },

                  
              
                  ],
                },   
                
                {
                  type: "category",
                  label: "Customer management",
                  link: {
                    type: "doc",
                    id: "platform-deep-dive/plugins/custom-plugins/customer-management/customer-management"
                  } ,
                  items: 
                  [ 
                    {
                      type: "doc",
                      id: "platform-deep-dive/plugins/custom-plugins/customer-management/using-the-crm-plugin"
                    },

                    {
                      type: "doc",
                      id: "platform-deep-dive/plugins/custom-plugins/customer-management/crm-plugin-example"
                    },

              
                  ],
                },   

                { 
                  type: "doc",
                  id: "platform-deep-dive/plugins/custom-plugins/ocr-plugin"
                }, 

                {
                  type: "category",
                  label: "Reporting",
                  link: {
                    type: "doc",
                    id: "platform-deep-dive/plugins/custom-plugins/reporting/reporting"
                  } ,
                  items: 
                  [ 
                    {
                      type: "doc",
                      id: "platform-deep-dive/plugins/custom-plugins/reporting/access-and-authorization"
                    },
              
                  ],
                },  
                
              ],
            },

            {
              type: "category",
              label: "Plugins setup guides",
              link: {
                type: "doc",
                id: "platform-deep-dive/plugins/plugins-setup-guide/plugins-setup-guide"
              } ,
              items: 
              [ 
                {
                  type: "doc",
                  id: "platform-deep-dive/plugins/plugins-setup-guide/customer-management-plugin-configuration"
                },

                {
                  type: "category",
                  label: "Documents plugin setup",
                  link: {
                    type: "doc",
                    id: "platform-deep-dive/plugins/plugins-setup-guide/documents-plugin-setup/documents-plugin-setup"
                  } ,
                  items: 
                  [ 
                    {
                      type: "doc",
                      id: "platform-deep-dive/plugins/plugins-setup-guide/documents-plugin-setup/configuring-access-rights-for-documents"
                    },
              
                  ],
                },  

                {
                  type: "category",
                  label: "Notification templates plugin setup",
                  link: {
                    type: "doc",
                    id: "platform-deep-dive/plugins/plugins-setup-guide/notifications-plugin-setup/notifications-plugin-setup"
                  } ,
                  items: 
                  [ 
                    {
                      type: "doc",
                      id: "platform-deep-dive/plugins/plugins-setup-guide/notifications-plugin-setup/configuring-access-rights-for-notifications"
                    },
              
                  ],
                },

                {
                  type: "doc",
                  id: "platform-deep-dive/plugins/plugins-setup-guide/ocr-plugin-setup"
                },

                {
                  type: "doc",
                  id: "platform-deep-dive/plugins/plugins-setup-guide/reporting-setup"
                },

                {
                  type: "category",
                  label: "Task Manager plugin setup",
                  link: {
                    type: "doc",
                    id: "platform-deep-dive/plugins/plugins-setup-guide/task-management-plugin-setup/task-management-plugin-setup"
                  } ,
                  items: 
                  [ 
                    {
                      type: "doc",
                      id: "platform-deep-dive/plugins/plugins-setup-guide/task-management-plugin-setup/configuring-access-rights-for-task-management"
                    },
              
                  ],
                },
          
              ],
            },     
            
         
            { 
              type: "doc",
              id: "platform-deep-dive/plugins/wysiwyg"
            },  
            
          ],
        },


        {
          type: "category",
          label: "Integrations",
          link: {
            type: "doc",
            id: "platform-deep-dive/integrations/integrations"
          } ,
          items: 
          [ 
            { 
              type: "doc",
              id: "platform-deep-dive/integrations/creating-a-kafka-consumer"
            },

            { 
              type: "doc",
              id: "platform-deep-dive/integrations/creating-a-kafka-producer"
            },

            { 
              type: "doc",
              id: "platform-deep-dive/integrations/jaeger-setup-for-microservices"
            },

            { 
              type: "doc",
              id: "platform-deep-dive/integrations/mock-intgerations"
            },
         
          ],
        },

        { 
          type: "doc",
          id: "platform-deep-dive/third-party-components"
        },

        {
          type: "category",
          label: "User roles management",
          link: {
            type: "generated-index",
          } ,
          items: 
          [ 
            { 
              type: "doc",
              id: "platform-deep-dive/user-roles-management/swimlanes"
            },

            { 
              type: "doc",
              id: "platform-deep-dive/user-roles-management/business-filters"
            },

          ],
        },

    
      ],
      className: "sidebar-title"
    },
  
   
    {
      type: "category",
      label: "PLATFORM SETUP GUIDES", // This is the "Title" item.
      link: {
        type: 'generated-index',
      },
      collapsed:false,
      collapsible:false,
      items: [
        {
          type: 'doc',
          id: 'platform-setup-guides/platform-setup-guides-docs'
        },

        {
          type: "category",
          label: "FLOWX.AI Engine setup guide",
          link: {
            type: "doc",
            id: "platform-setup-guides/flowx-engine-setup-guide/flowx-engine-setup-guide"
          } ,
          items: 
          [ 
            { 
              type: "doc",
              id: "platform-setup-guides/flowx-engine-setup-guide/advancing-controller-setup-guide"
            },

            { 
              type: "doc",
              id: "platform-setup-guides/flowx-engine-setup-guide/configuring-access-rights-for-engine"
            },  
            
            { 
              type: "doc",
              id: "platform-setup-guides/flowx-engine-setup-guide/configuring-access-roles-for-processes"
            },      

            {
              type: "category",
              label: "Process instance indexing",
              link: {
                type: "doc",
                id: "platform-setup-guides/flowx-engine-setup-guide/configuring-elasticsearch-indexing/configuring-elasticsearch-indexing"
              } ,
              items: 
              [ 
                { 
                  type: "doc",
                  id: "platform-setup-guides/flowx-engine-setup-guide/configuring-elasticsearch-indexing/process-instance-indexing-config-guidelines"
                },
  
              ],
            },

        
            { 
              type: "doc",
              id: "platform-setup-guides/flowx-engine-setup-guide/old-access-roles"
            },
          ],
        },


        {
          type: "category",
          label: "Access management",
          link: {
            type: "doc",
            id: "platform-setup-guides/access-management/access-management"
          } ,
          items: 
          [ 
            { 
              type: "doc",
              id: "platform-setup-guides/access-management/configuring-an-iam-solution"
            },

            { 
              type: "doc",
              id: "platform-setup-guides/access-management/default-roles"
            },
         
          ],
        },

        { 
          type: "doc",
          id: "platform-setup-guides/audit-setup-guide"
        },

        {
          type: "category",
          label: "CMS setup guide",
          link: {
            type: "doc",
            id: "platform-setup-guides/cms-setup-guide/cms-setup-guide"
          } ,
          items: 
          [ 
            { 
              type: "doc",
              id: "platform-setup-guides/cms-setup-guide/configuring-access-rights-for-cms"
            },
   
          ],
        },

        { 
          type: "doc",
          id: "platform-setup-guides/events-gateway-setup"
        },

        {
          type: "category",
          label: "License engine setup guide",
          link: {
            type: "doc",
            id: "platform-setup-guides/license-engine-setup-guide/license-engine-setup-guide"
          } ,
          items: 
          [ 
            { 
              type: "doc",
              id: "platform-setup-guides/license-engine-setup-guide/configuring-access-rights-for-license"
            },

            { 
              type: "doc",
              id: "platform-setup-guides/license-engine-setup-guide/configuring-access-roles-old"
            },
   
          ],
        },

        { 
          type: "doc",
          id: "platform-setup-guides/scheduler-setup-guide"
        },

        { 
          type: "doc",
          id: "platform-setup-guides/search-data-service-setup-guide"
        },


    
      ],
      className: "sidebar-title"
    },


    {
      type: "doc",
      id: "glossary",
    },

    {
      type: "doc",
      id: "survey",
    },
  ],
};

module.exports = sidebars;
