(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6132fe7c"],{"8ce9":function(t,e,r){},bb51:function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"home"},[r("div",[r("v-img",{attrs:{eager:"",height:"360px",src:t.$store.state.src.banner.url}},[r("v-row",{staticClass:"fill-height",attrs:{align:"end",justify:"end"}},[r("v-col",{attrs:{cols:"4"}},[r("div",{staticClass:"title white--text d-block"},[t._v(t._s(t.$store.state.src.banner.title))]),r("div",{staticClass:"subtitle-1 white--text d-block"},[t._v(t._s(t.$store.state.src.banner.subtitle))])])],1)],1)],1),r("div",{staticClass:"display-1 mt-6 d-flex justify-center"},[t._v("某三篇文章")]),r("div",{staticClass:"headline d-flex justify-center"},[r("v-icon",[t._v("mdi-arrow-down")]),t._v("Some Featured Article (x3)")],1),r("v-row",{staticClass:"ma-4"},t._l(t.$store.getters.featured,(function(e,s){return r("v-col",{key:s,attrs:{cols:12,md:4}},[r("v-card",{staticStyle:{cursor:"pointer"},attrs:{hover:"",to:"/blog/"+e.index}},[r("v-card-title",[t._v(t._s(e.title))]),r("v-card-subtitle",[t._v(t._s(e.dateTime))]),r("v-card-text",[r("div",{staticClass:"d-flex flex-column justify-space-between",staticStyle:{"min-height":"160px"}},[r("div",[t._v(t._s(e.subTitle))]),r("div",t._l(e.keywords,(function(s,a){return r("v-chip",{key:a,staticClass:"mr-1 mb-1 white--text",attrs:{label:"",light:"",color:e.color}},[t._v(t._s(s))])})),1)])])],1)],1)})),1),r("div",{staticClass:"d-flex justify-center"},[r("v-btn",{staticClass:"title",attrs:{text:"",color:"primary",to:"/catalog"}},[t._v("《好 康 的》")]),r("v-divider",{attrs:{vertical:""}}),r("v-btn",{staticClass:"title",attrs:{text:"",color:"primary",to:"/profile"}},[t._v("《自 我 介 绍》")])],1)],1)},a=[],i={name:"home",data:()=>({})},c=i,l=r("2877"),n=r("6544"),o=r.n(n),d=r("8336"),v=r("b0af"),u=r("99d9"),b=r("cc20"),f=r("62ad"),p=r("ce7e"),h=r("132d"),y=r("adda"),m=r("0fd9"),w=Object(l["a"])(c,s,a,!1,null,null,null);e["default"]=w.exports;o()(w,{VBtn:d["a"],VCard:v["a"],VCardSubtitle:u["a"],VCardText:u["b"],VCardTitle:u["c"],VChip:b["a"],VCol:f["a"],VDivider:p["a"],VIcon:h["a"],VImg:y["a"],VRow:m["a"]})},ce7e:function(t,e,r){"use strict";var s=r("ade3"),a=(r("8ce9"),r("7560"));function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,s)}return r}function c(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){Object(s["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}e["a"]=a["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render(t){var e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:c({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:c({role:"separator","aria-orientation":e},this.$attrs),on:this.$listeners})}})}}]);