import { Button, Space, Input } from 'antd';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@app/hooks';
import type { FilterMobileType } from '@components/UserListFilterColumn/Mobile/types';
import { setUserGameFilters } from '@app/store';
import styles from './FilterMobile.module.scss';

const { Search } = Input;

function FilterMobile({ collapsed, setCollapsed }: FilterMobileType) {
  const dispatch = useDispatch();
  const search = useAppSelector((state) => state.userGameFilters.search);

  return (
    <Space direction="horizontal" className={styles.mobileSearchFieldWrapper}>
      <Search
        className={styles.mobileSearchField}
        placeholder="search games"
        size="large"
        onChange={(e) =>
          dispatch(setUserGameFilters({ search: e.target.value }))
        }
        enterButton="Search"
        value={search}
      />
      <Button
        className={styles.mobileSearchButton}
        size="large"
        type="primary"
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        {collapsed ? <CloseOutlined /> : <MenuOutlined />}
      </Button>
    </Space>
  );
}

export default FilterMobile;
