<template>
    <div>
        <h1>{{ event.title }}</h1>
        <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
        <p>{{ event.description }}</p>
    </div>
</template>

<script>
export default {
    name: 'EventDetails',
    data() {
        return {
            event: null
        }
    },
    created() {

    }
}
</script>