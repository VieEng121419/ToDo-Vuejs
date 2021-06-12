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
        try {
            const url = await Axios({
                method: 'get',
                url: `user/${id}/avatar`,

            })
            commit('auth/IMG_URL', url.config.url, { root: true })
        }
        catch (err) {
            console.log(err)
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
