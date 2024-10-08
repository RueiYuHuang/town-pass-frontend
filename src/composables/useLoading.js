import { ref } from 'vue'
export const useLoading = (defaultLoading) => {
  const loading = ref(defaultLoading || false)
  const loadings = ref({})

  const startLoading = (scope) => {
    if (scope) {
      loadings.value = { ...loadings.value, [scope]: true }
    } else {
      loading.value = true
    }
  }
  const endLoading = (scope) => {
    if (scope) {
      loadings.value = { ...loadings.value, [scope]: false }
    } else {
      loading.value = false
    }
  }

  return {
    loading,
    loadings,
    startLoading,
    endLoading
  }
}
