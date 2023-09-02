import { CustomAxiosResponse, ErrorResponse, Game } from '@constants/types';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import client from '@utils/authApi';
import { useAppSelector } from '@/app/hooks';

type BaseGetGamesHook =
  | {
      status: 'loading';
      error: null;
      data: null;
    }
  | {
      status: 'success';
      error: null;
      data: InfiniteData<CustomAxiosResponse<GamesResponse>>;
      fetchNextPage: (
        options?: FetchNextPageOptions | undefined
      ) => Promise<
        InfiniteQueryObserverResult<
          CustomAxiosResponse<GamesResponse>,
          ErrorResponse
        >
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

type GamesResponse = {
  games: Game[];
};

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
  } = useInfiniteQuery<CustomAxiosResponse<GamesResponse>, ErrorResponse>({
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
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.data.data.games.length === 0) {
        return undefined;
      }
      return limitParam;
    },
    queryFn: async ({ pageParam = 0 }) => {
      return client.post('/games', {
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
        offset: pageParam,
      });
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // function fetchMore(amount: number) {}

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
