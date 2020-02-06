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

在默认的配置下，vue-cli3（采用webpack）在编译打包时会将`./public`文件下的文件原封不动地打包到目标文件夹下，而`./src/assets`文件夹下的文件会在预处理后再行打包，文件在打包前后可能产生变化甚至不作为单独文件存放。因此，对于一个个人博客系统来说，如果想在build完成后更新文章、目录而不重新build整个项目，就不能把相关资源配置文件放进`./src/assets`中。一个做法是将这些文件放入`./public`中，这样就可以在只修改资源文件和博客配置文件时不必重新build。

同时，为了动态加载.md文件，需要使用html-loader来将markdown文档加载为字符串，在使用npm安装依赖后，需要在vue.config.js中进行配置。

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

在`./public`文件夹下，我个人采用了以下的文件结构来保存文章和配置。

```
- doc
	- 1
		- index.md
		- somepic.png
	- 2
		- index.md
	- 3
	...
- img
	- banner.png			// 主页banner
	- wechat.png			// 之后用得到的资源
- info
	- articles.json		// 文章目录
	- profile.json		// 个人信息
	- src.json			  // 其他资源目录
```

那么在应用的入口点`main.js`中，可以先加载`./info`文件夹下的三个文件，将相关配置加载进store中，并利用`vuex-persistedstate`插件将数据存入locoal storage。

博客的vue代码部分只负责显示和路由逻辑，而其中需要展示的数据都写在上述这些经过编译后不会发生变化的文件中。这样在整个app被build并deploy后，想要修改其中的数据只需要修改这些文件即可。

## 适配自定义组件

在之前两篇文章中，我给出了基于CodeMirror的代码显示/编辑组件和基于Markdown-it的Markdown显示组件。后者在应用于动态加载.md文件时需要经过一些修改。

首先，需要通过`require()`语句引入需要加载的md文件。

```javascript
// 假设someVar能指示md文件的编号，如1，2，3
// 这个require写法必须含有显示写出的字符串，这样约定是为了让webpack知道到底预加载哪些资源
// .md后缀符合之前配置中的正则表达式test，因此webpack使用html-loader加载它，返回字符串
const raw = require(/*注意这里不一定是'./'，更有可能是'../'*/'./public/doc/' + someVar + '/index.md')
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
  imgSrc = require('../../public/doc/' + index + imgSrc.slice(1))
}
let node = createElement(
  'img',
  attrs: { src: imgSrc }
)
```

