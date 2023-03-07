<script setup lang="ts">
import { NuxtLink } from '#components';
import type { TypedNuxtLinkProps } from '~~/.nuxt/typed-router/typed-router';

const props = defineProps<{
  isOpened: boolean;
  kind: string;
  icon: string;
  to?: TypedNuxtLinkProps['to'];
}>();

const emit = defineEmits<{
  (e: 'update:isOpened', value: boolean): void;
}>();

const vModel = useVModel(props, 'isOpened', emit);
</script>

<template>
  <UiSurface class="ui-toast" :class="props.kind" role="status">
    <Icon :name="props.icon" class="icon" />

    <component
      :is="props.to ? NuxtLink : 'div'"
      :to="props.to"
      class="content"
      @click="emit('update:isOpened', false)"
    >
      <slot />
    </component>

    <UiIconButton
      title="dismiss toast"
      icon="mdi:close"
      class="close-button"
      @click="vModel = false"
    />
  </UiSurface>
</template>

<style scoped lang="postcss">
.ui-toast {
  padding: var(--size-3);
  border-top: solid 8px var(--_color);
  border-radius: var(--radius-2);
  outline: solid 1px var(--border-dimmed);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--size-4);

  &.error {
    --_color: var(--red-8);
  }
  &.warning {
    --_color: var(--orange-6);
  }
  &.success {
    --_color: var(--green-8);
  }
  &.info {
    --_color: var(--primary);

    & .icon {
      color: var(--surface-1);
    }
  }

  .content {
    color: inherit;
    text-decoration: none;
  }

  .close-button {
    margin-inline-start: auto;
    margin-block-start: calc(-1 * var(--size-2));
    align-self: start;
  }

  .icon {
    padding: var(--size-2);
    border-radius: var(--radius-round);
    aspect-ratio: 1;
    width: var(--size-8);
    display: grid;
    place-content: center;
    color: var(--gray-0);
    background-color: var(--_color);
  }
}
</style>
