import { useQuery } from '@tanstack/vue-query';

import { githubApi } from 'src/boot/githubApi';
import { Issue, State } from '../interfaces/issue';
import useStore from './useStore';

const getIssues = async (labels: string[], state: State): Promise<Issue[]> => {
  const params = new URLSearchParams();

  if (state) params.append('state', state);
  if (labels.length > 0) params.append('labels', labels.join(','));

  params.append('per_page', '10');
  const { data } = await githubApi.get<Issue[]>('/issues', { params });
  return data;
};

const useIssues = () => {
  const { labels, state } = useStore();

  const { isLoading, data } = useQuery(['issues', { labels, state }], () =>
    getIssues(labels.value, state.value)
  );

  return {
    //* Props
    isLoading,
    issues: data,

    //! Getters
    //? Methods
  };
};

export default useIssues;
