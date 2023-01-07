import { createStore, storeKey } from 'vuex'
import EventService from '@/services/EventService.js'
import router from '@/router'

export default createStore({
  state: {
    user: 'Kapitan Dupa',
    perPage: 2,
    totalEvents: 0,
    events: []
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_TOTAL_EVENTS(state, totalEvents) {
      state.totalEvents = totalEvents
    }
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
        })
        .catch(() => {
          router.push({ name: 'NetworkError' })
        })
    },
    async fetchEvents({ commit, state }, currentPage) {
      const perPage = state.perPage

      await EventService.getEvents(perPage, currentPage)
        .then(res => {
          if (res.data.length !== 0) {
            commit('SET_EVENTS', res.data)
            commit('SET_TOTAL_EVENTS', res.headers['x-total-count'])
          } else {
            router.push({ name: '404Resource', params: { resource: 'page' } })
          }
        })
        .catch(() => {
          router.push({ name: 'NetworkError' })
        })
    }
  },
  modules: {}
})