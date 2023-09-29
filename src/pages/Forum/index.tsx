import { Layout } from 'antd';
import styles from '@/pages/Forum/Forum.module.scss';

import Activities from '@/components/Activities';
import Trend from '@/components/Trend';

function Forum() {
  const { Content } = Layout;
  return (
    <Layout>
      <Content>
        <div className={styles.forumContainer}>
          <div className={styles.forum}>
            <Activities />
            <Trend />
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default Forum;
