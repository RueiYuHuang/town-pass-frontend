export const transDate = (input) => {
  const date = new Date(input)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份從0開始，所以要加1
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  const formatData = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

  return formatData
}