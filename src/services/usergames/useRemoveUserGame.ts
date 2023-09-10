import type { CustomAxiosResponse, ErrorResponse } from '@constants/types';
import { useMutation } from '@tanstack/react-query';
import client from '@utils/authApi';

type RemoveUserGameResponse = {
  userGame: {
    id: number;
    gameStatus: string;
    startDate: null;
    completedDate: null;
    isPrivate: boolean;
    rating: null;
    gameNote: null;
    createdAt: string;
    updatedAt: string;
  };
};

const useRemoveUserGame = () => {
  const removeUserGame = async (
    gameIdParam: number
  ): Promise<CustomAxiosResponse<RemoveUserGameResponse>> => {
    return client.delete(`/api/v1/usergames/${gameIdParam}`);
  };

  const {
    mutate: removeUserGameMutation,
    data: removeUserGameResponse,
    error: removeUserGameError,
    isError: removeUserGameIsError,
  } = useMutation<
    CustomAxiosResponse<RemoveUserGameResponse>,
    ErrorResponse,
    number
  >({
    mutationFn: removeUserGame,
  });

  return {
    removeUserGameMutation,
    removeUserGameResponse,
    removeUserGameError,
    removeUserGameIsError,
  };
};

export default useRemoveUserGame;
