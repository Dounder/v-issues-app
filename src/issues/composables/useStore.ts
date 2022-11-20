import { storeToRefs } from 'pinia';
import { useIssuesStore } from 'src/stores/issues.store';

const useStore = () => {
  const store = useIssuesStore();
  const { labels, state } = storeToRefs(store);

  return {
    //* Props
    labels,
    state,

    //! Getters

    //? Methods
  };
};

export default useStore;
