import { useMemo } from 'react';
import { InView } from 'react-intersection-observer';
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';

import getTimeElapsed from '@utils/getTimeElapsed';
import type {
  PostsDTOResponse,
  StatusUpdatesDTOResponse,
  PostsAndStatusUpdatesResponse,
} from '@services/InteractiveEntity/usePostsAndStatusUpdates';
import type { CustomAxiosResponse, ErrorResponse } from '@constants/types';
import { useAppSelector } from '@app/hooks';
import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivitiesUpdates.module.scss';
import ActivityCard from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivityCard';

export default function ActivitiesUpdates({
  socials,
  getPostsAndStatusUpdates,
  fetchMore,
}: {
  fetchMore: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<any, unknown>>;
  socials: (PostsDTOResponse | StatusUpdatesDTOResponse)[];
  getPostsAndStatusUpdates: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<
    QueryObserverResult<
      CustomAxiosResponse<PostsAndStatusUpdatesResponse>,
      ErrorResponse
    >
  >;
}) {
  const userState = useAppSelector((state) => state.user.user);

  const { username } = userState;

  const memoizedActivities = useMemo(() => {
    return [...socials].map((activity) => {
      const { daysElapsed, hoursElapsed } = getTimeElapsed(activity.createdAt);
      const isCurrentLiked = activity.likes.some(
        (like) => like.user.username === username
      );
      return (
        <ActivityCard
          isCurrentLiked={isCurrentLiked}
          key={activity.id}
          activity={activity}
          daysElapsed={daysElapsed}
          hoursElapsed={hoursElapsed}
          username={username}
          // addLike={addLike}
          // removeLike={removeLike}
        />
      );
    });
  }, [socials, username]);

  return (
    <div className={styles.activitiesUpdatesContainer}>
      {socials.length > 0 && memoizedActivities}
      <InView
        style={{
          height: '100px',
        }}
        as="div"
        onChange={async (inView) => {
          // const socialsLength = socials.length;
          if (inView) {
            // await onFetchMore(socialsLength);
            console.log('the end');
          }
        }}
      />
    </div>
  );
}
