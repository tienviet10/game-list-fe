import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { setUserGameFilters } from '@app/store';
import styles from './SearchBarStyle.module.scss';

const { Search } = Input;

function SearchBar() {
  const dispatch = useDispatch();

  return (
    <Search
      className={styles.searchBar}
      placeholder="Filter"
      onChange={(e) => dispatch(setUserGameFilters({ search: e.target.value }))}
      data-testid="search-bar-desktop"
    />
  );
}

export default SearchBar;
