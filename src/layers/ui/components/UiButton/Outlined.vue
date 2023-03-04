<script setup lang="ts">
import { BaseButtonProps } from '@ui/utils/types';

type Props = {
  size?: BaseButtonProps['size'];
  leftIcon?: BaseButtonProps['leftIcon'];
  rightIcon?: BaseButtonProps['rightIcon'];
  isLoading?: BaseButtonProps['isLoading'];
};

const props = defineProps<Props>();
</script>

<template>
  <UiButtonBase class="ui-button-outlined" v-bind="props">
    <slot />
  </UiButtonBase>
</template>

<style scoped lang="postcss">
.ui-button-outlined {
  background-color: transparent;
  color: var(--primary);
  border-color: currentColor;

  &:hover:not(:disabled) {
    border-color: transparent;
    color: var(--text-on-primary);
    background-color: var(--primary);
  }

  &:disabled {
    color: var(--text-disabled);
  }
}
</style>
