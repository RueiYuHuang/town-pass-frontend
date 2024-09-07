<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCardStore } from '../stores/useCardStore.js'
import { transDate } from '@/utils/transData'
// layout
import LayoutDefault from '@/components/layout/Default.vue'
import CommonHeaderBack from '@/components/common/header/Back.vue'

import GoogleMap from '@/components/common/google/Map.vue'

import CommonBtn from '@/components/common/Btn.vue'

const cardSrore = useCardStore()
const { cardData } = storeToRefs(cardSrore)

console.log('cardData:', cardData.value)
const router = useRouter()
const linkBack = () => {
  router.back()
}
const baseUrl = import.meta.env.VITE_API_BASE_URL
const data = ref({
  location: '',
  title: '',
  content: '',
  img: '',
})
const selectImgSrc = ref('')
const mapRef = ref(null)
onMounted(() => {
  selectImgSrc.value = `${baseUrl}${cardData.value.files[0].url}`
  mapRef.value.addMarker({ lat: Number(cardData.value.gps_latitude), lng: Number(cardData.value.gps_longitude) })
})
const selectedImg = (data) => {
  console.log('selectedImg')
  selectImgSrc.value = data
}

</script>
<template>
  <LayoutDefault>
    <template #header>
      <CommonHeaderBack @click="linkBack">喵～</CommonHeaderBack>
    </template>
    <div class="p-4">
      <p class="font-bold">發生時間：{{ transDate(cardData.created_at) }}</p>
      <p class="my-2 font-bold">案件主旨：{{ cardData.title }}</p>
      <div class="aspect-video">
        <img class="w-full h-full object-cover" :src="selectImgSrc" />
      </div>
      <div class="flex items-center overflow-scroll gap-2 py-2">
        <div v-for="(item, index) in cardData.files" :key="index" class="w-1/4 shrink-0 aspect-square">
          <img class="w-full h-full object-cover" :src="`${baseUrl}${item.url}`" @click="selectedImg(`${baseUrl}${item.url}`)" />
        </div>
      </div>
      <p v-if="cardData.content" class="my-2">描述：「 {{ cardData.content }} 」</p>
      <p class="my-2 font-bold">走失的地點標記：</p>
      <div class="">
        <GoogleMap ref="mapRef" :center="{ lat: Number(cardData.gps_latitude), lng: Number(cardData.gps_longitude) }" :zoom="15" />
      </div>
      <p class="my-2 font-bold">更多回覆： </p>
    </div>
    <template #action>
      <CommonBtn class="w-full m-4">新增回報地點</CommonBtn>
    </template>
  </LayoutDefault>
</template>
<style lang="scss" scoped>
</style>
