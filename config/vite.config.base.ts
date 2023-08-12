import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import transformHtmlPlugin from './plugin/transformHtmlPlugin';
import { createSvg } from '../src/components/svg-icons/index';

// https://vitejs.dev/config/
export default defineConfig({
  // 使用的插件
  plugins: [
    vue(),
    // 启用 vite-plugin-svg-icons 插件
    createSvg('./src/assets/svg/'),
    // Vite 模版语法插件
    transformHtmlPlugin({
      APP_TITLE: 'Hello World',
      META_DESCRIPTION: '一个基础的 Vue3 麻雀示例',
    }),
  ],

  // 模块解析
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, '../src'),
      },
      {
        find: 'assets',
        replacement: resolve(__dirname, '../src/assets'),
      },
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js', // Resolve the i18n warning issue
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js', // compile template
      },
    ],
    extensions: ['.ts', '.js'],
  },

  // 定义全局变量
  define: {
    'process.env': {},
  },
});
