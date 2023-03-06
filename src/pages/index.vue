<script setup lang="ts">
import { Ref } from 'vue';
import { AnyObject } from '../utils/types';
import { toFormValidator } from '@vee-validate/zod';
import { Form } from 'vee-validate';
import * as zod from 'zod';

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
      rightIcon: false,
      isError: false
    }
  },
  switch: {
    control: ref(false),
    options: {
      size: ['sm', 'md', 'lg', 'xl'],
      withSlots: false,
      disabled: false,
      isError: false
    }
  },
  checkbox: {
    control: ref(false),
    options: {
      size: ['sm', 'md', 'lg', 'xl'],
      disabled: false,
      isError: false
    }
  },
  radio: {
    control: ref('apple'),
    options: {
      size: ['sm', 'md', 'lg', 'xl'],
      disabled: false,
      isError: false
    }
  },

  formControl: {
    options: {},
    form: {
      onSubmit(values) {
        console.log(values);
      },
      schema: toFormValidator(
        zod.object({
          text: zod.string().min(4)
        })
      )
    }
  },
  dropdown: {
    control: ref(false),
    options: {
      placement: [
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end'
      ],
      closeOnClick: true
    }
  },
  modal: {
    control: ref(false),
    options: {
      size: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      isClosable: true
    }
  },
  drawer: {
    control: ref(false),
    options: {
      size: ['auto', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      placement: ['left', 'right', 'top', 'bottom'],
      isClosable: true
    }
  }
} satisfies Record<
  string,
  {
    options: AnyObject;
    control?: Ref<any>;
    form?: {
      schema?: ReturnType<typeof toFormValidator>;
      onSubmit: (values: any) => void;
    };
  }
>;
</script>

<template>
  <UiContainer size="xl" class="page" as="main">
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

      <UiSurface>
        <h2 id="radio">Radio</h2>
        <ComponentPreview
          v-slot="{ options }"
          :options="components.radio.options"
        >
          <UiInputRadio
            v-model="components.radio.control.value"
            v-bind="options"
            value="apple"
          >
            Apple
          </UiInputRadio>
          <UiInputRadio
            v-model="components.radio.control.value"
            v-bind="options"
            value="banana"
          >
            Banana
          </UiInputRadio>
          <UiInputRadio
            v-model="components.radio.control.value"
            v-bind="options"
            value="strawberry"
          >
            Strawberry
          </UiInputRadio>
        </ComponentPreview>
      </UiSurface>

      <UiSurface>
        <h2 id="formControl">Form Control</h2>
        <ComponentPreview :options="components.formControl.options">
          <Form
            style="width: 20em"
            :validation-schema="components.formControl.form.schema"
            @submit="components.formControl.form.onSubmit"
          >
            <UiFormControl
              id="form-control-text"
              v-slot="slotProps"
              name="text"
              label="First name"
            >
              <UiInputText v-bind="slotProps" />
            </UiFormControl>

            <UiButton>Submit</UiButton>
          </Form>
        </ComponentPreview>
      </UiSurface>

      <UiSurface>
        <h2 id="dropdown">Dropdown</h2>
        <ComponentPreview
          v-slot="{ options }"
          :options="components.dropdown.options"
        >
          <UiDropdown
            v-model:is-opened="components.dropdown.control.value"
            v-bind="options"
          >
            <template #toggle="{ ref, props }">
              <UiButton
                :ref="ref"
                v-bind="props"
                right-icon="bi:caret-down-fill"
              >
                Toggle dropdown
              </UiButton>
            </template>

            <template #menu>
              <UiDropdownItem
                v-for="i in [1, 2, 3]"
                :key="i"
                icon="mdi:account"
                :close-on-click="!!options.closeOnClick"
                @click.prevent
              >
                Item {{ i }}
              </UiDropdownItem>
            </template>
          </UiDropdown>
        </ComponentPreview>
      </UiSurface>

      <UiSurface>
        <h2 id="modal">Modal</h2>
        <ComponentPreview
          v-slot="{ options }"
          :options="components.modal.options"
        >
          <UiButton @click="components.modal.control.value = true">
            Open Modal
          </UiButton>
          <UiModal
            v-model:is-opened="components.modal.control.value"
            title="My Modal"
            v-bind="options"
          >
            <p>Wow! What a cool modal !</p>

            <template #footer="{ focusRef }">
              And what a cool modal footer !
              <template v-if="!options.isClosable">
                <p>
                  This modal is not closable, so use the button below to get out
                  :D
                </p>
                <UiButton
                  :ref="focusRef"
                  @click="components.modal.control.value = false"
                >
                  Force close
                </UiButton>
              </template>
            </template>
          </UiModal>
        </ComponentPreview>
      </UiSurface>

      <UiSurface>
        <h2 id="drawer">Drawer</h2>
        <ComponentPreview
          v-slot="{ options }"
          :options="components.drawer.options"
        >
          <UiButton @click="components.drawer.control.value = true">
            Open Drawer
          </UiButton>
          <UiDrawer
            v-model:is-opened="components.drawer.control.value"
            title="My Drawer"
            v-bind="options"
          >
            <p>Wow! What a cool Drawer !</p>

            <template #footer="{ focusRef }">
              And what a cool drawer footer !
              <template v-if="!options.isClosable">
                <p>
                  This drawer is not closable, so use the button below to get
                  out :D
                </p>
                <UiButton
                  :ref="focusRef"
                  @click="components.drawer.control.value = false"
                >
                  Force close
                </UiButton>
              </template>
            </template>
          </UiDrawer>
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
