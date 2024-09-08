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

import axios from '../utils/axios' // Add
import Response from './Response.vue' // Add

const animalResponses = ref([]) // Add
const fetchAnimalResponses = async () => { // Add
  try {
    const response = await axios.get(`/api/post/${cardData.value.id}/reply`)  // Replace with your actual API endpoint
    animalResponses.value = response.data
    for(let i = 0; i < animalResponses.value.data.length; i++) {
      const animal = animalResponses.value.data[i]
      mapRef.value.addMarker({ lat: Number(animal.gps_latitude), lng: Number(animal.gps_longitude) })
    }
  } catch (error) {
    console.error("Failed to fetch animal data:", error)
  }
}

const cardSrore = useCardStore()
const { cardData } = storeToRefs(cardSrore)

console.log('cardData:', cardData.value)
const router = useRouter()
const linkBack = () => {
  router.push('/')
}
const handleNewForm = () => {
  router.push('/return')
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
  // for each data in animalResponses.value.data
  
  fetchAnimalResponses()
})
const selectedImg = (data) => {
  console.log('selectedImg')
  selectImgSrc.value = data
}

</script>
<template>
  <LayoutDefault>
    <template #header>
      <!-- <CommonHeaderBack @click="linkBack">寵物資訊</CommonHeaderBack> -->
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
      <div class="flex" style="justify-content: space-between;">
        <div class="my-2 font-bold">更多回覆： </div>
        <div> 
          <RouterLink :to="`/response?id=${cardData.id}`">查看更多</RouterLink>
        </div>
      </div>

      <!-- Add  Start -->
      <div style="padding-bottom: 124px;">
        <div v-for="(animal, index) in animalResponses.data" :key="index">
        <Response :animal="animal" :index="index" />
      </div>
      </div>

      <!-- Add  End -->
    </div>
    <template #action>
      <CommonBtn class="w-full m-5 mb-10" @click="handleNewForm()">新增回報地點</CommonBtn>
    </template>
  </LayoutDefault>
</template>
<style lang="scss" scoped>
</style>
