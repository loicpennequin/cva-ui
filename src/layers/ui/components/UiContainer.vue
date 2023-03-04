<script setup lang="ts">
const props = withDefaults(
  defineProps<{ as?: string; size?: 'sm' | 'md' | 'lg' | 'xl' }>(),
  { as: 'div', size: 'md' }
);
</script>

<template>
  <component :is="props.as" class="ui-container" :class="props.size">
    <slot />
  </component>
</template>

<style scoped lang="postcss">
.ui-container {
  width: 100%;
  margin-inline: auto;

  &.sm {
    max-width: var(--size-sm);
  }
  &.md {
    max-width: var(--size-md);
  }
  &.lg {
    max-width: var(--size-lg);
  }
  &.xl {
    max-width: var(--size-xl);
  }
}
</style>
