<script setup lang="ts">
const { toasts, clear } = useToast();
</script>

<template>
  <Teleport to="body">
    <div class="ui-toast-bar">
      <TransitionGroup appear>
        <UiToast
          v-for="toast in toasts"
          :key="toast.id"
          class="toast"
          :kind="toast.kind"
          :icon="toast.icon"
          is-opened
          :to="toast.link"
          w-30rem
          @update:is-opened="clear(toast.id)"
        >
          <div>
            <strong>{{ toast.title }}</strong>
            <div class="text">
              {{ toast.text }}
            </div>
          </div>
        </UiToast>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped lang="postcss">
.ui-toast-bar {
  position: fixed;
  z-index: 20;
  left: 50%;
  bottom: var(--size-7);
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: var(--size-5);
  align-items: center;

  & .toast {
    &.v-enter-active,
    &.v-leave-active,
    &.v-move {
      transition: all 0.3s;
    }

    &.v-enter-from,
    &.v-leave-to {
      opacity: 0;
    }
    &.v-enter-from {
      transform: translateY(50%) scale(0);
    }
    &.v-leave-to {
      transform: translateX(50%);
    }
  }

  & .text {
    min-height: 1em;
  }
}
</style>
