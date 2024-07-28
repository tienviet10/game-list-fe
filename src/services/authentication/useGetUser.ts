import { useQuery } from '@tanstack/react-query';
import client from '@utils/authApi';
import type {
  CustomAxiosResponse,
  ErrorResponse,
  UserData,
} from '@constants/types';
import { useNavigate } from 'react-router-dom';

const useGetUser = () => {
  const navigate = useNavigate();
  const getUser = async (): Promise<CustomAxiosResponse<UserData>> => {
    return client.get(`/user-service/api/v1/user/userinfo`);
  };

  const {
    data: userInfo,
    isInitialLoading: userDataIsLoading,
    refetch: getUserData,
  } = useQuery<CustomAxiosResponse<UserData>, ErrorResponse>({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: false,
    onError: () => {
      localStorage.clear();
      navigate('/home');
    },
  });

  return { userInfo, userDataIsLoading, getUserData };
};

export default useGetUser;
