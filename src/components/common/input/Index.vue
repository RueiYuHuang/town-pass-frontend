<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'text',
    required: false,
  },
})
</script>
<template>
  <input
    class="h-12 w-full rounded-[10px] bg-grey px-2 caret-primary-500 placeholder:text-grey-400 focus:outline-none"
    :type="type"
  />
</template>
