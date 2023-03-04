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
  <UiButton class="ui-button-ghost" v-bind="props">
    <slot />
  </UiButton>
</template>

<style scoped lang="postcss">
.ui-button-ghost {
  background-color: transparent;
  color: var(--gray-11);

  &:hover {
    background-color: hsl(var(--gray-11-hsl) / 0.08);
  }
}
</style>
