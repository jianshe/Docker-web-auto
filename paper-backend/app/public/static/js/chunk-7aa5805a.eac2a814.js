(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7aa5805a"],{"16d8":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:t.id}})},a=[],o=i("db72"),r=(i("a7be"),i("44f8"),i("a6e0"),i("547e")),s=i.n(r),l={minHeight:"200px",previewStyle:"vertical",useCommandShortcut:!0,useDefaultHTMLSanitizer:!0,usageStatistics:!1,hideModeSwitch:!1,toolbarItems:["heading","bold","italic","strike","divider","hr","quote","divider","ul","ol","task","indent","outdent","divider","table","image","link","divider","code","codeblock"]},u={name:"MarkdownEditor",props:{value:{type:String,default:""},id:{type:String,required:!1,default:function(){return"markdown-editor-"+ +new Date+(1e3*Math.random()).toFixed(0)}},options:{type:Object,default:function(){return l}},mode:{type:String,default:"markdown"},height:{type:String,required:!1,default:"300px"},language:{type:String,required:!1,default:"en_US"}},data:function(){return{editor:null}},computed:{editorOptions:function(){var t=Object.assign({},l,this.options);return t.initialEditType=this.mode,t.height=this.height,t.language=this.language,t}},watch:{value:function(t,e){t!==e&&t!==this.editor.getValue()&&this.editor.setValue(t)},language:function(t){this.destroyEditor(),this.initEditor()},height:function(t){this.editor.height(t)},mode:function(t){this.editor.changeMode(t)}},mounted:function(){this.initEditor()},destroyed:function(){this.destroyEditor()},methods:{initEditor:function(){var t=this;this.editor=new s.a(Object(o["a"])({el:document.getElementById(this.id)},this.editorOptions)),this.value&&this.editor.setValue(this.value),this.editor.on("change",(function(){t.$emit("input",t.editor.getValue())}))},destroyEditor:function(){this.editor&&(this.editor.off("change"),this.editor.remove())},setValue:function(t){this.editor.setValue(t)},getValue:function(){return this.editor.getValue()},setHtml:function(t){this.editor.setHtml(t)},getHtml:function(){return this.editor.getHtml()}}},c=u,d=i("2877"),p=Object(d["a"])(c,n,a,!1,null,null,null);e["a"]=p.exports},"16e9":function(t,e,i){"use strict";var n=i("7c0d"),a=i.n(n);a.a},"333d":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[i("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,"page-sizes":t.pageSizes,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},a=[];i("c5f6");Math.easeInOutQuad=function(t,e,i,n){return t/=n/2,t<1?i/2*t*t+e:(t--,-i/2*(t*(t-2)-1)+e)};var o=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function r(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function s(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(t,e,i){var n=s(),a=t-n,l=20,u=0;e="undefined"===typeof e?500:e;var c=function t(){u+=l;var s=Math.easeInOutQuad(u,n,a,e);r(s),u<e?o(t):i&&"function"===typeof i&&i()};c()}var u={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&l(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&l(0,800)}}},c=u,d=(i("e498"),i("2877")),p=Object(d["a"])(c,n,a,!1,null,"6af373ef",null);e["a"]=p.exports},6724:function(t,e,i){"use strict";i("8d41");var n="@@wavesContext";function a(t,e){function i(i){var n=Object.assign({},e.value),a=Object.assign({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),o=a.ele;if(o){o.style.position="relative",o.style.overflow="hidden";var r=o.getBoundingClientRect(),s=o.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":(s=document.createElement("span"),s.className="waves-ripple",s.style.height=s.style.width=Math.max(r.width,r.height)+"px",o.appendChild(s)),a.type){case"center":s.style.top=r.height/2-s.offsetHeight/2+"px",s.style.left=r.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(i.pageY-r.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(i.pageX-r.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=a.color,s.className="waves-ripple z-active",!1}}return t[n]?t[n].removeHandle=i:t[n]={removeHandle:i},i}var o={bind:function(t,e){t.addEventListener("click",a(t,e),!1)},update:function(t,e){t.removeEventListener("click",t[n].removeHandle,!1),t.addEventListener("click",a(t,e),!1)},unbind:function(t){t.removeEventListener("click",t[n].removeHandle,!1),t[n]=null,delete t[n]}},r=function(t){t.directive("waves",o)};window.Vue&&(window.waves=o,Vue.use(r)),o.install=r;e["a"]=o},7456:function(t,e,i){},"7c0d":function(t,e,i){},"7c64":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container news"},[i("div",{staticClass:"filter-container"},[i("p",{staticClass:"title"},[t._v("新闻动态列表")]),t._v(" "),i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"Title"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleFilter(e)}},model:{value:t.listQuery.title,callback:function(e){t.$set(t.listQuery,"title",e)},expression:"listQuery.title"}}),t._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("Search")]),t._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("Add")])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list}},[i("el-table-column",{attrs:{label:"ID",prop:"id",align:"center",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[i("span",[t._v(t._s(n.id))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"Title","min-width":"150px"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[i("span",{staticClass:"link-type",on:{click:function(e){return t.handleUpdate(n)}}},[t._v(t._s(n.title))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"Date",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[i("span",[t._v(t._s(t._f("parseTime")(n.updatedAt,"{y}-{m}-{d} {h}:{i}:{s}")))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"views",align:"center",width:"95",prop:"views"}}),t._v(">\n    "),i("el-table-column",{attrs:{label:"Actions",align:"center",width:"230","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.handleUpdate(n)}}},[t._v("Edit")]),t._v(" "),i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(e){return t.handleDelete(n)}}},[t._v("Delete")])]}}])})],1),t._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total > 0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:limit":function(e){return t.$set(t.listQuery,"limit",e)},pagination:t.getList}}),t._v(" "),i("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"newsForm",attrs:{rules:t.rules,model:t.newsForm,"label-position":"left","label-width":"70px"}},[i("el-form-item",{attrs:{label:"标题",prop:"title"}},[i("el-input",{attrs:{placeholder:"请输入新闻标题（必填）"},model:{value:t.newsForm.title,callback:function(e){t.$set(t.newsForm,"title",e)},expression:"newsForm.title"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"内容",prop:"content"}},[i("markdown-editor",{ref:"markdownEditor",attrs:{options:{hideModeSwitch:!0,previewStyle:"tab"},height:"200px"},model:{value:t.newsForm.content,callback:function(e){t.$set(t.newsForm,"content",e)},expression:"newsForm.content"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("Cancel")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(e){"create"===t.dialogStatus?t.createData():t.updateData()}}},[t._v("Confirm")])],1)],1),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogPvVisible,title:"Reading statistics"},on:{"update:visible":function(e){t.dialogPvVisible=e}}},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.pvData,border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{prop:"key",label:"Channel"}}),t._v(" "),i("el-table-column",{attrs:{prop:"pv",label:"Pv"}})],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogPvVisible=!1}}},[t._v("Confirm")])],1)],1)],1)},a=[],o=i("db72"),r=i("b775");function s(t){return Object(r["a"])({url:"/news/list",method:"get",params:t})}function l(t){return Object(r["a"])({url:"/news/create",method:"post",data:t})}function u(t){return Object(r["a"])({url:"/news/update",method:"post",data:t})}function c(t){return Object(r["a"])({url:"/news/delete",method:"get",params:t})}var d=i("6724"),p=i("ed08"),m=i("333d"),f=i("16d8"),h=i("2f62"),g={name:"ComplexTable",components:{Pagination:m["a"],MarkdownEditor:f["a"]},directives:{waves:d["a"]},filters:{statusFilter:function(t){var e={published:"success",draft:"info",deleted:"danger"};return e[t]}},data:function(){return{list:[],total:0,listLoading:!0,listQuery:{page:1,limit:20},newsForm:{id:"",title:"",content:""},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑新闻信息",create:"添加新闻信息"},dialogPvVisible:!1,pvData:[],rules:{title:[{required:!0,message:"请填写新闻标题",trigger:"blur"}],content:[{required:!0,message:"content is required",trigger:"blur"}]},downloadLoading:!1}},computed:Object(o["a"])({},Object(h["b"])(["username","userId"])),created:function(){this.getList()},mounted:function(){},methods:{getList:function(){var t=this;this.listLoading=!0,this.listQuery.userId=this.userId,s(this.listQuery).then((function(e){if(0===e.code){var i=e.data.news;i&&i.length>0&&(t.list=i,t.total=e.data.count)}setTimeout((function(){t.listLoading=!1}),0)}))},handleFilter:function(){this.listQuery.page=1,this.getList()},resetNewsForm:function(){this.newsForm.id="",this.newsForm.title="",this.newsForm.content=""},handleCreate:function(){var t=this;this.resetNewsForm(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs["newsForm"].clearValidate()}))},createData:function(){var t=this;this.$refs["newsForm"].validate((function(e){e&&(t.newsForm.username=t.username,l(t.newsForm).then((function(e){e&&0===e.code&&(t.dialogFormVisible=!1,t.$message({title:"Success",message:"Created Successfully",type:"success",duration:2e3}),t.getList())})))}))},handleDelete:function(t){var e=this;this.$confirm("此操作将永久删除该条信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var i={id:t.id,userId:t.id,username:e.username};c(i).then((function(t){t&&0===t.code?(e.$message({type:"success",message:"删除成功"}),setTimeout((function(){e.getList()}),0)):e.$message({type:"error",message:"您无权删除此数据"})}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},handleUpdate:function(t){var e=this;this.newsForm.id=t.id,this.newsForm.title=t.title,this.newsForm.content=t.content,this.newsForm.userId=t.userId,this.newsForm.username=this.username,this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs["newsForm"].clearValidate()}))},updateData:function(){var t=this;this.$refs["newsForm"].validate((function(e){e&&u(t.newsForm).then((function(e){e&&0===e.code&&(t.dialogFormVisible=!1,t.$message({title:"Success",message:"Update Successfully",type:"success",duration:2e3}),t.getList())}))}))},formatJson:function(t,e){return e.map((function(e){return t.map((function(t){return"timestamp"===t?Object(p["b"])(e[t]):e[t]}))}))}}},v=g,w=(i("16e9"),i("2877")),b=Object(w["a"])(v,n,a,!1,null,null,null);e["default"]=b.exports},"8d41":function(t,e,i){},e498:function(t,e,i){"use strict";var n=i("7456"),a=i.n(n);a.a}}]);