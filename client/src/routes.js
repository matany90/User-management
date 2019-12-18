import UserList from './components/UserList.vue';
import UserEdit from './components/UserEdit';

export const routes = [
    { path: '/', component: UserList },
    { path: '/editUser', component: UserEdit }
]