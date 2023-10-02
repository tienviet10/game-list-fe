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
    postsAndStatusUpdates,
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

  console.log('data', data);

  const firstPostsLength = postsAndStatusUpdatesIsLoading
    ? 0
    : data.pages[0].data.postsAndStatusUpdates.posts.length;

  console.log('firstPostsLength', firstPostsLength);

  useEffect(() => {
    setSocials(getSortedSocialData(data));
  }, [data, firstPostsLength]);

  // const socialDataSorted = getSortedSocialData(postsAndStatusUpdates);
  return (
    <div className={styles.mainSection}>
      <ListStatistic userGames={userGames} />
      <ListActivities
        // type="private"
        firstPostsLength={firstPostsLength}
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
