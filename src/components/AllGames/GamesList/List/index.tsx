import React from 'react';
import { Tag } from 'antd';
import Color from 'color-thief-react';
import styles from '@/components/AllGames/GamesList/List/List.module.scss';
import getRatingIcon from '@/utils/getRatingIcon';
import type { GameCardType } from '@/components/AllGames/GamesList/types';

function List({ game, colorBgContainer }: GameCardType): JSX.Element {
  return (
    <Color
      crossOrigin="anonymous"
      src={
        game.imageURL
          ? game.imageURL
          : 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png'
      }
      format="hex"
    >
      {({ data }) => (
        <div
          className={styles.gameListContainer}
          style={{ backgroundColor: `${colorBgContainer}` }}
        >
          <div className={styles.gameRankNumber}>
            <span className={styles.gameRankHash}>#</span>
            {game.id}
          </div>
          <a
            href={`/game-detail/${game.id}/${game.name}`}
            className={styles.gameLink}
          >
            {game.imageURL ? (
              <img
                src={game?.imageURL}
                className={styles.gameImage}
                alt={game.name}
              />
            ) : null}
          </a>
          <div className={styles.gameContent}>
            <div className={styles.gameTitle}>
              <div>
                <a
                  href={`/game-detail/${game.id}/${game.name}`}
                  style={{ color: `${data}` }}
                >
                  {game.name}
                </a>
              </div>
              <div className={styles.gameGenres}>
                {game.genres.map((genre: string) => (
                  <Tag
                    bordered={false}
                    color={data}
                    key={`${game.id} ${genre}`}
                  >
                    {genre}
                  </Tag>
                ))}
                {game.tags.map((tag: string) => (
                  <Tag bordered={false} color={data} key={`${game.id} ${tag}`}>
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
            <div className={styles.gameRating}>
              {game.avgScore ? getRatingIcon(game.avgScore, `${data}`) : null}
              <div style={{ color: `${data}` }}>
                Rating: {game.avgScore}
                <div>Based on: {game.totalRating} Users</div>
              </div>
            </div>
            <div className={styles.gamePlatforms} data-testid="gamePlatforms">
              {game.platforms.map((platform: string) => (
                <Tag
                  key={`${game.id}-${platform}`}
                  className={styles.gamePlatform}
                  color="rgb(17, 45, 78)"
                  style={{
                    marginBottom: '5px',
                    maxWidth: '125px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {platform}
                </Tag>
              ))}
            </div>
            <div className={styles.gameReleaseDate}>
              <div>Release Date: </div>
              {new Date(game.releaseDate).toISOString().slice(0, 10)}
            </div>
          </div>
        </div>
      )}
    </Color>
  );
}

const MemoizedList = React.memo(List);

export default MemoizedList;
