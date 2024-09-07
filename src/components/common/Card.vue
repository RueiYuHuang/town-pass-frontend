<script setup>
import { ref } from 'vue'
const props = defineProps({
  img: {
    type: String,
    default: '',
    required: false,
  },
})
const pages= ref({
  page: "1"
})
const baseUrl = import.meta.env.VITE_API_BASE_URL
const imgSrc = ref(`${baseUrl}${props.img}`)
</script>
<template>
  <div class="rounded-[10px] bg-grey flex flex-col overflow-hidden">
    <div>
      <div class="aspect-video">
        <img class="w-full h-full object-cover" :src="imgSrc" />
      </div>
    </div>
    <div class="multi-line-ellipsis grow m-2">
      <slot />
    </div>
    <div class="flex justify-center items-center">
      <slot name="action" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.multi-line-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 顯示的行數 */
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
}
</style>
