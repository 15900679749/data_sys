export default [{
	path: '/login',
	name: '/login',
	component: r => require.ensure([], () => r(require('components/login')), 'login'),
	meta: {
		title: '用户登录'
	}
}]