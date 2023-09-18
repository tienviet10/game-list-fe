import { CustomAxiosResponse, ErrorResponse, Game } from '@constants/types';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import client from '@utils/authApi';
import { useAppSelector } from '@/app/hooks';

type GamesResponse = {
  games: Game[];
};

type GamesResponseWithOffset = CustomAxiosResponse<GamesResponse> & {
  offsetPage: number;
};

type BaseGetGamesHook =
  | {
      status: 'loading';
      error: null;
      data: null;
    }
  | {
      status: 'success';
      error: null;
      data: InfiniteData<GamesResponseWithOffset>;
      fetchNextPage: (
        options?: FetchNextPageOptions | undefined
      ) => Promise<
        InfiniteQueryObserverResult<GamesResponseWithOffset, ErrorResponse>
      >;
    }
  | {
      status: 'error';
      error: ErrorResponse;
      data: null;
    };

type GetGamesHookResult = BaseGetGamesHook & {
  hasNextPage: boolean | undefined;
  isFetching: boolean;
  isFetchingNextPage: boolean;
};

function lastEntry(arr: unknown[]) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return undefined;
  return arr[arr.length - 1];
}

export default function useAllGames(
  limitParam: number = 20
): GetGamesHookResult {
  const { genres, tags, platforms, search, sortBy, year } = useAppSelector(
    (state) => state.homeGameFilters
  );

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<GamesResponseWithOffset, ErrorResponse>({
    queryKey: [
      'Games',
      genres.included,
      tags.included,
      platforms.included,
      year,
      search,
      genres.excluded,
      tags.excluded,
      platforms.excluded,
      sortBy,
      limitParam,
    ],

    // Since we aren't using offset based pagination, there isn't any way to tell if were on the last page or not. Thus we have to fetch one more time and
    // see if the result we get back doesn't contain any games. If it doesn't, we know thats the end.
    // One way to check if were at the end of the list is to check if the newly returned page of pages is equal to the fetch amount, if it's not,
    // then were at the end of the list. The problem with this approach is that we can't change the fetch limit once it's set. Otherwise we might
    // think that were at the end of the list when were not.
    // TODO: --- We would need to store the last fetch limit as well
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage.data.data.games.length === 0) {
        return undefined;
      }

      console.log('last page: ', lastPage);
      console.log('allPages: ', allPages);

      // const totalPages = allPages.length;
      // const actualPage = lastPage.offsetPage / limitParam;
      // const nextPage = actualPage < totalPages ? actualPage + 1 : undefined;
      // const nextPage = actualPage < totalPages ? actualPage + 1 : undefined;
      const { lastEntry } = lastPage;
      return lastEntry || undefined;
    },
    queryFn: async ({ pageParam }) => {
      // pageParam is null for the first fetch
      const offset = pageParam * limitParam;

      const result = await client.post('/games', {
        genres: genres.included,
        tags: tags.included,
        platforms: platforms.included,
        year,
        excludedGenres: genres.excluded,
        excludedTags: tags.excluded,
        excludedPlatforms: platforms.excluded,
        sortBy,
        search,
        limit: limitParam,
        gameQueryPaginationOptions: !pageParam
          ? undefined
          : {
              lastId: pageParam.id,
              lastName: pageParam.name,
              lastReleaseDateEpoch:
                new Date(pageParam.releaseDate).getTime() / 1000,
              lastAverageScore: pageParam.avgScore,
              lastTotalRating: pageParam.totalRating,
            },
      });

      return {
        ...result,
        lastEntry: lastEntry(result.data.data.games),
        fetchAmount: 1,
        offsetPage: offset,
      };
    },
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (status === 'loading') {
    return {
      status: 'loading',
      error: null,
      data: null,
      hasNextPage,
      isFetching,
      isFetchingNextPage,
    };
  }

  if (status === 'error') {
    return {
      status: 'error',
      error,
      data: null,
      hasNextPage,
      isFetching,
      isFetchingNextPage,
    };
  }

  return {
    status: 'success',
    error: null,
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  };
}
