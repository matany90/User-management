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
        phone: '',
        error: ''
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
        fetchUsers: (state, users) => {
            state.users = users;
        },
        toggleDialogVisible: (state) => {
            state.isDialogVisible = !state.isDialogVisible;
        },
        setName: (state, name) => { state.name = name; },
        setEmail: (state, email) => { state.email = email; },
        setPhone: (state, phone) => { state.phone = phone; },
        setId: (state, id) => { state.id = id; },
        setError: (state, error) => ( state.error = error )
    },
    actions: {
        addUser: async ({ commit }, payload) => {
            const res = await axios.post('/api/users/addUser', { user: payload })
            if (res) {
                commit('addUser', payload);
                commit('toggleDialogVisible');
            }
        },
        updateUser: async ({ commit, state }, payload) => {
            const { data } = await axios.post('/api/users/updateUser', { user: payload })
            if (data.isSuccess) {
                const users = state.users.map(user => user.id === data.user.id ? data.user : user);
                commit('fetchUsers', users)
                commit('toggleDialogVisible');
            }
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
        deleteUser: async ({ commit, state }, payload) => {
            const { data: { user, isSuccess, error }} = await axios.post('/api/users/deleteUser', { user: payload })
            if (isSuccess) {
                //delete user locally - replace delete element with undefined and than delete undefined from array
                const users = state.users.map(el => el.id === user.id ? undefined : el).filter(el => el !== undefined);
                commit('fetchUsers', users);
            }
            else {
                commit('setError', error);
            }
        }
    }
})