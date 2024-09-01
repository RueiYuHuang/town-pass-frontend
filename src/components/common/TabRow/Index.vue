<script setup>
import { watch, ref, provide } from 'vue'
const props = defineProps({
  modelValue: { type: [Object, String, Number], default: null, required: true },
})
const emit = defineEmits(['update:modelValue', 'submit'])

const activeBtn = ref(props.modelValue)
const setActiveBtn = (data) => {
  activeBtn.value = data
}
watch(activeBtn, (newValue) => {
  emit('update:modelValue', newValue)
  emit('submit', newValue)
})

provide('activeItem', { activeBtn, setActiveBtn })
</script>
<template>
  <div class="flex h-12 items-center justify-center gap-2 border-b border-grey-400 px-2">
    <slot />
  </div>
</template>
