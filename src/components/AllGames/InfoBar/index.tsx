import { Layout } from 'antd';
import styles from '@/components/AllGames/InfoBar/InfoBar.module.scss';
import FilterTags from '@/components/AllGames/InfoBar/FilterTags';
import SelectorsWrapper from '@/components/AllGames/InfoBar/SelectorsWrapper';

export default function InfoBar() {
  return (
    <Layout className={styles.infoBarContainer}>
      <FilterTags />
      <SelectorsWrapper />
    </Layout>
  );
}
