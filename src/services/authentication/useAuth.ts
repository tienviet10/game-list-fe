import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type User = {
  id: string;
  name: string;
  email: string;
};

const fetchUser = async (): Promise<User> => {
  console.log('url', `${import.meta.env.VITE_BACKEND}/auth/login`);
  const { data } = await axios.post(
    `${import.meta.env.VITE_BACKEND}/auth/login`,
    {
      email: 'v@gmail.com',
      password: 'test',
    }
  );
  return data;
};

export const useGetUser = () => {
  return useQuery<User, Error>({
    queryKey: ['User'],
    queryFn: () => fetchUser(),
  });
};
