<script setup>
import axios from '../utils/axios'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../stores/useCountStore.js'
import { ref, onMounted } from 'vue'

import CommonSearch from '@/components/common/Search.vue'

import CommonTabRow from '@/components/common/TabRow/index.vue'
import CommonTabRowBtn from '@/components/common/TabRow/Btn.vue'

import GoogleMap from '@/components/common/Google/Map.vue'
import GooglePlacesAutocomplete from '@/components/common/Google/PlacesAutocomplete.vue'

const counterSrore = useCounterStore()
const { increment } = counterSrore
const { count } = storeToRefs(counterSrore)

const data = ref([])

onMounted(async () => {
  const res = await axios.get('https://mocki.io/v1/ceb6202e-68d1-46b9-9b8e-737322014290')
  data.value = res.data
})

// inputSearch
const inputData = ref('')
const searchSubmit = (data) => {
  console.log('searchSubmit:', data);
}

// tabData
const tabData = ref('1')
const tabSubmit = (data) => {
  console.log('tabSubmit:', data);
}

// Google Map
const mapRef = ref(null)
const position = { lat: 25.00420302929057, lng: 121.5606951713562 }
const addMarker = () => {
  mapRef.value.addMarker(position)
}

// Google Places Autocomplete
const placeData = ref('')
const selectedPlace = (data) => {
  console.log('selectedPlace:', data);
  mapRef.value.addMarker(data.location)
}

</script>
<template>
  <div>
    <h1>Home</h1>
    <RouterLink to="/style">Style</RouterLink>
    <!-- <p>Count is: {{ count }}</p>
    <button class="border-black rounded border p-1" @click="increment">Increment</button>
    <div>{{ data }}</div> -->
    <div>inputSearch:{{ inputData }}</div>
    <CommonSearch v-model="inputData" placeholder="輸入搜尋" @submit="searchSubmit" />
    <div>tabData:{{ tabData }}</div>
    <CommonTabRow v-model="tabData" @submit="tabSubmit">
      <CommonTabRowBtn value="1">通報</CommonTabRowBtn>
      <CommonTabRowBtn value="2">查詢</CommonTabRowBtn>
    </CommonTabRow>
    <div>Google Places Autocomplete: {{ placeData }}</div>
    <GooglePlacesAutocomplete v-model="placeData"  @submit="selectedPlace"/>
    <div>Google Map: <button @click="addMarker" class="rounded border p-1">加入地點</button></div>
    <GoogleMap ref="mapRef" :center="position" :zoom="15" />
  </div>
</template>
