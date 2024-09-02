<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  center: {
    type: Object,
    default: () => ({ lat: 40.73061, lng: -73.935242 }),
    required: false,
  },
  zoom: {
    type: Number,
    default: 12,
    required: false,
  }, 
})

// 創建一个 ref 來綁定地圖容器
const mapContainer = ref(null)
let map = {}; // 用來保存 Google Maps 實例
const initMap = async () => {
  // 初始化 Google 地圖
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const mapOptions = {
    center: props.center,
    zoom: props.zoom,
    mapId: "DEMO_MAP_ID",
  }
  map = new Map(mapContainer.value, mapOptions)
}
onMounted( async() => {
  initMap()
})

// 添加一個地點
const addMarker =  async (position) => {
  console.log('position', position)
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const marker = new AdvancedMarkerElement({
    map,
    position: position,
    title: "Uluru",
  });
  console.log('marker', marker);
}

defineExpose({
  addMarker,
})
</script>
<template>
  <div ref="mapContainer" class="w-full aspect-video" />
</template>

