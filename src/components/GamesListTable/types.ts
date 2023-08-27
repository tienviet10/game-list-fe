import type { Game } from '@constants/types';

export type GameDataType = Game & {
  key?: React.Key;
};

export type UserGameListDataType = {
  data: GameDataType[];
};
