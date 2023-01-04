<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>

        <div id="nav">
            <router-link :to="{ name: 'EventDetails', params: { id } }">Details</router-link>&nbsp;|&nbsp;
            <router-link :to="{ name: 'EventRegister', params: { id } }">Register</router-link>&nbsp;|&nbsp;
            <router-link :to="{ name: 'EventEdit', params: { id } }">Edit</router-link>
        </div>

        <RouterView :event="event" />
    </div>
</template>

<script>
import EventService from '@/services/EventService.js'

export default {
    name: 'EventLayout',
    props: ['id'],
    data() {
        return {
            event: null,
        }
    },
    created() {
        EventService.getEvent(this.id)
            .then(res => {
                this.event = res.data
            })
            .catch(err => {
                console.log(err)

                this.$router.push({
                    name: '404Resource',
                    params: { resource: 'event' }
                })
            })
    }
}
</script>
