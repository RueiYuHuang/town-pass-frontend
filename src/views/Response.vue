<template>
    <div>
        <div v-for="animal in list" :key="animal">
            <div class="response_card">
            <div class="response_floor"> {{ animal.floor }} </div>
            <div class="response_content">
                <!-- <p class="title">發現地點：{{ animal.district }}</p> -->
                <p class="title">發現位置：{{ animal.address }}</p>
                <p class="description">{{ animal.content }}</p>
                <div class="response_content_img">
                <!-- Loop through images for each animal -->
                <img v-for="(img, index) in animal.files" :src="`${baseUrl}${img.url}`" :key="img.url" alt="Animal Image" />
                </div>
                <p class="description">{{ animal.floor }}F : {{ formatDate(animal.created_at) }}</p>
            </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue'
import {  useRoute } from 'vue-router';
import axios from '../utils/axios.js'

const baseUrl = import.meta.env.VITE_API_BASE_URL
const route = useRoute()
const list = ref([])
const getList = () => {
    console.log(route.query.id)
    axios.get(`/api/post/${route.query.id}/reply`)
        .then((res) => {
            list.value = res.data.data
        })
}
getList()
const formatDate = (dateString) => {
  const date = new Date(dateString); // 將傳入的字串轉換為 Date 物件
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份從0開始，所以加1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
</script>

<style lang="scss" scoped>

.header{
    width: 100%;
    height: 40px;
    background-color: rgb(195, 195, 195);
}

.response_card{
    padding: 16px 24px;
    display: grid;
    grid-template-columns: 40px auto;
       

    .response_floor{
        width: 30px;
        height: 30px;
        border-radius: 100%;
        background-color: #5AB4C5;
        font-size: 12px;
        align-content: center;
        text-align: center;
        color: white;
    }
    .response_content{
        gap: 8px;

        .title{
            font-size: 14px;
        }
        .description{
            font-size: 12px;
            color: gray;
            line-height: 16px;
            padding-top: 10px;
        }

        .response_content_img{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding-top: 10px;
          

            img{
                aspect-ratio: 1 / 1; 
                object-fit: cover;
                object-position: center;
                border-radius: 6px;
            }
        }
    }
}

hr{
    width: 100%;
    height: 1px;
    color: #F4F4F4;
    padding: 10px;
}
 
</style>
