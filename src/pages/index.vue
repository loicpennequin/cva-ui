<script setup lang="ts">
defineOptions({
  name: 'HomePage'
});
</script>

<template>
  <UiContainer>
    <UiSurface>
      <UiButton>Click me</UiButton>
      <UiButton variant="outlined">Click me</UiButton>
      <UiButton variant="ghost">Click me</UiButton>
      <UiButton variant="light">Click me</UiButton>
      <UiButtonIcon icon="mdi:account" title="Button" />
    </UiSurface>
  </UiContainer>
</template>
