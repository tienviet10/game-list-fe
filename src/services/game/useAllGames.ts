import { CustomAxiosResponse, ErrorResponse, Game } from '@constants/types';
import { useQuery } from '@tanstack/react-query';
import client from '@utils/authApi';
import { useAppSelector } from '@/app/hooks';

type GetGamesHook =
  | {
      status: 'loading';
      error: null;
      games: null;
    }
  | {
      status: 'success';
      error: null;
      games: Game[];
    }
  | {
      status: 'error';
      error: ErrorResponse;
      games: null;
    };

type GamesResponse = {
  games: Game[];
};

export default function useAllGames(
  limitParam: number = 20,
  offsetParam: number = 0
): GetGamesHook {
  // const [tempSearch, setTempSearch] = useState<string | undefined>('');

  const { genres, tags, platforms, sortBy, year } = useAppSelector(
    (state) => state.homeGameFilters
  );

  const { data, status, error } = useQuery<
    CustomAxiosResponse<GamesResponse>,
    ErrorResponse
  >({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['Games'],
    queryFn: () =>
      client.post('/games', {
        genre: genres.included,
        tag: tags.included,
        platform: platforms.included,
        year,
        excludedGenres: genres.excluded,
        excludedTags: tags.excluded,
        excludedPlatforms: platforms.excluded,
        sortBy,
        search: undefined, // TODO: Implement
        limit: limitParam,
        offset: offsetParam,
      }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (status === 'loading') {
    return {
      status: 'loading',
      error: null,
      games: null,
    };
  }

  if (status === 'error') {
    return {
      status: 'error',
      error,
      games: null,
    };
  }

  return {
    status: 'success',
    error: null,
    games: data.data.data.games,
  };
}
