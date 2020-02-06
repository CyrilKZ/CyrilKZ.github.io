## 用Vue单文件组件封装CodeMirror

一个相对独立的Code Mirror组件需要基于下面这种html结构

```html
<div class="cm-container">
  <textarea id="cm-base"></textarea>
</div>
```

然后JavaScript脚本基于`textarea`节点生成code mirror节点，脚本会将`textarea`节点转化为`div`节点，并产生一系列子节点来显示行号、滚动条和代码块本身。

这部分代码如下

```javascript
import CodeMirror from 'codemirror'
const cmInstance = CodeMirror.fromTextArea(document.getElementById('cm-base'))
/* 
cmInstance.setOption(...)
...(设置属性)
*/
```

则可以将上面的html+JavaScript整合进一个Vue单文件组件中

```vue
<template>
  <div class="vue-cm">
    <textarea ref="cm-area"></textarea>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
export default {
  // 省略数据绑定
  data: () => ({
    cminstance: null
  })
  mounted () {
    this.initialize()
  }
  methods: {
    initialize () {
      this.cminstance = CodeMirror.fromTextArea(this.$refs['cm-area'])
    }
  }
}
</script>
```

## 双向绑定数据

为了能真正意义上使用这个组件，需要实现数据绑定。如果要将该组件用作输入组件（如代码编辑器）的话，还需要实现代码块代码数据的双向绑定。这里绑定用到的方法都是比较典型的，见[Vue官方文档](https://cn.vuejs.org/v2/guide/forms.html)。

```vue
<script>
// 省略import部分
export default {
  // 省略初始化部分
  props: {
    'value': {
      type: String
      default: ''
    },	// 为了使用Vue的v-model语法糖，这里需要用value作为变量名
    'height': {
      type: String
      default: 'auto'	
    },	// 将height单独分出来以便使用CodeMirror的setSize函数，而无需修改css
    'option': {
      type: Object,
      default: () => ({
        tabSize: 2,
        lineNumbers: true,
        line: true
      })
    },	// CodeMirror需要的Options
  },
  watch: {
    'value': function (newval, oldval) {
      if (oldval !== newval) {
        this.internal.value = newval
        this.cminstance.setValue(newval)
      }
    }
    // 其余同理
  },
  methods: {
    initialize () {
      this.cminstance = CodeMirror.fromTextArea(this.$refs['cm-area'])
      this.cminstance.on('change', (cminstance) => {
        if (this.$emit) {
          this.$emit('input', cminstance.getValue())
        }
      }
      // 作为编辑器，当文本被编辑时，不能修改父组件的数据（也就是和prop中value绑定的值）
      // 这也是使用v-model的自定义输入组件的常见绑定方式，即当值改变时$emit一个input事件
    }
  }
}
</script>
```

应注意到的是，CodeMirror的Options中包括了很多属性，一些常用的属性可以考虑单独拿出来作为一个prop进行绑定。这样不会增大太多复杂度，因为CodeMirror要设置option应该只有`setOption(key, value)`这么一个API，只能设置单个属性值。

## 动态加载mode和theme

CodeMirror使用不同的js文件对不同语言实现高亮，使用不同的css文件实现不同theme。在基本的应用场景中，需要引入可能用得到的全部高亮脚本和theme文件。这个工作基本要求组件的使用者自己完成，也就是说在已经封装好的Vue-Codemirror组件中外，还需要父组件从CodeMirror库中引入其他文件，子组件才能正常显示高亮和主题。

显然这样做是非常不“封装性”的，而且每次父组件需要在一开始就引入所有可能需要的模块，对于首屏加载时间非常不友好。为了解决这些问题，可以采用动态按需引入的方式。

### babel的动态引入支持

如果使用Babel构建Vue项目，那么可以使用`@babel/plugin-syntax-dynamic-import`插件来使用动态import。Webpack也有相应的插件。动态import返回一个promise，回调函数参数为加载的模块。

```javascript
const _module = () => import('some-module')
_module().then(module => {
  // do sth
})
```

### 在CodeMirror模块中

则当codemirror需要修改mode或theme时，可以

```vue
<script>
const importModeJS = () => import('codemirror/mode/javascript/javascript')
export default {
  props: {
    'mode': {
      type: String,
      default: 'javascript'
    }
  },
  watch: {
    'mode': function (newval, oldval) {
      if (newval === 'javascript') {
        importModeJS().then(_ => {
          this.cminstance.setOption('mode', newval)
        }).catch(() => {
          console.log('import failed')
        })
      }
    }
  }
}
// 这里只展示了较简单的代码
// 实际上还需要根据newval参数确定究竟使用哪一个模块的import函数
// theme的设置同理
</script>
```

当然对于CodeMirror模块本身和其所必需的`codemirror/lib/codemirror.css`和则没必要再使用动态加载，因为这两个模块是不可避免地要在首屏加载的。

