<script setup lang="ts">
useI18n();

const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <div class="layout">
    <header>
      <nav>
        <DarkModeToggle />
        <UiButtonIcon
          :to="switchLocalePath('en')"
          icon="circle-flags:uk"
          title="Switch to english"
        />
        <UiButtonIcon
          :to="switchLocalePath('fr')"
          icon="circle-flags:fr"
          title="Switch to french"
        />
      </nav>
    </header>

    <slot />
  </div>
</template>

<style lang="postcss" scoped>
:global(body) {
  background: var(--surface-2);
  color: var(--text-1);
}

nav {
  display: flex;
  gap: var(--size-2);
}

.lavout {
  display: grid;
  grid-template-rows: auto 1fr;
}

header {
  position: sticky;
  top: 0;
}
</style>
