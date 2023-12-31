import { useState } from 'react';
import {
  CloseOutlined,
  HeartFilled,
  HeartOutlined,
  MessageFilled,
  MessageOutlined,
  UserOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Avatar, Popover } from 'antd';
import type {
  LikeDTO,
  PostsDTOResponse,
  StatusUpdatesDTOResponse,
} from '@constants/types';
import getTimeElapsed from '@utils/getTimeElapsed';
import CustomButton from '@components/CustomButton';
import useHandleAddRemoveFollow from '@hooks/useHandleAddRemoveFollow';
import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivitiesUpdates.module.scss';
import StatusUpdateActivity from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivityCard/StatusUpdateActivity';
import PostActivity from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivityCard/PostActivity';
import CommentInputWrapper from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivityCard/CommentInputWrapper';

export default function ActivityCard({
  isCurrentLiked,
  activity,
  daysElapsed,
  hoursElapsed,
  username,
}: {
  isCurrentLiked: boolean;
  activity: PostsDTOResponse | StatusUpdatesDTOResponse;
  daysElapsed: number;
  hoursElapsed: number;
  username: string;
}) {
  const likedAvatar = (likedUsers: LikeDTO[]) => {
    return (
      <Avatar.Group maxCount={3}>
        {likedUsers.map((like) => (
          <Avatar
            icon={<UserOutlined />}
            key={like.user.id}
            src={like.user.userPicture}
          />
        ))}
      </Avatar.Group>
    );
  };

  // const {
  //   handleRemoveComment,
  //   handleEditComment,
  //   contextHolder: commentContext,
  // } = useAddRemoveCommentCustomHook();
  const { handleAddFollow } = useHandleAddRemoveFollow();
  const [isCommentVisible, setIsCommentVisible] = useState<boolean>(
    activity.comments.length > 0
  );
  return (
    <div
      className={`${styles.activity} ${
        'text' in activity && styles.postActivity
      }`}
    >
      <div className={styles.activityContent}>
        {'userGame' in activity && (
          <StatusUpdateActivity statusUpdate={activity} username={username} />
        )}

        {'text' in activity && (
          <PostActivity post={activity} username={username} />
        )}
        <div className={styles.time}>
          {daysElapsed > 0 ? `${daysElapsed} days` : `${hoursElapsed} hours`}{' '}
          ago
        </div>
        <div className={styles.actions}>
          <Popover
            placement="bottom"
            arrow={false}
            trigger="hover"
            content={() => likedAvatar(activity.likes)}
            overlayInnerStyle={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
              marginTop: '-10px',
              paddingTop: '0px',
            }}
          >
            <CustomButton
              buttonType="link"
              onPress={async () => {
                if (isCurrentLiked) {
                  // await removeLike(activity.id, activity.__typename as string);
                  console.log('remove like');
                } else {
                  // await addLike(activity.id, activity.__typename as string);
                  console.log('add like');
                }
              }}
              icon={
                isCurrentLiked ? (
                  <HeartFilled className={styles.liked} />
                ) : (
                  <HeartOutlined className={styles.notLiked} />
                )
              }
            />
          </Popover>

          <span
            className={`${styles.likeCount} ${
              activity.likes.length === 0 && styles.zeroCount
            }`}
          >
            {activity.likes.length}
          </span>
          <div>
            {isCommentVisible ? (
              <MessageFilled
                className={styles.liked}
                onClick={() => {
                  setIsCommentVisible(!isCommentVisible);
                }}
              />
            ) : (
              <MessageOutlined
                className={styles.notLiked}
                onClick={() => {
                  setIsCommentVisible(!isCommentVisible);
                }}
              />
            )}
          </div>
          <span
            className={`${styles.likeCount} ${
              activity.comments.length === 0 && styles.zeroCount
            }`}
          >
            {activity.comments.length}
          </span>
        </div>
      </div>
      <div
        className={styles.replyContainer}
        style={{ display: `${isCommentVisible ? 'block' : 'none'}` }}
      >
        <div className={styles.activityReply}>
          {activity.comments.map((comment) => {
            const {
              daysElapsed: commentDaysElapsed,
              hoursElapsed: commentHoursElapsed,
            } = getTimeElapsed(comment.createdAt);
            return (
              <div key={comment.id} className={styles.replyList}>
                <div className={styles.replyAvatar}>
                  <Avatar
                    src={comment.user.userPicture}
                    size={50}
                    onClick={async () => {
                      if (
                        comment.user.username &&
                        comment.user.username !== username
                      ) {
                        await handleAddFollow(comment.user);
                      }
                    }}
                    style={{
                      cursor: `${
                        comment.user.username !== username && 'pointer'
                      }`,
                    }}
                  />
                  {comment.user.username && (
                    <a
                      href={`/user/${comment.user.username}`}
                      aria-label={comment.user.username}
                    >
                      {' '}
                      {comment.user.username}
                    </a>
                  )}
                  <div className={styles.replyActions}>
                    <EditOutlined
                      className={`${styles.replyRemove} ${
                        comment.user.username === username &&
                        styles.replyRemoveVisible
                      }`}
                      onClick={async () => {
                        if (
                          comment.user.id &&
                          comment.user.username === username
                        ) {
                          // await handleEditComment(comment);
                          console.log('edit your comment');
                        }
                      }}
                    />
                    <CloseOutlined
                      className={`${styles.replyRemove} ${
                        comment.user.username === username &&
                        styles.replyRemoveVisible
                      }`}
                      onClick={async () => {
                        if (
                          comment.user.username &&
                          comment.user.username === username
                        ) {
                          // await handleRemoveComment(comment);
                          console.log('remove your comment');
                        }
                      }}
                    />
                    <div className={styles.time}>
                      {commentDaysElapsed > 0
                        ? `${commentDaysElapsed} days`
                        : `${commentHoursElapsed} hours`}{' '}
                      ago
                    </div>
                  </div>
                </div>
                <div className={styles.replyBody}>
                  <div>
                    <p>{comment.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <CommentInputWrapper
            commentType={'text' in activity ? 'post' : 'statusUpdate'}
            commentId={activity.id}
          />
        </div>
      </div>
      {/* {commentContext} */}
    </div>
  );
}
