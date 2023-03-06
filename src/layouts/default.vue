<script setup lang="ts">
useI18n();
</script>

<template>
  <div class="layout">
    <header>
      <UiContainer size="xl">
        <h1>Create V3 App UI</h1>
        <nav>
          <DarkModeToggle />
        </nav>
      </UiContainer>
    </header>

    <slot />
  </div>
</template>

<style lang="postcss" scoped>
:global(body) {
  background: var(--surface-2);
  color: var(--text-1);
}

header {
  background-color: var(--surface-1);
  box-shadow: var(--shadow-2);
  position: sticky;
  top: 0;
  z-index: 1;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--size-2) var(--size-5);
  }
}

h1 {
  font-size: var(--size-5);
}
nav {
  display: flex;
  gap: var(--size-2);
}

.lavout {
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
