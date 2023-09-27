import { useAppSelector } from '@app/hooks';
import useAllGames from '@services/game/useAllGames';
import { Content } from 'antd/es/layout/layout';
import { Card, Grid, Row, theme } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { GameDataType } from '@components/GamesListTable/types';
import { RequiredGameWithIsAdded } from '@constants/types';
import ListEditor from '@components/ListEditor';
import useGetUserGameState from '@/services/usergames/useGetUserGameState';
import GamesListLoading from './LoadingGameCard';
import styles from '@/components/AllGames/GamesList/GamesList.module.scss';
import MemoizedList from './List';
import InView from './InView';
import MemoedGameCard from './GameCard';
import LoadingGamesView from './LoadingGameCard/LoadingGamesView';

const { useBreakpoint } = Grid;

// The amount of games to request from the server. This is used for infinite scrolling. When the user scrolls down enough and needs to fetch more games,
// This value will be the amount of games we fetch.
const DEFAULT_FETCH_AMOUNT = 20;

export default function GamesList() {
  const homeSearchState = useAppSelector((state) => state.homeSearch);
  const data = useAllGames(DEFAULT_FETCH_AMOUNT);
  const screens = useBreakpoint();

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

  const loadingAmount = useMemo(() => {
    if (screens.lg) {
      return 12;
    }
    if (screens.md) {
      return 8;
    }

    if (screens.sm) {
      return 6;
    }

    return 12;
  }, [screens]);

  const memorizedOpenGameListEditor = useCallback(
    async (game: GameDataType) => {
      setSelectedGame(game);
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

  console.log('screens', screens);
  return (
    <Content aria-label={`view-${homeSearchState.view}`}>
      {homeSearchState.view === 'grid' ? (
        <Row
          gutter={{
            xs: 16,
            sm: 16,
            md: 24,
            xl: 32,
          }}
        >
          {/* {data.status === 'loading' && (

              )} */}
          {/* <GamesListLoading /> */}

          {/* {screens.xs && <LoadingGamesView amount={1} />}
          {screens.sm && <LoadingGamesView amount={2} />}
          {screens.md && <LoadingGamesView amount={3} />}
          {screens.lg && <LoadingGamesView amount={4} />}
          {screens.xl && <LoadingGamesView amount={5} />}
          {screens.xxl && <LoadingGamesView amount={6} />} */}

          {data.status === 'success' &&
            data.data.pages.map((page) => {
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
          {(data.isFetching || data.isFetchingNextPage) && (
            <LoadingGamesView amount={loadingAmount} />
          )}
          <InView onChange={fetchNextPage} />
        </Row>
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
