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

为了能动态地从服务器加载并渲染文档，一个比较合理方法是通过异步的网络请求，如AJAX等。这里我采用的是[axios库](https://www.axios.com/)，配置如下。

```javascript
// in main.js
import Axios from 'axios'
Vue.prototype.$axios = Axios
Axios.get(/*some url*/).then(res => {
  let data = res.data		// GET返回的数据
}).catch(err => {
  // 处理错误
})
```

## 博客文件结构

webpack在打包时会将`./public`文件夹下的文件全部原封不动地打包进入目标文件夹中。这些文件实际上是网站的资源文件，可以直接通过GET请求文件名来获取。则将需要随时改变的文章和配置放在这个文件夹中可以实现不改变网站代码（无需重新编译）的基础上增删改文章、改变一些网站配置。

在`./public`文件夹下，我个人采用了以下的文件结构来保存文章和配置信息。

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

那么在应用的入口点`main.js`中，可以利用Axios先GET到`./info`文件夹下的三个文件，将相关配置加载进store中，并利用`vuex-persistedstate`插件将数据存入locoal storage。这样做比较方便对站点的资源和信息进行修改。

当进入blog页面时，同理根据url参数加载对应的`.md`文档，然后进行渲染。

## 适配自定义组件

在之前两篇文章中，我给出了基于CodeMirror的代码显示/编辑组件和基于Markdown-it的Markdown显示组件。后者在应用于动态加载.md文件时需要经过一些修改。

首先，需要通过Axios GET请求引入需要加载的md文件。

```javascript
// 假设someVar能指示md文件的编号，如1，2，3
this.$axios.get('/docs/' + someVar + '/index.md').then(res => {
  this.raw = res.data	// 这里得到的是.md纯文本
  this.tokens = this.$mkd.parse(this.raw, {})
})
```

然后，在编译.md文章并渲染时，也需要针对其中的图像链接等做出翻译，本站在编译时，规定md文件中相对路径的图片链接，如

```markdown
![picture](./somepic.png)
```

会使用类似于下列的渲染函数来进行渲染

```javascript
// 假设createElement为Vue渲染函数的参数，imgSrc = './somepic.png'，index为文章编号
if (imgSrc[0] === '.') {
  imgSrc = '/doc/' + index + imgSrc.slice(1)
}
let node = createElement(
  'img',
  attrs: { src: imgSrc }
)
```


## 使用Vuetify

[Vuetify](https://vuetifyjs.com/zh-Hans)是一个非常好用的前端UI库，它的一大亮点是能够比较轻松地完成对不同屏幕的适配。本站所有UI组件几乎都是Vuetify组件的常见用法，在此不做进一步展开。

如果使用Vue-cli，那么在项目中引入Vuetify是非常简单的，Vuetify官网上也有非常详细的介绍。

![Vue](./logo.webp)