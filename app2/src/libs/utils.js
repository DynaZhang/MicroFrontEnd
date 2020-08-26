export const sendEvent = (name, params) => {
  const event = new CustomEvent(name, {
    detail: params
  })
  window.dispatchEvent(event)
}
