## Vue-cli3文件结构与资源加载

Vue-cli3采用babel + vuex + vue-router设置之后生成的项目结构大致如下

```
- project
	- vue.config.js
	- babel.config.js
	- package.json
	- src
		- assets
		- components
		- router
		- store
		- views
		- App.vue
		- main.js
	- public
```

为了动态加载.md文件，需要使用html-loader来将markdown文档加载为字符串，在使用npm安装依赖后，需要在vue.config.js中进行配置。

```javascript
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('html-loader')
      .loader('html-loader')
      .end()
  },
}
```

## 博客文件结构

在`./src/assets`文件夹下，我个人采用了以下的文件结构来保存文章和配置信息。

```
- doc
	- 1
		- index.md
		- somepic.png
	- 2
		- index.md
	- 3
	...
- info
	- articles.json		// 文章目录
	- profile.json		// 个人信息
	- src.json			  // 其他资源目录
```

那么在应用的入口点`main.js`中，可以先加载`./info`文件夹下的三个文件，将相关配置加载进store中，并利用`vuex-persistedstate`插件将数据存入locoal storage。这样做比较方便对站点的资源和信息进行修改。

但是比较麻烦的是，webpack会默认将这些文件打包进JS中，所以目前我没有找到办法在build完成后通过修改一些.json文件来改变网站上显示的信息。

## 适配自定义组件

在之前两篇文章中，我给出了基于CodeMirror的代码显示/编辑组件和基于Markdown-it的Markdown显示组件。后者在应用于动态加载.md文件时需要经过一些修改。

首先，需要通过`require()`语句引入需要加载的md文件。

```javascript
// 假设someVar能指示md文件的编号，如1，2，3
// 这个require写法必须含有显示写出的字符串，这样约定是为了让webpack知道到底预加载哪些资源
// .md后缀符合之前配置中的正则表达式test，因此webpack使用html-loader加载它，返回字符串
const raw = require('../assets/doc/' + someVar + '/index.md')
const tokens = MarkdownIt.parse(raw)	// 得到token流
```

在编译.md文章并渲染时，也需要针对其中的图像链接等做出翻译，本站在编译时，规定md文件中相对路径的图片链接，如

```markdown
![picture](./somepic.png)
```

会使用类似于下列的渲染函数来进行渲染

```javascript
// 假设createElement为Vue渲染函数的参数，imgSrc = './somepic.png'，index为文章编号1
if (imgSrc[0] === '.') {
  imgSrc = require('../assets/doc/' + index + imgSrc.slice(1))
}
let node = createElement(
  'img',
  attrs: { src: imgSrc }
)
```


## 使用Vuetify

[Vuetify](https://vuetifyjs.com/zh-Hans)是一个非常好用的前端UI库，它的一大亮点是能够比较轻松地完成对不同屏幕的适配。本站所有UI组件几乎都是Vuetify组件的常见用法，在此不做进一步展开。

如果使用Vue-cli，那么在项目中引入Vuetify是非常简单的，Vuetify官网上也有非常详细的介绍。

![Vue](./logo.png)