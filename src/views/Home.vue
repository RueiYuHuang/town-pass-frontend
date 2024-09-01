<script setup>
import axios from '../utils/axios'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../stores/useCountStore.js'
import { ref, onMounted } from 'vue'
import CommonSearch from '@/components/common/Search.vue'
const counterSrore = useCounterStore()
const { increment } = counterSrore
const { count } = storeToRefs(counterSrore)

const data = ref([])

onMounted(async () => {
  const res = await axios.get(
    'https://mocki.io/v1/ceb6202e-68d1-46b9-9b8e-737322014290',
  )
  data.value = res.data
})
const inputData = ref('')
</script>
<template>
  <div>
    <h1>Home</h1>
    <p>Count is: {{ count }}</p>
    <button class="border-black rounded border p-1" @click="increment">
      Increment
    </button>
    <div>{{ data }}</div>
    <CommonSearch v-model="inputData" placeholder="輸入搜尋" />
  </div>
</template>
