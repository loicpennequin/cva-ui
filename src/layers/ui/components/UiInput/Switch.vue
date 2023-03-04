<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    id: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
  }>(),
  { size: 'md' }
);
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const vModel = useVModel(props, 'modelValue', emit);
const attrs = useAttrs();
</script>

<template>
  <div class="ui-input-switch" :class="props.size">
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

  &.sm label {
    --_height: var(--size-3);
  }

  &.md label {
    --_height: var(--size-4);
  }
  &.lg label {
    --_height: var(--size-5);
  }
  &.xl label {
    --_height: var(--size-6);
  }
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
  height: var(--_height);
  width: calc(var(--_height) * 2);
  padding-inline: var(--size-1);
  position: relative;
  border-radius: var(--radius-pill);

  &::after {
    content: '';
    position: absolute;
    top: -1px;
    height: var(--_height);
    aspect-ratio: 1;
    border-radius: var(--radius-pill);
    background-color: var(--primary);
    transition: left 200ms;
  }
}
</style>
