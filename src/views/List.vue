<script setup>
import axios from '../utils/axios'
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCardStore } from '../stores/useCardStore.js'
import * as echarts from 'echarts';
// layout
import LayoutDefault from '@/components/layout/Default.vue'
import CommonHeaderClose from '@/components/common/header/Close.vue'
import CommonTabRow from '@/components/common/TabRow/Index.vue';
import CommonTabRowBtn from '@/components/common/TabRow/Btn.vue';
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
const tabData = ref('tab1');
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
  if (tabData.value === 'tab1') {
      updateChart();
    }
  await fetchInit()
})
const chartContainer = ref(null);
  // 图表实例
  let chart = null;
  
  // 初始化图表
  const initChart = () => {
    if (chart) {
      chart.dispose(); // 销毁旧的图表实例
    }
  
    if (chartContainer.value) {
      chart = echarts.init(chartContainer.value);
      const option = {
        title: {
            text: ' '
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['走失貓犬通報數', '走失貓犬領回數']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },

        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['107年度', '108年度', '109年度', '110年度', '111年度', '112年度', '113年度']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            name: '走失貓犬通報數',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
            name: '走失貓犬領回數',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
            },


        ]
    };
      chart.setOption(option);
    }
  };
  
  // 在选项卡数据变化时更新图表
  const updateChart = async () => {
    await nextTick();
    initChart();
  };
  
  // 监听 tabData 的变化
  watch(() => tabData.value, (newValue) => {
    if (newValue === 'tab2') {
      updateChart();
    }
  }, { immediate: true });
  

</script>
<template>
  <LayoutDefault>
    <template #header>
      <CommonHeaderClose @submit="closeWindow">寵物遺失通報</CommonHeaderClose>
    </template>
    <template>
    </template>
    <CommonTabRow v-model="tabData">
        <CommonTabRowBtn value="tab1">寵物遺失瀏覽</CommonTabRowBtn>
        <CommonTabRowBtn value="tab2">寵物遺失統計</CommonTabRowBtn>
      </CommonTabRow>
      <div v-if="tabData === 'tab1'">
        <div class="grid grid-cols-2 gap-4 p-4">
          <CommonCard v-for="(item, index) in data" :key="index" :img="item.files[0].url">
            {{ item.title }}  
            <template #action>
              <CommonBtn class="w-full m-2" type="secondary" @click="handleDetail(item)" >查看更多</CommonBtn>
            </template>
          </CommonCard>
      </div>
        </div>
        <div v-if="tabData === 'tab2'">
          <div style="padding-left: 24px; padding-right: 24px;">
            <div ref="chartContainer" style="width: 100%; height: 400px; margin-top: 3rem;"></div>
          </div>

        </div>

  </LayoutDefault>
</template>
<style lang="scss" scoped>
</style>
