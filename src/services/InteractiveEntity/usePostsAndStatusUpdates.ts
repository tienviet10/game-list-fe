import type {
  ErrorResponse,
  PostsDTOResponse,
  StatusUpdatesDTOResponse,
  PostsAndStatusUpdatesResponse,
} from '@constants/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import client from '@utils/authApi';

const usePostsAndStatusUpdates = (type = '') => {
  const limitParam = 20;
  const getSocial = async ({ lastCursor = 0 }) => {
    const getRequestUrl =
      type === 'global'
        ? `/api/v1/interactive-entities/forum-pageable?limit=${limitParam}&startingId=${lastCursor}`
        : `/api/v1/interactive-entities/user-social/pageable?limit=${limitParam}&startingId=${lastCursor}`;

    const res = await client.get(getRequestUrl);

    return res.data;
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
    getNextPageParam: (lastPage) => {
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

  console.log(postsAndStatusUpdates);

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
