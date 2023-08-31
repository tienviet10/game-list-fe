import { useAppSelector } from '@app/hooks';
import useAllGames from '@services/game/useAllGames';
import { Content } from 'antd/es/layout/layout';
import { Card, Row, theme } from 'antd';
import { useCallback, useState } from 'react';
import { GameDataType } from '@components/GamesListTable/types';
import { RequiredGameWithIsAdded } from '@constants/types';
import ListEditor from '@components/ListEditor';
import GamesListLoading from './GamesListLoading';
import MemoedGameCard from './GameCard';
import styles from '@/components/AllGames/GamesList/GamesList.module.scss';
import MemoizedList from './List';
import InView from './InView';

export default function GamesList() {
  const homeSearchState = useAppSelector((state) => state.homeSearch);
  const data = useAllGames();

  const [testCounter, setTestCounter] = useState(0);
  console.log('useAllGames', data);

  // States for modal to edit list
  // const { userGameLoading, fetchUserGame } = useUserGameById();
  const [open, setOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<
    GameDataType | undefined | RequiredGameWithIsAdded
  >();

  const memorizedOpenGameListEditor = useCallback(
    async (game: GameDataType) => {
      setSelectedGame(game);
      setOpen(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onFetchMore = async () => {
    console.log('fetch more');

    // hasNextPage,
    // isFetching,
    // isFetchingNextPage,
    // fetchNextPage,
    // await data.fetchNextPage(i);
    console.log(data.isFetching);
    console.log('asd  = ', data.data.pages.length * 20);
    data.fetchNextPage({
      pageParam: data.data.pages.length * 20,
      cancelRefetch: false,
    });
    setTestCounter((prev) => prev + 20);
    // setTestCounter(testCounter + 20);
    // await fetchMore({
    //   variables: {
    //     limit: 20,
    //     offset: cardsLength,
    //   },
    //   updateQuery: (prev, { fetchMoreResult }) => {
    //     if (!fetchMoreResult) return prev;
    //     return {
    //       ...prev,
    //       allGames: [...prev.allGames, ...fetchMoreResult.allGames],
    //     };
    //   },
    // });
  };

  const onInViewChange = async () => {
    if (data.hasNextPage) await onFetchMore();
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // TODO: Add Loading component
  if (data.status === 'loading') {
    return <GamesListLoading />;
  }

  // TODO: Add Error component
  if (data.status === 'error') {
    return <div>Error here</div>;
  }

  console.log(data);
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
                    isAdded={false}
                    key={`grid-${game.id}`}
                    game={game}
                    colorBgContainer={colorBgContainer}
                    openGameListEditor={memorizedOpenGameListEditor}
                  />
                );
              });
            })}
            {/* {data.games.map((game) => {
              return (
                <MemoedGameCard
                  isAdded={false}
                  key={`grid-${game.id}`}
                  game={game}
                  colorBgContainer={colorBgContainer}
                  // openGameListEditor={memorizedOpenGameListEditor}
                />
              );
            })} */}

            {/* TODO: Move this if statement up, stop checking for null every time */}
            {/* {data.status === 'success' && data.games.length > 0 && (
              <InView
                onChange={async () => onFetchMore(data.games.length || 0)}
              />
            )} */}
            <InView onChange={onInViewChange} />
          </Row>
        </Card>
      ) : (
        <div className={styles.allListContainer}>
          <div className={styles.allListTitle}>All Games</div>
          <div className={styles.allListDivider}>
            {/* {data.status === 'success' && data.games.length > 0
              ? data.games.map((game) => (
                  <MemoizedList
                    key={`list-${game.id}`}
                    game={game}
                    colorBgContainer={colorBgContainer}
                  />
                ))
              : null} */}
            <div>games loaded</div>
            <InView onChange={onInViewChange} />
          </div>
        </div>
      )}
      <ListEditor
        userGameLoading={false}
        open={open}
        setOpen={setOpen}
        game={selectedGame as GameDataType}
        isGameAdded={false}
        setSelectedGame={setSelectedGame}
      />
    </Content>
  );
}
