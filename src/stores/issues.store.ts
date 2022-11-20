import { ref } from 'vue';
import { defineStore } from 'pinia';

import { State } from 'src/issues/interfaces/issue';

export const useIssuesStore = defineStore('issuesStore', () => {
  const state = ref<State>(State.All);
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
