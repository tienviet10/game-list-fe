import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '@utils/authApi';
import type {
  CustomAxiosResponse,
  ErrorResponse,
  PostsDTOResponse,
} from '@constants/types';
import { T } from 'vitest/dist/types-3c7dbfa5.js';
import useUpdateInteractiveEntityCache, {
  OldPostsAndStatusUpdatesDataType,
} from '@hooks/useUpdateInteractiveEntityCache';

type CreatePostParams = {
  text: string;
};

type CreatePostResponse = {
  post: PostsDTOResponse;
};

export const usePosts = () => {
  const queryClient = useQueryClient();
  const { updatePostByPost } = useUpdateInteractiveEntityCache();

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
    onSuccess: async (data) => {
      const { post: newPost } = data.data.data;
      await queryClient.cancelQueries(['postsAndStatusUpdates']);
      queryClient.setQueryData(
        ['postsAndStatusUpdates'],
        (oldData: OldPostsAndStatusUpdatesDataType | undefined) => {
          return updatePostByPost(
            oldData as OldPostsAndStatusUpdatesDataType,
            newPost,
            'create'
          );
        }
      );
    },
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
