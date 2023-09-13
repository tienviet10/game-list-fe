import styles from '@components/ProfileContent/Overview/Overview.module.scss';
import useGetUserGames from '@services/usergames/useGetUserGames';
import { useEffect } from 'react';
import MainSection from './MainSection';
import SideSection from './SideSection';

function Overview() {
  const { userGames, userDataIsLoading, getUserGames } = useGetUserGames();

  useEffect(() => {
    if (getUserGames) {
      getUserGames();
    }
  }, [getUserGames]);

  if (userDataIsLoading) return <div>Loading...</div>;

  return (
    <div className={styles.overview}>
      <SideSection
        userGames={userGames?.data.data.userGamesByStatus}
        userDataIsLoading={userDataIsLoading}
        getUserGames={getUserGames}
      />
      <MainSection
        userGames={userGames?.data.data.userGamesByStatus}
        userDataIsLoading={userDataIsLoading}
        getUserGames={getUserGames}
      />
    </div>
  );
}

export default Overview;
