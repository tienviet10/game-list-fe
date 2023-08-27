import Overview from '@components/ProfileContent/Overview';
import Favorites from '@components/ProfileContent/Favorites';
import styles from '@components/ProfileContent/ProfileContent.module.scss';
import UserGameList from '@pages/UserGameList';
import Reviews from './Reviews';
import Social from './Social/Social';

function ProfileContent({ routeName }: { routeName: string }) {
  const contentGenerator = (route: string) => {
    switch (route) {
      case 'overview':
        return <Overview />;
      case 'favorites':
        return <Favorites />;
      case 'reviews':
        return <Reviews />;
      case 'gameList':
        return <UserGameList />;
      case 'social':
        return <Social />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className={styles.profileContent}>{contentGenerator(routeName)}</div>
  );
}

export default ProfileContent;
