<script setup lang="ts">
const props = withDefaults(defineProps<{ as?: string }>(), { as: 'div' });
</script>

<template>
  <component :is="props.as" class="ui-container">
    <slot />
  </component>
</template>

<style scoped>
.ui-container {
  width: 100%;
  max-width: var(--size-xl);
  margin-inline: auto;
}
</style>
