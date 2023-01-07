import { createStore } from 'vuex'
import EventService from '@/services/EventService.js'

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
        .catch(err => {
          console.log(err)
        })
    },
    async fetchEvents({ commit, state }, currentPage) {
      const perPage = state.perPage
      console.log('before fetchEvents');
      await EventService.getEvents(perPage, currentPage)
        .then(res => {
          console.log('after fetchEvents')
          commit('SET_EVENTS', res.data)
          commit('SET_TOTAL_EVENTS', res.headers['x-total-count'])
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {}
})