import { useMemo } from 'react';
import { InView } from 'react-intersection-observer';
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
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
}: {
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

  const { id: tempId } = userState;
  const currentUserId = parseInt(tempId, 10);
  const memoizedActivities = useMemo(() => {
    return [...socials].map((activity) => {
      const { daysElapsed, hoursElapsed } = getTimeElapsed(activity.createdAt);
      const isCurrentLiked = activity.likes.some(
        (like) => like.user.id === currentUserId
      );
      return (
        <ActivityCard
          isCurrentLiked={isCurrentLiked}
          key={activity.id}
          activity={activity}
          daysElapsed={daysElapsed}
          hoursElapsed={hoursElapsed}
          currentUserId={currentUserId}
          // addLike={addLike}
          // removeLike={removeLike}
        />
      );
    });
  }, [socials, currentUserId]);

  return (
    <div>
      <h1>ActivitiesUpdates</h1>
      <ActivityCard />
    </div>
  );
}
