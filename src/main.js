import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from 'javascripts/routers';
//import axios from "axios";
import {post,get} from 'javascripts/utils/http';
import Qs from 'qs';
import 'scss/common.scss';

const router = new VueRouter({
	routes
});

Vue.use(ElementUI);
Vue.use(VueRouter);
//axios.defaults.headers.common['Authorization'] = "AUTH_TOKEN111111";
//axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

//Vue.prototype.$ajax=axios;
Vue.prototype.$get=get;
Vue.prototype.$post=post;
new Vue({
	el: '#app',
	render: h => h(App),
	router
});