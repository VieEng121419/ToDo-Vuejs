import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '@/plugins/api'
import { router } from '@/router/router'

Vue.use(Vuex)

const state = {
    resgisAlert: false,
}
const getters = {

}
const mutations = {
    LOADED: state => { state.resgisAlert = true }
}
const actions = {
    async addUser({ commit }, user) {
        commit('account/RESET_ERROR', null, { root: true })
        try {
            const userInfo = await Axios({
                method: 'post',
                url: 'user/register',
                data: {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    age: user.age
                }
            })
            commit('auth/SET_USER', userInfo.data.user, { root: true })
            commit('auth/SET_TOKEN', userInfo.data.token, { root: true })
            router.push({ name: "todo" });
        }
        catch (err) {
            commit('account/ERROR', err.response, { root: true })
        }
        finally {
            commit('LOADED')
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}