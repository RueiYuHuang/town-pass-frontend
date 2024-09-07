<script setup>
const emit = defineEmits(['submit'])
import CommonBtn from '@/components/common/Btn.vue'
import iconXmark from '@/assets/icon/xmark2.svg'
const handleclick = () => {
  emit('submit')
} 
</script>
<template>
  <div class="flex items-center relative h-12">
    <div class="grow text-white text-center">
      <slot />
    </div>
    <CommonBtn class="absolute right-0" @click="handleclick" >
      <img :src="iconXmark">
    </CommonBtn>
  </div>
</template>
<style lang="scss" scoped>
</style>
