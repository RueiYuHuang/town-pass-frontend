<script setup>
import { watch, ref } from 'vue'
const props = defineProps({
  modelValue: {
    type: [Object, String, Number, Boolean],
    default: '',
    required: true,
  },
  value: {
    type: [Object, String, Number, Boolean],
    default: '',
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false
  }
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
    <input 
      v-model="inputData" 
      :value="value" 
      type="radio"
      class="custom-radio" 
      :disabled="disabled"
    >
    <span><slot /></span>
  </label>
</template>
<style lang="scss" scoped>
.custom-radio {
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--white);
  border: 2px solid var(--grey-500);
  border-radius: 50%;
  position: relative;
}
/* 選中的外圈顏色 */
.custom-radio:checked {
  border-color: var(--primary-500);
}
/* 選中的內圈顏色 */
.custom-radio:checked::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.8rem;
  height: 0.8rem;
  background-color: var(--primary-500);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
.custom-radio:disabled {
  border-color: var(--grey-100);
  background-color: var(--grey-100);
}
.custom-radio:disabled::before {
  background-color: var(--white);
}
</style>
