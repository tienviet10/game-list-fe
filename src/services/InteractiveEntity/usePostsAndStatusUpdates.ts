import type { ErrorResponse } from '@constants/types';
import { useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import client from '@utils/authApi';

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

export type PostsAndStatusUpdatesResponse = {
  data: { postsAndStatusUpdates: PostsAndStatusUpdatesData };
  message: string;
  status: string;
  statusCode: number;
  timestamp: string;
};

type PostsAndStatusUpdatesInPages = {
  pageParams: number[];
  pages: PostsAndStatusUpdatesData[];
};

const usePostsAndStatusUpdates = () => {
  const queryClient = useQueryClient();
  const limitParam = 20;
  const getSocial = async ({ lastCursor = 0 }) => {
    if (lastCursor === 0) {
      const res = await client.get(
        `/api/v1/interactive-entities/user-social/first-page?limit=${limitParam}`
      );

      console.log('res', res.data);

      return res.data;
    }
    if (lastCursor) {
      const res = await client.get(
        `/api/v1/interactive-entities/user-social/pageable?limit=${limitParam}&startingId=${lastCursor}`
      );

      return res.data;
    }
    return null;
  };
  const {
    data: postsAndStatusUpdates,
    isLoading: postsAndStatusUpdatesIsLoading,
    refetch: getPostsAndStatusUpdates,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<PostsAndStatusUpdatesResponse, ErrorResponse>({
    queryKey: ['postsAndStatusUpdates'],
    queryFn: ({ pageParam = 0 }) => getSocial({ lastCursor: pageParam }),
    getNextPageParam: (lastPage, pages) => {
      const postLength = lastPage?.data?.postsAndStatusUpdates?.posts.length;
      const statusLength =
        lastPage?.data?.postsAndStatusUpdates?.statusUpdates.length;

      if (postLength + statusLength < limitParam) {
        return undefined;
      }

      return (
        lastPage?.data?.postsAndStatusUpdates?.lastPostOrStatusUpdateId ||
        undefined
      );
    },
  });

  console.log('postsAndStatusUpdates', postsAndStatusUpdates);

  const socialData: {
    posts: PostsDTOResponse[];
    statusUpdates: StatusUpdatesDTOResponse[];
  } = (postsAndStatusUpdates?.pages || []).reduce(
    (acc, curr) => {
      const { posts, statusUpdates } = curr.data.postsAndStatusUpdates;
      return {
        posts: [...acc.posts, ...posts],
        statusUpdates: [...acc.statusUpdates, ...statusUpdates],
      };
    },
    { posts: [], statusUpdates: [] } as {
      posts: PostsDTOResponse[];
      statusUpdates: StatusUpdatesDTOResponse[];
    }
  );

  const { posts, statusUpdates } = socialData;

  const socialDataSorted = [...posts, ...statusUpdates].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

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
