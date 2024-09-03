<script setup>
import { watch, ref, provide } from 'vue'
const props = defineProps({
  modelValue: {
    type: [Object, String, Number],
    default: null,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue', 'submit'])

const activeValue = ref(props.modelValue)
const tabRowRef = ref(null)
const indicatorStyle = ref({})

watch(
  () => props.modelValue,
  (newValue) => {
    activeValue.value = newValue
  },
)

const updateIndicator = (element) => {
  const parentWidth = tabRowRef.value.offsetWidth
  const widthPercentage = (element.value.offsetWidth / parentWidth) * 100
  const leftPercentage = (element.value.offsetLeft / parentWidth) * 100
  indicatorStyle.value = {
    width: `${widthPercentage}%`,
    left: `${leftPercentage}%`,
  }
}

const setActiveValue = (data) => {
  emit('update:modelValue', data)
  emit('submit', data)
}

provide('tabRow', { activeValue, setActiveValue, updateIndicator })
</script>
<template>
  <div class="relative overflow-hidden border-b border-grey-400">
    <div ref="tabRowRef" class="flex h-12 items-center justify-center">
      <slot />
    </div>
    <div
      class="z- absolute bottom-0 w-full rounded-full border-2 border-primary-500 transition"
      :style="indicatorStyle"
    />
  </div>
</template>
<style lang="scss" scoped>
.transition {
  transition: left 0.5s;
}
</style>
