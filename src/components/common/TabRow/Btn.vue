<script setup>
import { inject, ref, watch, onMounted } from 'vue'
const props = defineProps({
  value: {
    type: [Object, String, Number],
    default: null,
    required: true,
  },
})
const { activeValue, setActiveValue, updateIndicator } = inject('tabRow')

const btnRef = ref(null)

const handleClick = () => {
  setActiveValue(props.value)
}

onMounted(() => {
  watch(
    activeValue,
    (newValue) => {
      if (props.value === newValue) {
        updateIndicator(btnRef)
      }
    },
    { immediate: true },
  )
})
</script>
<template>
  <button
    ref="btnRef"
    class="h-full w-full"
    :class="{ 'text-primary-500': activeValue === value }"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
