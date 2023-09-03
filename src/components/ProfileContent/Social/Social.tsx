import { useEffect, useState } from 'react';
import { useFollows } from '@services/user/useFollows';
import styles from './Social.module.scss';
import FollowLinks from './FollowLinks';
import Follows from './Follows';

function Social() {
  const { followDataIsLoading, refetchFollowData, followData } = useFollows();

  const [selectedFilter, setSelectedFilter] = useState<
    'Followings' | 'Followers'
  >('Followings');

  useEffect(() => {
    if (refetchFollowData) {
      refetchFollowData();
    }
  }, [refetchFollowData]);

  if (followDataIsLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.socialContainer}>
      <FollowLinks
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <Follows
        follows={followData?.data.data.user.following || []}
        followers={followData?.data.data.user.followers || []}
        loading={followDataIsLoading}
        selectedFilter={selectedFilter}
      />
    </div>
  );
}

export default Social;
