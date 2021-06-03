import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../../plugins/api'

Vue.use(Vuex)

const state = {
    token: localStorage.getItem('access_token') || null,
    userInfo: {
        name: "",
        email: "",
        age: 0,
        password: ""
    },
    logAlert: false,
    resgisAlert: false,
    outAlert: false,
}
const getters = {
    loggedIn(state) {
        return state.token !== null
    }
}
const mutations = {
    addUser(state, token) {
        state.token = token
        state.resgisAlert = true
    },
    loginUser(state, infoUser) {
        state.token = infoUser.token
        state.userInfo.name = infoUser.user.name
        state.userInfo.email = infoUser.user.email
        state.userInfo.age = infoUser.user.age
        state.userInfo.password = infoUser.user.password
        state.logAlert = true
    },
    logoutUser(state) {
        state.token = null
        state.outAlert = true
    },
}
const actions = {
    addUser({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            Axios({
                method: 'post',
                url: 'user/register',
                data: {
                    name: userInfo.name,
                    email: userInfo.email,
                    password: userInfo.password,
                    age: userInfo.age
                }
            })
                .then((res) => {
                    console.log(res.data);
                    const token = res.data.token;
                    const info = res.data.user
                    state.userInfo = res.data.user;
                    console.log(state.userInfo.name)
                    localStorage.setItem('access_token', token)
                    localStorage.setItem('user_info', JSON.stringify(state.userInfo))
                    commit('addUser', { token, info })
                    resolve(res)
                })
                .catch((err) => {
                    console.log(err);
                    reject(err)
                })
        })

    },
    loginUser({ commit }, user) {
        return new Promise((resolve, reject) => {
            Axios({
                method: 'post',
                url: 'user/login',
                data: user
            })
                .then(res => {
                    const token = res.data.token;
                    const data = res.data.user;
                    console.log(data.name)
                    localStorage.setItem('access_token', token)
                    localStorage.setItem('user_info', JSON.stringify(data))
                    commit('loginUser', res.data)
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    logoutUser({ commit }) {
        return new Promise((resolve, reject) => {
            Axios({
                method: 'post',
                url: 'user/logout',
                headers: {
                    Authorization: `Bearer ${state.token} `
                },
            })
                .then(res => {
                    localStorage.removeItem('access_token')
                    localStorage.removeItem('user_info')
                    commit('logoutUser')
                    resolve(res)
                })
                .catch(err => {
                    localStorage.removeItem('access_token')
                    localStorage.removeItem('user_info')
                    commit('logoutUser')
                    reject(err)
                })
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}