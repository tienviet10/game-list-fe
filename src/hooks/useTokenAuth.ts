import { useEffect } from 'react';
import { isExpired } from 'react-jwt';
import { useDispatch } from 'react-redux';
import type { UseTokenAuthType } from '@hooks/types';
import useGetUser from '@services/authentication/useGetUser';
import { useAppSelector } from '@app/hooks';
import { setLoading, setUser } from '@features/userSlice';

const useTokenAuth = (): UseTokenAuthType => {
  const dispatch = useDispatch();

  const userState = useAppSelector((state) => state.user);
  const { getUserData, userDataIsLoading, userInfo } = useGetUser();

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    if (authToken !== null && authToken.length > 0 && !isExpired(authToken)) {
      getUserData();
    } else {
      localStorage.clear();
      dispatch(setLoading(false));
    }
  }, [dispatch, getUserData]);

  useEffect(() => {
    const authToken = localStorage.getItem('token');

    if (userInfo && authToken) {
      dispatch(setUser(userInfo?.data?.data));
    }
  }, [userInfo, dispatch]);

  return { userDataIsLoading, userState };
};

export default useTokenAuth;
