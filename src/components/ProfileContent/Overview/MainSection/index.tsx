import type { UserGamesByStatus } from '@constants/types';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import styles from '@components/ProfileContent/Overview/MainSection/MainSection.module.scss';
import ListStatistic from '@components/ProfileContent/Overview/MainSection/ListStatistic';
import ListActivities from '@components/ProfileContent/Overview/MainSection/ListActivities';
import usePostsAndStatusUpdates from '@services/InteractiveEntity/usePostsAndStatusUpdates';
import getSortedSocialData, {
  PostsAndStatusUpdatesType,
} from '@utils/getSortedSocialData';
import { PostsDTOResponse, StatusUpdatesDTOResponse } from '@constants/types';

function MainSection({
  userGames,
}: {
  userGames: UserGamesByStatus | undefined;
}) {
  const {
    postsAndStatusUpdatesIsLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    getPostsAndStatusUpdates,
  } = usePostsAndStatusUpdates();

  const [socials, setSocials] = useState<
    (PostsDTOResponse | StatusUpdatesDTOResponse)[]
  >([]);

  const queryClient = useQueryClient();

  const data = queryClient.getQueryData([
    'postsAndStatusUpdates',
  ]) as PostsAndStatusUpdatesType;

  useEffect(() => {
    setSocials(getSortedSocialData(data));
  }, [data]);

  // const socialDataSorted = getSortedSocialData(postsAndStatusUpdates);
  return (
    <div className={styles.mainSection}>
      <ListStatistic userGames={userGames} />
      <ListActivities
        // type="private"
        socials={socials}
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
