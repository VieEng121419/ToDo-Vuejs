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
    IMG_URL: (state, url) => {
        state.url = url
        localStorage.setItem('url', url)
    },
}
const actions = {
    async getAvatar({ commit }, id) {
        try {
            const url = await Axios({
                method: 'get',
                url: `user/${id}/avatar`,

            })
            commit('IMG_URL', url.config.url)
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
