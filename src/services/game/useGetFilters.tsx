import { useQuery } from '@tanstack/react-query';
import client from '@utils/authApi';
import { CustomAxiosResponse, ErrorResponse } from '@constants/types';
import { GameFilters } from '../types';

type GetFiltersHook =
  | {
      status: 'loading';
      error: null;
      genres: null;
      platforms: null;
      tags: null;
      furthestYear: null;
    }
  | {
      status: 'success';
      error: null;
      genres: string[];
      platforms: string[];
      tags: string[];
      furthestYear: number;
    }
  | {
      status: 'error';
      error: ErrorResponse;
      genres: null;
      platforms: null;
      tags: null;
      furthestYear: null;
    };

type GameFiltersResponse = {
  gameFilters: GameFilters;
};

export default function useGetFilters(): GetFiltersHook {
  const { data, status, error } = useQuery<
    CustomAxiosResponse<GameFiltersResponse>,
    ErrorResponse
  >({
    queryKey: ['GameFilters'],
    queryFn: () => client.get('/gamefilters'),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (status === 'loading') {
    return {
      status: 'loading',
      genres: null,
      platforms: null,
      tags: null,
      furthestYear: null,
      error: null,
    };
  }

  if (status === 'error') {
    return {
      status: 'error',
      genres: null,
      platforms: null,
      tags: null,
      furthestYear: null,
      error,
    };
  }

  return {
    status: 'success',
    genres: data.data.data.gameFilters.genres,
    platforms: data.data.data.gameFilters.platforms,
    tags: data.data.data.gameFilters.tags,
    furthestYear: data.data.data.gameFilters.furthestYear,
    error: null,
  };
}
