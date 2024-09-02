<script setup>
import axios from '../utils/axios'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../stores/useCountStore.js'
import { ref, onMounted } from 'vue'

import CommonSearch from '@/components/common/Search.vue'

import CommonTabRow from '@/components/common/TabRow/index.vue'
import CommonTabRowBtn from '@/components/common/TabRow/Btn.vue'

import CommonGoogleMap from '@/components/common/GoogleMap.vue'

const counterSrore = useCounterStore()
const { increment } = counterSrore
const { count } = storeToRefs(counterSrore)

const data = ref([])

onMounted(async () => {
  const res = await axios.get('https://mocki.io/v1/ceb6202e-68d1-46b9-9b8e-737322014290')
  data.value = res.data
})
const inputData = ref('')
const tabData = ref('')

const mapRef = ref(null)
const position = { lat: 25.00420302929057, lng: 121.5606951713562 }
const addMarker = () => {
  mapRef.value.addMarker(position)
}
</script>
<template>
  <div>
    <h1>Home</h1>
    <RouterLink to="/style">Style</RouterLink>
    <!-- <p>Count is: {{ count }}</p>
    <button class="border-black rounded border p-1" @click="increment">Increment</button>
    <div>{{ data }}</div> -->
    <div>inputData:{{ inputData }}</div>
    <CommonSearch v-model="inputData" placeholder="輸入搜尋" />
    <div>tabData:{{ tabData }}</div>
    <CommonTabRow v-model="tabData">
      <CommonTabRowBtn :value="1">通報</CommonTabRowBtn>
      <CommonTabRowBtn :value="2">查詢</CommonTabRowBtn>
    </CommonTabRow>
    <div>Google Map <button @click="addMarker" class="border p-1 rounded">加入地點</button></div>
    <CommonGoogleMap ref="mapRef" :center="position" :zoom="15" />
  </div>
</template>
