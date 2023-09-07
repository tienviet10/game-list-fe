import { useFollows } from '@services/user/useFollows';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import useNotification from './useNotification';

type UserType = {
  id: number;
  username: string;
};

const useHandleAddRemoveFollow = () => {
  const { success, warning, contextHolder } = useNotification('follow');
  const [userInfo, setUserInfo] = useState<UserType>();
  const {
    addFollowMutation,
    followedUserData,
    addFollowError,
    addFollowIsError,
    removeFollowMutation,
    removedFollowedUserData,
    removeFollowError,
    removedFollowIsError,
  } = useFollows();

  useEffect(() => {
    if (removeFollowError?.response.data.message || removedFollowIsError) {
      warning(
        `There is something wrong when processing unfollow ${userInfo?.username}!`
      );
    } else if (followedUserData?.data.data.user.username) {
      success(`You have unfollowed ${userInfo?.username} successfully.`);
    }
  }, [
    removeFollowError?.response.data.message,
    removedFollowIsError,
    success,
    warning,
  ]);

  useEffect(() => {
    if (addFollowError?.response.data.message || addFollowIsError) {
      warning(
        `Can not follow ${userInfo?.username}. ${addFollowError?.response.data.message}!`
      );
    } else if (removedFollowedUserData?.data.data.user.username) {
      success(`You have followed ${userInfo?.username} successfully.`);
    }
  }, [
    addFollowError?.response.data.message,
    addFollowIsError,
    success,
    warning,
  ]);

  const handleAddFollow = async (
    // TODO: Fix this type later
    // commentInput: CommentType | StatusUpdateType | PostType
    commentInput: any
  ) => {
    Modal.confirm({
      title: `Are you sure you want to follow ${commentInput.user.username}?`,
      content: 'You will see their posts in your feed.',
      onOk: async () => {
        addFollowMutation({
          userId: commentInput.user.id,
        });
        setUserInfo({
          id: commentInput.user.id,
          username: commentInput.user.username,
        });
      },
    });
  };

  const handleRemoveFollow = (followedUser: UserType) => {
    Modal.confirm({
      title: `Are you sure you want to unfollow ${followedUser.username}?`,
      content: 'You will no longer see their posts in your feed.',
      onOk: async () => {
        setUserInfo({
          id: followedUser.id,
          username: followedUser.username,
        });
        removeFollowMutation({
          userId: followedUser.id,
        });
      },
    });
  };

  return { handleAddFollow, contextHolder, handleRemoveFollow };
};

export default useHandleAddRemoveFollow;