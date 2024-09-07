import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useCardStore = defineStore('card', () => {
  const cardData = ref(JSON.parse(localStorage.getItem('cardData')) || {})
  const setCardData = (data) => {
    cardData.value = data
    localStorage.setItem('cardData', JSON.stringify(data))
  }

  return {
    cardData,
    setCardData
  }
})
