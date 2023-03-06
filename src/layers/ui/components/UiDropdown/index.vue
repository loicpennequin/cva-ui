<script setup lang="ts">
import { Placement, offset } from '@floating-ui/dom';
import { useFloating, autoUpdate } from '@floating-ui/vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { VNodeRef } from 'vue';
import { Nullable } from '~~/src/utils/types';

const props = withDefaults(
  defineProps<{
    isOpened: boolean;
    placement?: Placement;
  }>(),
  { placement: 'bottom' }
);
const emit = defineEmits<{
  (e: 'update:isOpened', value: string): void;
}>();

const vModel = useVModel(props, 'isOpened', emit);
const dropdownEl = ref<HTMLElement>();
const toggleEl = ref<Nullable<HTMLElement>>();
const menuEl = ref<Nullable<HTMLElement>>();
const { activate, deactivate } = useFocusTrap(menuEl, {
  allowOutsideClick: true
});
const { x, y, strategy } = useFloating(toggleEl, menuEl, {
  placement: toRef(props, 'placement'),
  whileElementsMounted: autoUpdate,
  middleware: [offset(15)]
});

const close = () => {
  vModel.value = false;
};
onClickOutside(dropdownEl, close);
onKeyStroke('Escape', close);

watchEffect(() => {
  nextTick(props.isOpened ? activate : deactivate);
});

const menuStyle = computed(() => ({
  x: `${x.value ?? 0}px`,
  y: `${y.value ?? 0}px`,
  position: strategy.value
}));

const menuClass = computed(() => {
  if (props.placement.includes('top')) return 'top';
  if (props.placement.includes('bottom')) return 'bottom';
  if (props.placement.includes('left')) return 'left';
  if (props.placement.includes('right')) return 'right';
  return '';
});

const toggleSlotProps: { ref: VNodeRef; props: { onClick: () => void } } = {
  ref: (el) => {
    toggleEl.value = unrefElement(el as any);
  },
  props: {
    onClick: () => {
      vModel.value = !vModel.value;
    }
  }
};
</script>

<template>
  <div ref="dropdownEl">
    <slot name="toggle" v-bind="toggleSlotProps" />

    <Transition>
      <!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
      <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -->
      <div
        v-if="props.isOpened"
        ref="menuEl"
        class="ui-dropdown"
        :class="menuClass"
        @click="close"
      >
        <slot name="menu" />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="postcss">
.ui-dropdown {
  position: v-bind('menuStyle.position');
  left: v-bind('menuStyle.x');
  top: v-bind('menuStyle.y');
  z-index: 10;
  box-shadow: var(--shadow-2);
  background-color: var(--surface-1);
  color: var(--text-1);

  &.v-enter-active,
  &.v-leave-active {
    transition: opacity 0.2s, transform 0.2s;
  }

  &.v-enter-from,
  &.v-leave-to {
    opacity: 0;
  }

  &.top {
    &.v-enter-from,
    &.v-leave-to {
      transform: translateY(var(--size-5));
    }
  }
  &.bottom {
    &.v-enter-from,
    &.v-leave-to {
      transform: translateY(calc(-1 * var(--size-5)));
    }
  }
  &.left {
    &.v-enter-from,
    &.v-leave-to {
      transform: translateX(var(--size-5));
    }
  }
  &.right {
    &.v-enter-from,
    &.v-leave-to {
      transform: translateX(calc(-1 * var(--size-5)));
    }
  }
}
</style>
