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
  <UiButtonBase class="ui-button-full" v-bind="props">
    <slot />
  </UiButtonBase>
</template>

<style scoped lang="postcss">
.ui-button-full {
  color: var(--text-on-primary);
  background-color: var(--primary);

  &:hover:not(:disabled) {
    background-color: var(--primary-hover);
  }

  &:disabled {
    background-color: var(--disabled);
    color: var(--text-disabled);
  }
}
</style>
