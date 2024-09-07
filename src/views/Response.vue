<script setup>
</script>

<template>
    <div  class="header"> header </div>
    <div class="response_card"> 
        <div class="response_floor"> B1 </div>
        <div class="response_content">
            <p class="title">發現地點：中山區</p>
            <p class="title">發現位置：台北市中山南京東路三段105號</p>
            <p class="description">有隻貓在小區花園的長椅下打盹，虎斑的毛，很乾淨，不像流浪貓。</p>
            <div class="response_content_img">
                <img src="/cat01.jpeg" alt="">
                <img src="/cat01.jpeg" alt="">
                <img src="/cat01.jpeg" alt="">
            </div>
            <p class="description">B1: 昨天 04:09</p>
        </div>
    </div>
    <hr>

</template>



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
