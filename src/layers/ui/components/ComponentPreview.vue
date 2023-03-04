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

<style scoped>
.ui-component-preview {
  display: grid;
  grid-template-columns: 1fr 15rem;
  min-height: 20rem;
  border: solid 1px var(--border);
}

.content {
  display: grid;
  place-content: center;
}

aside {
  padding: var(--size-2);
  border-left: solid 1px var(--border);
}

aside > * + * {
  margin-block-start: var(--size-3);
}

label {
  display: block;
}
</style>
