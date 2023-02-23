<template>
  <label :for="uuid" v-if="label">{{ label }}</label>
  <input v-bind="$attrs" :placeholder="label" class="field" :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)" :id="uuid" :aria-describedby="error ? `${uuid}-error` : null"
    :aria-invalid="error ? true : false">

  <p v-if="error" class="errorMessage" :id="`${uuid}-error`" aria-live="assertive">
    {{ error }}
  </p>
</template>

<script>
import UniqueID from '@/services/UniqueID'

export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    error: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup() {
    const uuid = UniqueID()
    return {
      uuid
    }
  }
}
</script>