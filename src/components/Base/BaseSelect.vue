<template>
  <label :for="uuid" v-if="label">{{ label }}</label>
  <select :value="modelValue" class="field" :id="uuid"
    v-bind="{ ...$attrs, onChange: ($event) => { $emit('update:modelValue', $event.target.value) } }">
    <option v-for="option in options" :value="option" :key="option" :selected="option === modelValue">
      {{ option }}
    </option>
  </select>
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
    options: {
      type: Array,
      required: true
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
