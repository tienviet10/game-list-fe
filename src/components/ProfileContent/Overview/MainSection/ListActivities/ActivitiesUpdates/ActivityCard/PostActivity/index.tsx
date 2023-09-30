import { Avatar } from 'antd';

import { PostsDTOResponse } from '@services/InteractiveEntity/usePostsAndStatusUpdates';
import useHandleAddRemoveFollow from '@hooks/useHandleAddRemoveFollow';
import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivityCard/PostActivity/PostActivity.module.scss';

export default function PostActivity({
  post,
  username,
}: {
  post: PostsDTOResponse;
  username: string;
}) {
  // const { handleAddFollow, contextHolder: handleFollowContextHolder } =
  //   useAddRemoveFollowCustomHook();
  const { handleAddFollow, contextHolder } = useHandleAddRemoveFollow();

  return (
    <div className={styles.postActivityContainer}>
      <div className={styles.postActivityHeader}>
        <Avatar
          src={post.user.userPicture}
          size={50}
          onClick={async () => {
            if (post.user.username && post.user.username !== username) {
              await handleAddFollow(post.user);
            }
          }}
          style={{ cursor: `${post.user.username !== username && 'pointer'}` }}
        />
        {post.user.username && (
          <a
            href={`/user/${post.user.username}`}
            aria-label={post.user.username}
          >
            {' '}
            {post.user.username}
          </a>
        )}
      </div>
      <div className={styles.postActivityBody}>
        <div>
          <p>{post.text}</p>
        </div>
      </div>
      {contextHolder}
    </div>
  );
}
