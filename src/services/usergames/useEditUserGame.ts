import type { CustomAxiosResponse, ErrorResponse } from '@constants/types';
import { useMutation } from '@tanstack/react-query';
import client from '@utils/authApi';

type EditUserGameParams = {
  game: {
    id: number;
  };
  gameStatus?: string;
  gameNote?: string;
  isPrivate?: boolean;
  rating?: number | null;
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
    const { gameStatus } = params;
    const postParams = { ...params };
    if (gameStatus === '') {
      postParams.gameStatus = 'JustAdded';
    }
    return client.post(`/api/v1/usergames`, postParams);
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
