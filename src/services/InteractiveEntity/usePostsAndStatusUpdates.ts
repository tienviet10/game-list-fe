import type { CustomAxiosResponse, ErrorResponse } from '@constants/types';
import {
  useQuery,
  useQueryClient,
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import client from '@utils/authApi';
import { AxiosResponse } from 'axios';

export type UserBasicDTO = {
  id: number;
  username: string;
  userPicture: string;
  bannerPicture: string;
};

type GameBasicDTO = {
  id: number;
  name: string;
  imageURL: string;
  bannerURL: string;
};

type UserGameBasicDTO = {
  id: number;
  game: GameBasicDTO;
  user: UserBasicDTO;
};

export type LikeDTO = {
  id: number;
  user: UserBasicDTO;
  updatedAt: string;
  createdAt: string;
};

type CommentDTO = {
  id: number;
  text: string;
  createdAt: string;
  user: UserBasicDTO;
  likes: LikeDTO[];
  comments: CommentDTO[];
};

export type PostsDTOResponse = {
  id: number;
  text: string;
  createdAt: string;
  user: UserBasicDTO;
  likes: LikeDTO[];
  comments: CommentDTO[];
};

export type StatusUpdatesDTOResponse = {
  id: number;
  gameStatus: string;
  createdAt: string;
  userGame: UserGameBasicDTO;

  likes: LikeDTO[];
  comments: CommentDTO[];
};

export type PostsAndStatusUpdatesData = {
  posts: PostsDTOResponse[];
  statusUpdates: StatusUpdatesDTOResponse[];
  lastPostOrStatusUpdateId: number;
};

type PostsAndStatusUpdatesWithLastIdResponse = {
  pageParams: number[];
  pages: PostsAndStatusUpdatesData[];
};

// export type PostsAndStatusUpdatesResponse = {
//   pageParams: number[];
//   pages: CustomAxiosResponse<PostsAndStatusUpdatesData>[];
// };

const usePostsAndStatusUpdates = () => {
  const queryClient = useQueryClient();
  const limitParam = 20;
  const getSocial = async ({ lastCursor = 0 }) => {
    if (!lastCursor) {
      const res = await client.get(
        `/api/v1/interactive-entities/user-social/first-page?limit=${limitParam}`
      );

      console.log('res', res.data);

      return res.data;
    }
    const res = await client.get(
      `/api/v1/interactive-entities/user-social/pageable?limit=${limitParam}&startingId=${lastCursor}`
    );

    return res.data;
  };

  // const {
  //   data: postsAndStatusUpdates,
  //   isInitialLoading: postsAndStatusUpdatesIsLoading,
  //   refetch: getPostsAndStatusUpdates,
  // } = useQuery<
  //   CustomAxiosResponse<PostsAndStatusUpdatesResponse>,
  //   ErrorResponse
  // >({
  //   queryKey: ['postsAndStatusUpdates'],
  //   queryFn: getSocial,
  // });

  const {
    status,
    data: postsAndStatusUpdates,
    error,
    isLoading: postsAndStatusUpdatesIsLoading,
    refetch: getPostsAndStatusUpdates,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['postsAndStatusUpdates'],
    queryFn: ({ pageParam = 0 }) => getSocial({ lastCursor: pageParam }),
    getNextPageParam: (lastPage, pages) => {
      console.log('lastPage in getNextPageParam', lastPage);
      console.log('pages in getNextPageParam', pages);

      // if (
      //   lastPage &&
      //   lastPage.data.data.pages[lastPage.data.data.pages.length - 1].data.data
      //     .posts.length === 0
      // ) {
      //   return undefined;
      // }
      // const { lastPostOrStatusUpdateId } =
      //   lastPage.data.data.pages[pages.length - 1].data.data;
      // return lastPostOrStatusUpdateId || undefined;
      return (
        lastPage?.data?.postsAndStatusUpdates?.lastPostOrStatusUpdateId ||
        undefined
      );
    },
  });

  console.log('postsAndStatusUpdates', postsAndStatusUpdates);

  let socialDataArray: {
    posts: PostsDTOResponse[];
    statusUpdates: StatusUpdatesDTOResponse[];
  } = { posts: [], statusUpdates: [] };

  socialDataArray = (postsAndStatusUpdates?.pages || []).reduce(
    (acc, curr) => {
      const { posts, statusUpdates } = curr.data.postsAndStatusUpdates;
      return {
        posts: [...acc.posts, ...posts],
        statusUpdates: [...acc.statusUpdates, ...statusUpdates],
      };
    },
    { posts: [], statusUpdates: [] }
  );

  console.log('socialDataArray', socialDataArray);

  const { posts, statusUpdates } = socialDataArray;

  const socialDataSorted = [...posts, ...statusUpdates].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  console.log('socialDataSorted', socialDataSorted);

  return {
    socialDataSorted,
    postsAndStatusUpdates,
    postsAndStatusUpdatesIsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    getPostsAndStatusUpdates,
  };
};

export default usePostsAndStatusUpdates;
