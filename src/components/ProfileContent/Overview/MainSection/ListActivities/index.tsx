import { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Skeleton } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import usePostsAndStatusUpdates from '@services/InteractiveEntity/usePostsAndStatusUpdates';
import CustomSelect from '@components/CustomSelect';
import MemoizedPostInput from '@components/ProfileContent/Overview/MainSection/ListActivities/PostInput';
import ActivitiesUpdates from '@components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import styles from '@components/ProfileContent/Overview/MainSection/ListActivities/ListActivities.module.scss';

export default function ListActivities() {
  const dispatch = useAppDispatch();

  const { isUserGameEdited } = useAppSelector((state) => state.addedGames);

  const {
    socialDataSorted,
    postsAndStatusUpdates,
    postsAndStatusUpdatesIsLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    getPostsAndStatusUpdates,
  } = usePostsAndStatusUpdates();

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

  if (postsAndStatusUpdatesIsLoading || isFetchingNextPage) {
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

  console.log('socialDataArray', socialDataSorted);

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
        // fetchLimitation={fetchLimitation}
        socials={socialDataSorted}
        getPostsAndStatusUpdates={getPostsAndStatusUpdates}
        fetchMore={fetchNextPage}
        // type={type}
      />
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
    </div>
  );
}
