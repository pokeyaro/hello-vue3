<template>
  <button v-if="!visible" @click="toggle">{{ descOpen }}</button>
  <sparrow-demo v-if="visible" :attr="attributes" @close-visible="toggle" />
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import useVisible from '@/hooks/visible';
  import SparrowDemo from './components/sparrow-demo.vue';
  import type { IAttr } from './types';

  const { visible, toggle } = useVisible(true);

  defineOptions({ name: 'HelloWorld', inheritAttrs: false });

  const descOpen = computed(() => {
    return import.meta.env.VITE_BUTTON_OPEN;
  });

  const attributes = ref<IAttr>({
    imgUrl: 'https://vitejs.dev/logo-with-shadow.png',
    descList: ['今日头条', '抖➕翻倍'],
    buttonText: [
      {
        icon: '👍',
        text: '点赞',
        bgColor: 'coral',
      },
      {
        icon: '🥏',
        text: '投币',
        bgColor: 'lightskyblue',
      },
      {
        icon: '🎲',
        text: '三连',
        bgColor: 'deeppink',
      },
    ],
    iconColor: {
      normalColor: 'blue',
      hoverColor: 'red',
    },
    borderWidth: 2,
  });
</script>
