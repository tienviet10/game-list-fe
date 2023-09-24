import type { CustomAxiosResponse, ErrorResponse } from '@constants/types';
import { useQuery } from '@tanstack/react-query';
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

export type PostsAndStatusUpdatesResponse = {
  postsAndStatusUpdates: {
    posts: PostsDTOResponse[];
    statusUpdates: StatusUpdatesDTOResponse[];
  };
};

const usePostsAndStatusUpdates = () => {
  const getSocial = async (): Promise<
    CustomAxiosResponse<PostsAndStatusUpdatesResponse>
  > => {
    return client.get(`/api/v1/interactive-entities/user-social`);
  };

  const {
    data: postsAndStatusUpdates,
    isInitialLoading: postsAndStatusUpdatesIsLoading,
    refetch: getPostsAndStatusUpdates,
  } = useQuery<
    CustomAxiosResponse<PostsAndStatusUpdatesResponse>,
    ErrorResponse
  >({
    queryKey: ['postsAndStatusUpdates'],
    queryFn: getSocial,
  });

  const socialData = postsAndStatusUpdates?.data.data.postsAndStatusUpdates;

  const { posts, statusUpdates } = socialData || {
    posts: [],
    statusUpdates: [],
  };

  const socialDataArray = [...posts, ...statusUpdates].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return {
    socialDataArray,
    postsAndStatusUpdates,
    postsAndStatusUpdatesIsLoading,
    getPostsAndStatusUpdates,
  };
};

export default usePostsAndStatusUpdates;
