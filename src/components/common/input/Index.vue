<script setup>
const props = defineProps({
  modelValue: {
    type: [Object, String, Number],
    default: null,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
    required: false,
  },
  placeholder: {
    type: String,
    default: '',
    required: false,
  },
})
const emit = defineEmits(['update:modelValue', 'submit'])
</script>
<template>
  <input
    class="h-12 w-full rounded-[10px] bg-grey px-2 caret-primary-500 placeholder:text-grey-400 focus:outline-none"
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    @input="event => emit('update:modelValue', event.target.value)"
  />
</template>
