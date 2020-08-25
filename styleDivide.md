## 样式隔离

主要是父应用与各个子应用、各个子应用之间避免样式污染

解决方案：子应用使用postcss的一个插件：postcss-selector-namespace。这个插件会把你项目里的所有css都会添加一个类名前缀。这样就可以实现命名空间隔离。

步骤：
1. 使用npm或yarn安装postcss-selector-namespace
2. 改造子应用vue.config.js文件
```
css: {
    extract: false,
    loaderOptions: {
      postcss: {
        plugins: [
          selectorNamespace({
            namespace(css) {
              /* 无需添加的样式 */
              if (css.includes("文件名称")) return "";
              return "xxxxx";    // 返回css选择器
            }
          })
        ]
      }
    }
  },
```
