# 自动化引入子项目文件

在引入子项目中的js文件的时候都需要依次去调用多次的runScript()方法去引入文件，所以这里我们处理一下完成自动引入所有的文件

1. 在子项目中安装一个叫做stats-webpack-plugin的插件，并在webpack中进行配置。(这个插件的作用是能够在webpack打包的时候记录打包的文件，publicPath等等的信息，所以我们可以在父项目中通过子组件的这个项目其获知子项目中打包出了哪些文件)
```
plugins: [
	new StatsPlugin("stats.json", {
		chunkModules: false,
        entryPoints:true,
        source: false,
        chunks:false,
        modules: false,
        assets: false,
        children: false,
        exclude: [/node_modules/]
	})
]
```

2. 经过这个插件处理后打包出的项目中便会有一个stats.json的文件记录了打包信息，在父项目中去拿取子项目的这个文件完成所有js文件的自动引入
```
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
```

3. registerApplication()方法改造
```
singleSpa.registerApplication('app1', async () => {
  let app = null
  await getManifest('http://localhost:8081/stats.json','app').then(() => {
    app = window.singleVue
  })
  return app
}, location => location.pathname.startsWith('/app1'))
```

这样就完成了一个自动化加载子项目中所有打包的静态文件