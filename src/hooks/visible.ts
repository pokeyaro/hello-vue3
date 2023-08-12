import { ref } from 'vue';

export default function useVisible(initValue = false) {
  const visible = ref<boolean>(initValue);

  const setVisible = (value: boolean): void => {
    visible.value = value;
  };

  const toggle = (): void => {
    visible.value = !visible.value;
  };

  return {
    visible,
    setVisible,
    toggle,
  };
}
