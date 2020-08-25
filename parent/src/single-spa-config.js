import * as singleSpa from 'single-spa';
import axios from 'axios';

/**
 * 加载子项目的js文件
 * @param url   js文件路径
 * @returns {Promise<unknown>}
 */
const runScript = async (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = resolve
    script.onerror = reject

    const firstScript =  document.getElementsByTagName('script')[0]
    firstScript.parentNode.insertBefore(script, firstScript)
  })
}

/**
 * 通过url去拿去子项目的stats.json文件获取子项目中的打包静态文件并进行加载，
 * 参数是拿取stats.json的url, 和需要加载stats.json中记录的那一份内容
 */
const getManifest = (url, bundle) => new Promise(async (resolve) => {
  const {data} = await axios.get(url);
  const {entrypoints, publicPath} = data;
  const assets = entrypoints[bundle].assets;
  for(let i = 0; i < assets.length; i++){
    await runScript(publicPath + assets[i]).then(() => {
      if(i === assets.length - 1){
        resolve()
      }
    })
  }
})

// 使用singleSpa.registerApplication()进行服务的注册
// 参数1: 注册服务的名称
// 参数2: 加载子项目中的文件(就是使用webpack打包好后的文件)
// 参数3: 调起该项目的加载路由
singleSpa.registerApplication('teacher', async () => {
  let app = null
  await getManifest('http://localhost:8081/stats.json','app').then(() => {
    app = window.teacher
  })
  return app
}, location => location.pathname.startsWith('/teacher'))

singleSpa.registerApplication('course', async () => {
  let app = null
  await getManifest('http://localhost:8082/stats.json','app').then(() => {
    app = window.course
  })
  return app
}, location => location.pathname.startsWith('/course'))

// 启动服务
singleSpa.start()
