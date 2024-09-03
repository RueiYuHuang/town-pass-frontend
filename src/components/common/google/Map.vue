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
let map = {} // 用來保存 Google Maps 實例
const initMap = async () => {
  // 初始化 Google 地圖
  const { Map } = await google.maps.importLibrary('maps')
  const mapOptions = {
    center: props.center,
    zoom: props.zoom,
    mapId: 'DEMO_MAP_ID',
  }
  map = new Map(mapContainer.value, mapOptions)
}
onMounted(async () => {
  initMap()
})

/** 添加一個地點 */
const markers = ref([])
const addMarker = async (position, title = 'Uluru') => {
  // 清除地圖上的所有標記
  markers.value.forEach(marker => marker.map = null)
  markers.value = []

  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker')
  const marker = new AdvancedMarkerElement({
    map,
    position: position,
    title: title,
  })

  // 將新標記添加到標記數組中
  markers.value.push(marker)

  // map.setCenter(position)
  // 平滑移動
  map.panTo(position)
}

/** 設定區域 */ 
const polygons = ref([])
const addPolygon = (triangleCoords) => {
  // 清除地圖上其他區域
  polygons.value.forEach(polygon => polygon.setMap(null))
  polygons.value = []
  // Construct the polygon.
  const bermudaTriangle = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });

  // 將多邊形添加到地圖
  bermudaTriangle.setMap(map)

  // 將新多邊形保存到數組中
  polygons.value.push(bermudaTriangle)
}

/** 搜尋地點 */
const findPlaces = async (text = '台灣') => {
  const request = {
    textQuery: text, // 搜尋牛肉麵
    fields: ['displayName', 'location', 'businessStatus'],
    includedType: 'restaurant',
    isOpenNow: true,
    language: 'zh-TW', // 設置語言為繁體中文
    maxResultCount: 7,
    minRating: 3.2,
    region: 'tw', // 設置區域為台灣
    useStrictTypeFiltering: false,
  }
  const { Place } = await google.maps.importLibrary('places')
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker')
  const { places } = await Place.searchByText(request)

  if (places.length) {
    console.log(places)

    const { LatLngBounds } = await google.maps.importLibrary('core')
    const bounds = new LatLngBounds()

    // Loop through and get all the results.
    places.forEach((place) => {
      const markerView = new AdvancedMarkerElement({
        map,
        position: place.location,
        title: place.displayName,
      })

      bounds.extend(place.location)
      console.log(place)
    })
    map.setCenter(bounds.getCenter())
  } else {
    console.log('No results')
  }
}

defineExpose({
  addMarker,
  addPolygon,
  findPlaces
})
</script>
<template>
  <div ref="mapContainer" class="aspect-video w-full" />
</template>
