<script setup>
import axios from '../utils/axios.js'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../stores/useCountStore.js'
import { ref, onMounted } from 'vue'
import { useConnectionMessage } from '@/composables/useConnectionMessage';
import { useHandleConnectionData } from '@/composables/useHandleConnectionData';

const counterSrore = useCounterStore()
const { increment } = counterSrore
const { count } = storeToRefs(counterSrore)

const data = ref([])

const handleLocation = (event) => {
  const result = JSON.parse(event.data);
  data.value = result
};

function callFlutter(action, data = null) {
  useConnectionMessage(action, data)
};

onMounted(async () => {
  useHandleConnectionData(handleLocation);
  const res = await axios.get('/api/posts')
  data.value = res.data
})
</script>
<template>
  <div>
    <h1>Home</h1>
    <div>
      <RouterLink to="/style">To Style</RouterLink>
    </div>
    <div>
      <RouterLink to="/list">To List</RouterLink>
    </div>
    <p>Count is: {{ count }}</p>
    <button class="border-black rounded border p-1" @click="callFlutter('location', '111')">locationTrack</button>
    <button class="border-black rounded border p-1" @click="increment">Increment</button>
    <div>{{ data }}</div>
  </div>
</template>
