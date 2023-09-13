import { useMutation } from '@tanstack/react-query';
import client from '@utils/authApi';
import type { CustomAxiosResponse, ErrorResponse } from '@constants/types';

type CreatePostParams = {
  text: string;
};

// TODO: Add type for response data Likes and Comments
type PostType = CreatePostParams & {
  id: number;
  createdAt: string;
  updatedAt: string;
  likes: string[];
  comments: string[];
};

type CreatePostResponse = {
  post: PostType;
};

export const usePosts = () => {
  const createPost = async (
    params: CreatePostParams
  ): Promise<CustomAxiosResponse<CreatePostResponse>> => {
    return client.post(`/api/v1/posts`, params);
  };

  const {
    mutate: createPostMutation,
    data: createPostResponseData,
    error: createPostError,
    isError: createPostIsError,
  } = useMutation<
    CustomAxiosResponse<CreatePostResponse>,
    ErrorResponse,
    CreatePostParams
  >({
    mutationFn: createPost,
  });

  return {
    createPostMutation,
    createPostResponseData,
    createPostError,
    createPostIsError,
  };
};
