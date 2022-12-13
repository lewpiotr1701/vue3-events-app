<template>
  <div>
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'

export default {
  name: 'EventDetails',
  data() {
    return {
      event: null,
      id: 123
    }
  },
  created() {
    EventService.getEvent(this.id)
      .then(res => {
        this.event = res.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
