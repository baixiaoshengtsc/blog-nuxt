<template>
  <div class="preview">
    <section class="md-preview" v-html="formatDoc"></section>
  </div>
</template>
<script lang="ts" setup>
import marked from 'marked'
// hljs 按需加载
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import shell from "highlight.js/lib/languages/shell";
import json from "highlight.js/lib/languages/json";
import plaintext from "highlight.js/lib/languages/plaintext";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("html", html);
hljs.registerLanguage("css", css);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("json", json);
// @ts-ignore
hljs.registerLanguage("plaintext", plaintext);
// 皮肤
import "highlight.js/styles/atom-one-dark.css";

import { ref, watch, onMounted } from 'vue'
const props = defineProps(['doc'])
let doc = ref<string>('')
let formatDoc = ref('')
watch(props, () => {
  doc.value = props.doc
  // @ts-ignore
  formatDoc.value = marked(doc.value)
})

onMounted(()=>{
  setMarkedOptions()
})

const setMarkedOptions = () => {
  const renderer = new marked.Renderer();
  renderer.link = function customLink(href, title, text) {
    return `<a class="link" href="${href}" target="_blank" title="${text}">${text}</a>`;
  };
  renderer.image = function customImage(href, title, text) {
    return (
      `<a class="img-wrapper" href="${href}" target="_blank" title="${text}">` + `<img src="${href}" alt="${text}">` + "</a>"
    );
  };
  marked.setOptions({
    renderer,
    // @ts-ignore
    highlight: function (code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
  });
};
</script>
<style lang="less" scoped>
.preview {
  width: 100%;
  height: 100%;
}
</style>
<style lang="less" scoped src="./marked.less"></style>