import { Game } from '@constants/types';

export type GameCardType = {
  game: Game;
  colorBgContainer: string;
  userGameLoading?: boolean;
  openGameListEditor?: (game: Game) => void;
};
