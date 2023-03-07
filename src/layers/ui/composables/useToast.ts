import { nanoid } from 'nanoid';
import { defineStore, storeToRefs } from 'pinia';
import { PartialBy } from '~~/src/utils/types';
import type { TypedNuxtLinkProps } from '~~/.nuxt/typed-router/typed-router';

export type ToastKind = 'error' | 'warning' | 'success' | 'info';
export type Toast = {
  id: string;
  title: string;
  text?: string;
  kind: ToastKind;
  icon: string;
  timeout: number;
  link?: TypedNuxtLinkProps['to'];
};
export type ToastInput = Omit<PartialBy<Toast, 'timeout'>, 'id'>;
export type ToastHelperInput = PartialBy<ToastInput, 'kind' | 'icon'>;

const DEFAULT_TIMEOUT = 500000;

export const useToastStore = defineStore('toast', () => {
  const api = {
    toasts: ref<Toast[]>([]),

    add(input: ToastInput) {
      const id = nanoid(6);
      api.toasts.value.push({
        timeout: DEFAULT_TIMEOUT,
        id,
        ...input
      });

      setTimeout(() => {
        api.clear(id);
      }, input.timeout ?? DEFAULT_TIMEOUT);
    },

    clear(id: string) {
      const idx = api.toasts.value.findIndex((t) => t.id === id);
      if (idx === -1) return;

      api.toasts.value.splice(idx, 1);
    },

    clearAll() {
      api.toasts.value = [];
    }
  };

  return api;
});

export const useToast = () => {
  const toastStore = useToastStore();
  const { toasts } = storeToRefs(toastStore);

  const addToastHelper =
    (kind: ToastKind, icon: string) => (toast: ToastHelperInput) => {
      toastStore.add({
        kind,
        icon,
        ...toast
      });
    };

  return {
    toasts,
    clear: toastStore.clear,
    clearAll: toastStore.clearAll,
    show: toastStore.add,
    showError: addToastHelper('error', 'mingcute:close-fill'),
    showWarning: addToastHelper('warning', 'material-symbols:warning'),
    showSuccess: addToastHelper('success', 'ic:sharp-check'),
    showInfo: addToastHelper('info', 'mdi:information-variant')
  };
};
