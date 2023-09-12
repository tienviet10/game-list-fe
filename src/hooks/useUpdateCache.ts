import type { Game } from '@constants/types';
import { useQueryClient } from '@tanstack/react-query';

export type OldDataType = {
  pageParams: number[];
  pages: GamePageType[];
};

type GamePageType = {
  data: GamesPageDataType;
};

type GamesPageDataType = {
  data: GamesPageDataDataType;
};

type GamesPageDataDataType = {
  games: Game[];
};

const useUpdateCache = () => {
  const queryClient = useQueryClient();

  const updateGameById = (
    oldData: OldDataType,
    gameId: number,
    isGameLiked: boolean,
    isGameAdded: boolean
  ) => {
    const { pageParams, pages } = oldData;

    const newPages = pages.map((page) => {
      const { data } = page;
      const { data: gameData } = data;

      const { games } = gameData;

      const newGames = games.map((game) => {
        if (game.id === gameId) {
          return {
            ...game,
            gameLiked: isGameLiked,
            gameAdded: isGameAdded,
          };
        }
        return game;
      });
      return {
        ...page,
        data: {
          data: {
            games: newGames,
          },
        },
      };
    });

    return {
      pageParams,
      pages: newPages,
    };
  };

  const getGameInCacheById = (gameId: number): Game | undefined => {
    const gameInCache = queryClient.getQueryData([
      'Games',
      [],
      [],
      [],
      null,
      '',
      [],
      [],
      [],
      'name',
      20,
    ]);
    const { pages } = gameInCache as OldDataType;

    const foundGame = pages
      .flatMap((page) => page.data.data.games)
      .find((game) => game.id === gameId);

    return foundGame;
  };

  return { updateGameById, getGameInCacheById };
};

export default useUpdateCache;
