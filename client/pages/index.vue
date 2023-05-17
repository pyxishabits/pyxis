<template>
    <div>
        <h1>Home Page</h1>
        {{ variable }}
    </div>
</template>

<script>
import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            variable: 3
        }
    },
    mounted() {
        axios.post('http://localhost:8000/accounts/auth/', {
            username: 'dan',
            password: '1'
        })
        .then(res => res.data.token)
        .then(token => {
            console.log(token)
            axios.get('http://localhost:8000/api/tasks/1/', {
                headers: {'Authorization': `Token ${token}`}
            }).then(res => console.log(res))
        }).catch(err => console.error(err))
    }
})
</script>

<style>
</style>