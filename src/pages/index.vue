<script setup lang="ts">
defineOptions({
  name: 'HomePage'
});

const text = ref('');

const buttonOptions = {
  variant: ['full', 'outlined', 'ghost', 'light'],
  size: ['sm', 'md', 'lg', 'xl'],
  disabled: false,
  leftIcon: false,
  rightIcon: false
};
const inputOptions = {
  disabled: false,
  leftIcon: false,
  rightIcon: false
};
</script>

<template>
  <UiContainer class="page">
    <UiSurface>
      <h2>Button</h2>
      <ComponentPreview v-slot="{ options }" :options="buttonOptions">
        <UiButton
          v-bind="options"
          :left-icon="options.leftIcon ? 'mdi:account' : undefined"
          :right-icon="options.rightIcon ? 'mdi:account' : undefined"
        >
          Click Me
        </UiButton>
      </ComponentPreview>
    </UiSurface>

    <UiSurface>
      <h2>Input</h2>
      <ComponentPreview v-slot="{ options }" :options="inputOptions">
        <UiInputText
          id="foo"
          v-model="text"
          v-bind="options"
          :left-icon="options.leftIcon ? 'mdi:account' : undefined"
          :right-icon="options.rightIcon ? 'mdi:account' : undefined"
        />
      </ComponentPreview>
    </UiSurface>
  </UiContainer>
</template>

<style scoped lang="postcss">
.page {
  & * + * {
    margin-block-start: var(--size-8);
  }
}
</style>
