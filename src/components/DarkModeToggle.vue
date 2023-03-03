<script setup lang="ts">
const colorMode = useColorMode();
const colorModeIcon = computed(() =>
  colorMode.preference === 'dark' ? 'ph:sun-fill' : 'ph:moon-fill'
);
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

const { t } = useI18n();
</script>

<template>
  <button :aria-label="t('label')" @click="toggleColorMode">
    <Icon :name="colorModeIcon" />
  </button>
</template>

<style scoped>
button {
  padding: 0;
}
</style>
<i18n lang="json">
{
  "en": {
    "label": "Toggle dark mode"
  },
  "fr": {
    "label": "Activer le thème sombre"
  }
}
</i18n>
