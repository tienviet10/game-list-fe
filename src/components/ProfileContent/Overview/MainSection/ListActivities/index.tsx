import { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Skeleton } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import type {
  ErrorResponse,
  PostsDTOResponse,
  StatusUpdatesDTOResponse,
  PostsAndStatusUpdatesResponse,
} from '@constants/types';
import {
  RefetchQueryFilters,
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  RefetchOptions,
  QueryObserverResult,
  InfiniteData,
} from '@tanstack/react-query';

import MemoizedPostInput from '@components/ProfileContent/Overview/MainSection/ListActivities/PostInput';
import ActivitiesUpdates from '@components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import styles from '@components/ProfileContent/Overview/MainSection/ListActivities/ListActivities.module.scss';

export default function ListActivities({
  socials,
  postsAndStatusUpdatesIsLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  getPostsAndStatusUpdates,
  firstPostsLength,
}: {
  firstPostsLength: number;
  socials: (PostsDTOResponse | StatusUpdatesDTOResponse)[];
  postsAndStatusUpdatesIsLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<PostsAndStatusUpdatesResponse, ErrorResponse>
  >;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  getPostsAndStatusUpdates: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<
    QueryObserverResult<
      InfiniteData<PostsAndStatusUpdatesResponse>,
      ErrorResponse
    >
  >;
}) {
  const dispatch = useAppDispatch();

  const { isUserGameEdited } = useAppSelector((state) => state.addedGames);

  const [post, setPost] = useState<string>('');

  useEffect(() => {
    if (isUserGameEdited) {
      getPostsAndStatusUpdates();
      dispatch({ type: 'addedGames/setIsUserGameEdited', payload: false });
    }
  }, [isUserGameEdited, dispatch, getPostsAndStatusUpdates]);

  const items: MenuProps['items'] = [
    {
      label: 'All',
      key: '0',
    },
    {
      label: 'Statuses',
      key: '1',
    },
    {
      label: 'Posts',
      key: '3',
    },
  ];

  if (postsAndStatusUpdatesIsLoading) {
    return (
      <div className={styles.listActivitiesContainer}>
        <h2 className={styles.title}>Activities</h2>
        {Array.from({ length: 10 }, (_, index) => (
          <Skeleton
            avatar
            active
            key={index}
            style={{ margin: '25px auto 25px auto' }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.listActivitiesContainer}>
      <h2 className={styles.title}>
        Activities
        <Dropdown
          overlayClassName="dropdownFilter"
          menu={{ items }}
          trigger={['click']}
          arrow
        >
          <Space>
            Filter <DownOutlined />
          </Space>
        </Dropdown>
      </h2>
      <MemoizedPostInput post={post} setPost={setPost} />
      <ActivitiesUpdates
        socials={socials}
        isFetchingNextPage={isFetchingNextPage}
        fetchMore={fetchNextPage}
        hasNextPage={hasNextPage}
        firstPostsLength={firstPostsLength}
        // type={type}
      />
    </div>
  );
}
