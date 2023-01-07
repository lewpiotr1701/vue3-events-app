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
import store from '@/store/index.js'

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  props: ['page'], // prop received from the router/index.js using Props Function Mode
  async beforeRouteEnter(routeTo, routeFrom) {
    await store.dispatch('fetchEvents', parseInt(routeTo.query.page) || 1)
  },
  async beforeRouteUpdate(routeTo) {
    await this.$store.dispatch('fetchEvents', parseInt(routeTo.query.page) || 1)
  },
  computed: {
    events() {
      return this.$store.state.events
    },
    totalEvents() {
      return this.$store.state.totalEvents
    },
    hasNextPage() {
      const totalEvents = this.totalEvents
      const totalPages = Math.ceil(totalEvents / 2)
      // Check if the current page is less than the total pages
      return this.page < totalPages
    },
    totalPages() {
      const totalEvents = this.totalEvents
      return Math.ceil(totalEvents / 2)
    },
    perPage() {
      return this.$store.state.perPage
    },
    isError() {
      return this.$store.state.isError
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
