import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const gstore = {
	state: {
		userInfo: {},
		menuActive: 'uSer'
	},
	mutations: {
		saveMenuActive(state, nActive) {
			state.menuActive = nActive;
		},
		saveUserInfo(state, ninfo) {
			state.userInfo = { ...{},
				...ninfo
			};
		}
	},
	actions: {
		getUserInfo({
			commit
		}) {
			return vue.http.get("/userInfo").then(({
				body
			}) => {
				let data = body.data;
				commit("saveUserInfo", data);
				return data;
			})
		}
	},
	getters: {
		guserInfo(state) {
			return state.menuActive
		}
	}
};
export default new Vuex.Store(gstore)
//export default gstore;