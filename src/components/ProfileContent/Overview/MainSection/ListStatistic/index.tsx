import { Col, Grid, Row, Statistic, Divider } from 'antd';
import type { UserGamesByStatus } from '@constants/types';

import styles from '@components/ProfileContent/Overview/MainSection/ListStatistic/ListStatistic.module.scss';

const { useBreakpoint } = Grid;

export default function ListStatistic({
  userGames,
}: {
  userGames: UserGamesByStatus | undefined;
}) {
  const screens = useBreakpoint();

  const gameStatusExtractor = (gamesObjData: UserGamesByStatus) => {
    const result: JSX.Element[] = [];

    Object.keys(gamesObjData).forEach((key) => {
      if (key.includes('Count')) {
        result.push(
          <Col span={6} key={key}>
            <Statistic
              valueStyle={{
                color: 'rgb(17, 45, 78)',
                fontSize: `${screens.xs ? '10px' : '14px'}`,
              }}
              title={
                key === 'justAddedCount'
                  ? 'JUST ADDED'
                  : key.replace('Count', '').toUpperCase()
              }
              value={
                gamesObjData[
                  key as
                    | 'playingCount'
                    | 'completedCount'
                    | 'pausedCount'
                    | 'droppedCount'
                    | 'planningCount'
                    | 'justAddedCount'
                ] || undefined
              }
            />
          </Col>
        );
      }
    });
    return result;
  };

  return (
    <Row
      gutter={16}
      className={styles.statisticContainer}
      style={{ marginLeft: 'auto', marginRight: 'auto' }}
    >
      {userGames && gameStatusExtractor(userGames)}

      <Divider
        style={{ fontSize: '12px', color: 'rgb(92, 114, 138)' }}
        orientation="left"
      >
        Activities
      </Divider>
      <Col span={18}>
        <Statistic title="Active Users" value={1153} loading />
      </Col>
    </Row>
  );
}
