/**
 * 发布事件
 * @param name
 * @param params
 */
export const publishEvent = (name, params = null) => {
  const event = new CustomEvent(name, {
    detail: params
  })
  window.dispatchEvent(event)
}

/**
 * 订阅事件
 * @param name
 * @param callback
 */
export const subscribeEvent = (name, callback) => {
  if (typeof window.addEventListener !== 'undefined') {
     window.addEventListener(name, callback, false)
  } else {
    window.attachEvent(name,callback)   // 兼容IE7、IE8
  }
}

/**
 * 移除事件
 * @param name
 * @param callback
 */
export const removeEvent = (name, callback) => {
  if (typeof window.removeEventListener !== 'undefined') {
    window.removeEventListener(name, callback, false)
  } else if (typeof window.detachEvent !== 'undefined') {
    window.detachEvent(name, callback)
  }
}
