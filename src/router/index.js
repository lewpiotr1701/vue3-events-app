import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import AboutView from '../views/AboutView.vue'
import NotFound from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'
import NProgress from 'nprogress'
import EventService from '@/services/EventService.js'

import GStore from '@/store/GStore.js'
import EventCreate from '@/views/EventCreate.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: route => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/event/create',
    name: 'EventCreate',
    component: EventCreate
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    beforeEnter: to => {
      return EventService.getEvent(to.params.id)
        .then(res => {
          GStore.event = res.data
        })
        .catch(err => {
          console.log(err)

          // If the event does not exist, load 404
          if (err.response && err.response.status === 404) {
            return {
              name: '404Resource',
              params: { resource: 'event' }
            }
            // Otherwise assume network error
          } else {
            return { name: 'NetworkError' }
          }
        })
    },
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
        meta: { requireAuth: true }
      }
    ]
  },
  {
    path: '/event/:afterEvent(.*)',
    redirect: to => {
      return { path: '/events/' + to.params.afterEvent }
    }
  },
  {
    path: '/about-us',
    name: 'About',
    component: AboutView,
    alias: '/about'
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Start the progress bar before navigation
router.beforeEach((to, from) => {
  NProgress.start()

  const notAuthorized = true
  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage =
      'Sorry, you are not authorized to view this page'

    setTimeout(() => {
      GStore.flashMessage = ''
    }, 3000);

    if (from.href) {  // If the navigation came from a prevoius page
      return false  // Cancel the navigation
    } else {  // Must be navigationg directly
      return { path: '/' }  // Pushnavigation to the root route
    }

  }
})

// Finish the progress bar after navigation
router.afterEach(() => {
  NProgress.done()
})

export default router
