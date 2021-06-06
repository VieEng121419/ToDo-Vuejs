import Vue from 'vue'
import Vuex from 'vuex'
//modules
import getList from './modules/get'
import editTask from './modules/edit'
import deleteTask from './modules/delete'
import addTask from './modules/add'
import filterTask from './modules/filter'

Vue.use(Vuex)

const modules = {
    getList, editTask, deleteTask, addTask, filterTask
}
const state = () => ({
    todos: [],
    filter: 'all',
})
const getters = {
    todosFiltered(s) {
        if (s.filter == 'all') {
            return s.todos
        } else if (s.filter == 'new') {
            return s.todos.filter(todo => todo.completed === false)
        } else if (s.filter == 'completed') {
            return s.todos.filter(todo => todo.completed === true)
        }
        return s.todos
    }
}
const mutations = {
    SET_LIST: (s, todos) => {
        s.todos = todos.reverse()
    },
    ADD_TASK: (s, task) => s.todos.unshift(task),
    DELETE_TASK(s, id) {
        const index = s.todos.findIndex(todo => todo._id == id)
        s.todos.splice(index, 1)
    },
    FILTER_TASK: (s, filter) => {
        s.filter = filter
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