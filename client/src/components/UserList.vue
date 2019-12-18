<template>
<div>
    <ul>
        <li v-for="(user, index) in users" v-bind:key="index">
            {{user}}
        </li>
    </ul>
        <button @click="addUser('shiri')">Button</button>
        <a href="/api/users">test</a>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    created() {
        this.fetchUsers()
    },
    computed: {
        ...mapGetters([
        'users'
     ])
    },
    methods: {
        ...mapActions([
         'addUser',
         'fetchUsers'
     ])
    }
}
</script>

