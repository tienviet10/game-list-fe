import type { CustomAxiosResponse, ErrorResponse } from '@constants/types';
import { useMutation } from '@tanstack/react-query';
import client from '@utils/authApi';

type EditUserGameParams = {
  gameId: number;
  gameStatus?: string;
  gameNote?: string;
  isPrivate?: boolean;
  rating?: number;
  completedDate?: string;
  startDate?: string;
};

type EditUserGameType = Omit<EditUserGameParams, 'gameId'> & {
  id: number;
  createdAt: string;
  updatedAt: string;
};

type EditUserGameResponse = {
  userGame: EditUserGameType;
};

const useEditUserGame = () => {
  const loginUser = async (
    params: EditUserGameParams
  ): Promise<CustomAxiosResponse<EditUserGameResponse>> => {
    return client.put(`/api/v1/usergames`, params);
  };

  const {
    mutate: editUserGame,
    data: userGameResponseData,
    error: usergameDataError,
    isError: usergameDataIsError,
  } = useMutation<
    CustomAxiosResponse<EditUserGameResponse>,
    ErrorResponse,
    EditUserGameParams
  >({
    mutationFn: loginUser,
  });

  return {
    editUserGame,
    userGameResponseData,
    usergameDataError,
    usergameDataIsError,
  };
};

export default useEditUserGame;
