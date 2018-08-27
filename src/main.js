import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from 'javascripts/routers';


import 'scss/common.scss';

const router = new VueRouter({
	routes
});

Vue.use(ElementUI);
Vue.use(VueRouter);


new Vue({
	el: '#app',
	render: h => h(App),
	router
});