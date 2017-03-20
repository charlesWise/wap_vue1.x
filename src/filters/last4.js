/**
 * Created by xuxin on 16/5/17.
 */
export default function (val) {
  if (!Object.isString(val)){
    return ''
  } else if (val.length <= 4) {
    return val
  } else {
    return val.substr(-4)
  }
}