import login from 'view/login/login-router';
export default [
	{
		path: '/',
		name: '/',
		component: require('view/head/headTop'),
		meta: {
			title: '后台管理中心'
		}
	},
	{
		path: '/home',
		name: '/home',
		component: require('view/home'),
		meta: {
			title: '后台管理中心'
		}
	},
	{
		path: '/myQuestion',
		name: '/myQuestion',
		component: require('view/myQuestion/myQuestion'),
		meta: {
			title: '我的问卷'
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
		path: '/uSer',
		name: '/uSer',
		component: require('view/uSer/uSer'),
		meta: {
			title: '用户管理'
		}
	},
	...login
]