<script setup lang="ts">
defineOptions({
  name: 'HomePage'
});

const text = ref('');
const toggled = ref(true);

const { hash } = toRefs(useRoute());

const links = ['button', 'input', 'switch'];

const buttonOptions = {
  variant: ['full', 'outlined', 'ghost', 'light'],
  size: ['sm', 'md', 'lg', 'xl'],
  disabled: false,
  leftIcon: false,
  rightIcon: false
};
const inputOptions = {
  type: ['text', 'password'],
  disabled: false,
  leftIcon: false,
  rightIcon: false
};
const switchOptions = {
  withSlots: false
};
</script>

<template>
  <UiContainer size="xl" class="page">
    <nav>
      <ul>
        <li v-for="link in links" :key="link">
          <NuxtLink
            :to="`#${link}`"
            :class="hash.slice(1) === link && 'active'"
          >
            {{ link }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <UiContainer class="previews">
      <UiSurface>
        <h2 id="button">Button</h2>
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
        <h2 id="input">Input</h2>
        <ComponentPreview
          v-slot="{ options: { type, ...options } }"
          :options="inputOptions"
        >
          <label for="input-text">My input</label>
          <UiInputText
            v-if="type === 'text'"
            id="input-text"
            v-model="text"
            v-bind="options"
            :left-icon="options.leftIcon ? 'mdi:account' : undefined"
            :right-icon="options.rightIcon ? 'mdi:account' : undefined"
          />
          <UiInputPassword
            v-else-if="'password'"
            id="input-text"
            v-model="text"
            v-bind="options"
            :left-icon="options.leftIcon ? 'mdi:account' : undefined"
          />
        </ComponentPreview>
      </UiSurface>

      <UiSurface>
        <h2 id="switch">Switch Input</h2>
        <ComponentPreview v-slot="{ options }" :options="switchOptions">
          <UiInputSwitch id="switch-input" :model-value="toggled">
            <template v-if="options.withSlots" #on>On</template>
            <template v-if="options.withSlots" #off>Off</template>
          </UiInputSwitch>
        </ComponentPreview>
      </UiSurface>
    </UiContainer>
  </UiContainer>
</template>

<style scoped lang="postcss">
.page {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
}
.previews {
  & > * + * {
    margin-block-start: var(--size-8);
  }
}

h2 {
  margin-block-end: var(--size-3);
}

nav {
  padding: var(--size-4);
  position: sticky;
  top: 2.2rem;
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
}
</style>
