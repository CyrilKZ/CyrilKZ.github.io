## Markdown-it的使用

[Markdown-it](https://markdown-it.docschina.org/api/MarkdownIt.html)提供了一系列接口，可以将Markdown文档渲染为html节点。其中，`parse()`方法将MD文档编译为html Token流，然后`render()`方法根据这个Token流可以生成相应的html节点。

`parse()`方法返回一个Token流数组，但是不返回AST。因此如果要自定义html dom树的渲染方式，需要手动根据Token流生成一个AST。

## 渲染为Vue组件

之所以不直接使用Markdown-it的`render()`方法渲染html，是为了直接使用Vue的[渲染函数](https://cn.vuejs.org/v2/guide/render-function.html)来进行渲染。另外，为了能更好的显示文章中的代码块，需要使用另一篇文章中提到的[CodeMirror组件](../blog/1)。

### 算法思路

Token数组中的Token可以转化为html dom树结构。一个dom节点由一组token组成，如一个最小的`p`元素节点可以包括`paragraph_open`，`inline`和`paragraph_close`三个Token。节点和Token大概符合几条规律：

* 一些节点包括open和close token，如上文中的open和close分别代表html的`<p>`和`</p>`；
* 在上述这类节点中，在open和close token中可以包括其他的open+close结构，即子节点；
* 上述这类节点在无子节点时，open与close之间会有一个`inline`token，其中保存的是一个完整的文段，而`inline`标签的子节点主要是强调词、行内链接、图片等等；
* 另外一些节点，如`fence`没有open和close标签，这种节点不需要考虑子节点。

根据这些规律，可以得到渲染算法的大致思路：

* 渲染算法是一个递归算法，遇到open标签时入栈，遇到close标签时生成节点信息并退栈；
* 遇到`inline`时对于其`children`数组调用专用的另一组递归函数，大体思路同上；
* 遇到无需open和close的标签，直接生成节点，无需进行栈操作。

### 配合Vue的渲染函数

假设在一个Vue单文件组件中进行渲染，那么只需要3个递归渲染函数。

```vue
<script>
export default {
  render: function (createEl) {
    // 将Vue给出的渲染函数createEl传递给递归栈，这样可以直接返回Vue节点
    // 由于这里涉及到将数组转化为树，则需要传递一个扫描位置参数index
    // 在递归过程中维护这个index，则可以知道数组中的哪些token已经属于别的节点了
    return this.createTag(createEl, 'div', '', 0, this.tokens, {})[1]
  },
  methods: {
    createTag (createEl, tag, type, start, tokens, attr) {
      // 返回扫描后的index位置，和得到的节点
      let children = []
      let i = start
      for (; i < tokens.length; ++i) {
        if (tokens[i].nesting === 1) {
          // tag opening
          let temp = this.createTag(
            createEl,
            tokens[i].tag,
            tokens[i].type,
            i + 1,
            tokens,
            tokens[i].attr
          )
          i = temp[0]
          children.push(temp[1])
        } else if (tokens[i].nesting === 0) {
          if (tokens[i].type === 'inline') {
            // 将inline的内容作为这个节点的children
            children = this.createInline(createEl, tokens[i])
          } else if (tokens[i].type === 'fence') {
            children.push(createEl(
              // CodeDisplay为一个自定义的基于CodeMirror的Vue组件，见上文
              CodeDisplay,
              {
                props: {
                  value: tokens[i].content.slice(0, tokens[i].content.length - 1),
                  options: this.cmOptions,
                  theme: this.theme,
                  mode: tokens[i].info.replace(' ', '')
                }
              }
            ))
          } else {
            throw SyntaxError('Unsupported tag')
          }
        } else {
          break
        }
      }
      return [i, createEl(tag, {}, children)]
    },
    createInline (createEl, node) {
      // 根据inline中children的内容生成一系列的节点并返回它们
      // 虽然逻辑上这里应该返回的是“一个节点”，但是html并没有inline标签这么回事
      // 因此这里返回的是逻辑上的父节点的子节点的子节点们，对应html中父节点的子节点们
      const res = []
      const children = node.children
      for (let i = 0; i < children.length; ++i) {
        if (children[i].nesting === 1) {
          // tag start
          let temp = this.createInlineTag(
            createEl,
            children[i].tag,
            children[i].type,
            i + 1,
            children,
            children[i].attrs
          )
          i = temp[0]
          res.push(temp[1])
        } else if (children[i].nesting === 0) {
          if (children[i].type === 'text') {
            // “裸”的文字
            res.push(children[i].content)
          } else if (children[i].type === 'image') {
            // 这里需要对img的路径进行一定处理
            res.push(createEl('img'/*, { attrs: attributes }*/))
          } else {
            res.push(createEl(children[i].tag, {}, children[i].content))
          }
        } else {
          // all the 'close's are supposed to be consumed, throw err here
          throw SyntaxError('Unmatched close tag')
        }
      }
      return res
    },
    createInlineTag (createEl, tag, type, start, tokens, attr) {
      // inline节点的children中的节点，这里有对应的html，因此返回的也是单个节点和index位置
      const children = []
      // handle img and link attributes here
      let attributes = {}
      if (attr) {
        // 这里需要处理一些路径问题
      }
      // recursive handle others here
      let i = start
      for (; i < tokens.length; ++i) {
        if (tokens[i].nesting === 1) {
          // sub-tag start
          let temp = this.createInlineTag(
            createEl,
            tokens[i].tag,
            tokens[i].type,
            i + 1,
            tokens,
            tokens[i].attrs
          )
          i = temp[0]
          children.push(temp[1])
        } else if (tokens[i].nesting === 0) {
          if (tokens[i].type === 'text') {
            children.push(tokens[i].content)
          } else {
            children.push(createEl(tokens[i].tag, {}, tokens[i].content))
          }
        } else {
          // 'close' tags, break
          // if the tags dont match, ignore the mismatch and return
          // leaving the error to the caller
          break
        }
      }
      return [i, createEl(tag, { attrs: attributes }, children)]
    }
  }
}
</script>
```

### 局限

上文中的代码只是一个思路展示。用JavaScript写这个东西的麻烦之处就在于指针和引用没有C/C++用起来顺手，而且本人JS基础奇差无比（基本没学过），但是前端渲染又很难不用JS。另外我在写这个东西的时候也考虑过好好研究一下Markdown-it的渲染，而不是自造一套递归渲染方法，但是总感觉我能找到的demo中`MarkdownIt.render()`都对Vue渲染函数不太友好，最后还是自己写了（实际上写一套垃圾递归函数也不难）。