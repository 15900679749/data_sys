import login from 'view/login/login-router';
export default [{
		path: '/',
		redirect: {
			name: '/uSer'
		},
		component: require('view/home'),
		meta: {
			title: '后台管理中心'
		}
	},
	{
		path: '/',
		name: '/',
		component: require('view/home'),
		meta: {
			title: '后台管理中心'
		},
		children: [
			{
				path: '/uSer',
				name: '/uSer',
				component: require('view/uSer/uSer'),
				meta: {
					title: '用户管理'
				}
			},
			{
				path: '/analysis',
				name: '/uSer',
				component: require('view/analysis/analysis'),
				meta: {
					title: '分析&下载'
				}
			},
			{
				path: '/questionNaire',
				name: '/questionNaire',
				component: require('view/questionNaire/questionNaire'),
				meta: {
					title: '问卷管理'
				}
			},
			{
				path: '/temPlate',
				name: '/temPlate',
				component: require('view/temPlate/temPlate'),
				meta: {
					title: '模板管理'
				}
			},
			{
				path: '/sendpage',
				name: '/sendpage',
				component: require('view/sendpage/sendpage'),
				meta: {
					title: '发送问卷'
				}
			}
			
		]
	},
	{
		path: '/edit/edit_template',
		name: '/edit_template',
		component: require('view/edit/edit_template'),
		meta: {
			title: '编辑模板'
		}
	},
	{
		path: '/edit_questionnaire',
		name: '/edit_questionnaire',
		component: require('view/edit/edit_questionnaire'),
		meta: {
			title: '编辑问卷'
		}
	},
		
	...login
]