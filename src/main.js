import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'

import GStore from './store/GStore.js'
import 'nprogress/nprogress.css'


createApp(App)
  .use(router)
  .use(store)
  .provide('GStore', GStore) // Make this object available for components in our app to use (inject)
  .mount('#app')
