import type {
  CustomAxiosResponse,
  ErrorResponse,
  UserGamesByStatus,
} from '@constants/types';
import type {
  RefetchQueryFilters,
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import ListCards from '@components/ProfileContent/Overview/SideSection/ListCards';
import styles from '@components/ProfileContent/Overview/Overview.module.scss';

type UserGamesType = {
  userGamesByStatus: UserGamesByStatus;
};

function SideSection({
  userGames,
  userDataIsLoading,
  getUserGames,
}: {
  userGames: UserGamesByStatus | undefined;
  userDataIsLoading: boolean;
  getUserGames: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<
    QueryObserverResult<CustomAxiosResponse<UserGamesType>, ErrorResponse>
  >;
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
