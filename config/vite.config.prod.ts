import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base';

export default mergeConfig(
    {
        mode: 'production',
        plugins: [],
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        // arco: ['@arco-design/web-vue'],
                        // chart: ['echarts', 'vue-echarts'],
                        // vue: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
                        vue: ['vue'],
                    },
                },
            },
            chunkSizeWarningLimit: 2000,
        },
    },
    baseConfig
);
