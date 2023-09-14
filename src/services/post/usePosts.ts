import { useMutation } from '@tanstack/react-query';
import client from '@utils/authApi';
import type { CustomAxiosResponse, ErrorResponse } from '@constants/types';
import { T } from 'vitest/dist/types-3c7dbfa5.js';

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

  const removePostById = async (
    postId: number
  ): Promise<CustomAxiosResponse<T>> => {
    return client.delete(`/api/v1/posts/${postId}`);
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

  const {
    mutate: removePostByIdMutation,
    data: removePostByIdResponseData,
    error: removePostByIdError,
    isError: removePostByIdIsError,
  } = useMutation<CustomAxiosResponse<T>, ErrorResponse, number>({
    mutationFn: removePostById,
  });

  return {
    createPostMutation,
    createPostResponseData,
    createPostError,
    createPostIsError,
    removePostByIdMutation,
    removePostByIdResponseData,
    removePostByIdError,
    removePostByIdIsError,
  };
};
