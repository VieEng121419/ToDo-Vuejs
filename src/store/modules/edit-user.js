import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../../plugins/api'

Vue.use(Vuex)

const state = {
    token: localStorage.getItem('access_token') || null,
    avaAlert: false
}
const getters = {

}
const mutations = {
    editUser(state) {
        state.editAlert = true
    },
    uploadImg(state) {
        state.avaAlert = true
    },
}
const actions = {
    editUser({ commit }, infoEdit) {
        return new Promise((resolve, reject) => {
            Axios({
                method: 'put',
                url: 'user/me',
                headers: {
                    Authorization: `Bearer ${state.token} `
                },
                data: {
                    name: infoEdit.name,
                    email: infoEdit.email,
                    password: infoEdit.password,
                    age: infoEdit.age
                }
            })
                .then((res) => {
                    console.log('edit')
                    var data = res.data.data;
                    localStorage.user_info = JSON.stringify(data)
                    localStorage.setItem('nameUser', JSON.stringify(data.name))
                    commit('editUser')
                    resolve(res)
                })
                .catch((err) => {
                    console.log(err);
                    reject(err)
                })
        })
    },
    getAvatar(context, id) {
        return new Promise((resolve, reject) => {
            Axios({
                method: 'get',
                url: `user/${id}/avatar`,
                headers: {
                    Authorization: `Bearer ${state.token} `
                }
            })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    uploadImg({ commit }, data) {
        const formData = new FormData()
        formData.append('avatar', data)
        return new Promise((resolve, reject) => {
            Axios({
                method: 'post',
                url: 'user/me/avatar',
                headers: {
                    Authorization: `Bearer ${state.token} `,
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            })
                .then((res) => {
                    console.log(res)
                    commit('uploadImg')
                    resolve(res)
                })
                .catch((err) => {
                    console.log(err)
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