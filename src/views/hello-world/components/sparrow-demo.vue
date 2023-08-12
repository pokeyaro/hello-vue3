<template>
  <Teleport to="#card">
    <div class="container">
      <div class="panel-header">
        <div class="close-icon" @click="closeVisible">
          <svg-icon
            name="close"
            width="1.5em"
            height="1.5em"
            :title="descCloseTitle"
          />
        </div>
      </div>
      <div class="panel-content">
        <Suspense>
          <template #default>
            <template v-if="isImageLoaded">
              <img alt="logo" :src="cachedImageUrl" />
            </template>
            <template v-else>
              <h1>Loading ...</h1>
            </template>
          </template>
          <template #fallback>
            <h1>Loading ...</h1>
          </template>
        </Suspense>
        <h3>{{ attr.descList[0] }}&nbsp;:&nbsp;&nbsp;{{ count }}</h3>
        <h3>{{ attr.descList[1] }}&nbsp;:&nbsp;&nbsp;{{ double }}</h3>
        <button
          v-for="(item, idx) in attr.buttonText"
          :key="idx"
          :style="{ background: item.bgColor }"
          @click="increment"
        >
          {{ item.icon }}
          &nbsp;
          {{ item.text }}
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted, watch, PropType } from 'vue';
  import type { IAttr } from './types';

  defineOptions({ name: 'SparrowDemo', inheritAttrs: false });

  // 使用 props 选项接收外部传递的值
  const props = defineProps({
    attr: {
      type: Object as PropType<IAttr>,
      required: true,
    },
  });

  // 解构赋值从 props 中获取值，直接作用到 style 代码块中
  const {
    iconColor: { normalColor: normalStyle, hoverColor },
    borderWidth,
  } = props.attr;
  const hoverStyle = ref<string>(hoverColor as string);
  const borderStyle = computed<string>(() => {
    return `${borderWidth}px solid black`;
  });

  // 定义自定义事件
  const emit = defineEmits(['closeVisible']);

  // 关闭面板时触发 closeVisible 事件
  const closeVisible = (): void => {
    emit('closeVisible');
  };

  // 图片缓存处理
  const isImageLoaded = ref(false); // 标记图片是否已经加载完成
  const cachedImageUrl = ref(''); // 缓存图片的 URL
  const cacheImage = (url: string) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = url;
      image.onload = () => {
        resolve(url); // 当图片加载完成后，返回缓存的 URL
      };
    });
  };

  // 响应式对象ref属性
  const count = ref<number>(0);

  // 计算属性
  const double = computed<number>(() => {
    return count.value * 2;
  });

  const descCloseTitle = computed(() => {
    return import.meta.env.VITE_BUTTON_CLOSE;
  });

  // 定义方法
  const increment = (): void => {
    count.value++;
  };

  // 生命周期钩子
  onMounted(() => {
    // 使用 Promise 缓存图片
    cacheImage(props.attr.imgUrl).then((cachedUrl: string) => {
      cachedImageUrl.value = cachedUrl;
      isImageLoaded.value = true; // 标记图片已加载完成，可以进行渲染
    });
  });

  // watch 监听器
  watch(
    () => count.value,
    (newValue, oldValue) => {
      console.log(`count changed from ${oldValue} to ${newValue}.`);
    },
  );
</script>

<style scoped lang="less">
  .container {
    position: fixed;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);

    border: v-bind(borderStyle); /* 边框样式：测试支持 ComputedRef 类型值 */
    border-radius: 10px;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
    padding: 40px 40px;
    width: 600px;
    height: 400px;
    background-image: url('https://cdn.pixabay.com/photo/2018/12/06/16/12/birds-3860034_1280.jpg');
    background-size: cover; /* 图像按比例缩放以填充容器 */
    background-position: center; /* 图像在容器中居中显示 */

    .panel-header {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .close-icon {
        color: v-bind(
          normalStyle
        ); /* 默认样式：测试支持 props 解构 any 类型值 */
        cursor: pointer;
      }

      .close-icon:hover {
        color: v-bind(hoverStyle); /* 悬浮样式：测试支持 ref 类型值 */
      }
    }

    .panel-content {
      text-align: center;

      h1 {
        margin-bottom: 20px;
      }

      img {
        width: 120px;
      }

      button {
        margin-right: 20px;
        margin-top: 60px;
      }
    }
  }
</style>
