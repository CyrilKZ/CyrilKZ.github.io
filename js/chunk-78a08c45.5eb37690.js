(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78a08c45"],{"3ad6":function(e,t,n){"use strict";n.r(t);n("4160"),n("fb6a"),n("159b");var i,a,l=n("b3b5"),s={components:{CodeDisplay:l["a"]},created:function(){this.raw=n("cad9");var e=this.$mkd.parse(this.raw,{});this.tokens=e},data:function(){return{path:"../assets/hello",vuetify:!0,name:"",title:"",time:"2020-01-23",raw:"",content:'<h1>title</h1>\n<CodeDisplay v-model="time"></CodeDisplay>',cmOptions:{tabSize:2,lineNumbers:!0,line:!0,readOnly:"nocursor"},theme:"material",tokens:[]}},render:function(e){return this.createTag(e,"div","",0,this.tokens,{})[1]},methods:{createTag:function(e,t,n,i,a,s){for(var r=[],c=i;c<a.length;++c)if(1===a[c].nesting){var o=this.createTag(e,a[c].tag,a[c].type,c+1,a,a[c].attr);c=o[0],r.push(o[1])}else{if(0!==a[c].nesting)break;if("inline"===a[c].type)r=this.createInline(e,a[c]);else{if("fence"!==a[c].type)throw SyntaxError("Unsupported tag");r.push(e(l["a"],{props:{value:a[c].content,options:this.cmOptions,theme:this.theme,lang:a[c].info}}))}}return[c,e(t,{},r)]},createInline:function(e,t){for(var n=this,i=[],a=t.children,l=0;l<a.length;++l)if(1===a[l].nesting){var s=this.createInlineTag(e,a[l].tag,a[l].type,l+1,a,a[l].attrs);l=s[0],i.push(s[1])}else{if(0!==a[l].nesting)throw SyntaxError("Unmatched close tag");"text"===a[l].type?i.push(a[l].content):"image"===a[l].type?function(){var t={};a[l].attrs.forEach((function(e){t[e[0]]=e[1]})),t["src"]&&"."===t["src"][0]&&(t["src"]=n.path+t["src"].slice(1)),i.push(e("img",{attrs:t}))}():i.push(e(a[l].tag,{},a[l].content))}return i},createInlineTag:function(e,t,n,i,a,l){var s=[],r={};l&&(l.forEach((function(e){r[e[0]]=e[1]})),r["src"]&&"."===r["src"][0]&&(r["src"]=this.path+r["src"].slice(1)));for(var c=i;c<a.length;++c)if(1===a[c].nesting){var o=this.createInlineTag(e,a[c].tag,a[c].type,c+1,a,a[c].attrs);c=o[0],s.push(o[1])}else{if(0!==a[c].nesting)break;"text"===a[c].type?s.push(a[c].content):"image"===a[c].type||s.push(e(a[c].tag,{},a[c].content))}return[c,e(t,{attrs:r},s)]}}},r=s,c=n("2877"),o=Object(c["a"])(r,i,a,!1,null,null,null);t["default"]=o.exports},b3b5:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vue-cm"},[n("textarea",{ref:"cm-area"})])},a=[],l=(n("4160"),n("b0c0"),n("d3b7"),n("159b"),function(){return n.e("chunk-2d0c8f68").then(n.t.bind(null,"56b3",7))}),s=function(){return n.e("chunk-76f1e290").then(n.t.bind(null,"a7be",7))},r=function(){return Promise.all([n.e("chunk-2d0c8f68"),n.e("chunk-2d22e119")]).then(n.t.bind(null,"f9d4",7))},c=function(){return Promise.all([n.e("chunk-2d0c8f68"),n.e("chunk-2d0cc019")]).then(n.t.bind(null,"4ba6",7))},o=function(){return Promise.all([n.e("chunk-2d0c8f68"),n.e("chunk-2d228d0c")]).then(n.t.bind(null,"db91",7))},u=function(){return Promise.all([n.e("chunk-2d0c8f68"),n.e("chunk-2d21e972")]).then(n.t.bind(null,"d5e0",7))},h=function(){return Promise.all([n.e("chunk-2d0c8f68"),n.e("chunk-2d0e1741"),n.e("chunk-2d22e119"),n.e("chunk-1e803b30")]).then(n.t.bind(null,"693d",7))},d=function(){return Promise.all([n.e("chunk-2d0c8f68"),n.e("chunk-2d0e1741")]).then(n.t.bind(null,"7b00",7))},f=function(){return Promise.all([n.e("chunk-2d0c8f68"),n.e("chunk-edc1ac9e")]).then(n.t.bind(null,"959b",7))},p=function(){return Promise.all([n.e("chunk-2d0c8f68"),n.e("chunk-2d0a3b02")]).then(n.t.bind(null,"02f0",7))},m=function(){return n.e("chunk-7719e908").then(n.t.bind(null,"d2e8",7))},v=function(){return n.e("chunk-773dd180").then(n.t.bind(null,"ebe1",7))},b=function(){return n.e("chunk-749835fa").then(n.t.bind(null,"5a25",7))},g=function(){return n.e("chunk-771b8f0b").then(n.t.bind(null,"d79d",7))},k={name:"codedisplay",props:{value:{type:String,default:""},lang:{type:String,default:null},height:{type:String,default:"auto"},theme:{type:String,default:"default"},options:{type:Object,default:function(){return{tabSize:2,lineNumbers:!0,line:!0}}}},data:function(){return{internal:{value:""},cminstance:null,modes:[{value:"css",alias:"Css",script:d},{value:"javascript",alias:"Javascript",script:r},{value:"html",alias:"XML/HTML",script:u},{value:"x-python",alias:"Python",script:o},{value:"x-vue",alias:"Vue",script:h},{value:"markdown",alias:"Markdown",script:f},{value:"x-objectivec",alias:"Objective-C",script:c},{value:"x-sh",alias:"Shell",script:p}],themes:[{name:"material",full:"material",loader:m},{name:"darker",full:"material-darker",loader:v},{name:"ocean",full:"material-ocean",loader:b},{name:"palenight",full:"material-palenight",loader:g},{name:"default",full:"default",loader:null}]}},mounted:function(){this.initialize()},watch:{value:function(e,t){t!==e&&this.internal.value!==e&&(this.internal.value=e,this.cminstance.setValue(e))},lang:function(e,t){t!==e&&this.loadMode()},height:function(e,t){t!==e&&this.cminstance.setSize(null,e)},theme:function(e,t){t!==e&&this.loadTheme()},options:function(e,t){t!==e&&this.loadOptions()}},methods:{initialize:function(){var e=this;this.internal.value=this.value,l().then((function(t){var n=t;s().then((function(t){e.cminstance=n.fromTextArea(e.$refs["cm-area"],e.options),e.cminstance.setValue(e.value),e.cminstance.setSize(null,e.height),e.cminstance.on("change",(function(t){e.internal.value=t.getValue(),e.$emit&&e.$emit("input",e.internal.value)})),e.loadMode(),e.loadOptions(),e.loadTheme()}))}))},loadMode:function(){var e=this,t="";this.lang&&(t=this.lang),this.cminstance.setOption("mode","text"),this.modes.forEach((function(n){n.alias.toLowerCase()!==t.toLowerCase()&&n.value.toLowerCase()!==t.toLowerCase()||n.script().then((function(){e.cminstance.setOption("mode","text/"+n.value)}))}))},loadOptions:function(){for(var e in this.options.mode=void 0,this.options.theme=void 0,this.options)void 0!==this.options[e]&&this.cminstance.setOption(e,this.options[e])},loadTheme:function(){var e=this,t="default";this.theme&&(t=this.theme),this.themes.forEach((function(n){n.name.toLowerCase()!==t.toLowerCase()&&n.full.toLowerCase()!==t.toLowerCase()||n.loader&&n.loader().then((function(){e.cminstance.setOption("theme",n.full)}))}))}}},y=k,w=n("2877"),x=Object(w["a"])(y,i,a,!1,null,"66c92f06",null);t["a"]=x.exports},cad9:function(e,t){e.exports="# Title\r\n\r\n## title2\r\n\r\nThis is a test page\r\n\r\n## title2\r\n\r\nThis is a **test** page\r\n\r\n![This is a test Pic](./logo.png)"}}]);
//# sourceMappingURL=chunk-78a08c45.5eb37690.js.map