<script setup>
import { onMounted, ref } from 'vue'
import iconXmark from '@/assets/icon/xmark.svg'
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
    required: true,
  },
  placeholder: {
    type: String,
    default: '輸入地址',
    required: false,
  },
})
const emit = defineEmits(['update:modelValue', 'submit'])

const inputRef = ref(null)
const selectedPlace = ref({})

const initMap = async () => {
  const { Autocomplete } = await google.maps.importLibrary('places')

  const autocomplete = new Autocomplete(inputRef.value)

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()
    if (!place || !place.geometry) {
      return
    }
    selectedPlace.value = {
      name: place.name,
      address: place.formatted_address,
      location: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      },
    }

    emit('update:modelValue', selectedPlace.value.address)
    emit('submit', selectedPlace.value)
  })
}

// const clearInput = () => {
//   selectedPlace.value = {}
//   emit('update:modelValue', '')
// }

onMounted(() => {
  initMap()
})

defineExpose({
  selectedPlace,
})
</script>
<template>
  <div class="flex h-12 items-center overflow-hidden rounded-[10px] bg-grey">
    <div class="relative h-full flex-auto">
      <input
        ref="inputRef"
        type="text"
        class="h-full w-full bg-grey pl-2 pr-8 caret-primary-500 placeholder:text-grey-400 focus:outline-none"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <!-- <img
        v-if="modelValue.length"
        alt="magnifier"
        class="absolute right-2 top-1/2 h-4 -translate-y-1/2 cursor-pointer"
        :src="iconXmark"
        @click="clearInput"
      /> -->
    </div>
  </div>
</template>
