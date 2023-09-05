import { AppstoreFilled, UnorderedListOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import styles from '@/components/AllGames/InfoBar/SelectorsWrapper/SelectorsWrapper.module.scss';
import { useAppSelector } from '@/app/hooks';
import { setView } from '@/features/homeSearchSlice';
import { setHomeFilter } from '@/app/store';
import { SortItemsListType } from './types';

function SelectorsWrapper() {
  const homeSearchState = useAppSelector((state) => state.homeSearch);
  const gameFilters = useAppSelector((state) => state.homeGameFilters);
  const dispatch = useDispatch();

  const sortItemsList: SortItemsListType[] = useMemo(() => {
    return [
      { label: 'Name', value: 'name' },
      { label: 'Average Score', value: 'avg_score' },
      { label: 'Newest Releases', value: 'newest_releases' },
      { label: 'Oldest Releases', value: 'oldest_releases' },
      { label: 'Total Ratings', value: 'total_rating' },
    ];
  }, []);

  return (
    <div className={styles.selectorsContainer}>
      <Select
        style={{ width: 150 }}
        defaultValue="name"
        bordered={false}
        value={gameFilters.sortBy}
        options={sortItemsList}
        onChange={(value: SortItemsListType['value']) => {
          dispatch(setHomeFilter({ sortBy: value }));
        }}
      />
      <div className={styles.wrapper}>
        <AppstoreFilled
          aria-label="set-grid-view"
          onClick={() => dispatch(setView('grid'))}
          className={`${styles.selectorIcon} ${
            homeSearchState.view === 'grid' && styles.selected
          }`}
        />
        <UnorderedListOutlined
          aria-label="set-list-view"
          onClick={() => dispatch(setView('list'))}
          className={`${styles.selectorIcon} ${
            homeSearchState.view === 'list' && styles.selected
          }`}
        />
      </div>
    </div>
  );
}

export default SelectorsWrapper;
