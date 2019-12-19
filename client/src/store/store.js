import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        users: [],
        isDialogVisible: false,
        name: '',
        email: '',
        phone: ''
    },
    getters: {
        users: ({ users }) => ( users ),
        isDialogVisible: ({ isDialogVisible }) => ( isDialogVisible ),
        // name: ({ name }) => ( name ),
        // email: ({ email }) => ( email ),
        // phone: ({ phone }) => ( phone ),
    },
    mutations: {
        addUser: (state, payload) => {
            state.users.push(payload)
        },
        fetchUsers: (state, users) => {
            state.users = users;
        },
        toggleDialogVisible: (state) => {
            state.isDialogVisible = !state.isDialogVisible;
        },
        setName: (state, name) => { state.name = name; },
        setEmail: (state, email) => { state.email = email; },
        setPhone: (state, phone) => { state.phone = phone; }
    },
    actions: {
        addUser: async ({ commit }, payload) => {
            const res = await axios.post('/api/users/addUser', { user: payload })
            console.log(res);
            commit('addUser', payload);
            commit('toggleDialogVisible');
        },
        fetchUsers: async ({ commit }) => {
            const { data } = await axios.get('/api/users');
            commit('fetchUsers', data.users)   
        },
        toggleDialogVisible: ({ commit }) => {
            commit('toggleDialogVisible');
        }
    }
})