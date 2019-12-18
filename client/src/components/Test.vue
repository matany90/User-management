<template>
    <button @click="addUser">Button</button>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    methods: {
        ...mapMutations([
            'addUser'
        ])
    }
}
</script>

