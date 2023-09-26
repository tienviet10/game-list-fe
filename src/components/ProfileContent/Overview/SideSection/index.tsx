import type { UserGamesByStatus } from '@constants/types';

import ListCards from '@components/ProfileContent/Overview/SideSection/ListCards';
import styles from '@components/ProfileContent/Overview/Overview.module.scss';

function SideSection({
  userGames,
  userDataIsLoading,
}: {
  userGames: UserGamesByStatus | undefined;
  userDataIsLoading: boolean;
}) {
  const gamesExtractor = (gamesObjData: UserGamesByStatus) => {
    const res: JSX.Element[] = [];

    gamesObjData?.listsOrder?.split(',').forEach((status: string) => {
      const gameData =
        gamesObjData[
          status as
            | 'playing'
            | 'completed'
            | 'paused'
            | 'dropped'
            | 'planning'
            | 'justAdded'
        ];

      if (gameData && gameData.length > 0) {
        res.push(
          <ListCards
            key={gameData[0].name}
            status={status}
            gameData={gameData}
          />
        );
      }
    });

    return res;
  };

  return (
    <div className={styles.sideSectionContainer}>
      {userDataIsLoading && <div>Loading...</div>}
      {userGames && !userDataIsLoading && gamesExtractor(userGames)}
    </div>
  );
}

export default SideSection;
