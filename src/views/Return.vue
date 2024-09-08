<script setup>
import axios from '../utils/axios'
import Swal from 'sweetalert2'
import LayoutDefault from '@/components/layout/Default.vue'
import CommonHeaderBack from '@/components/common/header/Back.vue'
import iconXmark from '@/assets/icon/xmark.svg'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCardStore } from '../stores/useCardStore.js'
import { useConnectionMessage } from '@/composables/useConnectionMessage';
import { useHandleConnectionData } from '@/composables/useHandleConnectionData';

import { ref, onMounted, nextTick } from 'vue'
function callFlutter(action, data = null) {
  useConnectionMessage(action, data)
};
// onMounted(async () => {
//   useHandleConnectionData(handleLocation);
//   const res = await axios.get('/api/posts')
//   data.value = res.data
// })
const content = ref(null)
const imageList = ref([])
const cardSrore = useCardStore()
const { cardData } = storeToRefs(cardSrore)

const placeData = ref(null)
const selectedPlace = (data) => {
    console.log(data)
    placeData.value = data.address
    lat.value = data.location.lat
    lng.value = data.location.lng
}
const geocoderLocation = ref({
})
const getAddressFromCoordinates = (location) => {
  const geocoder = new google.maps.Geocoder();
  const latLng = new google.maps.LatLng(location.lat, location.lng);
  geocoderLocation.value = {
    lat: location.lat,
    lng: location.lng
  }


  geocoder.geocode({ location: latLng }, (results, status) => {
    if (status === 'OK' && results[0]) {
        newform.value.address = results[0].formatted_address
      console.log('地址:',  newform.value.address);
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
import GooglePlacesAutocomplete from '@/components/common/google/PlacesAutocomplete.vue'
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
        address: placeData.value,
        user_id: localStorage.getItem('id'),
        user_name: localStorage.getItem('name')
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
const router = useRouter()
const goBack = () => {
    router.push('/detail')
}

const initialNewform = ref({
  title: null,
  content: null,
  country: null,
  city: null,
  district: null,
  address: null,
  gps_longitude: null,
  gps_latitude: null,
  files: null
})
const newform = ref({
  title: null,
  content: null,
  country: null,
  city: null,
  district: null,
  address: null,
  gps_longitude: null,
  gps_latitude: null,
  files: null
})
const agree = ref(false)
const files = ref([]);
const fileInput = ref(null);
const placesRef = ref(null);

// 新增檔案
const triggerFileInput = () => {
  fileInput.value.click()
};

// 選擇檔案
const handleFileChange = (event) => {
  const selectedFiles = Array.from(event.target.files);
  const imageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));

  if (selectedFiles.length !== imageFiles.length) {
    alert('Only image files are allowed');
  }

  imageFiles.forEach(file => {
    // Create a preview URL for each file
    const reader = new FileReader();
    reader.onload = (e) => {
      files.value.push({
        file,
        previewUrl: e.target.result
      });
    };
    reader.readAsDataURL(file);
  });
};

const removeFile = (index) => {
  files.value.splice(index, 1);
};

const handleSubmit = async () => {
  try {
    console.log('newform', newform.value);
    checkValue.value = true
    if (!newform.value.content || !newform.value.address) {
      Swal.fire({
        title: '請填寫完整表單',
        icon: 'warning'
      });
      return
    }
    if (!agree.value) {
      Swal.fire({
        title: '未同意提供個人資料',
        icon: 'warning'
      });
      return
    }
    const formData = new FormData();
    if (files.value.length) {
      files.value.forEach((fileItem) => {
        formData.append('files[]', fileItem.file);
      })
    }
    if (newform.value.title) { formData.append('title', newform.value.title) }
    if (newform.value.content) { formData.append('content', newform.value.content) }
    if (newform.value.country) { formData.append('country', newform.value.country) }
    if (newform.value.city) { formData.append('city', newform.value.city) }
    if (newform.value.district) { formData.append('district', newform.value.district) }
    if (newform.value.address) { formData.append('address', newform.value.address) }
    formData.append('user_id', localStorage.getItem('id'))
    formData.append('user_name', localStorage.getItem('name'))
    if (Object.keys(placesRef.value.selectedPlace).length) {
      formData.append('gps_latitude', placesRef.value.selectedPlace.location.lat)
      formData.append('gps_longitude', placesRef.value.selectedPlace.location.lng)
    } else if(Object.keys(geocoderLocation.value).length) {
      formData.append('gps_latitude', geocoderLocation.value.lat)
      formData.append('gps_longitude', geocoderLocation.value.lng)
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    console.log(formData)
    const response = await axios.post(`/api/post/${cardData.value.id}/reply`, formData)
    checkValue.value = false
    newform.value = {...initialNewform.value}
    files.value = []
    geocoderLocation.value = {}
    Swal.fire({
      title: '您已成功送出',
      icon: 'success'
    })
    .then(() => {
        router.push('/detail')
    })
  } catch (error) {
    alert('An error occurred during file upload');
  }
}
</script>
<template>
  <LayoutDefault>
    <!-- <template #header>
      <CommonHeaderBack @submit="goBack">{{ cardData.title }}</CommonHeaderBack>
    </template> -->
    <div>
    <div class="mobile-content">
      <div class="mb-3">
        <div class="mb-2 require">
            發生地點
        </div>
        <div class="relative">
          <GooglePlacesAutocomplete ref="placesRef" placeholder="可直接定位或輸入完整地址" v-model="newform.address" />
          <div class="img-map-position" @click="getUserLocation()">
            <img src="/map.png">
          </div>
          <div v-if="checkValue && !newform.address" class="require-field">發生地點為必填</div>
        </div>
      </div>
      <!-- <div class="mb-3">
        <div class="mb-2 require">
          案件主旨 

        </div>
        <div>
          <CommonInput placeholder="請輸入主旨" v-model="newform.title" />
        </div>
        <div v-if="checkValue && !newform.title" class="require-field">案件主旨為必填</div>
      </div> -->
      <div class="mb-3">
        <div class="mb-2 require">
          描述
        </div>
        <div>
          <textarea placeholder="人、事、時、地、物4000字以內" v-model="newform.content" rows="8"
            class="content-textarea w-full rounded-[10px] bg-grey py-0.5 caret-primary-500 placeholder:text-grey-400 text-left align-top focus:outline-none">
          </textarea>
        </div>
        <div v-if="checkValue && !newform.content" class="require-field">描述為必填</div>
      </div>
      <div class="pb-3">
        <div class="mb-2 content-icon-text">
          <div class="require">
            新增圖片
          </div>
          <div>
            <img src="/info.png" style="height: 24px;">
          </div>
        </div>
        <div v-if="checkValue && !files.length" class="require-field">至少上傳一張圖片</div>
        <div class="lh-sm mb-2">
          <small class="max-ten-lh">
            最多上傳 {{ files.length }}/5個檔案
          </small>
        </div>
        <!-- 上傳圖片 -->
        <div class="grid grid-cols-3 gap-4">
          <template v-if="files.length > 0">
            <div v-for="(file, index) in files" :key="index" class="w-full aspect-square relative">
              <img :src="file.previewUrl" alt="Preview" class="w-full h-full object-cover rounded-[10px]" />
              <img
                class="absolute -right-2 -top-2 h-6  cursor-pointer"
                :src="iconXmark"
                @click="removeFile(index)"
              />
            </div>
          </template>
          <div v-if="files.length < 5" class="w-full flex justify-center items-center flex-col aspect-square relative bg-grey-50 rounded-[10px]" @click="triggerFileInput">
            <span>+</span>
            <span>上傳檔案</span>
          </div>
        </div>
        <input type="file" ref="fileInput" class="hidden"  @change="handleFileChange" multiple accept="image/*" />

      </div>
      <div class="submit-btn-style">
        <div class="mb-3 submit-btn-header text-primary-500">
          個人資料是否提供給承辦
        </div>
        <div class="mb-3 lh-sm">
          <small>
            承辦員如有執行法定職務之需求,仍可透過申請程序,並經機關業務分層負責層級人員同意,仍取得個人資料
          </small>
        </div>
        <div class="mb-3">
          <CommonRadio v-model="agree" :value="true">同意</CommonRadio>
          <CommonRadio v-model="agree" :value="false">不同意</CommonRadio>
        </div>
      </div>
    </div>
  </div>
    <template #action>
      <div class="w-full flex gap-2 m-5 mb-10">
        <CommonBtn class="w-1/3" type="secondary" @click="goBack">取消</CommonBtn>
        <CommonBtn class="w-full" type="primary" @click="handleSubmit">送出</CommonBtn>
      </div>
    </template>
  </LayoutDefault>

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
  // padding-top: 62px;
  margin: 20px 0 40px;
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