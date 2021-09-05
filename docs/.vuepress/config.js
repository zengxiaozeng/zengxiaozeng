module.exports = {
	base: '/zxz/',
  title: '曾小曾的前端小站',
  description: ' ',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
		lastUpdated: '最后更新时间',
    sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
    // 添加导航栏
    nav: [
      { text: '主页', link: '/' },
      {
				text: '代码规范',
				items: [
					{
						text: 'HTML',
						link: '/code/html/'
					},
					{
						text: 'CSS',
						link: '/code/css/'
					},
					{
						text: 'JavaScript',
						link: '/code/javascript/'
					},
					{
						text: 'ECMAScript 6',
						link: '/code/es6/'
					},
					{
						text: 'React',
						link: '/code/react/'
					},
					{
						text: 'Vue',
						link: '/code/vue/'
					},
					{
						text: '体验性',
						link: '/code/experience/'
					}
				]
			},
			{
				text: '组件化',
				items: [
					{
						text: '指令',
						link: '/components/directives/'
					},
					{
						text: '过滤器',
						link: '/components/filters/'
					},
					{
						text: '工具库',
						link: '/components/utils/'
					},
					{
						text: '预处理语言',
						link: '/components/css/'
					},
					{
						text: '日期工具函数',
						link: '/components/times/'
					},
					{
						text: 'Vue开发技巧',
						link: '/components/skills/'
					}
				]
			},
			{
				text: '实战',
				items: [
					{
						text: 'Vue 3.0',
						link: '/projects/vue3.0/'
					},
					{
						text: 'H5支付',
						link: '/projects/h5/'
					},
					{
						text: '组件化分享',
						link: '/projects/componentization/'
					},
					{
						text: '微信小程序',
						link: '/projects/uniApp/'
					},
					{
						text: '云闪付小程序',
						link: '/projects/unionpay/'
					},
					{
						text: 'React+Redux-saga',
						link: '/projects/react/'
					},
					{
						text: 'Vue 2.0+Ts',
						link: '/projects/vue2.0/'
					},
					{
						text: 'Jenkins自动部署',
						link: '/projects/jenkins/'
					}
				]
			},
			{
				text: '工具库',
				link: '/tools/'
			}
    ],
    // 为以下路由添加侧边栏
    sidebar:{
      '/baseComponents/': [
        {
          title: '介绍',
          collapsable: true,
          children: [
            'base/introduce'
          ]
        },
        {
          title: '命名规范',
          collapsable: true,
          children: [
            'base/name-rule'
          ]
        }
      ],
      // 代码规范 html
			'/code/html/': [
				{
					title: '',
					collapsable: false,
					children: [ '/code/html/' ]
				}
			],
			// 代码规范 css
			'/code/css/': [
				{
					title: '',
					collapsable: false,
					children: [ '/code/css/' ]
				}
			],
			// 代码规范 javascript
			'/code/javascript/': [
				{
					title: '',
					collapsable: false,
					children: [ '/code/javascript/' ]
				}
			],
			// 代码规范 es6
			'/code/es6/': [
				{
					title: '',
					collapsable: false,
					children: [ '/code/es6/' ]
				}
			],
			// 代码规范 react
			'/code/react/': [
				{
					title: '',
					collapsable: false,
					children: [ '/code/react/' ]
				}
			],
			// 代码规范 vue
			'/code/vue/': [
				{
					title: '',
					collapsable: false,
					children: [ '/code/vue/' ]
				}
			],
			// 代码规范 体验性
			'/code/experience/': [
				{
					title: '',
					collapsable: false,
					children: [ '/code/experience/' ]
				}
			],
			// 组件化 指令
			'/components/directives/': [
				{
					title: '指令',
					collapsable: false,
					children: [
						'/components/directives/',
						'/components/directives/copy',
						'/components/directives/throttles',
						'/components/directives/debounces',
						'/components/directives/dialogDrag',
						'/components/directives/waves',
						'/components/directives/inputFloat',
						'/components/directives/inputNumber',
						'/components/directives/waterMarker',
						'/components/directives/permission',
						'/components/directives/emoji',
						'/components/directives/longpress',
						'/components/directives/manage'
					]
				}
			],
			// 组件化 过滤器
			'/components/filters/': [
				{
					title: '',
					collapsable: false,
					children: [ '/components/filters/' ]
				}
			],
			// 组件化 工具库
			'/components/utils/': [
				{
					title: '',
					collapsable: false,
					children: [ '/components/utils/' ]
				}
			],
			// 组件化 预处理语言
			'/components/css/': [
				{
					title: '',
					collapsable: false,
					children: [ '/components/css/' ]
				}
			],
			// 组件化 日期工具函数
			'/components/times/': [
				{
					title: '',
					collapsable: false,
					children: [ '/components/times/' ]
				}
			],
			// 组件化 Vue开发技巧
			'/components/skills/': [
				{
					title: '',
					collapsable: false,
					children: [ '/components/skills/' ]
				}
			],
			// 实战 Vue 3.0
			'/projects/vue3.0/': [
				{
					title: '',
					collapsable: false,
					children: [ '/projects/vue3.0/' ]
				}
			],
			// 实战 Vue 2.0
			'/projects/vue2.0/': [
				{
					title: '',
					collapsable: false,
					children: [ '/projects/vue2.0/' ]
				}
			],
			// 实战 h5
			'/projects/h5/': [
				{
					title: '',
					collapsable: false,
					children: [
						'/projects/h5/',
						'/projects/h5/wxNative',
						'/projects/h5/webAlipay',
						'/projects/h5/alipayNative'
					]
				}
			],
			// 实战 组件化分享
			'/projects/componentization/': [
				{
					title: '',
					collapsable: false,
					children: [ '/projects/componentization/' ]
				}
			],
			// 实战微信小程序
			'/projects/uniApp/': [
				{
					title: '',
					collapsable: false,
					children: [ '/projects/uniApp/' ]
				}
			],
			// 实战云闪付小程序
			'/projects/unionpay/': [
				{
					title: '',
					collapsable: false,
					children: [ '/projects/unionpay/' ]
				}
			],
			// 实战 React+redux-saga
			'/projects/react/': [
				{
					title: '',
					collapsable: false,
					children: [ '/projects/react/' ]
				}
			],
			// Jenkins自动打包部署
			'/projects/jenkins/': [
				{
					title: '',
					collapsable: false,
					children: [ '/projects/jenkins/' ]
				}
			],
			// 工具库
			'/tools/': [
				{
					title: '',
					collapsable: false,
					children: [
						'/tools/',
						'/tools/Linux',
						'/tools/vscode',
						'/tools/link'
					]
				}
			]
    }
  },
};