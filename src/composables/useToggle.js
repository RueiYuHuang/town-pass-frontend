import { ref } from 'vue'
export const useToggle = (initialValueOrCallback = false, maybeCallback) => {
  let initialValue = initialValueOrCallback
  let callback = maybeCallback

  // 檢查初始參數是否為函式，如果是則認定為回調函式，並將初始值設為 false
  if (typeof initialValueOrCallback === 'function') {
    initialValue = false
    callback = initialValueOrCallback
  }

  const value = ref(initialValue)

  const setValue = async (type = undefined) => {
    if (type === undefined || type instanceof Event) {
      value.value = !value.value
    }
    if (typeof type === 'boolean') {
      value.value = type
    }
    if (typeof callback === 'function') {
      await callback(type)
    }
  }

  return {
    value,
    setValue,
  }
}
