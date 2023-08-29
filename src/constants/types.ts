import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { AxiosError, AxiosResponse } from 'axios';
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

type ErrorDetails = {
  timestamp: string;
  message: string;
  details: string;
};

interface SpringErrorResponse extends AxiosResponse {
  data: ErrorDetails;
}

export interface ErrorResponse extends AxiosError {
  response: SpringErrorResponse;
}

interface GeneralResponse {
  message: string;
  statusCode: number;
  status: string;
  timestamp: string;
}

export interface CustomAxiosResponse<T> extends AxiosResponse {
  data: GeneralResponse & {
    data: T;
  };
}

export interface UserData {
  email: string;
  username: string;
  userPicture: string;
  bannerPicture: string;
}

export declare type ArrayElementType<T> = T extends (infer E)[] ? E : T;

export type Game = {
  id?: number;
  name?: string;
  avgScore?: number;
  imageURL?: string;
  bannerURL?: string;
  releaseDate?: Date;
  platforms?: string[];
  genres?: string[];
  tags?: string[];
};

export type RequiredGame = Required<Game>;

export type RequiredGameWithIsAdded = RequiredGame & {
  isGameAdded?: boolean;
};

export type ListsOrderType = keyof Omit<
  UserGamesByStatus,
  | 'totalCount'
  | 'listsOrder'
  | 'inactiveCount'
  | 'droppedCount'
  | 'pausedCount'
  | 'completedCount'
  | 'playingCount'
  | 'planningCount'
>;

export type UserGamesByStatus = {
  playing: RequiredGame[];
  playingCount: number;
  completed: RequiredGame[];
  completedCount: number;
  paused: RequiredGame[];
  pausedCount: number;
  planning: RequiredGame[];
  planningCount: number;
  dropped: RequiredGame[];
  droppedCount: number;
  inactive: RequiredGame[];
  inactiveCount: number;
  totalCount: number;
  listsOrder: string;
};
