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
  color: var(--gray-11);
  background-color: var(--gray-3);

  &:hover {
    background-color: var(--gray-5);
  }
}
</style>
