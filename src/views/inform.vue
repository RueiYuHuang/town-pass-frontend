
<script setup>
import axios from '../utils/axios'
import Swal from 'sweetalert2'

import { ref, onMounted, nextTick } from 'vue'
const content = ref(null)
const imageList = ref([])

const placeData = ref(null)
// const getLocationData = ref(null)
const selectedPlace = (data) => {
    console.log(data)
    placeData.value = data.address
    lat.value = data.location.lat
    lng.value = data.location.lng
}
const getAddressFromCoordinates = (location) => {
  const geocoder = new google.maps.Geocoder();
  const latLng = new google.maps.LatLng(location.lat, location.lng);

  geocoder.geocode({ location: latLng }, (results, status) => {
    if (status === 'OK' && results[0]) {
        placeData.value = results[0].formatted_address
      console.log('地址:',  placeData.value);
    } else {
      handleGeocodeError();
    }
  });
}
onMounted(() => {
  if (!window.google) {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDpk72lDPS0D5Jn3w4Fxx2NnbQe9NOWmic';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
});
import CommonRadio from '@/components/common/Radio.vue'
import CommonInput from '@/components/common/input/Index.vue'
import CommonBtn from '@/components/common/Btn.vue'
import GooglePlacesAutocomplete from '@/components/common/Google/PlacesAutocomplete.vue'
const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          lat.value = userLocation.lat
          lng.value = userLocation.lng
          getAddressFromCoordinates(userLocation)
        }
      );
    } else {
      handleLocationError(false);
    }

}
const showModal = ref(false)
const hideModal = () => {
  showModal.value = false
}
const checkValue = ref(false)
const showSelectModel = () => {
  showModal.value = true
}
const submitData = () => {
    let payload = {
        tilte: title.value,
        content: content.value,
        agree: agree.value,
        gps_longitude: lng.value,
        gps_latitude: lat.value,
        address:  placeData.value
    }
    checkValue.value = true

    nextTick(() => {
        const count = document.querySelectorAll('.require-field').length
        console.log(count)
        if (count < 1) {
            axios.post('/api/posts', payload)
            .then(() => {
                Swal.fire({
                    title: '您已成功送出',
                    icon: 'success'
                });
                
            })
        } else {
            const target = document.querySelectorAll('.require-field')[0]
            target.scrollIntoView({
                behavior: 'smooth', // 平滑滾動
                block: 'start',     // 滾動到元素的上邊緣
                inline: 'nearest'   // 使元素在視口中最接近的地方顯示
            });
            const offset = -200;
            window.scrollBy({
                top: offset,
                behavior: 'smooth'
            });
        }
    })



}
const lat = ref(null)
const lng = ref(null)

