import {
  PostsAndStatusUpdatesResponse,
  PostsDTOResponse,
  StatusUpdatesDTOResponse,
} from '@constants/types';
import { InfiniteData } from '@tanstack/react-query';

export type PostsAndStatusUpdatesType =
  InfiniteData<PostsAndStatusUpdatesResponse>;

const getSortedSocialData = (
  postsAndStatusUpdatesPages: PostsAndStatusUpdatesType | undefined
) => {
  const socialData: {
    posts: PostsDTOResponse[];
    statusUpdates: StatusUpdatesDTOResponse[];
  } = (postsAndStatusUpdatesPages?.pages || []).reduce(
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

  return socialDataSorted;
};

export default getSortedSocialData;
