(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{55:function(t,e,n){"use strict";n.r(e);var r=n(89),u=n(70);for(var i in u)"default"!==i&&function(t){n.d(e,t,function(){return u[t]})}(i);var o=n(0),a=Object(o.a)(u.default,r.a,r.b,!1,null,null,null);a.options.__file="src\\components\\CsharpCodeTab.vue",e.default=a.exports},69:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n(80),e.default={name:"CsharpCodeTab",props:{inputData:{type:Object,default:function(){return{}}}},data:function(){return{editorOptions:{mode:"text/x-csharp",tabSize:2,lineWrapping:!0,lineNumbers:!0,autoRefresh:!0}}},computed:{computedHttpBodyStr:function(){var t=this.inputData,e=t.method,n=t.requestBody;return"GET"===e?"":', new StringContent("'+n+'")'},computedHttpMethodStr:function(){var t=this.inputData.method;return t.substr(0,1)+t.substr(1).toLowerCase()},computedHeaderStr:function(){var t=this;return(Object.keys(this.inputData.requestHeaders).map(function(e){return'httpClient.DefaultRequestHeaders.Add("'+e+'", "'+t.inputData.requestHeaders[e]+'");'})||[""]).join("\n\t\t\t\t")},outputCode:function(){return"using System;\nusing System.Net.Http;\n\nnamespace Fetcher\n{\n\tclass Program\n\t{\n\t\tstatic void Main(string[] args)\n\t\t{\n\t\t\tusing (var httpClient = new HttpClient())\n\t\t\t{\n\t\t\t\t"+this.computedHeaderStr+"\n\t\t\t\tvar response = httpClient."+this.computedHttpMethodStr+'StringAsync(new Uri("'+this.inputData.fetchUrl+'")'+this.computedHttpBodyStr+").Result;\n\t\t\t\t// your code\n\n\t\t\t}\n\t\t}\n\t}\n}"}}}},70:function(t,e,n){"use strict";n.r(e);var r=n(69),u=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,function(){return r[t]})}(i);e.default=u.a},89:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"csharp-tab"},[n("div",{staticClass:"md-title"},[t._v("C#")]),t._v(" "),n("md-content",{staticClass:"md-elevation-1"},[n("codemirror",{attrs:{value:t.outputCode,options:t.editorOptions}}),t._v(" "),n("md-button",{staticClass:"md-primary",on:{click:function(e){t.$emit("copy-output-code",t.outputCode)}}},[t._v("copy")])],1)],1)},u=[];r._withStripped=!0,n.d(e,"a",function(){return r}),n.d(e,"b",function(){return u})}}]);