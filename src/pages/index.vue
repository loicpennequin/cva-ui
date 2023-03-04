<script setup lang="ts">
import { Ref } from 'vue';
import { AnyObject } from '../utils/types';

defineOptions({
  name: 'HomePage'
});

const { hash } = toRefs(useRoute());

const components = {
  button: {
    options: {
      variant: ['full', 'outlined', 'ghost', 'light'],
      size: ['sm', 'md', 'lg', 'xl'],
      disabled: false,
      leftIcon: false,
      rightIcon: false,
      iconButton: false
    }
  },
  input: {
    control: ref(''),
    options: {
      type: ['text', 'password'],
      size: ['sm', 'md', 'lg', 'xl'],
      disabled: false,
      leftIcon: false,
      rightIcon: false
    }
  },
  switch: {
    control: ref(false),
    options: {
      size: ['sm', 'md', 'lg', 'xl'],
      withSlots: false
    }
  },
  checkbox: {
    control: ref(false),
    options: {
      size: ['sm', 'md', 'lg', 'xl'],
      disabled: false
    }
  }
} satisfies Record<string, { options: AnyObject; control?: Ref<any> }>;
</script>

<template>
  <UiContainer size="xl" class="page">
    <nav>
      <ul>
        <li><h2>Components</h2></li>
        <li v-for="link in Object.keys(components)" :key="link">
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
        <ComponentPreview
          v-slot="{ options }"
          :options="components.button.options"
        >
          <UiButtonIcon
            v-if="options.iconButton"
            v-bind="options"
            icon="mdi:user"
            title="an icon button"
          >
            Click Me
          </UiButtonIcon>
          <UiButton
            v-else
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
          :options="components.input.options"
        >
          <UiInputText
            v-if="type === 'text'"
            id="input-text"
            v-model="components.input.control.value"
            aria-label="my input"
            v-bind="options"
            :left-icon="options.leftIcon ? 'mdi:account' : undefined"
            :right-icon="options.rightIcon ? 'mdi:account' : undefined"
          />
          <UiInputPassword
            v-else-if="'password'"
            id="input-text"
            v-model="components.input.control.value"
            aria-label="my input"
            v-bind="options"
            :left-icon="options.leftIcon ? 'mdi:account' : undefined"
          />
        </ComponentPreview>
      </UiSurface>

      <UiSurface>
        <h2 id="switch">Switch</h2>
        <ComponentPreview
          v-slot="{ options }"
          :options="components.switch.options"
        >
          <UiInputSwitch
            id="switch-input"
            v-bind="options"
            v-model="components.switch.control.value"
          >
            <template v-if="options.withSlots" #on>On</template>
            <template v-if="options.withSlots" #off>Off</template>
          </UiInputSwitch>
        </ComponentPreview>
      </UiSurface>

      <UiSurface>
        <h2 id="checkbox">Checkbox</h2>
        <ComponentPreview
          v-slot="{ options }"
          :options="components.checkbox.options"
        >
          <UiInputCheckbox
            v-model="components.checkbox.control.value"
            v-bind="options"
          >
            My checkbox
          </UiInputCheckbox>
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

  @media (--md-n-below) {
    display: none;
  }
}
</style>
