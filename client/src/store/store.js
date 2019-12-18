import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        users: ['Matan', 'Shiri']
    },
    getters: {
        users: state => {
            return state.users;
        }
    },
    mutations: {
        addUser: state => {
            state.users.push('test')
        }
    }
})