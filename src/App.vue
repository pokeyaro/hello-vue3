<template>
  <div id="typ">
    <h1 class="typing-effect">{{ text }}</h1>
  </div>
  <hello-world />
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import HelloWorld from '@/views/hello-world/index.vue';

  export default defineComponent({
    name: 'App',
    components: {
      HelloWorld,
    },
    setup() {
      // 打字机效果！
      const text = ref('');
      const words = [import.meta.env.VITE_PROJECT_TITLE];
      let wordIndex = 0;
      let letterIndex = 0;

      const typeWriter = () => {
        const word = words[wordIndex];
        text.value = word.substring(0, letterIndex);

        if (letterIndex < word.length) {
          letterIndex++;
        } else {
          wordIndex = (wordIndex + 1) % words.length; // 计算下一个单词索引
          letterIndex = 0;
        }
      };

      onMounted(() => {
        setInterval(typeWriter, 150); // 设置每个字符的间隔时间
      });

      return {
        text,
      };
    },
  });
</script>

<style scoped lang="less">
  .typ {
    height: 200px;
    margin-bottom: 20px;

    .typing-effect {
      overflow: hidden; /* 隐藏溢出文本 */
      border-right: 0.15em solid orange; /* 添加光标边框 */
      white-space: nowrap; /* 禁止折行 */
      margin: 0; /* 去除默认的外边距 */
      padding: 0; /* 去除默认的内边距 */
    }
  }
</style>
