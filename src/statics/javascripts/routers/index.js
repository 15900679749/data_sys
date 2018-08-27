import login from 'components/login/login-router';

export default [{
		path: '/',
		name: '/',
		component: require('components/home'),
		meta: {
			title: '后台管理中心'
		}
	},
	{
		path: '/home',
		name: '/home',
		component: require('components/home'),
		meta: {
			title: '后台管理中心'
		}
	},
	...login
]