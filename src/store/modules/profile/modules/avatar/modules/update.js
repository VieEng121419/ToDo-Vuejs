import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '@/plugins/api'
import { router } from '@/router/router'

Vue.use(Vuex)

const state = {
    avaAlert: false
}
const getters = {

}
const mutations = {
    LOADED: state => {
        state.avaAlert = true
    }
}
const actions = {
    async uploadImg({ commit }, data) {
        commit('profile/RESET_ERROR', null, { root: true })
        const formData = new FormData()
        formData.append('avatar', data)
        try {
            const url = await Axios({
                method: 'post',
                url: `user/me/avatar`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(url)
            // commit('auth/IMG_URL', url.config.url, { root: true })
            router.push({ name: "todo" });
        }
        catch (err) {
            commit('profile/ERROR', err.response, { root: true })
        }
        finally {
            commit('LOADED')
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
