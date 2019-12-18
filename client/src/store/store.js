import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

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
        addUser: (state, payload) => {
            state.users.push(payload)
        },
        fetchUsers: (state, users) => {
            state.users = users;
        }
    },
    actions: {
        addUser: ({ commit }, payload) => {
            commit('addUser', payload);
        },
        fetchUsers: async ({ commit }) => {
            const { data } = await axios.get('/api/users');
            console.log(data);
            commit('fetchUsers', data.users)   
        }
    }
})