import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import client from '@utils/authApi';
import type { CustomAxiosResponse, ErrorResponse } from '@constants/types';

type UserFollowId = {
  userId: number;
};

type FollowedUserData = {
  id: number;
  bannerPicture: string;
  userPicture: string;
  username: string;
};

type UserFollowIdResponse = {
  user: FollowedUserData;
};

type FollowDataType = {
  user: FollowerFollowingListType;
};

type FollowerFollowingListType = {
  id: number;
  following: FollowedUserData[];
  followers: FollowedUserData[];
};

export const useFollows = () => {
  const queryClient = useQueryClient();

  const addFollow = async (
    params: UserFollowId
  ): Promise<CustomAxiosResponse<UserFollowIdResponse>> => {
    return client.post(`/api/v1/follows/${params.userId}`);
  };

  const getFollows = async (): Promise<CustomAxiosResponse<FollowDataType>> => {
    return client.get(`/api/v1/follows`);
  };

  const removeFollow = async (
    params: UserFollowId
  ): Promise<CustomAxiosResponse<UserFollowIdResponse>> => {
    return client.delete(`/api/v1/follows/${params.userId}`);
  };

  const {
    mutate: addFollowMutation,
    data: followedUserData,
    error: addFollowError,
    isError: addFollowIsError,
  } = useMutation<
    CustomAxiosResponse<UserFollowIdResponse>,
    ErrorResponse,
    UserFollowId
  >({
    mutationFn: addFollow,
  });

  const {
    data: followData,
    isInitialLoading: followDataIsLoading,
    refetch: refetchFollowData,
  } = useQuery<CustomAxiosResponse<FollowDataType>, ErrorResponse>({
    queryKey: ['follows'],
    queryFn: getFollows,
    enabled: false,
  });

  const {
    mutate: removeFollowMutation,
    data: removedFollowedUserData,
    error: removeFollowError,
    isError: removedFollowIsError,
  } = useMutation<
    CustomAxiosResponse<UserFollowIdResponse>,
    ErrorResponse,
    UserFollowId
  >({
    mutationFn: removeFollow,
    onSuccess: () => {
      // TODO: Pessimistic update the whole cache -> do pessimistic update for only the unfollowed user
      queryClient.fetchQuery({ queryKey: ['follows'] });
    },
  });

  return {
    addFollowMutation,
    followedUserData,
    addFollowError,
    addFollowIsError,
    followData,
    followDataIsLoading,
    refetchFollowData,
    removeFollowMutation,
    removedFollowedUserData,
    removeFollowError,
    removedFollowIsError,
  };
};
