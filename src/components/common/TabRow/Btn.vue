<script setup>
import { inject } from 'vue'
const props = defineProps({
  value: {
    type: [Object, String, Number],
    default: null,
    required: true,
  },
})
const { activeBtn, setActiveBtn } = inject('activeItem')
</script>
<template>
  <div class="relative h-full w-full">
    <button
      class="h-full w-full"
      :class="{ 'text-primary-500': activeBtn === value }"
      @click="
        () => {
          setActiveBtn(value)
        }
      "
    >
      <slot />
    </button>
    <div
      class="absolute bottom-0 w-full rounded-full border-2 border-primary-500 border-opacity-0"
      :class="{ 'border-opacity-100': activeBtn === value }"
    />
  </div>
</template>
