<script setup lang="ts">
defineProps<{
  options: Record<string, string | boolean>;
}>();

const toast = useToast();

const sendInfoToast = () => {
  toast.showInfo({
    title: 'This is an info toast',
    text: 'This is the info toast Text !'
  });
};
const sendSuccessToast = () => {
  toast.showSuccess({
    title: 'This is an success toast',
    text: 'This is the success toast Text !'
  });
};
const sendErrorToast = () => {
  toast.showError({
    title: 'This is an error toast',
    text: 'This is the error toast Text !'
  });
};
const sendWarningToast = () => {
  toast.showWarning({
    title: 'This is an warning toast',
    text: 'This is the warning toast Text !'
  });
};
</script>

<template>
  <UiToastBar />
  <section>
    <UiButton @click="sendInfoToast">Send info toast</UiButton>
    <UiButton @click="sendSuccessToast">Send success toast</UiButton>
    <UiButton @click="sendWarningToast">Send warning toast</UiButton>
    <UiButton @click="sendErrorToast">Send error toast</UiButton>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}
</style>
