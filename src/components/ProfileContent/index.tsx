import Overview from '@components/ProfileContent/Overview';
import Favorites from '@components/ProfileContent/Favorites';
import styles from '@components/ProfileContent/ProfileContent.module.scss';

function ProfileContent({ routeName }: { routeName: string }) {
  const contentGenerator = (route: string) => {
    switch (route) {
      case 'overview':
        return <Overview />;
      case 'favorites':
        return <Favorites />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className={styles.profileContent}>{contentGenerator(routeName)}</div>
  );
}

export default ProfileContent;
