<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-02-08 17:49:01
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-02-10 20:31:32
 * @FilePath: \blog-nuxt\components\backend\write\write-main\editor.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="editor" ref="editor">
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed, watch} from 'vue'
import { EditorView } from '@codemirror/view'
import { extensions, createEditor, EditorToolbar } from './editorConfig'

const editor = ref()
let editorView = ref<EditorView>()
let doc = ref<string>('')
let lines = ref<number>()
const emit = defineEmits(['tell', 'change'])
watch(lines, ()=>{
})
watch(doc, ()=>{
  console.log('---', doc.value)
  // console.log('---',lines.value)
})

onMounted(() => {
  editorView.value = createEditor({
    doc: doc.value,
    target: editor.value,
    update: (v)=>{
      doc.value = v.state.doc.toString()
      emit('change', doc.value)
    }
  })
  let editorToolbar = new EditorToolbar(editorView.value as EditorView)
  emit('tell', editorToolbar)
})
onUnmounted(()=>{
  editorView.value?.destroy()
})
</script>

<style lang="less" scoped>
.editor {
  height: 100%;
  display: inline-block;
  width: 100%;
  overflow: auto;
  background-color: #fafbfc;
  border-right: 1px solid #ccc;

  :deep(.cm-gutters){
    display: none !important;
  }
}
.display_none {
  display: none !important;
}
</style>