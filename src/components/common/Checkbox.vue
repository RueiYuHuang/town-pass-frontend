<script setup>
import { watch, ref } from 'vue'
const props = defineProps({
  value: {
    type: Boolean,
    default: '',
    required: false,
  },
})
const emit = defineEmits(['submit'])
const checkBox = ref(null)
watch(checkBox, (newValue) => {
  console.log(newValue)
  emit('submit', newValue)
})
</script>
<template>
  <div>
    <div class="form__group flex">
      <div class="form__radio-group">
        <input type="radio" name="size" id="small" :value="true" class="form__radio-input" v-model="checkBox" />
        <label for="small" class="form__radio-label form__label-radio">
          <span class="form__radio-button"></span> 確認
        </label>
      </div>
      <div class="mx-3"></div>
      <div class="form__radio-group">
        <input type="radio" name="size" id="large" :value="false" class="form__radio-input" v-model="checkBox" />
        <label for="large" class="form__radio-label form__label-radio">
          <span class="form__radio-button"></span> 取消
        </label>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.form__radio-input {
  display: none;
}

.form__label-radio {
  font-size: 1.6rem;
  cursor: pointer;
  position: relative;
  padding-left: 4.5rem;
}

.form__radio-button {
  height: 3rem;
  width: 3rem;
  border: 5px solid gray;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  left: 0;
  top: -0.4rem;
  transition: 0.2s;
}
.form__radio-button::after {
  content: '';
  display: block;
  height: 1.3rem;
  width: 1.3rem;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(90 180 197);
  opacity: 0;
  transition: opacity 0.2s;
}

.form__radio-input:checked ~ .form__label-radio .form__radio-button::after {
  opacity: 1;
}
.form__radio-input:checked ~ .form__label-radio .form__radio-button {
  border: 5px solid rgb(90 180 197);
}
</style>
