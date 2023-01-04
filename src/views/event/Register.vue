<template>
    <p>Register for the event</p>
    <button @click="register">Register Me</button>
</template>

<script>
export default {
    name: 'EventRegister',
    props: ['event'],
    methods: {
        register() {
            // Call to API
            // If registered then redirect to event details

            this.$router.push({
                name: 'EventDetails',
                params: { id: this.event.id }
            })
        }
    }
}
</script>
