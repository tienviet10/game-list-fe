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
  return <div>MainSection</div>;
}

export default MainSection;
