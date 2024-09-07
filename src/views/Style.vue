<script setup>
import { ref, onMounted } from 'vue'

import CommonList from '@/components/common/List.vue'
// Button
import CommonBtn from '@/components/common/Btn.vue'

// TabRow
import CommonTabRow from '@/components/common/TabRow/Index.vue'
import CommonTabRowBtn from '@/components/common/TabRow/Btn.vue'

// Input
import CommonInput from '@/components/common/input/Index.vue'
import CommonInputSearch from '@/components/common/input/Search.vue'
import CommonRadio from '@/components/common/Radio.vue'
import CommonCheckbox from '@/components/common/CheckboxV2.vue'

// Google
import GoogleMap from '@/components/common/google/Map.vue'
import GooglePlacesAutocomplete from '@/components/common/google/PlacesAutocomplete.vue'

// input
const inputData = ref('')
// inputSearch
const inputSearchData = ref('')
const searchSubmit = (data) => {
  console.log('searchSubmit:', data)
}
// inputRadio
const inputRadioDate = ref('radio1')
// inputcheckbox
const inputCheckboxDate = ref(['checkbox1'])

// tabData
const tabData = ref('tab1')
const tabSubmit = (data) => {
  console.log('tabSubmit:', data)
}

/** Google Map */
const mapRef = ref(null)
const position = { lat: 25.00420302929057, lng: 121.5606951713562 }
// 新增標記
const addMarker = () => {
  mapRef.value.addMarker(position)
}
// 取得標記資訊
const getMarker = () => {
  console.log(mapRef.value.getMarkers())
}
// 刪除標記
const clearMarker = () => {
  mapRef.value.clearMarkers()
}

/** 新增區域 */
const addPolygon = () => {
  const triangleCoords = [
    { lat: 25.005349945878606, lng: 121.55949809054374 },
    { lat: 25.00525532238408, lng: 121.56285556561326 },
    { lat: 25.0029841657242, lng: 121.56224510347766 },
    { lat: 25.00341363048151, lng: 121.55921699917718 },
  ]
  mapRef.value.addPolygon(triangleCoords)
}
// 刪除區域
const clearPolygon = () => {
  mapRef.value.clearPolygons()
}

/** Google Places Autocomplete */
const placeData = ref('')
const selectedPlace = (data) => {
  console.log('selectedPlace:', data)
  mapRef.value.addMarker(data.location, data.address, data.name)
}
const aaa = (val) => {
  console.log(val)
}
const bbb = () => {
  console.log(123)
}
const reject = (val) => {
  console.log('reject')
}
</script>
<template>
  <div>
    <RouterLink to="/">Back HOME</RouterLink>
    <h1>Style</h1>
    <div></div>
    <div class="font-bold mt-2">Button:</div>
    <div>
      <CommonBtn class="m-1" type="primary">primary</CommonBtn>
      <CommonBtn class="m-1" type="secondary">secondary</CommonBtn>
      <CommonBtn class="m-1" type="danger">danger</CommonBtn>
      <CommonBtn class="m-1" type="warning">warning</CommonBtn>
      <CommonBtn class="m-1" disabled>disabled</CommonBtn>
    </div>
    <div class="font-bold mt-2">Input: {{ inputData }}</div>
    <div class="m-1">
      <CommonInput v-model="inputData" />
    </div>
    <div class="font-bold mt-2">InputSearch: {{ inputSearchData }}</div>
    <CommonInputSearch class="m-1" v-model="inputSearchData" @submit="searchSubmit" />
    <div class="font-bold mt-2">InputRadio: {{ inputRadioDate }}</div>
    <CommonRadio v-model="inputRadioDate" value="radio1">radio1</CommonRadio>
    <CommonRadio v-model="inputRadioDate" value="radio2">radio2</CommonRadio>
    <div class="font-bold mt-2">InputCheckbox: {{ inputCheckboxDate }}</div>
    <CommonCheckbox v-model="inputCheckboxDate" value="checkbox1">checkbox1</CommonCheckbox>
    <CommonCheckbox v-model="inputCheckboxDate" value="checkbox2">checkbox2</CommonCheckbox>
    <div class="font-bold mt-2">TabRow: {{ tabData }}</div>
    <CommonTabRow v-model="tabData" @submit="tabSubmit">
      <CommonTabRowBtn value="tab1">tab1</CommonTabRowBtn>
      <CommonTabRowBtn value="tab2">tab2</CommonTabRowBtn>
    </CommonTabRow>
    <div class="font-bold mt-2">Google Places Autocomplete: {{ placeData }}</div>
    <GooglePlacesAutocomplete class="m-2" v-model="placeData" @submit="selectedPlace" />
    <div class="font-bold mt-2">Google Map:</div>
    <div>
      <CommonBtn @click="addMarker" class="m-1">新增標記</CommonBtn>
      <CommonBtn @click="clearMarker" class="m-1">刪除標記</CommonBtn>
      <CommonBtn @click="getMarker" class="m-1">取得標記資訊</CommonBtn>
      <CommonBtn @click="addPolygon" class="m-1">新增區域</CommonBtn>
      <CommonBtn @click="clearPolygon" class="m-1">刪除區域</CommonBtn>
    </div>
    <GoogleMap ref="mapRef" :center="position" :zoom="15" />

    <div class="pt-2" style="width: 90%; margin: auto">
      <CommonList title="我是標題"></CommonList>
      <!-- <CommonCheckbox @submit="aaa"></CommonCheckbox> -->
    </div>
  </div>
</template>
