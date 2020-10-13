import Vue from "vue"
import App from "./App"
import singleSpaVue from "single-spa-vue"

const options = {   // vue的配置参数
  el: "#speiyou-course",
  render: h => h(App)
}
const vueLifeCycles = singleSpaVue({
  Vue,
  appOptions: options
})
export const bootstrap = vueLifeCycles.bootstrap;
export const mount = vueLifeCycles.mount;
export const unmount = vueLifeCycles.unmount;
export default vueLifeCycles;
