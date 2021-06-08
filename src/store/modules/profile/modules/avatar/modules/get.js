import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '@/plugins/api'

Vue.use(Vuex)

const state = {
    url: '',
    avaAlert: false,
}
const getters = {

}
const mutations = {
    
}
const actions = {
    async getAvatar({ commit }, id) {
        commit('profile/RESET_ERROR', null, { root: true })
        try {
            const url = await Axios({
                method: 'get',
                url: `user/${id}/avatar`,

            })
            commit('auth/IMG_URL', url.config.url, {root:true})
        }
        catch (err) {
             commit('profile/ERROR', err.response, { root: true })
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
