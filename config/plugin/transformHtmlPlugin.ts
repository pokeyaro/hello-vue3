import { Plugin } from 'vite'

interface Data {
  [key: string]: string
}

const transformHtmlPlugin = (data: Data): Plugin => {
  return {
    name: 'transform-html',
    enforce: 'pre',
    transformIndexHtml(html) {
      return html.replace(/<%=\s*(\w+)\s*%>/gi, (match, p1) => data[p1] || '')
    },
  }
};

export default transformHtmlPlugin;