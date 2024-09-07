<script setup>
import axios from '../utils/axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCardStore } from '../stores/useCardStore.js'

// layout
import LayoutDefault from '@/components/layout/Default.vue'
import CommonHeaderClose from '@/components/common/header/Close.vue'

import CommonBtn from '@/components/common/Btn.vue'
import CommonCard from '@/components/common/Card.vue'

const cardSrore = useCardStore()
const { setCardData } = cardSrore
const { cardData } = storeToRefs(cardSrore)

const router = useRouter()
const handleDetail = (data) => {
  console.log('data', data)
  setCardData(data)
  router.push('/detail')
}

const query = ref({
  page:'1',
  per_page: '15'
})
const pages = ref({
  page: 1,
  per_page: 15,
})
const data = ref([])
const fetchInit = async () => {
  const res = await axios.get('/api/posts', { params: query.value})
  data.value = res.data.data
  console.log('res:', res.data);
}
const closeWindow = () => {
  window.close();
}
onMounted(async () => {
  await fetchInit()
})

const handleNewForm = (data) => {
  router.push('/inform')
}
</script>
<template>
  <LayoutDefault>
    <template #header>
      <CommonHeaderClose @submit="closeWindow">寵物遺失通報</CommonHeaderClose>
    </template>
    <template>
    </template>
    <div v-if="data.length" class="grid grid-cols-2 gap-4 p-4">
      <CommonCard v-for="(item, index) in data" :key="index" :img="item.files[0].url">
        {{ item.title }}  
        <template #action>
          <CommonBtn class="w-full m-2" type="secondary" @click="handleDetail(item)" >查看更多</CommonBtn>
        </template>
      </CommonCard>
    </div>
    <template #action>
      <CommonBtn class="w-full m-5 mb-10" @click="handleNewForm">新增回報</CommonBtn>
    </template>
  </LayoutDefault>
</template>
<style lang="scss" scoped>
</style>
