import type { CustomAxiosResponse, ErrorResponse } from '@constants/types';
import { useMutation } from '@tanstack/react-query';
import client from '@utils/authApi';

type EditUserGameParams = {
  gameId: number;
  gameStatus?: string | null;
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
  const editExistedUserGame = async (
    params: EditUserGameParams
  ): Promise<CustomAxiosResponse<EditUserGameResponse>> => {
    const { gameStatus } = params;
    const putParams = { ...params };
    if (gameStatus?.trim() === '' || !gameStatus) {
      putParams.gameStatus = 'JustAdded';
    }
    return client.put(`/api/v1/usergames`, putParams);
  };

  const createNewUserGame = async (
    params: EditUserGameParams
  ): Promise<CustomAxiosResponse<EditUserGameResponse>> => {
    const { gameStatus } = params;

    const postParams = { ...params };
    if (gameStatus?.trim() === '' || !gameStatus) {
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
    mutationFn: editExistedUserGame,
  });

  const { mutate: createUserGame, data: newUserGameResponseData } = useMutation<
    CustomAxiosResponse<EditUserGameResponse>,
    ErrorResponse,
    EditUserGameParams
  >({
    mutationFn: createNewUserGame,
  });

  return {
    createUserGame,
    newUserGameResponseData,
    editUserGame,
    userGameResponseData,
    usergameDataError,
    usergameDataIsError,
  };
};

export default useEditUserGame;
