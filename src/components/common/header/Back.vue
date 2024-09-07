<script setup>
const emit = defineEmits(['submit'])
import CommonBtn from '@/components/common/Btn.vue'
import backXmark from '@/assets/icon/back.svg'
const handleclick = () => {
  emit('submit')
}
</script>
<template>
  <div class="flex items-center relative h-12">
    <CommonBtn class="absolute left-0" @click="handleclick" >
      <img :src="backXmark">
    </CommonBtn>
    <div class="grow text-white text-center">
      <slot />
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
