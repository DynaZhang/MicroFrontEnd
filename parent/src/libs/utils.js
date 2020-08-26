export const createEvent = (name) => {
  const event = new Event(name)
  event.initEvent(name,true, true)
  return event
}

export const dispatchEvent = (event) => {
  window.dispatchEvent(event)
}

export const addEventListener = (name, callback) => {
  if (typeof window.addEventListener !== 'undefined') {
    window.addEventListener(name, callback, false)
  } else {
    window.attachEvent(name, callback)
  }
}
