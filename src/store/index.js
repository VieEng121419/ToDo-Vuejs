import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/plugins/api'
import createPersistedState from "vuex-persistedstate";
//modules
import profile from "./modules/profile"
import account from "./modules/account"
import auth from "./modules/auth"
import editUser from "./modules/account"
import todos from "./modules/todos"

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        editUser,
        profile,
        account,
        todos,
    },
    plugins: [
        createPersistedState({
            key: 'todo',
            storage: window.localStorage,
            paths: ['auth'],
        }),        
    ],

})
api.interceptors.request.use(config => {
    const token = store.state.auth.accessToken
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});
export default store