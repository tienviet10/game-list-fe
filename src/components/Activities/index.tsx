import usePostsAndStatusUpdates from '@services/InteractiveEntity/usePostsAndStatusUpdates';
import ListActivities from '@components/ProfileContent/Overview/MainSection/ListActivities';
import getSortedSocialData from '@utils/getSortedSocialData';

export default function Activities() {
  const {
    postsAndStatusUpdatesIsLoading,
    postsAndStatusUpdates,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    getPostsAndStatusUpdates,
  } = usePostsAndStatusUpdates('global');

  const socialDataSorted = getSortedSocialData(postsAndStatusUpdates);

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
