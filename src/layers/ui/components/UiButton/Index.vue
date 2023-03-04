<script setup lang="ts">
import type { Component } from 'vue';
import {
  UiButtonFull,
  UiButtonOutlined,
  UiButtonGhost,
  UiButtonLight
} from '#components';
import type { TypedNuxtLinkProps } from '~~/.nuxt/typed-router/typed-router';
import type { ButtonVariant, BaseButtonProps } from '@ui/utils/types';

type Props = {
  variant?: ButtonVariant;
  to?: TypedNuxtLinkProps['to'];
  size?: BaseButtonProps['size'];
  leftIcon?: BaseButtonProps['leftIcon'];
  rightIcon?: BaseButtonProps['rightIcon'];
  isLoading?: BaseButtonProps['isLoading'];
};

const props = withDefaults(defineProps<Props>(), {
  variant: 'full',
  to: undefined
});

const variantMap = new Map<ButtonVariant, Component>([
  ['full', UiButtonFull],
  ['outlined', UiButtonOutlined],
  ['ghost', UiButtonGhost],
  ['light', UiButtonLight]
]);

const is = computed(() => variantMap.get(props.variant));

const buttonProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant, ...rest } = props;
  return rest;
});
</script>

<template>
  <component :is="is" v-bind="buttonProps">
    <slot />
  </component>
</template>
