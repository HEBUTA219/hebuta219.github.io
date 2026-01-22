import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '指南', link: '/notes/docs/README.md' },
  { text: '博客', link: '/blog/' }
  // { text: '归档', link: '/blog/archives/' },
  // {
  //   text: '笔记',
  //   items: [{ text: '示例', link: '/notes/demo/README.md' }]
  // },
])
