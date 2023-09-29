import type { UserGamesByStatus } from '@constants/types';

import styles from '@components/ProfileContent/Overview/MainSection/MainSection.module.scss';
import ListStatistic from '@components/ProfileContent/Overview/MainSection/ListStatistic';
import ListActivities from '@components/ProfileContent/Overview/MainSection/ListActivities';
import usePostsAndStatusUpdates from '@services/InteractiveEntity/usePostsAndStatusUpdates';

function MainSection({
  userGames,
}: {
  userGames: UserGamesByStatus | undefined;
}) {
  const {
    socialDataSorted,
    postsAndStatusUpdatesIsLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    getPostsAndStatusUpdates,
  } = usePostsAndStatusUpdates();
  return (
    <div className={styles.mainSection}>
      <ListStatistic userGames={userGames} />
      <ListActivities
        // fetchLimitation={5}
        // socials={socials}
        // loading={loadingSocials}
        // refetch={refetch}
        // fetchMore={fetchMore}
        // type="private"
        socials={socialDataSorted}
        postsAndStatusUpdatesIsLoading={postsAndStatusUpdatesIsLoading}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        getPostsAndStatusUpdates={getPostsAndStatusUpdates}
      />
    </div>
  );
}

export default MainSection;
