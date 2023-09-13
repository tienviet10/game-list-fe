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
import styles from '@components/ProfileContent/Overview/MainSection/MainSection.module.scss';
import ListStatistic from '@components/ProfileContent/Overview/MainSection/ListStatistic';

type UserGamesType = {
  userGamesByStatus: UserGamesByStatus;
};

function MainSection({
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
  if (userDataIsLoading) return <div>Loading...</div>;
  return (
    <div className={styles.mainSection}>
      <ListStatistic userGames={userGames} />
      {/* <ListActivities
        fetchLimitation={5}
        socials={socials}
        loading={loadingSocials}
        refetch={refetch}
        fetchMore={fetchMore}
        type="private"
      /> */}
    </div>
  );
}

export default MainSection;