const title = ref(null)
const agree = ref(true)
const goBack = () => {
    window.history.back();
}
</script>
<template>
  <div>
    <div class="mobile-header">
      <div class="w-33 arrow-style">
        <img src="../../../public/black-arrow.png" height="20px" @click="goBack()" />
      </div>
      <div class="w-33 text-center header-mobile-text">案件內容</div>
      <div class="w-33"> </div>
    </div>
    <div class="mobile-content">
      <div class="mb-3">
        <div class="mb-2">
          案件內容
        </div>
        <div>
          <span class="px-2"></span>動物遺失回報
        </div>
      </div>
      <div class="mb-3">
        <div class="mb-2 require">
            發生地點
        </div>
        <div class="relative">
          <GooglePlacesAutocomplete class="m-2" placeholder="可直接訂位或輸入完整地址" v-model="placeData" @submit="selectedPlace" />
          <div class="img-map-position" @click="getUserLocation()">
            <img src="../../../public/map.png">
          </div>
          <div  v-if="checkValue && !placeData" class="require-field">發生地點為必填</div>
        </div>
      </div>
      <div class="mb-3">
        <div class="mb-2 require">
          案件主旨
        </div>
        <div>
          <CommonInput placeholder="請輸入主旨" v-model="title" />
        </div>
        <div v-if="checkValue && !title" class="require-field">案件主旨為必填</div>
      </div>
      <div class="mb-3">
        <div class="mb-2 require">
          描述
        </div>
        <div>
          <textarea placeholder="人、事、時、地、物4000字以內" v-model="content" rows="8"
            class="content-textarea w-full rounded-[10px] bg-grey py-0.5 caret-primary-500 placeholder:text-grey-400 text-left align-top focus:outline-none">
          </textarea>
        </div>
        <div v-if="checkValue && !content" class="require-field">描述為必填</div>
      </div>
      <div class="pb-3">
        <div class="mb-2 content-icon-text">
          <div>
            新增附件
          </div>
          <div>
            <img src="../../../Public/info.png" style="height: 24px;">
          </div>
        </div>
        <div class="lh-sm mb-2">
          <small class="max-ten-lh">
            最多上傳<br>
            10個檔案
          </small>
        </div>
        <div class="content-upload-btn">
          <label class="upload-btn" @click="showSelectModel()">
            +<br>
            上傳檔案
          </label>
          <label class="upload-btn" @click="showSelectModel()">
            +<br>
            上傳檔案
          </label>
          <label class="upload-btn" @click="showSelectModel()">
            +<br>
            上傳檔案
          </label>
          <label class="upload-btn" @click="showSelectModel()">
            +<br>
            上傳檔案
          </label>
        </div>
      </div>
      <div class="submit-btn-style">
        <div class="mb-3 submit-btn-header text-primary-500">
          個人資料是否提供給承辦
        </div>
        <div class="mb-3 lh-sm">
          <small>
            成半員如有執行法定職務之需求,仍可透過申請程序,並經機關業務分層負責層級人員同意,仍取得個人資料
          </small>
        </div>
        <div class="mb-3">
          <CommonRadio v-model="agree" :value="true">同意</CommonRadio>
          <CommonRadio v-model="agree" :value="false">不同意</CommonRadio>
        </div>
        <div class="flex">
          <CommonBtn class="w-30" type="secondary">取消</CommonBtn>
          <div class="mx-2"></div>
          <CommonBtn class="w-65" type="primary" @click="submitData()">送出</CommonBtn>
        </div>
      </div>

    </div>
    <div class="select-model-bg" :class="{'op-1': showModal}">
      <div class="relative h-full">
        <div class="model-position">
          <div class="select-model">
            <div class="pb-5 border-one ">
              <small>
                請選擇上傳方式
              </small>
            </div>
            <div class="py-3 border-one">
              相簿
            </div>
            <div class="py-3 border-one">
              拍照
            </div>
            <div class="py-3 border-one">
              錄影
            </div>
            <div class="py-3">
              錄音
            </div>
          </div>
          <div class="cancel-model" @click="hideModal()">
            取消
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<style lang="scss"  scoped>
.mobile-header {
  position: fixed;
  top: 0%;
  display: flex;
  width: 100%;
  z-index: 99;
  padding: 10px;
  background-color: #F1F3F4;

  img {
    height: 16px;
    transform: rotate(90deg);
  }

}

.w-33 {
  width: 33%;
}

.arrow-style {
  display: flex;
  align-items: center;
}

.header-mobile-text {
  font-size: 16px;
}

.mobile-content {
  padding-top: 62px;
  padding-left: 24px;
  padding-right: 24px;

  .img-map-position {
    position: absolute;
    right: 0;
    top: 0;
    margin: auto;
    height: 100%;
    display: flex;
    align-items: center;

    img {
      width: 30px;
      margin-right: 10px;
    }
  }

  .content-textarea {
    resize: none;
    padding: 10px;
    text-align: left;
    /* 文字左對齊 */
    box-sizing: border-box;
    /* 確保padding和border不影響元素的總寬度 */
  }

  .content-icon-text {
    display: flex;
    justify-content: space-between;
  }

  .max-ten-lh {
    line-height: 16px;
    color: #91A0A8;
  }

  .lh-sm {
    line-height: 1;
  }
  .require {
    position: relative;
    &::after {
        content: "*";
        position: absolute;
        color: #5AB4C5;
        top: 0;
        bottom: 0;
        height: 100%;
        margin: auto;
        padding-left: 5px;
        /* display: flex; */
        padding-top: 3px;
        font-weight: bold;
        font-size: 16px;
        }
  };
  .content-upload-btn {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .upload-btn {
    height: 110px;
    width: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #E3E7E9;
    border-radius: 15px;
    margin-bottom: 10px;
    text-align: center;
  }

  .submit-btn-style {
    height: 200px;
    padding-bottom: 15px;
  }

  .submit-btn-header {
    font-weight: bold;
  }

  .w-30 {
    width: 30%;
  }

  .w-65 {
    width: 65%;
  }
}

.select-model-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  opacity: 0;
  z-index: -1;
  background-color: rgba($color: #000000, $alpha: 0.3);
}

.select-model {
  border-radius: 15px;
  background-color: #E3E7E9;
  text-align: center;
  font-size: 20px;
  user-select: none;
  margin-bottom: 1rem;

}
.op-1 {
    opacity: 1 !important;
    z-index: 1 !important;
  } 
.border-one {
  border-bottom: 1px solid #91A0A8;
}

.model-position {
  position: absolute;
  bottom: 5%;
  width: 95%;
  margin: auto;
  left: 0;
  right: 0;
}
.cancel-model {
  border-radius: 15px;
  background-color: #F1F3F4;
  padding: 0.75rem;
  font-weight: bold;
  text-align: center;
}
.require-field {
    color: #D45251;
    font-weight: bold;
    font-size: 80%;
}
</style>