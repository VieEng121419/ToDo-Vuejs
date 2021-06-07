import Axios from '@/plugins/api'
import { router } from '@/router/router'



const state = {
    outAlert: false,
    loading: false
}
const getters = {
}
const mutations = {
    LOADED: state => (state.outAlert = true),
}
const actions = {
    async logoutUser({ commit }) {
        commit('account/RESET_ERROR', null, { root: true })
        try {
            await Axios({
                method: 'post',
                url: 'user/logout',
            })
            commit('auth/RESET', null, { root: true })
            router.push({ name: "login" });
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