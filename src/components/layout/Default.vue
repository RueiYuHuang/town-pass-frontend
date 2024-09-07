<script setup>
</script>
<template>
  <div>
    <div class="fixed w-full top-0 bg-primary-500 z-50">
      <slot name="header" />
    </div>
    <div class="h-12" />
    <div>
      <slot />
    </div>
    <div class="flex fixed w-full bottom-0 justify-center items-center bg-grey-50 z-50">
      <slot name="action" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
