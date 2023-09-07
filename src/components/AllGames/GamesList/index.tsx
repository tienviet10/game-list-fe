import { useAppSelector } from '@app/hooks';
import useAllGames from '@services/game/useAllGames';
import { Content } from 'antd/es/layout/layout';
import { Card, Row, theme } from 'antd';
import { useCallback, useState } from 'react';
import { GameDataType } from '@components/GamesListTable/types';
import { RequiredGameWithIsAdded } from '@constants/types';
import ListEditor from '@components/ListEditor';
import useGetUserGameState from '@/services/usergames/useGetUserGameState';
import GamesListLoading from './GamesListLoading';
import MemoedGameCard from './GameCard';
import styles from '@/components/AllGames/GamesList/GamesList.module.scss';
import MemoizedList from './List';
import InView from './InView';

// The amount of games to request from the server. This is used for infinite scrolling. When the user scrolls down enough and needs to fetch more games,
// This value will be the amount of games we fetch.
const DEFAULT_FETCH_AMOUNT = 20;

export default function GamesList() {
  const homeSearchState = useAppSelector((state) => state.homeSearch);
  const data = useAllGames(DEFAULT_FETCH_AMOUNT);

  // States for modal to edit list
  // const { userGameLoading, fetchUserGame } = useUserGameById();
  const [open, setOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<
    GameDataType | undefined | RequiredGameWithIsAdded
  >();

  const { userGameDataIsLoading } = useGetUserGameState(selectedGame?.id);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const memorizedOpenGameListEditor = useCallback(
    async (game: GameDataType) => {
      setSelectedGame(game);
      console.log('game', game);
      setOpen(true);
    },
    []
  );

  const fetchNextPage = async () => {
    if (
      data.status === 'success' &&
      (!data.isFetching || !data.isFetchingNextPage) &&
      data.hasNextPage
    ) {
      await data.fetchNextPage();
    }
  };

  // TODO: Add Loading component
  if (data.status === 'loading') {
    return <GamesListLoading />;
  }

  // TODO: Add Error component
  if (data.status === 'error') {
    return <div>Error here</div>;
  }

  return (
    <Content aria-label={`view-${homeSearchState.view}`}>
      {homeSearchState.view === 'grid' ? (
        <Card title="All Games" headStyle={{ color: 'rgb(100, 115,128)' }}>
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              xl: 32,
            }}
          >
            {data.data.pages.map((page) => {
              return page.data.data.games.map((game) => {
                return (
                  <MemoedGameCard
                    key={`grid-${game.id}`}
                    game={game}
                    colorBgContainer={colorBgContainer}
                    openGameListEditor={memorizedOpenGameListEditor}
                  />
                );
              });
            })}
            <InView onChange={fetchNextPage} />
          </Row>
        </Card>
      ) : (
        <div className={styles.allListContainer}>
          <div className={styles.allListTitle}>All Games</div>
          <div className={styles.allListDivider}>
            {data.data.pages.map((page) => {
              return page.data.data.games.map((game) => {
                return (
                  <MemoizedList
                    key={`list-${game.id}`}
                    game={game}
                    colorBgContainer={colorBgContainer}
                  />
                );
              });
            })}

            <InView onChange={fetchNextPage} />
          </div>
        </div>
      )}
      <ListEditor
        userGameLoading={userGameDataIsLoading}
        open={open}
        setOpen={setOpen}
        game={selectedGame as GameDataType}
        isGameAdded={selectedGame?.gameAdded as boolean}
        setSelectedGame={setSelectedGame}
      />
    </Content>
  );
}
