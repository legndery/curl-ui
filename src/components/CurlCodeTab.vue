<template>
  <div class="curl-tab">
    <modal-direction v-model="modalOpen"></modal-direction>
    <div class="md-title">
      <span style="line-height:2">cURL</span>
      <md-button
        class="md-primary"
        style="margin:0;margin-left:20px"
        @click="openAuthModal"
      >Authenticate PKS</md-button></div>
    <div style="width:100%">
      <div class="grid-container">
        <div
          class="grid-item"
          style="margin-left:0"
        >
          <md-checkbox
            v-model="isKubectl"
            style="padding-top:16px"
          >Kubectl</md-checkbox>
        </div>
        <div class="grid-item">
          <md-field class="fetch-url-input">
            <label>context</label>
            <md-input v-model="kubeContext"></md-input>
          </md-field>
        </div>
        <div class="grid-item">
          <md-field class="fetch-url-input">
            <label>namespace</label>
            <md-input v-model="kubeNamespace" @change="getPods"></md-input>
          </md-field>
        </div>
        <div class="grid-item">
          <md-autocomplete
            v-model="kubePod"
            :md-options="pods"
            md-dense
            class="header-key-input"
          >
            <label>Pod</label>
          </md-autocomplete>
        </div>
      </div>
    </div>
    <md-checkbox
      v-model="isInsecure"
      class="insecure-toggle"
      title="Allow insecure server connections when using SSL"
    >insecure</md-checkbox>
    <md-checkbox
      v-model="copyToClip"
      class="copy-to-clip-toggle"
      title="copy response to clipboard (might not work in few systems)"
    >copy to clip</md-checkbox>
    <md-checkbox
      v-model="dumpHeaders"
      class="dump-headers-toggle"
    >dump-headers</md-checkbox>

    <md-content class="md-elevation-1">
      <codemirror
        :value="computedCurlCode"
        :options="editorOptions"
      ></codemirror>
      <md-button
        class="md-primary"
        @click="$emit('copy-output-code', computedCurlCode)"
      >copy</md-button>
      <md-button
        class="md-primary"
        @click="getCurlDataAndExecute"
      >Execute</md-button>
      <codemirror
        :value="curlRespComputed"
        :options="editorOptions"
      ></codemirror>
    </md-content>
  </div>
</template>

<script>

require('codemirror/mode/shell/shell');
import get from 'lodash/get';
import { mapGetters, mapActions } from 'vuex';
import ModalDirection from "./AuthModal.vue";

export default {
  name: 'CurlCodeTab',
  data: function () {
    return {
      modalOpen: false,
      kubeContext: "",
      kubeNamespace: "",
      kubePod: "",
      isKubectl: false,
      isInsecure: false,
      copyToClip: false,
      dumpHeaders: true,
      pods: [],
      editorOptions: {
        mode: 'text/x-sh',
        tabSize: 2,
        lineWrapping: true,
        lineNumbers: true,
        autoRefresh: true
      }
    };
  },
  computed: {
    ...mapGetters(['inputData', 'curlResponse']),
    computedHeadersStr: function () {
      const headers = Object.keys(this.inputData.requestHeaders);
      if (headers.length > 0) {
        return headers.reduce((accumulator, currentValue) => (
          accumulator + `-H "${currentValue}: ${this.inputData.requestHeaders[currentValue]}" `
        ), ' ');
      }
      return ' ';
    },
    computedRequestBodyStr: function () {
      let { requestBody = '' } = this.inputData;
      requestBody = requestBody.replace(/"/g, `\\"`);
      return (requestBody) ? (`-d "${requestBody}" `) : ('');
    },
    computedInsecureStr: function () {
      return (this.isInsecure) ? ('--insecure ') : ('');
    },
    computedDumpHeaderStr: function () {
      return (this.dumpHeaders) ? ('--dump-header - ') : ('');
    },
    computedCopyToClipStr: function () {
      const platform = (get(window, 'navigator.platform') || '').toLowerCase();
      let copyToClip = ' | clip';
      if (platform.includes('mac')) {
        copyToClip = ' | pbclip';
      }
      return (this.copyToClip) ? (copyToClip) : ('');
    },
    computedCurlCode: function () {
      let retStr = ``;
      if (this.isKubectl) {
        retStr = `kubectl --context ${this.kubeContext} -n ${this.kubeNamespace} exec -it ${this.kubePod} -- `
      }
      return `${retStr}curl ${this.computedInsecureStr}${this.computedDumpHeaderStr}-X${this.inputData.method}` +
        `${this.computedHeadersStr}${this.computedRequestBodyStr}"` +
        `${this.inputData.fetchUrl}"${this.computedCopyToClipStr}`;
    },
    curlRespComputed: function () {
      return this.curlResponse;
    }
  },
  methods: {
    getCurlDataAndExecute: function () {
      const code = this.computedCurlCode;
      this.setCurlCode(code)
      this.executeCurlRequest()
    },
    openAuthModal: function () {
      this.modalOpen = !this.modalOpen;
    },
    getPods: function () {
        console.log("efafe")
      const context = this.kubeContext;
      const namespace = this.kubeNamespace;
      if (context == "" || namespace == ""){
          return
      }
      fetch('/getpods', {
        headers: {
            'content-type':'application/json'
        },
        method: 'post',
        body: JSON.stringify({ context, namespace })
      })
        .then(resp => resp.json())
        .then(resp => {
            this.pods = resp.pods;
        })
        .catch(err=>{
            console.error(err);
        })
    },
    ...mapActions(['executeCurlRequest', 'setCurlCode', 'setCurlResponse'])
  },
  components: {
    ModalDirection
  }
};
</script>

<style lang="scss" scoped>
.output-code {
  padding: 10px;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.grid-item {
  margin: 10px;
}
</style>


