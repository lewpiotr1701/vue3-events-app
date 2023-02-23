import store from '@/store/index.js'

export default function isLoggedIn() {
  return store.getters.getUser ? true : false
}