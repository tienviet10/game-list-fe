import { useQuery } from '@tanstack/react-query';
import client from '@utils/authApi';
import type { CustomAxiosResponse, ErrorResponse } from '@constants/types';

type UserGamesByID = {
  id: number;
  gameStatus: string;
  startDate: string;
  completedDate: string;
  isPrivate: boolean;
  rating: number;
  gameNote: string;
  createdAt: string;
  updatedAt: string;
};

type UserGameType = {
  userGame: UserGamesByID;
};

const useGetUserGame = (userGameId: number | undefined) => {
  const getGame = async (): Promise<CustomAxiosResponse<UserGameType>> => {
    return client.get(`/api/v1/usergames/${userGameId}`);
  };

  const {
    data: userGame,
    isInitialLoading: userGameDataIsLoading,
    refetch: getUserGame,
  } = useQuery<CustomAxiosResponse<UserGameType>, ErrorResponse>({
    queryKey: ['userGame', userGameId],
    queryFn: getGame,
    enabled: !!userGameId,
  });

  return {
    userGame,
    userGameDataIsLoading,
    getUserGame,
  };
};

export default useGetUserGame;
