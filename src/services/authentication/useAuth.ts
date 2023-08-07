import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { CustomAxiosResponse, ErrorResponse, UserData } from '@/types/global';

type LoginParams = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: UserData;
};

export const useAuth = () => {
  const fetchUser = async (
    params: LoginParams
  ): Promise<CustomAxiosResponse<LoginResponse>> => {
    return axios.post(`${import.meta.env.VITE_BACKEND}/auth/login`, params);
  };

  const {
    mutate: signUpMutation,
    data: logInResponse,
    error,
    isError,
  } = useMutation<
    CustomAxiosResponse<LoginResponse>,
    ErrorResponse,
    LoginParams
  >({
    mutationFn: fetchUser,
  });

  return {
    signUpMutation,
    logInResponse,
    error,
    isError,
  };
};
