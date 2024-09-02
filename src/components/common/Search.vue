<script setup>
import iconMagnifier from '@/assets/icon/magnifier.svg'
import iconXmark from '@/assets/icon/xmark.svg'
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
    required: false,
  },
})
const emit = defineEmits(['update:modelValue', 'submit'])

const handleSubmit = () => {
  emit('submit', props.modelValue)
}

const clearInput = () => {
  emit('update:modelValue', '')
}
</script>
<template>
  <div class="flex h-12 items-center overflow-hidden rounded-[10px] bg-grey">
    <div class="relative h-full flex-auto">
      <input
        type="text"
        class="h-full w-full bg-grey pl-2 pr-8 caret-primary-500 placeholder:text-grey-400 focus:outline-none"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <img
        v-if="modelValue.length"
        alt="magnifier"
        class="absolute right-2 top-1/2 h-4 -translate-y-1/2 cursor-pointer"
        :src="iconXmark"
        @click="clearInput"
      />
    </div>
    <div
      class="flex aspect-square h-full cursor-pointer items-center justify-center rounded-[10px] bg-primary-500 active:bg-primary-600"
      @click="handleSubmit"
    >
      <img alt="magnifier" class="h-7" :src="iconMagnifier" />
    </div>
  </div>
</template>
