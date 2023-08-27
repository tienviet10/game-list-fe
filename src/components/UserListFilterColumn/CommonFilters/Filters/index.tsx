import FilterList from './FilterList';
import styles from './FilterListWrapperStyle.module.scss';

function FilterListWrapper() {
  return (
    <div className={styles.multiFilterStyle}>
      <p>Filters</p>
      <FilterList />
    </div>
  );
}

export default FilterListWrapper;
