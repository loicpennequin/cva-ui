<script setup lang="ts">
import { componentMap } from '../layers/ui/plugins/previews';
import { Keys } from '../utils/types';

defineOptions({
  name: 'HomePage'
});

const { hash } = toRefs(useRoute());
console.log(hash.value);
const components = useNuxtApp().$componentsPreviews;

const sortedComponents = Object.entries(components)
  .map(([name, value]) => ({
    name,
    ...value
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const getComponent = (name: Keys<typeof componentMap>) => componentMap[name];
</script>

<template>
  <UiContainer size="xl" class="page" as="main">
    <nav>
      <ul>
        <li><h2>Components</h2></li>
        <li v-for="link in sortedComponents" :key="link.name">
          <NuxtLink
            :to="`#${link.name}`"
            :class="hash.slice(1) === link.name && 'active'"
          >
            {{ link.name }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <UiContainer class="previews">
      <UiSurface v-for="component in sortedComponents" :key="component.name">
        <h2 :id="component.name">{{ component.name }}</h2>
        <ComponentPreview v-slot="{ options }" :options="component.options">
          <component
            :is="getComponent(component.name as any)"
            :options="options"
          />
        </ComponentPreview>
      </UiSurface>
    </UiContainer>
  </UiContainer>
</template>

<style scoped lang="postcss">
@import 'open-props/media';

.page {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  @media (--md-n-below) {
    display: block;
  }
}
.previews {
  & > * + * {
    margin-block-start: var(--size-8);
  }
}

h2 {
  margin-block-end: var(--size-3);
  scroll-margin-block-start: 5rem;
  text-transform: capitalize;
}

nav {
  padding: var(--size-4);
  position: sticky;
  top: 3.5rem;
  height: calc(100vh - 2.2rem);

  & > ul {
    list-style: none;
    padding: 0;
  }

  & a {
    text-transform: capitalize;

    &.active {
      font-weight: var(--font-weight-5);
    }
  }

  & a:hover {
    text-decoration: underline;
  }

  & a:visited {
    color: inherit;
  }

  @media (--md-n-below) {
    display: none;
  }
}
</style>
