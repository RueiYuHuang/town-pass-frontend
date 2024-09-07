<script setup>
import { ref } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: '',
    required: false,
  },
  list: {
    type: Array,
    default: '',
    required: false,
  },
})
const showList = ref(false)
const setShowList = () => {
  showList.value = !showList.value
}
</script>
<template>
  <div class="relative">
    <div class="list-header" @click="setShowList()">
      {{ title }}
      <div class="transition-time" :class="{ 'arrow-up': showList }">
        <img src="/black-arrow.png" height="20px" />
      </div>
    </div>
    <div class="list-content" :class="{ 'show-list': showList }">
      <div v-for="item in 10" :key="item" class="list-style mb-3">
        {{ 123 }}
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.list-header {
  user-select: none;
  cursor: pointer;
  width: 100%;
  background: white;
  box-shadow: 1px 1px 1px 1px black;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    height: 16px;
  }
  .transition-time {
    transition: 0.5s;
  }
  .arrow-up {
    transform: rotate(180deg);
  }
}
.list-content {
  margin-top: 15px;
  width: 100%;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  padding-left: 3rem;
  transition: 0.5s;
  position: relative;
  &::before {
    position: absolute;
    content: '';
    background-color: rgb(90 180 197);
    height: calc(100% - 10px);
    top: 0;
    width: 5px;
    left: 24px;
  }
}
.show-list {
  padding-top: 1rem;
  max-height: 100%;
  opacity: 1;
}
.list-style {
  position: relative;
  &::before {
    content: '';
    width: 12px;
    height: 4px;
    background-color: rgb(90 180 197);
    position: absolute;
    left: -20px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
