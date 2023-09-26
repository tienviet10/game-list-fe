import { useMemo } from 'react';
import { InView } from 'react-intersection-observer';
import { Skeleton } from 'antd';
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';

import getTimeElapsed from '@utils/getTimeElapsed';
import type {
  PostsDTOResponse,
  StatusUpdatesDTOResponse,
  PostsAndStatusUpdatesResponse,
} from '@services/InteractiveEntity/usePostsAndStatusUpdates';
import { useAppSelector } from '@app/hooks';
import useNotification from '@hooks/useNotification';
import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivitiesUpdates.module.scss';
import ActivityCard from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivityCard';

export default function ActivitiesUpdates({
  socials,
  fetchMore,
  isFetchingNextPage,
  hasNextPage,
}: {
  isFetchingNextPage: boolean;
  fetchMore: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<PostsAndStatusUpdatesResponse, unknown>
  >;
  socials: (PostsDTOResponse | StatusUpdatesDTOResponse)[];
  hasNextPage: boolean | undefined;
}) {
  const userState = useAppSelector((state) => state.user.user);

  const { info, contextHolder } = useNotification();

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
      {isFetchingNextPage
        ? Array.from({ length: 10 }, (_, index) => (
            <Skeleton
              avatar
              active
              key={index}
              style={{ margin: '25px auto 25px auto' }}
            />
          ))
        : null}
      <InView
        style={{
          height: '100px',
        }}
        as="div"
        onChange={async (inView) => {
          // const socialsLength = socials.length;
          if (inView) {
            await fetchMore();
            if (!hasNextPage) {
              info('No more activities to load');
            }
          }
        }}
      />
      {contextHolder}
    </div>
  );
}
