export default function (val) {
  let result = {
    1: '待处理',
    2: '成功',
    3: '失败'
  }
  return result[val] || ''
}