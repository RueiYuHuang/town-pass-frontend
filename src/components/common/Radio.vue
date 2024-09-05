<script setup>
import { watch, ref } from 'vue'
const props = defineProps({
  modelValue: {
    type: [Object, String, Number],
    default: null,
    required: true,
  },
  value: {
    type: [Object, String, Number],
    default: null,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])

const inputData = ref(props.modelValue)
watch(
  () => props.modelValue,
  (newValue) => {
    inputData.value = newValue
  },
)
watch(inputData, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>
<template>
  <label class="mx-1 inline-flex cursor-pointer select-none items-center gap-1">
    <input v-model="inputData" :value="value" type="radio" class="custom-radio" />
    <span><slot /></span>
  </label>
</template>
<style lang="scss" scoped>
.custom-radio {
  appearance: none;
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid var(--bg-grey-500);
  border-radius: 50%;
  position: relative;
}
/* 選中的外圈顏色 */
.custom-radio:checked {
  border-color: var(--bg-primary-500);
}
/* 選中的內圈顏色 */
.custom-radio:checked::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.6rem;
  height: 0.6rem;
  background-color: var(--bg-primary-500);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
</style>
