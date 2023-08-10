import { useQuery } from '@tanstack/react-query';
import client from '@utils/authApi';
import { CustomAxiosResponse, ErrorResponse } from '@/types/global';
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

  // console.log('DATA: ', data);
  // console.log('status: ', status);
  // console.log('error: ', error);

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

  if (error) {
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

  //   {
  //     "gameFilters": {
  //         "genres": [
  //             "Fighting",
  //             "Shooter",
  //             "Music",
  //             "Visual Novel",
  //             "Indie",
  //             "Card & Board Game",
  //             "MOBA",
  //             "Point-and-click"
  //         ],
  //         "platforms": [
  //             "Commodore CDTV",
  //             "Sega Pico",
  //             "PlayStation 2",,
  //             "Meta Quest 2",
  //             "PlayStation VR2",
  //             "PlayStation VR",
  //             "Virtual Console",
  //             "Meta Quest 3"
  //         ],
  //         "tags": [
  //             "Thriller",
  //             "Science fiction",
  //             "Action",
  //             "Horror",
  //             "Survival",
  //             "Fantasy",
  //             "Warfare",
  //             "4X (explore, expand, exploit, and exterminate)",
  //             "Educational",
  //             "Mystery",
  //             "Party",
  //             "Romance",
  //             "Erotic"
  //         ],
  //         "furthestYear": 2023
  //     }
  // }

  // const genres: string[] = data?.data.data.gameFilters.genres
  //   ? data.genres
  //   : [];
  // const platforms: string[] = data?.platforms ? data.platforms : [];
  // const tags: string[] = data?.tags ? data.tags : [];
  // const furthestYear: number = data?.furthestYear ? data.furthestYear : NaN;
  // return { genres, platforms, tags, furthestYear, error, loading: status };

  // const genres: string[] = data?.genres ? data.genres : [];
  // const platforms: string[] = data?.platforms ? data.platforms : [];
  // const tags: string[] = data?.tags ? data.tags : [];
  // const furthestYear: number = data?.furthestYear ? data.furthestYear : NaN;
}
