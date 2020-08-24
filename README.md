# 此demo是将single-spa微前端框架运用到Vue项目中

"微前端构架"是一种使用微服务模式构建前端应用的方式，微前端中的理念是将一组组服务拆分成相互解耦的模块，然后通过一个统一的父模块进行整体的调度。同时在微前端的架构中，我们可以同时使用React, Vue, Angular，甚至是原生的Js,Jquery开发的应用都可以通过微前端进行调度。

#### 微前端框架核心实现

![微前端框架核心实现](https://img-blog.csdnimg.cn/20200510190408807.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0NzQ2MTMy,size_16,color_FFFFFF,t_70)

#### 整体调度
![整体调度](https://img-blog.csdnimg.cn/20200510190408805.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0NzQ2MTMy,size_16,color_FFFFFF,t_70)

#### 工作状态
![工作状态](https://img-blog.csdnimg.cn/20200510190408794.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0NzQ2MTMy,size_16,color_FFFFFF,t_70)


## single-spa如何应用到微前端
1. 开始前需要先使用Vue-cli脚手架搭建多个Vue项目(创建的项目需要包含Vue-Router的路由机制)
2. 将一个Vue的项目（parent）作为整体调度的父项目，用来完成整个服务的调度

### 父项目改造
1. 配置父项目中的路由：（注意： 父项目中的路由配置中不用配置Component,因为它只是完成一个整体的调度，没有具体的组件，只需要配置path和name属性即可。同时这里设置了路由模式为: history）
```
export default [
  {
    name: 'app1',
    path: '/app1'
  },
  {
    name: 'app2',
    path: '/app2'
  },
]
```
2. 在App.vue(或其他vue文件中)创建一个子节点用来挂载子应用
```
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>
```

3. 在src文件中创建single.config.js，同时在main.js中执行
```
import * as singleSpa from "single-spa"

/**
 * 加载子项目的js文件
 * @param {string} url 加载js的url路径 
 */
const runScript = (url) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        const firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode.insertBefore(script, firstScript)
    })
}

// 使用singleSpa.registerApplication()进行服务的注册 
// 参数1: 注册服务的名称
// 参数2: 加载子项目中的文件(就是使用webpack打包好后的文件)
// 参数3: 调起该项目的加载路由
singleSpa.registerApplication(
    'app1',
    async () => {
        await runScript("http://127.0.0.1:8081/js/chunk-vendors.js")
        await runScript("http://127.0.0.1:8081/js/app.js");
        return window.singleVue;
    },
    location => location.pathname.startsWith("/app1")
)
//启动服务
singleSpa.start()
```

### 子项目改造
1. 子项目中的路由只需要按照正常的项目配置即可
2. npm安装single-app-vue进行vue项目的微前端配置: 将Vue实例的所有的配置参数抽离为一个对象交由single-spa-vue处理，同时需要导出生命周期： bootstrap,mount,unmount方法
```
import Vue from "vue"
import App from "./App"
import singleSpaVue from "single-spa-vue"

const options = {   // vue的配置参数
  el: "#vue",
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
```
3. 更改子项目的webpack配置(vue.config.js)，使其导出的是一个库文件(Library),同时需要更改publicPath的配置，使得子项目切换时不会出现文件引入路径的错误
```
module.exports = {
	// 指定publicPath保证请求资源路径正确
    publicPath: "//localhost:8081/",
    // css在所有环境下，都不单独打包为文件。这样是为了保证最小引入（只引入js）
    css: {
        extract: false
    },
    configureWebpack: {
        devtool: 'none', // 不打包sourcemap
        output: {     // 重点： 将其导出为library库文件
            library: "singleVue", // 导出名称
            libraryTarget: "window", //挂载目标
        }
    },
    devServer: {
        contentBase: './',
        compress: true,
    }
}
```



