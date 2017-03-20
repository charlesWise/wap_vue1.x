/**
 * Created by xuxin on 16/3/24.
 */
 let Dom = {
   // 取单个node
   getElem: function(node) {
     if(Object.isString(node)) {
       node = document.querySelector(node);
     }
     return node;
   },
   // 取所有满足条件的node
   getElems: function(node) {
     if(Object.isString(node)) {
       node = document.querySelectorAll(node);
     }
     return node;
   },
   getObjKeys: function(obj) {
     return Object.isObject(obj) ? Object.keys(obj) : false;
   },
   // node 也支持选择器
   // attr 也可以是对象
   // 只取显示的元素的属性
   getElemAttr: function(node, attrs) {
     node = Dom.getElem(node);
     if(!node) return 0;
     attrs = attrs || 'clientHeight';
     var keys = Dom.getObjKeys(attrs),
         ref = {};
     if(keys) {
       keys.forEach(function(k) {
         ref[k] = node[k];
       })
     } else {
       ref = node[attrs];
     }

     return ref;
   },
   // 取css
   getElemStyle: function(node, attrs) {
     node = Dom.getElem(node);
     if(!node) return 0;
     var keys = Dom.getObjKeys(attrs),
         ref = {};
     if(keys) {
       keys.forEach(function(k) {
         ref[k] = getAttr(k);
       })
     } else {
       ref = getAttr(attrs);
     }

     return ref;
     // 获取单个属性值
     function getAttr(attr) {
       return document.defaultView.getComputedStyle (node,null)[attr] || 0;
     }
   },
   // 绑定事件，返回解绑函数
   bind: function(node, type, fn) {
    node = Dom.getElem(node);
    node.addEventListener(type, fn, false);
    return function() {
      node.removeEventListener(type, fn, false);
    }
  }
 }

export { Dom }
