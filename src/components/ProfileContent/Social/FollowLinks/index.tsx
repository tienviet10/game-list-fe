import React from 'react';
import CustomSocialTab from '@components/CustomSocialTab';
import styles from './FollowLinks.module.scss';

type FollowLinksProps = 'Followings' | 'Followers';

const tabs: FollowLinksProps[] = ['Followings', 'Followers'];

function FollowLinks({
  selectedFilter,
  setSelectedFilter,
}: {
  selectedFilter: FollowLinksProps;
  setSelectedFilter: React.Dispatch<React.SetStateAction<FollowLinksProps>>;
}) {
  return (
    <div>
      <div className={styles.followLinksContainer}>
        <div className={styles.linksHeader}>Social</div>
        {tabs.map((tab) => (
          <CustomSocialTab
            text={tab}
            onPress={() => setSelectedFilter(tab)}
            activeStyle={selectedFilter === tab ? styles.selected : ''}
            key={tab}
          />
        ))}
      </div>
    </div>
  );
}

export default FollowLinks;
