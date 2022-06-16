import Vue from 'vue'
import Vuex from 'vuex'
import { UsersTree } from "@/scripts/UserTreeClass"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        usersTree: new UsersTree()
    },
    getters: {
        usersList(state) {
            return state.usersTree.getUsersList()
        },
    },
    mutations: {
        initUsers(state) {
            state.usersTree = new UsersTree(JSON.parse(localStorage.roistatTestTask).usersTree) ;
        },
        sortUsers(state, sort) {
            state.usersTree.sort(sort.parameter, sort.isReversed)
        },
        addUser(state, user) {
            let id = 0;
            if (state.usersTree.getUsersList().length > 0) {
                id = Math.max(...state.usersTree.getUsersList().map(user => user.id)) + 1
            }
            state.usersTree.addUser({ ...user, id });
        },
    },
})
