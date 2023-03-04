<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean;
  id: string;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const vModel = useVModel(props, 'modelValue', emit);
const attrs = useAttrs();
</script>

<template>
  <div :title="(attrs.ariaLabel as string)" class="ui-input-switch">
    <input
      :id="props.id"
      v-model="vModel"
      :aria-label="(attrs.ariaLabel as string)"
      class="sr-only"
      type="checkbox"
    />
    <slot name="off" />
    <label :for="props.id" />
    <slot name="on" />
  </div>
</template>

<style scoped lang="postcss">
.ui-input-switch {
  display: flex;
  gap: var(--size-2);
  align-items: center;
  padding: var(--size-1);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-0);
}

input[type='checkbox']:not(:checked) ~ label:after {
  left: 0;
}

input[type='checkbox']:checked ~ label:after {
  left: calc(100% - 18px);
}

label {
  border: solid 1px var(--border);
  cursor: pointer;
  height: var(--size-4);
  width: var(--size-8);
  padding-inline: var(--size-1);
  position: relative;
  border-radius: var(--radius-pill);

  &::after {
    content: '';
    position: absolute;
    top: -1px;
    width: var(--size-4);
    height: var(--size-4);
    border-radius: var(--radius-pill);
    background-color: var(--primary);
    transition: left 200ms;
  }
}
</style>
