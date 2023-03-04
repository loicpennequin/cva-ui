<script setup lang="ts">
type Options = {
  [key: string]: string[] | boolean;
};
const props = defineProps<{ options: Options }>();

const _options = reactive(
  Object.fromEntries(
    Object.entries(props.options).map(([key, value]) => {
      return [key, Array.isArray(value) ? value[0] : value];
    })
  )
);

const optionsKeys = computed(() => Object.keys(props.options));

const getOptionType = (key: string) => {
  if (Array.isArray(props.options[key])) return 'choices';
  return 'boolean';
};
</script>

<template>
  <article class="ui-component-preview">
    <div class="content">
      <slot :options="_options">
        <pre>{{ _options }}</pre>
      </slot>
    </div>
    <aside>
      <p v-if="!optionsKeys.length">This component has no options</p>
      <template v-for="key in optionsKeys" :key="key">
        <template v-if="getOptionType(key) === 'choices'">
          <fieldset>
            <legend>{{ key }}</legend>
            <label
              v-for="value in Object.values(props.options[key])"
              :key="value"
            >
              <input v-model="_options[key]" type="radio" :value="value" />
              {{ value }}
            </label>
          </fieldset>
        </template>

        <label v-else-if="getOptionType(key) === 'boolean'">
          <input v-model="_options[key]" type="checkbox" />
          {{ key }}
        </label>
      </template>
    </aside>
  </article>
</template>

<style scoped lang="postcss">
.ui-component-preview {
  display: grid;
  grid-template-columns: 1fr 15rem;
  min-height: 15rem;
  border: solid 1px var(--border-dimmed);
}

.content {
  display: grid;
  place-content: center;
}

aside {
  padding: var(--size-2);
  border-left: solid 1px var(--border-dimmed);

  & > fieldset {
    margin-block-end: var(--size-3);
  }
}

label {
  display: block;
  &:not(:last-of-type) {
    margin-block-end: var(--size-1);
  }
}
</style>
