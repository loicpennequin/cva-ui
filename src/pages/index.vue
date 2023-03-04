<script setup lang="ts">
defineOptions({
  name: 'HomePage'
});

const buttonOptions = {
  variant: ['full', 'outlined', 'ghost', 'light'],
  size: ['sm', 'md', 'lg', 'xl'],
  disabled: false
};
</script>

<template>
  <UiContainer>
    <UiSurface>
      <h2>Button</h2>
      <ComponentPreview v-slot="{ options }" :options="buttonOptions">
        <UiButton v-bind="options">Click Me</UiButton>
      </ComponentPreview>
    </UiSurface>
  </UiContainer>
</template>
