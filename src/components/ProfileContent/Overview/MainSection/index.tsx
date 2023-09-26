import type { UserGamesByStatus } from '@constants/types';

import styles from '@components/ProfileContent/Overview/MainSection/MainSection.module.scss';
import ListStatistic from '@components/ProfileContent/Overview/MainSection/ListStatistic';
import ListActivities from '@components/ProfileContent/Overview/MainSection/ListActivities';

function MainSection({
  userGames,
}: {
  userGames: UserGamesByStatus | undefined;
}) {
  return (
    <div className={styles.mainSection}>
      <ListStatistic userGames={userGames} />
      <ListActivities
      // fetchLimitation={5}
      // socials={socials}
      // loading={loadingSocials}
      // refetch={refetch}
      // fetchMore={fetchMore}
      // type="private"
      />
    </div>
  );
}

export default MainSection;
