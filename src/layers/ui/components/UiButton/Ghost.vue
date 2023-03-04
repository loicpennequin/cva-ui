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
  <UiButtonBase class="ui-button-ghost" v-bind="props">
    <slot />
  </UiButtonBase>
</template>

<style scoped lang="postcss">
.ui-button-ghost {
  background-color: transparent;
  color: var(--primary);

  &:hover:not(:disabled) {
    background-color: hsl(var(--primary-hsl) / 0.08);
  }

  &:disabled {
    color: var(--text-disabled);
  }
}
</style>
