import { useState } from 'react';
import YearSlider from '@components/UserListFilterColumn/CommonFilters/YearSlider';
import SortListsWrapper from '@components/UserListFilterColumn/CommonFilters/SortLists';
import ListsWrapper from '@components/UserListFilterColumn/CommonFilters/ListsWrapper';
import FilterListWrapper from '@components/UserListFilterColumn/CommonFilters/Filters';
import FilterMobile from './Mobile';
import FilterDesktop from './Desktop';
import styles from './FilterColumn.module.scss';

function FilterColumn() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <>
      <FilterDesktop />
      <FilterMobile collapsed={collapsed} setCollapsed={setCollapsed} />
      {collapsed && (
        <div className={styles.mobileDropdown}>
          <ListsWrapper />
          <FilterListWrapper />
          <YearSlider />
          <SortListsWrapper />
        </div>
      )}
    </>
  );
}

export default FilterColumn;
