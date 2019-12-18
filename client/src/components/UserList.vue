<template>
<div>
    <ul>
        <li v-for="(user, index) in users" v-bind:key="index">
            {{user}}
        </li>
    </ul>
        <button @click="addUser('shiri')">Button</button>
</div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';

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

