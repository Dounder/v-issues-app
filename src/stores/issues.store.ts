import { defineStore } from 'pinia';
import { ref } from 'vue';

export enum ISSUE_STATE {
  all = 'all',
  open = 'open',
  closed = 'closed',
}

export const useIssuesStore = defineStore('issuesStore', () => {
  const state = ref('');
  const labels = ref<string[]>([]);

  return {
    //? Props
    state,
    labels,

    //* Getters
    //! Actions
    toggleLabel(labelName: string) {
      labels.value = labels.value.includes(labelName)
        ? labels.value.filter((l) => l !== labelName)
        : [...labels.value, labelName];

      localStorage.setItem(
        'is',
        JSON.stringify({ state: state.value, labels: labels.value })
      );
    },
  };
});
