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

        // If the event does not exist, load 404
        if (err.response && err.response.status === 404) {
          this.$router.push({
            name: '404Resource',
            params: { resource: 'event' }
          })
          // Otherwise assume network error
        } else {
          this.$router.push({ name: 'NetworkError' })
        }
      })
  }
}
</script>
