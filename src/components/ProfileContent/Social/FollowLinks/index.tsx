import React from 'react';
import CustomSocialTab from '@components/CustomSocialTab';
import styles from './FollowLinks.module.scss';

function FollowLinks({
  selectedFilter,
  setSelectedFilter,
}: {
  selectedFilter: 'Followings' | 'Followers';
  setSelectedFilter: React.Dispatch<
    React.SetStateAction<'Followings' | 'Followers'>
  >;
}) {
  return (
    <div>
      <div className={styles.followLinksContainer}>
        <div className={styles.linksHeader}>Social</div>
        <CustomSocialTab
          text="Followings"
          onPress={() => setSelectedFilter('Followings')}
          activeStyle={selectedFilter === 'Followings' ? styles.selected : ''}
        />
        <CustomSocialTab
          text="Followers"
          onPress={() => setSelectedFilter('Followers')}
          activeStyle={selectedFilter === 'Followers' ? styles.selected : ''}
        />
      </div>
    </div>
  );
}

export default FollowLinks;
