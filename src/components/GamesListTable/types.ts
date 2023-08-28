import type { RequiredGameWithIsAdded } from '@constants/types';

export type GameDataType = RequiredGameWithIsAdded & {
  key?: React.Key;
};

export type UserGameListDataType = {
  data: GameDataType[];
};
