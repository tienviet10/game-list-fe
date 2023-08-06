import type { LoginType } from '@/pages/Login/types';

export type RegisterType = LoginType & {
  username: string;
  password_confirmation?: string;
};
