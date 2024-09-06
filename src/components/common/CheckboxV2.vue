<script setup>
import { watch, ref } from 'vue'
const props = defineProps({
  modelValue: {
    type: [Array, Boolean, String],
    default: false,
    required: true
  },
  value: {
    type: null,
    default: '',
    required: false
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false
  },
  trueValue: {
    type: null,
    default: true,
    required: false
  },
  falseValue: {
    type: null,
    default: false,
    required: false
  }
})
const emit = defineEmits(['update:modelValue'])
const inputRef = ref(null)
const inputData = ref(props.modelValue)

watch(() => props.modelValue, () => {
  inputData.value = props.modelValue
})

watch(inputData, (newValue) => {
  emit('update:modelValue', newValue)
})

</script>
<template>
  <label class="mx-1 inline-flex cursor-pointer select-none items-center gap-1">
    <input 
      v-model="inputData"
      :value="value"
      type="checkbox"
      class="custom-checkbox"
      :disabled="disabled"
      :true-value="trueValue"
      :false-value="falseValue"
    >
    <span><slot /></span>
  </label>
</template>
<style lang="scss" scoped>
.custom-checkbox {
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--white);
  border: 2px solid var(--grey-500);
  border-radius: 0.15rem;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
}
.custom-checkbox:checked {
  background-color: var(--primary-500);
  border-color: var(--primary-500);
}
.custom-checkbox:checked::before {
  content: '✔';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
  color: var(--white);
}
.custom-checkbox:disabled {
  background-color: var(--grey-100);
  border-color: var(--grey-100);
}
</style>
