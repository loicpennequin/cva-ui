<script setup lang="ts">
import { ButtonProps } from '../composables/useButton';

const props = withDefaults(
  defineProps<{
    size?: ButtonProps['size'];
    colorScheme?: ButtonProps['colorScheme'];
    variant?: ButtonProps['variant'];
    leftIcon?: string;
    rightIcon?: string;
    isLoading?: boolean;
  }>(),
  {
    size: 'md',
    variant: 'full',
    colorScheme: undefined,
    leftIcon: undefined,
    rightIcon: undefined
  }
);

const { classes, tag, style } = useButton(props);
</script>

<template>
  <component :is="tag" :class="classes">
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
.button {
  cursor: pointer;
  user-select: none;
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
  border: solid 1px transparent;
  font-size: v-bind('style.fontSize');

  &:disabled {
    cursor: initial;
  }
  & .icon {
    font-size: var(--font-size-3);
    aspect-ratio: 1;
    display: block;
  }

  &.full {
    background-color: v-bind('style.color');
    color: v-bind('style.textColor');

    &:hover {
      background-color: v-bind('style.hoverColor');
    }

    &:focus-visible {
      background-color: v-bind('style.focusColor');
    }
  }
  &.outlined {
    background: transparent;
    color: v-bind('style.color');
    border: solid 2px currentColor;

    &:hover {
      background: hsl(v-bind('style.colorHsl') / 0.1);
      color: v-bind('style.hoverColor');
    }

    &:focus-visible {
      background: hsl(v-bind('style.colorHsl') / 0.1);
      color: v-bind('style.focusColor');
    }
  }
}
</style>
