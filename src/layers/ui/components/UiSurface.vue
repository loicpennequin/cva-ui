<script setup lang="ts">
const props = withDefaults(defineProps<{ as?: string }>(), { as: 'div' });
</script>

<template>
  <component :is="props.as">
    <slot />
  </component>
</template>

<style scoped>
* {
  background-color: var(--surface-1);
  color: var(--text-1);
  padding: var(--size-5);
}
</style>
