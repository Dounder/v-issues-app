import { useQuery, useQueryClient } from '@tanstack/vue-query';

import { githubApi } from 'src/boot/githubApi';
import { Issue } from './../interfaces/issue';

interface Options {
  autoload?: boolean;
}

const sleep = (): Promise<boolean> =>
  new Promise((res) => setTimeout(() => res(true), 2000));

const getIssue = async (issueNumber: number): Promise<Issue> => {
  await sleep();
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
  return data;
};

const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
  await sleep();
  const { data } = await githubApi.get<Issue[]>(
    `/issues/${issueNumber}/comments`
  );
  return data;
};

const useIssue = (issueNumber: number, options?: Options) => {
  const { autoload = true } = options || {};

  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery(
    ['issue', issueNumber],
    () => getIssue(issueNumber),
    { staleTime: 1000 * 60, enabled: autoload }
  );

  const { isLoading: isLoadingComments, data: comments } = useQuery(
    ['issue', issueNumber, 'comments'],
    () => getIssueComments(issueNumber),
    { staleTime: 1000 * 15, enabled: autoload }
    // () => getIssueComments(data.value?.number || 0),
    // { staleTime: 1000 * 15, enabled: computed(() => !!data.value) }
  );

  const prefetchIssue = (issueNumber: number) => {
    queryClient.prefetchQuery(
      ['issue', issueNumber],
      () => getIssue(issueNumber),
      { staleTime: 1000 * 60 }
    );

    queryClient.prefetchQuery(
      ['issue', issueNumber, 'comments'],
      () => getIssueComments(issueNumber),
      { staleTime: 1000 * 15 }
    );
  };

  const setIssueCacheData = (issue: Issue) => {
    queryClient.setQueryData(['issue', issue.number], issue);
  };

  return {
    //* Props
    comments,
    isLoading,
    isLoadingComments,
    issue: data,

    //! Getters
    //? Methods
    prefetchIssue,
    setIssueCacheData,
  };
};

export default useIssue;
