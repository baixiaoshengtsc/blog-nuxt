import { GeneralFunction } from "bean/base"
import { EditorToolbar } from "./editorConfig"
const baseUrl = '/img/'
interface configItem {
  title: string
  src: string
  handle: GeneralFunction
  type?: 'upload'
  children?: any[]
}
const createToolbarConfig = (toolbar: EditorToolbar):configItem[] => {
  return  [
    {
      title: '标题',
      src: baseUrl + '标题.svg',
      handle: (v) => toolbar.addTitle(v),
      children: [
        {
          title: '一级标题',
          value: '1'
        },
        {
          title: '二级标题',
          value: '2'
        },
        {
          title: '三级标题',
          value: '3'
        },
        {
          title: '四级标题',
          value: '4'
        },
        {
          title: '五级标题',
          value: '5'
        },
        {
          title: '六级标题',
          value: '6'
        },
      ],
    },
    {
      title: '粗体',
      src: baseUrl + '粗体.svg',
      handle: () => toolbar.addStrong()
    },
    {
      title: '斜体',
      src: baseUrl + '斜体.svg',
      handle: () => toolbar.addItalic()
    },
    {
      title: '引用',
      src: baseUrl + '引用.svg',
      handle: () => toolbar.addQuote()
    },
    {
      title: '链接',
      src: baseUrl + '链接.svg',
      handle: () => toolbar.addLink()
    },
    {
      title: '图片',
      src: baseUrl + '图片.svg',
      type: 'upload',
      handle: (url, name) => toolbar.uploadImg(url, name)
    },
    {
      title: '代码',
      src: baseUrl + '代码.svg',
      handle: () => toolbar.addCode()
    },
    {
      title: '代码块',
      src: baseUrl + '代码块.svg',
      handle: () => toolbar.addCodeBlock()
    },
    {
      title: '无序列表',
      src: baseUrl + '无序列表.svg',
      handle: () => toolbar.addUnOrderList()
    },
    {
      title: '有序列表',
      src: baseUrl + '有序列表.svg',
      handle: () => toolbar.addOrderList()
    },
    {
      title: '删除线',
      src: baseUrl + '删除线.svg',
      handle: () => toolbar.addDeleteLine()
    },
    {
      title: '任务列表',
      src: baseUrl + '任务列表.svg',
      handle: () => toolbar.addTodo()
    },
    {
      title: '表格',
      src: baseUrl + '表格.svg',
      handle: () => toolbar.addForm()
    },
    {
      title: '对齐',
      src: baseUrl + '对齐.svg',
      handle: (v) => toolbar.addAlign(v),
      children: [
        {
          title: '左对齐',
          value: 'left'
        },
        {
          title: '居中对齐',
          value: 'center'
        },
        {
          title: '右对齐',
          value: 'right'
        }
      ]
    },
    {
      title: '图片缩放',
      src: baseUrl + '图片缩放.svg',
      handle: (v) => toolbar.addImgTrans(v),
      children: [
        {
          title: '缩放30%',
          value: '30%'
        },
        {
          title: '缩放50%',
          value: '50%'
        },
        {
          title: '缩放75%',
          value: '75%'
        },
        {
          title: '缩放100%',
          value: '100%'
        },
      ]
    },
    {
      title: '公式',
      src: baseUrl + '公式.svg',
      handle: toolbar.addStrong
    },

  ]
}
export {createToolbarConfig}