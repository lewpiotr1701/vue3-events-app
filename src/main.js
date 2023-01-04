import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Create a global (reactive) object to share across multiple components
const GStore = reactive({ flashMessage: '' })

createApp(App)
    .use(store)
    .use(router)
    .provide('GStore', GStore) // Make this object available for components in our app to use (inject)
    .mount('#app')
