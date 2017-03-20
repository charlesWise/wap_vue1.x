/**
 * Created by xuxin on 16/4/25.
 */
import localData from './localStorage'

let transferData = {}

// localStorage 下用 transfer-k 代替transferData 里的 k
var transferPre = 'transfer-';
var transferService = {
  set: function(key, val) {
    if(Object.isObject(key)) {
      Object.forEach(key, function(k, v) {
        setItem(k, v);
      });
      return ;
    }
    setItem(key, val);

    function setItem(k, v) {
      transferData[k] = v;
      localData.set(transferPre + k, v);
    }
  },
  get: function(key) {
    return transferData[key] || localData.get(transferPre + key);
  },
  remove: function(key) {
    if(!key) {
      Object.forEach(transferData, function(k, v) {
        localData.remove(transferPre + k);
      })
      transferData = {};
    } else {
      delete transferData[key];
      localData.remove(transferPre + key);
    }
  },
  init: function () {
    // 初始化 transfer
    var loc = window.localStorage;
    Object.forEach(loc, function(k, v) {
      if(!/^transfer-/.test(k)) return;
      k = k.split('-')[1];
      transferData[k] = v;
    })
  },
  clear: function () {
    transferService.remove();
  }
}

export default transferService

