import { storeToRefs } from 'pinia';
import { useQuery } from '@tanstack/vue-query';

import { githubApi } from 'src/boot/githubApi';
import { useIssuesStore } from 'src/stores/issues.store';
import { Label } from '../interfaces/label';

const getLabels = async (): Promise<Label[]> => {
  const { data } = await githubApi.get<Label[]>('/labels?per_page=100');
  return data;
};

const useLabels = () => {
  const store = useIssuesStore();
  const { labels, state } = storeToRefs(store);

  const { isLoading, data } = useQuery(['labels'], getLabels, {
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return {
    //* Props
    isLoading,
    labels: data,
    selectedLabels: labels,
    issueState: state,

    //! Getters
    //? Methods
    toggleLabel: store.toggleLabel,
  };
};

export default useLabels;
