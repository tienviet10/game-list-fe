import { SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons';
import styles from '@/components/AllGames/GamesList/GameCard/GameCard.module.scss';

export default function getRatingIcon(avgScore: number, color: string) {
  if (avgScore > 8.5) {
    return (
      <SmileOutlined
        className={styles.ratingIcon}
        style={{
          color: `${color}`,
        }}
      />
    );
  }
  if (avgScore > 6.5) {
    return (
      <MehOutlined
        className={styles.ratingIcon}
        style={{
          color: `${color}`,
        }}
      />
    );
  }
  return (
    <FrownOutlined
      className={styles.ratingIcon}
      style={{
        color: `${color}`,
      }}
    />
  );
}
