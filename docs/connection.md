## 父子应用通信

解决方案：
    1. 事件发送方使用js自定义事件方法CustomEvent来定义事件，利用dispatchEvent派发
    2. 接收方利用addEventListener(IE使用attachEvent)接收事件
    
```
// 发送事件
export const sendEvent = (name, params) => {
  const event = new CustomEvent(name, {
    detail: params
  })
  window.dispatchEvent(event)
}
```

```
// 接收事件
window.addEventListener('token-error', (event) => {
  console.log(event.detail)
})
```
