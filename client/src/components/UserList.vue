<template>
<div>
    <ul>
        <li v-for="(user, index) in users" v-bind:key="index">
            {{user}}
        </li>
    </ul>
    <app-test></app-test>
</div>
</template>

<script>
import Test from './Test.vue';
import { mapGetters } from 'vuex';

export default {
    components: {
        'app-test': Test
    },
    computed: {...mapGetters([
        'users'
     ])
    }
}
</script>

