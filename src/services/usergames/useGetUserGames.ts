import { useQuery } from '@tanstack/react-query';
import client from '@utils/authApi';
import type {
  CustomAxiosResponse,
  ErrorResponse,
  UserGamesByStatus,
} from '@constants/types';

type UserGamesType = {
  userGamesByStatus: UserGamesByStatus;
};

const useGetUserGames = () => {
  const getGames = async (): Promise<CustomAxiosResponse<UserGamesType>> => {
    return client.get(`/api/v1/usergames/status`);
  };

  const {
    data: userGames,
    isInitialLoading: userDataIsLoading,
    refetch: getUserGames,
  } = useQuery<CustomAxiosResponse<UserGamesType>, ErrorResponse>({
    queryKey: ['userGames'],
    queryFn: getGames,
    enabled: false,
  });

  return { userGames, userDataIsLoading, getUserGames };
};

export default useGetUserGames;
