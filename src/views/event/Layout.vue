<template>
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>

    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>&nbsp;|&nbsp;
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>&nbsp;|&nbsp;
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>

    <RouterView :event="GStore.event" />
  </div>
</template>

<script>
export default {
  name: 'EventLayout',
  inject: ['GStore']
}
</script>
