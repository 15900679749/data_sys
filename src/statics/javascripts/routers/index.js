import login from 'view/login/login-router';
export default [{
		path: '/',
		redirect: {
			name: '/uSer'
		}
	},
	{
		path: '/home',
		name: '/home',
		redirect: {
			name: '/uSer'
		},
		component: require('view/home'),
		meta: {
			title: '后台管理中心'
		},
		children: [{
				path: '/home/myQuestion',
				name: '/myQuestion',
				component: require('view/myQuestion/myQuestion'),
				meta: {
					title: '我的问卷'
				}
			},
			{
				path: '/home/questionNaire',
				name: '/questionNaire',
				component: require('view/questionNaire/questionNaire'),
				meta: {
					title: '问卷管理'
				}
			},
			{
				path: '/home/temPlate',
				name: '/temPlate',
				component: require('view/temPlate/temPlate'),
				meta: {
					title: '模板管理'
				}
			},
			{
				path: '/home/uSer',
				name: '/uSer',
				component: require('view/uSer/uSer'),
				meta: {
					title: '用户管理'
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