import ElementUI from 'element-ui';
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from 'javascripts/routers';
import { get, post } from 'javascripts/http';
import store from 'javascripts/store';
import 'scss/common.scss';
import 'element-ui/lib/theme-chalk/index.css';
import { utils } from 'javascripts/utils';

const router = new VueRouter({
	routes
});

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.prototype.$post = post;
Vue.prototype.$get = get;

new Vue({
	el: '#app',
	render: h => h(App),
	store,
	router
});