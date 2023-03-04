<script setup lang="ts">
import { BaseButtonProps } from '@ui/utils/types';
import { NuxtLink } from '#components';

type Props = {
  size?: BaseButtonProps['size'];
  leftIcon?: BaseButtonProps['leftIcon'];
  rightIcon?: BaseButtonProps['rightIcon'];
  isLoading?: BaseButtonProps['isLoading'];
};

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  leftIcon: undefined,
  rightIcon: undefined,
  isLoading: false
});

const attrs = useAttrs();

const tag = computed(() => {
  if (attrs.to) return NuxtLink;
  if (attrs.href) return 'a';

  return 'button';
});
</script>

<template>
  <component :is="tag" class="ui-button-base" :class="props.size">
    <Icon
      v-if="props.leftIcon && !props.isLoading"
      :name="props.leftIcon"
      aria-hidden="true"
      class="icon"
    />

    <!-- <UiSpinner text-2xl v-if="isLoading" /> -->
    <slot />

    <Icon
      v-if="props.rightIcon && !props.isLoading"
      :name="props.rightIcon"
      aria-hidden="true"
      class="icon"
    />
  </component>
</template>

<style scoped lang="postcss">
.ui-button-base {
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  vertical-align: middle;
  padding: 0.5em 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--size-2);
  font-weight: var(--font-weight-6);
  border-radius: var(--radius-2);
  border: solid 2px transparent;

  &:disabled {
    cursor: initial;
    opacity: 0.7;
  }

  &.sm {
    font-size: var(--font-size-0);
  }
  &.md {
    font-size: var(--font-size-1);
  }
  &.lg {
    font-size: var(--font-size-2);
  }
  &.xl {
    font-size: var(--font-size-3);
  }
}
& .icon {
  font-size: var(--font-size-3);
  aspect-ratio: 1;
  display: block;
}
</style>
