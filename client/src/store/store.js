import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        users: [],
        isDialogVisible: false,
        id: '',
        name: '',
        email: '',
        phone: ''
    },
    getters: {
        users: ({ users }) => ( users ),
        isDialogVisible: ({ isDialogVisible }) => ( isDialogVisible ),
        id: ({ id }) => ( id )
        // name: ({ name }) => ( name ),
        // email: ({ email }) => ( email ),
        // phone: ({ phone }) => ( phone ),
    },
    mutations: {
        addUser: (state, user) => {
            state.users.push(user)
        },
        deleteUser: (state, user) => {
            //console.log(user)
            const users = state.users.map(el => el.id === user.id ? null : el );
            //console.log(users);
            state.users = users;
        },
        updateUser: (state, user) => {
            console.log(user)
            console.log(state)
            console.log('done!')
            //const users = state.users.map(el => el.id === user.id ? null : el );
            //console.log(users);
            //state.users = users;
        },
        fetchUsers: (state, users) => {
            state.users = users;
        },
        toggleDialogVisible: (state) => {
            state.isDialogVisible = !state.isDialogVisible;
        },
        setName: (state, name) => { state.name = name; },
        setEmail: (state, email) => { state.email = email; },
        setPhone: (state, phone) => { state.phone = phone; },
        setId: (state, id) => { state.id = id; }
    },
    actions: {
        addUser: async ({ commit }, payload) => {
            const res = await axios.post('/api/users/addUser', { user: payload })
            if (res) {
                commit('addUser', payload);
                commit('toggleDialogVisible');
            }
        },
        updateUser: async ({ commit }, payload) => {
            const res = await axios.post('/api/users/updateUser', { user: payload })
            console.log(res);
            commit('updateUser', payload)
        },
        fetchUsers: async ({ commit }) => {
            const res = await axios.get('/api/users');
            if (res) {
                commit('fetchUsers', res.data.users) 
            }  
        },
        toggleDialogVisible: ({ commit }, payload) => {
            commit('setName', payload ? payload.name : '')
            commit('setEmail', payload ? payload.email : '')
            commit('setPhone', payload ? payload.phone: '')
            commit('setId', payload ? payload.id: '')
            commit('toggleDialogVisible');
        },
        deleteUser: async ({ commit }, payload) => {
            const res = await axios.post('/api/users/deleteUser', { user: payload })
            if (res) {
                commit('deleteUser', res.data.user);
            }
        }
    }
})