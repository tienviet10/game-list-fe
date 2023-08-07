import styles from '@/components/UserProfileHeader/UserBanner/UserBanner.module.scss';
import type { UserProfileHeaderType } from '@/components/UserProfileHeader/types';

function UserBanner({ userState }: UserProfileHeaderType) {
  const { user } = userState;

  return (
    <div
      className={styles.bannerContainerNull}
      style={{ backgroundImage: `url(${user.bannerPicture})` }}
    >
      <div className={styles.bannerImage}>
        <div className={styles.bannerShadow} />
        <div className={styles.imageContainer}>
          <div className={styles.userInfoContainer}>
            <img src={user.userPicture} alt={user.username} />
            <div className={styles.name}>
              <h1>{user.username}</h1>
            </div>
            <div className={styles.actions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBanner;
