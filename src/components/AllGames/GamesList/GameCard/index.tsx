import React from 'react';
import { Col, Card, Popover, Tag, Button, Divider } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Color from 'color-thief-react';
import { Link } from 'react-router-dom';
import styles from '@/components/AllGames/GamesList/GameCard/GameCard.module.scss';
import type { GameCardType } from '@/components/AllGames/GamesList/types';
import getRatingIcon from '@/utils/getRatingIcon';

function NeedMemoedGameCard({
  isAdded,
  game,
  colorBgContainer,
  openGameListEditor,
}: GameCardType) {
  const { Meta } = Card;

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
      {({ data, error }) => {
        return (
          <Col
            className={styles.colGameCardContainer}
            xs={{ span: 12 }}
            sm={{ span: 8 }}
            md={{ span: 6 }}
            xl={{ span: 4 }}
            key={game.id}
          >
            <Popover
              color="#f0f0f0"
              title={game.name}
              aria-label={`gamecard-popover-${game.name}`}
              content={
                <div style={{ position: 'relative' }}>
                  {game.releaseDate ? (
                    <p>{`Released: ${game.releaseDate}`}</p>
                  ) : null}

                  <p>{`Score: ${game.avgScore}`}</p>

                  {/* Conditional rendering icon */}
                  {game.avgScore
                    ? getRatingIcon(game.avgScore, data as string | '#6927d3')
                    : null}

                  <Divider>Tags</Divider>
                  {game.tags.map((tag: string) => (
                    <Tag key={`${game.id}${tag}`} color={data}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              }
            >
              {error ? (
                <p>Error!</p>
              ) : (
                <Link to={`/game-detail/${game.id}/${game.name}`}>
                  {game.imageURL ? (
                    <Card
                      game-card-id={game.id}
                      className={styles.cardGameContainer}
                      bordered={false}
                      style={{
                        backgroundColor: colorBgContainer,
                      }}
                      cover={<img alt="example" src={game.imageURL} />}
                      bodyStyle={{
                        padding: '24px 24px 24px 10px',
                        backgroundColor: colorBgContainer,
                      }}
                    >
                      <Meta
                        style={{ color: `${data}` }}
                        className={styles.metaGameDescription}
                        title={game.name}
                      />
                    </Card>
                  ) : null}
                </Link>
              )}
              <Button
                onClick={() => {
                  if (openGameListEditor) {
                    openGameListEditor(game);
                  }
                }}
                size="middle"
                type="default"
                className={styles.buttonGameHoverShow}
                style={{
                  color: `${data}`,
                }}
                icon={
                  isAdded ? (
                    <EditOutlined
                      style={{
                        fontSize: '14px',
                      }}
                    />
                  ) : (
                    <PlusCircleOutlined style={{ fontSize: '14px' }} />
                  )
                }
                shape="circle"
              />
            </Popover>
          </Col>
        );
      }}
    </Color>
  );
}

const MemoedGameCard = React.memo(NeedMemoedGameCard);

export default MemoedGameCard;
