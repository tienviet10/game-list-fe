import type { StatusContentType } from '@components/UserListFilterColumn/types';
import type { DropDownOption } from '@constants/types';

export type Filter = {
  name: string;
  options: DropDownOption[];
};

export type StatusItemType = {
  status: StatusContentType;
  index: number;
};
