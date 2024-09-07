<script setup>
defineProps({

})
</script>
<template>
  <div class="fixed flex justify-center items-center w-screen h-screen z-50 bg-loading">
    <img src="/loading.gif" class="h-20 w-20 object-cover">
  </div>
</template>
<style lang="scss" scoped>
.bg-loading {
  background-color: rgba(0, 0, 0, .3);
}
</style>