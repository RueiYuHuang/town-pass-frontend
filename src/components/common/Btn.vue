<script setup>
import { computed } from 'vue'
const props = defineProps({
  type: {
    type: String,
    default: '',
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
})

const btnstyle = computed(() => {
  switch (props.type) {
    case 'primary':
      return ['bg-primary-500', 'text-white', 'hover:bg-primary-600', 'active:bg-primary-500']
    case 'secondary':
      return ['border', 'bg-white', 'text-primary-500', 'hover:bg-primary-50', 'active:bg-white']
    case 'danger':
      return ['bg-red-500', 'text-white', 'hover:bg-red-300', 'active:bg-red-500']
    case 'warning':
      return ['bg-orange-500', 'text-white', 'hover:bg-orange-300', 'active:bg-orange-500']
    default:
      return ['bg-primary-500', 'text-white', 'hover:bg-primary-600', 'cursor-not-allowed', 'active:bg-primary-500']
  }
})
</script>
<template>
  <button
    class="h-12 cursor-pointer rounded-[10px] px-3 disabled:cursor-not-allowed disabled:bg-grey-100 disabled:text-grey-500"
    :class="btnstyle"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
