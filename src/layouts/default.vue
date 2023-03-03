<script setup lang="ts">
useI18n();

const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <div class="layout">
    <header>
      <nav>
        <DarkModeToggle />
        <NuxtLink :to="switchLocalePath('en')">
          <Icon name="circle-flags:uk" />
        </NuxtLink>
        <NuxtLink :to="switchLocalePath('fr')">
          <Icon name="circle-flags:fr" />
        </NuxtLink>
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
  gap: var(--size-3);
}
</style>
