import styles from '@components/UserProfileHeader/UserLinks/UserLinks.module.scss';
import UserLink from '@components/UserProfileHeader/UserLinks/UserLink';

function UserLinks() {
  const linksArray = [
    'Overview',
    'Game List',
    'Favorites',
    'Social',
    'Reviews',
  ];

  return (
    <div className={styles.navWrap}>
      <div className={styles.navContainer}>
        {linksArray.map((link) => (
          <UserLink
            key={link}
            linkName={link === 'Game List' ? 'game-list' : link.toLowerCase()}
          >
            {link}
          </UserLink>
        ))}
      </div>
    </div>
  );
}

export default UserLinks;
