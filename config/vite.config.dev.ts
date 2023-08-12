import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';

// 设置后端 URL
const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';

export default mergeConfig(
  {
    // 开发模式
    mode: 'development',

    // 服务器设置
    server: {
      // 在开发服务器启动时自动在浏览器中打开应用程序
      open: true,
      fs: {
        strict: true,
      },
      // 前端项目主机+端口
      host: '127.0.0.1',
      port: 3000,
      // 为开发服务器配置自定义代理规则
      proxy: {
        '/api': {
          target: `${backendUrl}/api/v1`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy, options) => {},
        },
      },
    },

    // 设置插件
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
  },

  // 导入基础配置
  baseConfig
);
