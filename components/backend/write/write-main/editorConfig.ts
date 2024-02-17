import { basicSetup } from 'codemirror'
import { GeneralFunction } from 'bean/base'
import { EditorView, gutter, keymap } from '@codemirror/view'
import { EditorState, Facet, EditorSelection, Transaction, SelectionRange } from '@codemirror/state'
import { indentWithTab } from '@codemirror/commands'
import { markdown } from '@codemirror/lang-markdown'
import {languages} from '@codemirror/language-data'
import {javascript} from '@codemirror/lang-javascript'
// console.log('---',languages)
const markdownEx = markdown({
  codeLanguages:(value)=>{
    console.log('--cadeLanguages--',value)
    return javascript().language
  }
})

const customTheme = EditorView.theme({
  '&.cm-editor.cm-focused': {
    outline: "none"   //移除外边框线
  },
  '&.cm-editor': {
    padding: "16px 0px"
  },
  ".cm-line": {
    margin: "0 8px"
  },
  '&': {
    font: "16px Arial, monospace ",  //字体
  }
})

const tabSizeFacet = Facet.define<number, number>({
  combine: values => values[0], // 只取第一个值
});

const extensions = [
  basicSetup,
  customTheme,
  markdownEx,
  tabSizeFacet.of(8),
  keymap.of([indentWithTab]),
  gutter({
    class: 'display_none',
    renderEmptyElements: true
  })
]

interface editorConfig {
  target: Element | DocumentFragment
  doc?: string
  extensions?: typeof extensions
  update?: GeneralFunction
}

const createEditor = (config: editorConfig) => {
  const state = EditorState.create({
    doc: config.doc || 'Hello world',
    extensions: extensions.concat([
      EditorView.updateListener.of((v) => {
        config.update && config.update(v)
      }),
      EditorView.lineWrapping,
    ]).concat(config.extensions ? config.extensions : [])
  })

  let view = new EditorView({
    state,
    parent: config.target,
  })
  return view
}
/** changeByRange的工具 */
const byRange = (view: EditorView, fn: any) => {
  view.dispatch(
    view.state.changeByRange(range => {
      return fn(range.from, range.to, range.head, range.empty, range)
    })
  )
  setTimeout(()=>{ view.focus()})
}

/** 选定范围头尾插入标签 */
const insert = (view: EditorView, STag: string, ETag: string, needNewLine = false) => {
  let emptyUtil = (start: number) => {
    let tagF = STag + ETag
    let offSet = tagF.length -1
    if (needNewLine) {
      tagF = STag + '\n\n' + ETag
      offSet = STag.length+1
    }
    return {
      changes: [
        { from: start, insert: tagF }
      ],
      range: EditorSelection.cursor(start+offSet)
    }
  }
  let notEmptyUtil = (start: number, end: number) => {
    let tagS = STag
    let tagE = ETag
    let offsetS = STag.length
    let offsetE = ETag.length
    if (needNewLine) {
      tagS = STag + '\n  '
      tagE = '\n' + ETag
      offsetS +=1
      offsetE +=3
    }
    return {
      changes: [
        { from: start, insert: tagS },
        { from: end, insert: tagE }
      ],
      range: EditorSelection.range(start + offsetS, end + offsetE)
    }
  }
  byRange(view, (start: number, end: number, head: number, empty: boolean, range: any) => {
    // console.log('head', head)
    //     console.log('start', start)
    //     console.log('end', end)
    if (empty) {
      return emptyUtil(start)
    } else {
      return notEmptyUtil(start, end)
    }
  })
}

const insertHead = (view: EditorView, tag: string) => {
  byRange(view, (start: number, end: number, head: number, empty: boolean, range: any) => {
    const LINE = view.state.doc.lineAt(head)
    return {
      changes: [
        { from: LINE.from, insert: tag+' ' }
      ],
      range: EditorSelection.cursor(end + tag.length + 1)
    }
  })
}

const cursorFocus = (view: EditorView) => {
  view.focus()
}

class EditorToolbar {
  private view: EditorView

  constructor(view: EditorView) {
    this.view = view
  }
  /** 添加标题 */
  public addTitle(level: number =1) {
    const _this = this
    let tag = ''
    for(let i = 0;i<level;i++) {
      tag+='#'
    }
    insertHead(_this.view, tag)
    cursorFocus(_this.view)
  }
  /** 添加加粗  */
  public addStrong() {
    const _this = this
    insert(_this.view, '**', '**')
  }
  /** 添加斜体 */
  public addItalic() {
    const _this = this
    insert(_this.view, '*', '*')
  }
  /** 添加引用  */
  public addQuote() {
    const _this = this
    insertHead(_this.view, '> ')
    cursorFocus(_this.view)
  }
  /** 添加链接 */
  public addLink() {
    const _this = this
    insert(_this.view, '[](', ')')
  }
  /** 添加图片  */
  public uploadImg(url:string, name: string) {
    const _this = this
    const str = `![${name}](${url})`
    insertHead(_this.view, str)
    cursorFocus(_this.view)
  }
  /** 添加代码  */
  public addCode() {
    const _this= this
    insert(_this.view, '`', '`')
  }
  /** 添加代码块  */
  public addCodeBlock() {
    const _this = this
    insert(_this.view, '```', '```', true)
  }
  /** 无序列表  */
  public addUnOrderList() {
    const _this = this
    insertHead(_this.view, '- ')
    cursorFocus(_this.view)
  }
  /** 有序列表  */
  public addOrderList() {
    const _this = this
    insertHead(_this.view, '1. ')
    cursorFocus(_this.view)
  }
  /** 删除线  */
  public addDeleteLine() {
    const _this = this
    insert(_this.view, '~~', '~~')
  }
  /** 任务列表 */
  public addTodo() {
    const _this = this
    insertHead(_this.view, '- [ ] ')
    cursorFocus(_this.view)
  }
  /** 表格  */
  public addForm() {
    const _this = this
    const str = '| 标题 |  |\n| --- | --- |\n|  |  |'
    insertHead(_this.view, str)
    cursorFocus(_this.view)
  }
  /** 添加对齐  */
  public addAlign(type: 'left'|'right'|'center') {
    const _this = this
    const strS = `<p align=${type}>`
    const strE = '</p>'
    insert(_this.view, strS, strE)
  }
  /** 图片缩放  */
  public addImgTrans(scale: '30%'|'50%'|'75%'|'100%') {
    const _this = this
    const strS = `<img src="" alt="" width="${scale}" />`
    const strE = ''
    insert(_this.view, strS, strE)
  }
}


export { extensions, createEditor, EditorToolbar }