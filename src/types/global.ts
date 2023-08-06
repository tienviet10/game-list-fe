import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { Dayjs } from 'dayjs';

import React from 'react';

export interface DropDownOption {
  value: string | number;
  label: string | number;
  children?: DropDownOption[];
}

export type OnChangeCascaderType = (string | number)[] | string | number;

export type OnChangeCheckboxType = CheckboxChangeEvent;

export type OnChangeTextAreaType = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export type OnChangeDatePickerType = Dayjs | null;

export type SharedSortType =
  | 'name'
  | 'avg_score'
  | 'newest_releases'
  | 'oldest_releases';

export type GameFiltersSortType = SharedSortType | 'total_rating';

export type UserGameFiltersSortType =
  | SharedSortType
  | 'last_updated'
  | 'last_updated'
  | 'last_added'
  | 'start_date'
  | 'completed_date';

export type ListTypes =
  | 'planning'
  | 'playing'
  | 'paused'
  | 'completed'
  | 'dropped';

export type SelectedListTypes = ListTypes | 'all';

export type HomeGameFilters = {
  search: string | undefined;
  genres: string[] | undefined;
  platforms: string[] | undefined;
  tags: string[] | undefined;
  year: number | undefined;
  sortBy: GameFiltersSortType | undefined;
};

export type UserGameFilters = {
  selectedList: SelectedListTypes;
  search: string | undefined;
  genres: string | undefined;
  platforms: string | undefined;
  tags: string | undefined;
  year: number | undefined;
  sortBy: UserGameFiltersSortType | undefined;
};
