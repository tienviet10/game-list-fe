import type { GameFiltersSortType, ListsOrderType } from '@constants/types';

export type HomeGameFilters = {
  search: string | undefined;
  genres: {
    included: string[];
    excluded: string[];
  };
  platforms: {
    included: string[];
    excluded: string[];
  };
  tags: {
    included: string[];
    excluded: string[];
  };
  year: number | undefined;
  sortBy: GameFiltersSortType | undefined;
};

export type InitialStateType = {
  loading: boolean;
  user: UserInfo;
};

type UserInfo = {
  id: string;
  username: string;
  bannerPicture: string;
  createdAt: string;
  games: string[];
  isActive: boolean;
  userGames: string[];
  userPicture: string;
  __typename: string;
};

export type InitialStateUserGamesListType = {
  listOrder: ListsOrderType[];
  localListOrder: ListsOrderType[];
};

export type InitialStateUserGameType = {
  completedDate: string | undefined;
  gameNote: string;
  gameStatus: string | null;
  startDate: string | undefined;
  private: boolean;
  rating: number | null;
  id: string;
};

export type HomeSearchSlice = {
  view: 'grid' | 'list';
};
