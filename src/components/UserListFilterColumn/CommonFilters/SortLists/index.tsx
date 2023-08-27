import SortLists from './SortLists';
import styles from './SortListsStyle.module.scss';

function SortListsWrapper() {
  return (
    <div className={styles.multiFilterStyle}>
      <p>Sort</p>
      <SortLists />
    </div>
  );
}

export default SortListsWrapper;
