import { useQuery } from '@tanstack/react-query';
import client from '@utils/authApi';
import type { CustomAxiosResponse, ErrorResponse } from '@constants/types';

type UserGamesByGameID = {
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
  userGame: UserGamesByGameID;
};

const useGetUserGame = (gameId: number | undefined) => {
  const getGame = async (): Promise<CustomAxiosResponse<UserGameType>> => {
    return client.get(`/api/v1/usergames/${gameId}`);
  };

  const {
    data: userGame,
    isInitialLoading: userGameDataIsLoading,
    refetch: getUserGame,
  } = useQuery<CustomAxiosResponse<UserGameType>, ErrorResponse>({
    queryKey: ['userGame', gameId],
    queryFn: getGame,
    enabled: !!gameId,
  });

  return {
    userGame,
    userGameDataIsLoading,
    getUserGame,
  };
};

export default useGetUserGame;
