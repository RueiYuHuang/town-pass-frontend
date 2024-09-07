<script setup>
import axios from '../utils/axios'
import { ref, onMounted, watch, nextTick, onBeforeUnmount } from 'vue'
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
const locationList = ref([
  '北投區',
  '士林區',
  '大同區',
  '中山區',
  '松山區',
  '內湖區',
  '萬華區',
  '中正區',
  '大安區',
  '信義區',
  '南港區',
  '文山區'
])
const loading = ref(false)
const moreLoading = ref(false)
const query = ref({
  page:'1',
  per_page: '15',
  location: []
})
const tabData = ref('tab1');
const pages = ref({
  page: 1,
  per_page: 15,
})
const lastPage = ref(1)
const data = ref([])
const fetchInit = async () => {
  loading.value = true
  const res = await axios.get('/api/posts', { params: query.value})
  loading.value = false
  data.value = res.data.data
  // lastPage.value = res.data.meta.last_page
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
  const selectList = ref([])
  const selectLocation = (val) => {
    if (selectList.value.includes(val)) {
      selectList.value = selectList.value.filter(district => district !== val);
    } else {
      selectList.value.push(val)
    }
  }
  // 监听 tabData 的变化
  watch(() => tabData.value, (newValue) => {
    if (newValue === 'tab2') {
      updateChart();
    }
  }, { immediate: true });
  
  const showModal = ref(false)
  const submitData = async() => {
    showModal.value = false
    loading.value = true;
    query.value.location = selectList.value
    const res = await axios.get('/api/posts', { params: query.value})
    loading.value = false;
    data.value = res.data.data
  }
  const getOtherPageData = async(page) => {
    moreLoading.value = true
    query.value.page = page
    const res = await axios.get('/api/posts', { params: query.value})
    moreLoading.value = false
    data.value.push(res.data.data) 

  }
  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollTop + windowHeight >= documentHeight) {
      pages.value.page = pages.value.page + 1
      if (pages.value.page <= lastPage.value && !moreLoading.value) {
        getOtherPageData(pages.value.page)
      }
  
    }
  };

// 生命週期鉤子
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
<template>
  <LayoutDefault>
    <div>
      <div class="location-bg" :class="{'op-1': showModal}">
        <div class="relative h-full" >
          <div class="location-select-modal">
            <div>
              <div class="location-header">
                區域篩選:
              </div>
              <div class="location-frame">
                <div
                  class="location-btn"
                  v-for="location in locationList"
                  :key="location"
                  @click="selectLocation(location)"
                  :class="{'active' : selectList.includes(location)}"
                >
                  {{ location }}
                </div>
              </div>

            </div>
            <div style="margin-bottom: 4.5rem;" class="flex w-full btn-border">
              <CommonBtn class="w-30" type="secondary" @click="showModal =! showModal">取消</CommonBtn>
              <div class="mx-2"></div>
              <CommonBtn class="w-65" type="primary" @click="submitData()">送出</CommonBtn>
            </div>

          </div>
        </div>
      </div>
    </div>
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

        <div class="pt-5 mr-5">
          <img src="../../../public/filter.png" style="width: 30px; display: block; margin-left: auto;" @click="showModal = !showModal">
        </div>
        <div v-if="loading">
          <img src="../../../public/loading.gif" class="black m-auto" style="width: 50px;">
        </div>
        <div v-else>
          <div class="grid grid-cols-2 gap-4 p-4">
            <CommonCard v-for="(item, index) in data" :key="index" :img="item.files[0].url">
              {{ item.title }}  
              <template #action>
                <CommonBtn class="w-full m-2" type="secondary" @click="handleDetail(item)" >查看更多</CommonBtn>
              </template>
            </CommonCard>
          </div>
        </div>
        <div v-if="moreLoading">
          <img src="../../../public/loading.gif" class="black m-auto" style="width: 50px;">
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
  .location-bg {
    background-color: rgba($color: #000000, $alpha: .8);
    width: 100%;
    height: 100%;
    position: fixed;

    opacity: 0;
    transition: 1s;
    z-index: -1;
    .location-select-modal {
      width: 75%;
      background-color: #FFFFFF;
      height: 100vh;
      position: absolute;
      right: -75%;
      padding-left: 20px;
      padding-right: 20px;
      display: flex;
      transition: 2s;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .op-1 {
    opacity: 1 !important;
    z-index: 99  !important;
    .location-select-modal {
      right: 0%;
    }
  }
  .location-header {
    padding-top: 16px;
    padding-bottom: 16px;
    font-weight: bold;
  }

  .active {
    background-color:  #F4B992 !important;
  }
  .location-btn {
    width: 112px;
    height: 50px;
    border-radius: 15px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F5F5F5;
  }
  .location-frame {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .w-30 {
    width: 30%;
  }
  .w-65 {
    width: 65%;
  }
  .btn-border {
    padding-top: 1rem;
    border-top: 1px solid #EDEDED;
  }
</style>
