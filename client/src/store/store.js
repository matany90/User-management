import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        users: null,
        isDialogVisible: false,
        id: '',
        name: '',
        email: '',
        phone: '',
        error: '',
        isLoading: true
    },
    getters: {
        users: ({ users }) => ( users ),
        isDialogVisible: ({ isDialogVisible }) => ( isDialogVisible ),
        id: ({ id }) => ( id ),
        name: ({ name }) => ( name ),
        email: ({ email }) => ( email ),
        phone: ({ phone }) => ( phone ),
        isLoading: ({ isLoading }) => ( isLoading )
    },
    mutations: {
        addUser: (state, user) => state.users.push(user),
        fetchUsers: (state, users) => state.users = users,
        toggleDialogVisible: (state) => state.isDialogVisible = !state.isDialogVisible,
        setName: (state, name) => state.name = name,
        setEmail: (state, email) => state.email = email,
        setPhone: (state, phone) => state.phone = phone,
        setId: (state, id) => state.id = id,
        setError: (state, error) => state.error = error,
        setIsLoading: (state, isLoading) => state.isLoading = isLoading
    },
    actions: {
        //ADD USER - post req to API
        addUser: async ({ commit }, payload) => {
            const { data } = await axios.post('/api/users/addUser', { user: payload })
            if (data.isSuccess) {
                commit('addUser', data.user);
                commit('toggleDialogVisible');
            }
        },
        //UPDATE USER - post req to API
        updateUser: async ({ commit, state }, payload) => {
            const { data } = await axios.post('/api/users/updateUser', { user: payload })
            if (data.isSuccess) {
                const users = state.users.map(user => user.id === data.user.id ? data.user : user);
                commit('fetchUsers', users)
                commit('toggleDialogVisible');
            }
        },
         //FETCH USERS FROM FIRESTORE - get req to API
        fetchUsers: async ({ commit }) => {
            const { data } = await axios.get('/api/users');            
            if (data.isSuccess) {
                commit('fetchUsers', data.users)
            }  
            commit('setIsLoading',false)
        },
        //TOGGELE FORM VISABILITY - reset fields if ADD USER FORM, else it's UPDATE USER 
        toggleDialogVisible: ({ commit }, payload) => {
            commit('setName', payload ? payload.name : '')
            commit('setEmail', payload ? payload.email : '')
            commit('setPhone', payload ? payload.phone: '')
            commit('setId', payload ? payload.id: '')
            commit('toggleDialogVisible');
        },
        //DELETE USER - post req to API
        deleteUser: async ({ commit, state }, payload) => {
            const { data} = await axios.post('/api/users/deleteUser', { user: payload })
            if (data.isSuccess) {
                //delete user locally - replace deleted user with undefined and than delete undefineds from array
                const users = state.users.map(el => el.id === data.user.id ? undefined : el).filter(el => el !== undefined);
                commit('fetchUsers', users);
            }
        }
    }
})