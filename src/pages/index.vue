<script setup lang="ts">
defineOptions({
  name: 'HomePage'
});
const text = ref('');
</script>

<template>
  <UiContainer>
    <UiSurface as="section">
      <input $="text" />
      <p>text: {{ text }}</p>
      <UiButton left-icon="mdi:account" color-scheme="blue" variant="outlined">
        Reset
      </UiButton>
    </UiSurface>
  </UiContainer>
</template>
