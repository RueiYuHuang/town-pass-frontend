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
const selectedPlace = ref({
  country: '',
  city: '',
  district: '',
  address: '',
  location: {
    lat: 0,
    lng: 0,
  },
})

const initMap = async () => {
  const { Autocomplete } = await google.maps.importLibrary('places')

  const autocomplete = new Autocomplete(inputRef.value)

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()
    if (!place || !place.geometry) {
      return
    }

    // 提取地址組件
    const addressComponents = place.address_components
    const components = {
      country: '',
      city: '',
      district: '',
    }

    // 遍歷地址組件，將它們分類
    addressComponents.forEach((component) => {
      const types = component.types
      if (types.includes('country')) {
        components.country = component.long_name
      }
      if (types.includes('administrative_area_level_1') || types.includes('locality')) {
        components.city = component.long_name
      }
      if (types.includes('administrative_area_level_2') || types.includes('sublocality') || types.includes('neighborhood')) {
        components.district = component.long_name
      }
    })

    selectedPlace.value = {
      ...components,
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
