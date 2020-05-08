(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{161:function(t,n,e){"use strict";e.d(n,"a",(function(){return r})),e.d(n,"b",(function(){return o}));var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"java-tab"},[e("div",{staticClass:"md-title"},[t._v("Java")]),t._v(" "),e("md-content",{staticClass:"md-elevation-1"},[e("codemirror",{attrs:{value:t.outputCode,options:t.editorOptions}}),t._v(" "),e("md-button",{staticClass:"md-primary",on:{click:function(n){return t.$emit("copy-output-code",t.outputCode)}}},[t._v("copy")])],1)],1)},o=[];r._withStripped=!0},72:function(t,n,e){"use strict";e.r(n);var r=e(161),o=e(95);for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);var i=e(0),u=Object(i.a)(o.default,r.a,r.b,!1,null,null,null);u.options.__file="src/components/JavaCodeTab.vue",n.default=u.exports},95:function(t,n,e){"use strict";e.r(n);var r=e(96),o=e.n(r);for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);n.default=o.a},96:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t},o=e(4);e(104),n.default={name:"JavaCodeTab",data:function(){return{editorOptions:{mode:"text/x-java",tabSize:2,lineWrapping:!0,lineNumbers:!0,autoRefresh:!0}}},computed:r({},(0,o.mapGetters)(["inputData"]),{computedHttpBodyStr:function(){var t=this.inputData,n=t.method,e=t.requestBody;return"GET"!==n&&e?"\n\t\t\tString requestBody = "+JSON.stringify(e)+";\n\t\t\tconnection.setDoOutput(true);\n\t\t\tDataOutputStream wr = new DataOutputStream(connection.getOutputStream());\n\t\t\twr.writeBytes(requestBody);\n\t\t\twr.flush();\n\t\t\twr.close();":""},computedHeaderStr:function(){var t=this,n=Object.keys(this.inputData.requestHeaders);return n.length>0?"\n\t\t\t"+n.map((function(n){return'connection.setRequestProperty("'+n+'", "'+t.inputData.requestHeaders[n]+'");'})).join("\n\t\t\t"):""},outputCode:function(){return'import java.io.DataOutputStream;\nimport java.io.BufferedReader;\nimport java.io.InputStreamReader;\nimport java.net.URL;\nimport java.net.HttpURLConnection;\n\npublic class Main {\n\tpublic static void main(String[] args) {\n\t\ttry {\n\t\t\tURL url = new URL("'+this.inputData.fetchUrl+'");\n\t\t\tHttpURLConnection connection = (HttpURLConnection) url.openConnection();\n\t\t\tconnection.setRequestMethod("'+this.inputData.method+'");'+this.computedHeaderStr+this.computedHttpBodyStr+"\n\t\t\tBufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));\n\t\t\tString inputLine;\n\t\t\tStringBuffer response = new StringBuffer();\n\t\t\twhile ((inputLine = in.readLine()) != null) {\n\t\t\t\tresponse.append(inputLine);\n\t\t\t}\n\t\t\tin.close();\n\t\t\tSystem.out.println(response.toString());\n\t\t} catch (Exception e) {\n\t\t\t// TODO: handle exception\n\t\t}\n\t}\n}"}})}}}]);