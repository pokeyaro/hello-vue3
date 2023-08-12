<template>
  <div>
    <svg :class="svgClass" v-bind="$attrs" :style="{ color: color }">
      <use :href="iconName"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '',
    },
  });

  const iconName = computed(() => `#icon-${props.name}`);

  const svgClass = computed(() => {
    if (props.name) return `svg-icon icon-${props.name}`;
    return 'svg-icon';
  });
</script>

<style scoped lang="less">
  .svg-icon {
    // 使 SVG 图标的宽度自适应其内容大小
    width: auto;

    // 使 SVG 图标的高度自适应其内容大小
    height: auto;

    // 使 SVG 图标的颜色与其所在元素的文本颜色保持一致（currentColor 是一个特殊的CSS变量）
    fill: currentColor;

    // 使 SVG 图标实现垂直居中的效果
    vertical-align: middle;

    // 使 SVG 图标在其指定的尺寸范围内显示，超出部分将被裁剪隐藏
    overflow: hidden;
  }
</style>
