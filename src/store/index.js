import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

const state = {
    token: localStorage.getItem('access_token') || null,
    userInfo: {
        name: "",
        email: "",
        age: 0,
        password: ""
    },
    todos: [],
    logAlert: false,
    resgisAlert: false,
    outAlert: false,
    editAlert: false
}
const getters = {
    loggedIn(state) {
        return state.token !== null
    }
}
const actions = {
    addUser({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            axios.post('https://api-nodejs-todolist.herokuapp.com/user/register', {
                name: userInfo.name,
                email: userInfo.email,
                password: userInfo.password,
                age: userInfo.age
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
            axios.post('https://api-nodejs-todolist.herokuapp.com/user/login', {
                email: user.email,
                password: user.password
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
        axios.defaults.headers.common = { 'Authorization': `Bearer ${state.token}` }
        if (getters.loggedIn) {
            return new Promise((resolve, reject) => {
                axios.post('https://api-nodejs-todolist.herokuapp.com/user/logout')
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

        }
    },

    editUser({ commit }, infoEdit) {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${state.token}` }
        return new Promise((resolve, reject) => {
            axios.put("https://api-nodejs-todolist.herokuapp.com/user/me", {
                name: infoEdit.name,
                email: infoEdit.email,
                password: infoEdit.password,
                age: infoEdit.age
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

    uploadImg(context, data) {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${state.token}` }
        const formData = new FormData()
        formData.append('avatar', data)
        return new Promise((resolve, reject) => {
            axios.post('https://api-nodejs-todolist.herokuapp.com/user/me/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    console.log(res)
                    resolve(res)
                })
                .catch((err) => {
                    console.log(err)
                    reject(err)
                })
        })
    },

    getAvatar(context, id) {
        return new Promise((resolve, reject) => {
            axios.get('https://api-nodejs-todolist.herokuapp.com/user/' + id + '/avatar')
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    getListTodo({ commit }) {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${state.token}` }
        return new Promise((resolve, reject) => {
            axios.get('https://api-nodejs-todolist.herokuapp.com/task')
                .then((res) => {
                    commit('getListTodo', res.data)
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    addTodo({ commit }, description) {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${state.token}` }
        return new Promise((resolve, reject) => {
            axios.post('https://api-nodejs-todolist.herokuapp.com/task', {
                description: description
            })
                .then((res) => {
                    commit('addTodo', res.data.data)
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    removeTodo({ commit }, idTodo) {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${state.token}` }
        return new Promise((resolve, reject) => {
            axios.delete(`https://api-nodejs-todolist.herokuapp.com/task/${idTodo}`)
                .then((res) => {
                    commit('removeTodo', idTodo)
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
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
    editUser(state) {
        state.editAlert = true
    },
    getListTodo(state, todos) {
        state.todos = todos
    },
    addTodo(state, todo) {
        state.todos.data.push(todo)
    },
    removeTodo(state, idTodo) {
        const index = state.todos.data.findIndex(todo => todo._id = idTodo)
        state.todos.data.splice(index, 1)
    }
}

const store = new Vuex.Store({ state, getters, actions, mutations })
export default store