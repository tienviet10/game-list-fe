import { useEffect } from 'react';
import { isExpired } from 'react-jwt';
import { useDispatch } from 'react-redux';
import type { UseTokenAuthType } from '@hooks/types';
import { useAppSelector } from '@/app/hooks';
import { setLoading, setUser } from '@/features/userSlice';

const data = {
  bannerPicture:
    'https://images.igdb.com/igdb/image/upload/t_screenshot_big/kky41w6g87pnw8omnoff.jpg',
  id: '1',
  userPicture:
    'https://avatoon.me/wp-content/uploads/2021/09/Cartoon-Pic-Ideas-for-DP-Profile-01.png',
  username: 'Vv',
};

const useTokenAuth = (): UseTokenAuthType => {
  const dispatch = useDispatch();

  const userState = useAppSelector((state) => state.user);
  // const { getUser, loading, data } = useGetUser();
  const loading = false;

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    if (authToken !== null && authToken.length > 0 && !isExpired(authToken)) {
      // getUser();
      console.log('requesting user');
    } else {
      localStorage.clear();
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    const authToken = localStorage.getItem('token');

    if (data && authToken) {
      dispatch(setUser(data));
    }
  }, [data, dispatch]);

  return { loading, userState };
};

export default useTokenAuth;
