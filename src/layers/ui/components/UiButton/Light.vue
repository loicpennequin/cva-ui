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
  <UiButtonBase class="ui-button-light" v-bind="props">
    <slot />
  </UiButtonBase>
</template>

<style scoped lang="postcss">
.ui-button-light {
  color: var(--primary);
  background-color: hsl(var(--primary-hsl) / 0.2);

  &:hover:not(:disabled) {
    background-color: hsl(var(--primary-hsl) / 0.3);
  }

  &:disabled {
    background-color: hsl(var(--disabled-hsl) / 0.3);
    color: var(--text-disabled);
  }
}
</style>
