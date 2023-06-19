function getType(obj: any) {
  // 为啥不用typeof? typeof无法区分数组和对象
  if (Object.prototype.toString.call(obj) == '[object Object]') {
    return 'Object'
  }

  if (Object.prototype.toString.call(obj) == '[object Array]') {
    return 'Array'
  }
  return 'nomal'
}

function deepCopy(obj: any) {
  let newObj:any = getType(obj) == 'Object' ? {} : []
  if (getType(obj) == 'nomal') {
    return obj
  } else {
    for (let key in obj) {
      // 为啥要用hasOwnProperty？不需要从对象的原型链上进行复制
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepCopy(obj[key])
      }
    }
  }
  return newObj
}

function getUrlParam(paraName: any) {
  let url = document.location.toString()
  let arrObj = url.split('?')
  if (arrObj.length > 1) {
    let arrPara = arrObj[1].split('&')
    let arr
    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=')
      if (arr != null && arr[0] === paraName) {
        return arr[1]
      }
    }
    return ''
  } else {
    return ''
  }
}

function debounce(func: any, wait: any, immediate: any) {
  let timeout: any;
  return function (this: any) {
    let context = this;
    let args = arguments;


    if (timeout) clearTimeout(timeout); // timeout 不为null
    if (immediate) {
      let callNow = !timeout; // 第一次会立即执行，以后只有事件执行后才会再次触发
      timeout = setTimeout(function () {
        timeout = null;
      }, wait)
      if (callNow) {
        func.apply(context, args)
      }
    }
    else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait);
    }
  }
}

window.getType = getType
window.deepCopy = deepCopy
window.getUrlParam = getUrlParam
window.debounce = debounce

export {}
