import { useMutation } from '@tanstack/react-query';
import client from '@utils/authApi';
import { CustomAxiosResponse, ErrorResponse, UserData } from '@constants/types';

type LoginParams = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: UserData;
};

type SignUpParams = {
  username: string;
  email: string;
  password: string;
};

export const useAuth = () => {
  const loginUser = async (
    params: LoginParams
  ): Promise<CustomAxiosResponse<LoginResponse>> => {
    return client.post(`/auth/login`, params);
  };

  const signUpUser = async (
    params: SignUpParams
  ): Promise<CustomAxiosResponse<LoginResponse>> => {
    return client.post(`/auth/register`, params);
  };

  const {
    mutate: signInMutation,
    data: signInResponse,
    error: signInError,
    isError: signInIsError,
  } = useMutation<
    CustomAxiosResponse<LoginResponse>,
    ErrorResponse,
    LoginParams
  >({
    mutationFn: loginUser,
  });

  const {
    mutate: signUpMutation,
    data: signUpResponse,
    error: signUpError,
    isError: signUpIsError,
  } = useMutation<
    CustomAxiosResponse<LoginResponse>,
    ErrorResponse,
    SignUpParams
  >({ mutationFn: signUpUser });

  return {
    signInMutation,
    signInResponse,
    signInError,
    signInIsError,
    signUpMutation,
    signUpResponse,
    signUpError,
    signUpIsError,
  };
};
