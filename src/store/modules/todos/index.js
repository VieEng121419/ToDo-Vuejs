import Vue from 'vue'
import Vuex from 'vuex'
//modules
import getList from './modules/get'
import editTask from './modules/edit'
import deleteTask from './modules/delete'
import addTask from './modules/add'

Vue.use(Vuex)

const modules = {
    getList, editTask, deleteTask, addTask
}
const state = () => ({
    todos: []
})
const getters = {

}
const mutations = {
    SET_LIST: (s, todos) => {
        s.todos = todos.reverse()
    },
    ADD_TASK: (s, task) => s.todos.unshift(task),
    DELETE_TASK(s, id) {
        const index = s.todos.findIndex(todo => todo._id == id)
        s.todos.splice(index, 1)
    }
}
const actions = {

}

export default {
    namespaced: true,
    modules,
    state: state,
    getters,
    actions,
    mutations
}