import { Col, Skeleton } from 'antd';
import styles from '@/components/AllGames/GamesList/GameCard/GameCard.module.scss';

export default function GamesListLoading() {
  return (
    <Col
      className={styles.colGameCardContainer}
      xs={{ span: 12 }}
      sm={{ span: 8 }}
      md={{ span: 6 }}
      xl={{ span: 4 }}
    >
      <Skeleton.Input
        active
        rootClassName={styles.loadingCardRoot}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '180px',
          display: 'flex',
          minWidth: '0px',
        }}
        // bodyStyle={{
        //   padding: '24px 24px 24px 10px',
        //   backgroundColor: colorBgContainer,
        // }}
      />
    </Col>
  );
}
