<script setup>
import { watch, ref } from 'vue'
const props = defineProps({
  doSomeThing: {
    type: Function,
    default: () => {}, // 默认值为空函数
    required: true,
  },
  reject: {
    type: Function,
    default: () => {}, // 默认值为空函数
    required: false,
  },
})

</script>
<template>
  <div class="flex">
    <button class="reject-btn btn-style"  @click="props.reject()">返回</button>
    <div class="mx-2"></div>
    <button class="do-some-thing-btn btn-style"  @click="props.doSomeThing()">確認</button>
  </div>

</template>
<style lang="scss" scoped>
    .btn-style {
        font-size: 24px;
        border-radius: 15px;
        padding: 5px;
        cursor: pointer;
    }
    .reject-btn {
        width: 30%;
        border: 1px solid rgb(90 180 197);
        color: rgb(90 180 197);
        transition: .5s;
        &:hover {
            background-color: rgb(90 180 197);
            color: white;
        }
    }
    .do-some-thing-btn {
        width: 70%;
        background-color: rgb(90 180 197);;
        border: 1px solid rgb(90 180 197);
        color: white;
        transition: .5s;
        &:hover {
            background-color: white;
            color: rgb(90 180 197);
        }
    }
</style>
