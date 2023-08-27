import { Badge, List } from 'antd';
import { useEffect, useMemo } from 'react';
import type { SelectedListTypes } from '@constants/types';
import useGetUserGames from '@services/usergames/useGetUserGames';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { setUserGameFilters } from '@app/store';
import styles from './AvailableListsStyle.module.scss';
import { DataList } from './types';

function AvailableLists() {
  const dispatch = useAppDispatch();
  const gameFilters = useAppSelector((state) => state.userGameFilters);
  const listOrder = useAppSelector((state) => state.userGames);
  const { userGames, getUserGames } = useGetUserGames();

  useEffect(() => {
    if (getUserGames) {
      getUserGames();
    }
  }, [getUserGames]);

  const data: DataList[] = useMemo(() => {
    const dataArray: DataList[] = [
      {
        name: 'Planning',
        value: 'planning',
        count: userGames?.data.data.userGamesByStatus?.planningCount ?? 0,
      },
      {
        name: 'Playing',
        value: 'playing',
        count: userGames?.data.data.userGamesByStatus?.playingCount ?? 0,
      },
      {
        name: 'Paused',
        value: 'paused',
        count: userGames?.data.data.userGamesByStatus?.pausedCount ?? 0,
      },
      {
        name: 'Completed',
        value: 'completed',
        count: userGames?.data.data.userGamesByStatus?.completedCount ?? 0,
      },
      {
        name: 'Dropped',
        value: 'dropped',
        count: userGames?.data.data.userGamesByStatus?.droppedCount ?? 0,
      },
    ];

    const newArray = listOrder.listOrder
      .map((value) => dataArray.find((item) => item.value === value))
      .filter((item) => item && item.count > 0) as DataList[];
    newArray.unshift({
      name: 'All',
      value: 'all',
      count: dataArray.reduce((acc, curr) => acc + curr.count, 0),
    });

    return newArray ?? [];
  }, [
    userGames?.data.data.userGamesByStatus?.completedCount,
    userGames?.data.data.userGamesByStatus?.droppedCount,
    userGames?.data.data.userGamesByStatus?.pausedCount,
    userGames?.data.data.userGamesByStatus?.planningCount,
    userGames?.data.data.userGamesByStatus?.playingCount,
    listOrder.listOrder,
  ]);

  const handleItemClick = (item: SelectedListTypes) => {
    dispatch(setUserGameFilters({ selectedList: item }));
  };

  return (
    <List
      dataSource={data}
      className={styles.listStyle}
      renderItem={(item) => (
        <List.Item
          data-testid={`listitem-${item.name}`}
          onClick={() => handleItemClick(item.value)}
          style={
            gameFilters.selectedList === item.name.toLowerCase()
              ? { backgroundColor: '#e0ddd3' }
              : {}
          }
        >
          <div className={styles.listName}>
            <p>{item.name}</p>
            <Badge count={item.count} showZero color="rgb(63, 114, 175)" />
          </div>
        </List.Item>
      )}
    />
  );
}

export default AvailableLists;
