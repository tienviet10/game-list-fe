import styles from '@components/ProfileContent/Overview/Overview.module.scss';
import useGetUserGames from '@services/usergames/useGetUserGames';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import LoadingSkeleton from '@components/LoadingSkeleton';
import MainSection from '@components/ProfileContent/Overview/MainSection';
import SideSection from '@components/ProfileContent/Overview/SideSection';

function Overview() {
  const { userGames, userDataIsLoading, getUserGames } = useGetUserGames();

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['userGames']);

  useEffect(() => {
    if (getUserGames && !data) {
      getUserGames();
    }
  }, [getUserGames, data]);

  if (userDataIsLoading)
    return (
      <div className={styles.overviewLoadingContainer}>
        <LoadingSkeleton loading={userDataIsLoading} />
      </div>
    );

  return (
    <div className={styles.overview}>
      <SideSection userGames={userGames?.data.data.userGamesByStatus} />
      <MainSection userGames={userGames?.data.data.userGamesByStatus} />
    </div>
  );
}

export default Overview;
