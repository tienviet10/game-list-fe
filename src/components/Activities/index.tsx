import usePostsAndStatusUpdates from '@services/InteractiveEntity/usePostsAndStatusUpdates';
import ListActivities from '@components/ProfileContent/Overview/MainSection/ListActivities';

export default function Activities() {
  const {
    socialDataSorted,
    postsAndStatusUpdatesIsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    getPostsAndStatusUpdates,
  } = usePostsAndStatusUpdates('global');

  return (
    <ListActivities
      socials={socialDataSorted}
      postsAndStatusUpdatesIsLoading={postsAndStatusUpdatesIsLoading}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      getPostsAndStatusUpdates={getPostsAndStatusUpdates}
      // fetchLimitation={15}
    />
  );
}
