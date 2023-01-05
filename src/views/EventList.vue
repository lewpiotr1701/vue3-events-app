<template>
  <div class="events">
    <h1>Events</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link id="page-prev" :to="{ name: 'EventList', query: { page: page - 1 } }" rel="prev"
        v-if="page != 1">&#60; Previous</router-link>

      <router-link id="page-next" :to="{ name: 'EventList', query: { page: page + 1 } }" rel="next"
        v-if="hasNextPage">Next &#62;</router-link>

    </div>

    <ul class="pagination__numbers">
      <li class="pagination__item" v-for="n in totalPages" :key="n" :class="[n === this.page ? 'current-page' : '']">
        <router-link :to="{ name: 'EventList', query: { page: n } }">
          {{ n }}&nbsp;
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  props: ['page'], // prop received from the router/index.js using Props Function Mode
  data() {
    return {
      events: null,
      totalEvents: 0,
    }
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    EventService.getEvents(2, parseInt(routeTo.query.page) || 1) // pass 2 events per page and current page
      .then(res => {
        // Continue routing and once component (comp) is loaded, set these values
        next(comp => {
          comp.events = res.data
          comp.totalEvents = res.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  beforeRouteUpdate(routeTo) {
    // Return the promise so Vue Router knows to wait on the API call
    // before loading the page
    return EventService.getEvents(2, parseInt(routeTo.query.page) || 1) // pass 2 events per page and current page
      .then(res => {
        this.events = res.data
        this.totalEvents = res.headers['x-total-count']
      })
      .catch(() => {
        return { name: 'NetworkError' }
      })
  },
  computed: {
    hasNextPage() {
      // Calculate total pages
      const totalPages = Math.ceil(this.totalEvents / 2)
      // Check if the current page is less than the total pages
      return this.page < totalPages
    },
    totalPages() {
      return Math.ceil(this.totalEvents / 2)
    }
  }
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  width: 290px;
  display: flex;

}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}

.pagination__numbers {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.pagination__numbers a {
  text-decoration: none;
  color: #2c3e50;
}

.pagination__item.current-page a {
  color: #42b983;
}

.pagination__item {
  display: inline;
}
</style>
