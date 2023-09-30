import { CloseOutlined } from '@ant-design/icons';
import useHandleAddRemoveFollow from '@hooks/useHandleAddRemoveFollow';
import styles from './Follows.module.scss';
// import useAddRemoveFollowCustomHook from '@hooks/useAddRemoveFollowCustomHook';

type UserType = {
  id: number;
  username: string;
  userPicture: string;
};

function Follows({
  follows,
  loading,
  followers,
  selectedFilter,
}: {
  follows: UserType[];
  loading: boolean;
  followers: UserType[];
  selectedFilter: string;
}) {
  const {
    handleRemoveFollow,
    contextHolder: handleRemoveFollowContextHolder,
    handleRemoveFollower,
  } = useHandleAddRemoveFollow();

  console.log(followers);

  if (loading) {
    return <div>Loading...</div>;
  }

  const loadedData = selectedFilter === 'Followings' ? follows : followers;

  return (
    <div>
      <div className={styles.followsContainer}>
        {loadedData.map((follow) => (
          <div className={styles.followCard} key={follow.id}>
            <div
              className={styles.followAvatar}
              style={{ backgroundImage: `url(${follow.userPicture})` }}
            >
              <a href={`/user/${follow.username}/`}>{follow.username}</a>
            </div>
            <div className={styles.unfollow}>
              <CloseOutlined
                onClick={() => {
                  if (selectedFilter === 'Followings') {
                    handleRemoveFollow(follow);
                  } else if (selectedFilter === 'Followers') {
                    handleRemoveFollower(follow);
                  }
                }}
              />{' '}
            </div>
          </div>
        ))}
      </div>
      {handleRemoveFollowContextHolder}
    </div>
  );
}

export default Follows;
