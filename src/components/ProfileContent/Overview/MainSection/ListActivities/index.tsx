import { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Skeleton } from 'antd';
import CustomSelect from '@components/CustomSelect';

import { DownOutlined } from '@ant-design/icons';

import PostInput from '@components/ProfileContent/Overview/MainSection/ListActivities/PostInput';
import ActivitiesUpdates from '@components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import styles from '@components/ProfileContent/Overview/MainSection/ListActivities/ListActivities.module.scss';

export default function ListActivities() {
  const dispatch = useAppDispatch();

  const { isUserGameEdited } = useAppSelector((state) => state.addedGames);

  const [post, setPost] = useState<string>('');

  const items: MenuProps['items'] = [
    {
      label: 'All',
      key: '0',
    },
    {
      label: 'List',
      key: '1',
    },
    {
      label: 'Posts',
      key: '3',
    },
  ];

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
      <PostInput post={post} setPost={setPost} />
      <ActivitiesUpdates
      // fetchLimitation={fetchLimitation}
      // socials={socials}
      // fetchMore={fetchMore}
      // type={type}
      />
    </div>
  );
}
