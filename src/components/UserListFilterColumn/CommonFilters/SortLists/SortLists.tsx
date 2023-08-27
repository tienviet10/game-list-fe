import { useMemo } from 'react';
import { Select } from 'antd';
import type { UserGameFiltersSortType } from '@constants/types';
import { setUserGameFilters } from '@app/store';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import styles from './SortListsStyle.module.scss';

type SortItemsListType = {
  label: string;
  value: UserGameFiltersSortType | undefined;
};

function SortLists() {
  const gameFilters = useAppSelector((state) => state.userGameFilters);
  const dispatch = useAppDispatch();

  const sortItemsList: SortItemsListType[] = useMemo(() => {
    return [
      { label: 'Name', value: 'name' },
      { label: 'Average Score', value: 'avg_score' },
      { label: 'Newest Releases', value: 'newest_releases' },
      { label: 'Oldest Releases', value: 'oldest_releases' },
      { label: 'Last Updated', value: 'last_updated' },
      { label: 'Last Added', value: 'last_added' },
      { label: 'Start Date', value: 'start_date' },
      { label: 'Completed Date', value: 'completed_date' },
    ];
  }, []);

  return (
    <Select
      placement="topLeft"
      style={{ width: 150 }}
      className={styles.selectorsContainer}
      defaultValue="name"
      value={gameFilters.sortBy}
      options={sortItemsList}
      onChange={(value: SortItemsListType['value']) => {
        dispatch(setUserGameFilters({ sortBy: value }));
      }}
    />
  );
}

export default SortLists;
