import { Game } from '@constants/types';
import { Link } from 'react-router-dom';
import styles from '@components/ProfileContent/Overview/SideSection/ListCards/ListCards.module.scss';

export default function ListCards({
  status,
  gameData,
}: {
  status: string;
  gameData: Game[];
}) {
  return (
    <div className={styles.listContainer}>
      <h2>{status === 'justAdded' ? 'Just Added' : status}</h2>
      <div className={styles.listCards}>
        {Array.isArray(gameData) &&
          gameData.length > 0 &&
          gameData.map((game) => {
            return (
              <Link
                className={styles.listCard}
                key={game.id}
                to={`/game-detail/${game.id}/${game.name}`}
              >
                {game.imageURL && <img src={game.imageURL} alt={game.name} />}
              </Link>
            );
          })}
      </div>
    </div>
  );
}
