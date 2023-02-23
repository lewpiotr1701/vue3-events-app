<template>
  <h1>Create an event</h1>

  <div class="form-container">

    <form @submit.prevent="onSubmit">

      <BaseSelect :options="categories" v-model="event.category" label="Select a category: " />

      <fieldset>
        <legend>
          <h3>Name & describe your event</h3>
        </legend>
        <BaseInput v-model="event.title" label="Title" type="text" />
        <BaseInput v-model="event.description" label="Description" type="text" />
      </fieldset>

      <fieldset>
        <legend>
          <h3>Where is your event?</h3>
        </legend>
        <BaseInput v-model="event.location" label="Location" type="text" />
      </fieldset>

      <fieldset>
        <legend>
          <h3>When is your event?</h3>
        </legend>
        <BaseInput v-model="event.date" label="Date" type="text" />
        <BaseInput v-model="event.time" label="Time" type="text" />
      </fieldset>

      <button type="submit">Submit</button>
    </form>

  </div>
</template>

<script>
import UniqueID from '@/services/UniqueID'

export default {
  inject: ["GStore"],
  data() {
    return {
      categories: [
        "sustainability",
        "nature",
        "animal welfare",
        "housing",
        "education",
        "food",
        "community"
      ],
      event: {
        id: "",
        category: "",
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        organizer: ""
      }
    };
  },
  methods: {
    onSubmit() {
      const event = {
        ...this.event,
        id: UniqueID(),
        organizer: this.$store.state.user
      };
      this.$store.dispatch("createEvent", event)
        .then(() => {
          this.showMessage();
          this.$router.push({
            name: "EventDetails",
            params: { id: event.id }
          });
        })
        .catch(() => {
          this.$router.push({ name: "NetworkError" });
        });
    },
    showMessage() {
      this.GStore.flashMessage =
        "You are successfully added a new event " + this.event.title;
      setTimeout(() => {
        this.GStore.flashMessage = "";
      }, 3000);
    }
  },
}
</script>

<style>
fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}

legend {
  font-size: 28px;
  font-weight: 700;
  margin-top: 20px;
}
</style>