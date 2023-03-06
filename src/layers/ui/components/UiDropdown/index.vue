<script setup lang="ts">
import { Placement, offset, flip } from '@floating-ui/dom';
import { useFloating, autoUpdate } from '@floating-ui/vue';
import { VNodeRef } from 'vue';
import { AnyObject, Nullable } from '~~/src/utils/types';
import { vStableId } from '../../directives/stableId';

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

const menuId = useNanoId();
const toggleId = useNanoId();

const close = () => {
  vModel.value = false;
};
onClickOutside(dropdownEl, close);
onKeyStroke('Escape', close);

const { focused } = useFocusWithin(menuEl);
watchEffect(() => {
  if (props.isOpened) {
    nextTick(() => {
      getFocusableChildren(menuEl.value)[0].focus();
    });
  }
});
watch([vModel, focused], ([, focused], [prevIsOpened, prevFocused]) => {
  if (!prevIsOpened || !prevFocused) return;
  const isToggleFocused = activeElement.value === toggleEl.value;
  if (!focused && !isToggleFocused) {
    vModel.value = false;
  }
});
const activeElement = useActiveElement();
useEventListener('keydown', (e) => {
  if (![KEYBOARD.ArrowDown, KEYBOARD.ArrowUp].includes(e.code as any)) return;
  if (!props.isOpened) return;
  const focusable = getFocusableChildren(menuEl.value);
  const index = focusable.findIndex((el) => el === activeElement.value);
  if (index === -1) return;
  e.preventDefault();
  let nextIndex: number;
  switch (e.code) {
    case KEYBOARD.ArrowUp:
      nextIndex = index === 0 ? focusable.length - 1 : index - 1;
      break;
    case KEYBOARD.ArrowDown:
      nextIndex = index === focusable.length - 1 ? 0 : index + 1;
      break;
    default:
      return;
  }
  focusable[nextIndex].focus();
});

const { x, y, strategy } = useFloating(toggleEl, menuEl, {
  placement: toRef(props, 'placement'),
  whileElementsMounted: autoUpdate,
  middleware: [offset(15), flip()]
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

const toggleSlotProps: { ref: VNodeRef; props: AnyObject } = useSlotProps({
  ref: (el) => {
    toggleEl.value = unrefElement(el as any);
  },
  props: {
    'aria-haspopup': true,
    'aria-controls': menuId,
    'aria-expanded': computed(() => props.isOpened),
    id: toggleId,
    onClick: () => {
      vModel.value = !vModel.value;
    }
  }
});
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
        v-stable-id="menuId"
        :aria-labelledby="toggleId"
        class="ui-dropdown"
        :class="menuClass"
        role="menu"
        tabindex="0"
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
  border: solid 1px var(--border-dimmed);
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
