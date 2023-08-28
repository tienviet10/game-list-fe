import { useAppSelector } from '@app/hooks';
import useAllGames from '@services/game/useAllGames';
import { Content } from 'antd/es/layout/layout';
import { Card, Row, theme } from 'antd';
import GamesListLoading from './GamesListLoading';
import MemoedGameCard from './GameCard';
import styles from '@/components/AllGames/GamesList/GamesList.module.scss';
import MemoizedList from './List';

export default function GamesList() {
  const homeSearchState = useAppSelector((state) => state.homeSearch);
  const data = useAllGames();

  console.log('useAllGames', data);

  // // States for modal to edit list
  // const { userGameLoading, fetchUserGame } = useUserGameById();
  // const [open, setOpen] = useState(false);
  // const [selectedGame, setSelectedGame] = useState<
  //   GameDataType | null | Game
  // >();

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const debouncedFilter = useCallback(
  //   debounce((query: string | undefined) => {
  //     if (!query) {
  //       setTempSearch(undefined);
  //       return;
  //     }
  //     setTempSearch(query);
  //   }, 600),
  //   []
  // );

  // // TODO: NEED TO REFACTORY APOLLO GET DATA FROM CACHE FIRST
  // useEffect(() => {
  //   const unsubscribe = store.subscribe(() => {
  //     const { search } = store.getState().homeGameFilters;

  //     // Make sure when new search is the same as the old one, we don't fetch nor reset the tempSearch
  //     if (search === tempSearch) {
  //       debouncedFilter.cancel();
  //       return;
  //     }
  //     // If search is empty, reset the tempSearch
  //     if (!search) {
  //       setTempSearch(undefined);
  //       debouncedFilter.cancel();
  //       return;
  //     }

  //     debouncedFilter(search);
  //   });

  //   return () => {
  //     debouncedFilter.cancel();
  //     unsubscribe();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debouncedFilter, tempSearch]);

  // const memorizedOpenGameListEditor = useCallback(
  //   async (game: GameDataType) => {
  //     setSelectedGame(game);
  //     await fetchUserGame({ variables: { gameId: game.id } });
  //     setOpen(true);
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   []
  // );

  // const onFetchMore = async (cardsLength: number) => {
  //   await fetchMore({
  //     variables: {
  //       limit: 20,
  //       offset: cardsLength,
  //     },
  //     updateQuery: (prev, { fetchMoreResult }) => {
  //       if (!fetchMoreResult) return prev;
  //       return {
  //         ...prev,
  //         allGames: [...prev.allGames, ...fetchMoreResult.allGames],
  //       };
  //     },
  //   });
  // };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // TODO: Add Loading component
  if (data.status === 'loading') {
    return <GamesListLoading />;
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
            {data.status === 'success' &&
              data.games.length > 0 &&
              data.games.map((game) => {
                return (
                  <MemoedGameCard
                    isAdded={false}
                    key={`grid-${game.id}`}
                    game={game}
                    colorBgContainer={colorBgContainer}
                    // openGameListEditor={memorizedOpenGameListEditor}
                  />
                );
              })}
            {/* TODO: SEARCH BAR MAY TRIGGER SECOND FETCH
            {games.length > 0 ? (
              <InView
                style={{ visibility: 'hidden' }}
                onChange={async (inView) => {
                  const currentLength = games.length || 0;

                  if (inView) {
                    await onFetchMore(currentLength);
                  }
                }}
              >
                INVIEW
              </InView>
            ) : null} */}
          </Row>
        </Card>
      ) : (
        <div className={styles.allListContainer}>
          <div className={styles.allListTitle}>All Games</div>
          <div className={styles.allListDivider}>
            {data.status === 'success' && data.games.length > 0
              ? data.games.map((game) => (
                  <MemoizedList
                    key={`list-${game.id}`}
                    game={game}
                    colorBgContainer={colorBgContainer}
                  />
                ))
              : null}
            {/* {games.length > 0 ? (
              <InView
                style={{ visibility: 'hidden' }}
                onChange={async (inView) => {
                  const currentLength = games.length || 0;

                  if (inView) {
                    await onFetchMore(currentLength);
                  }
                }}
              >
                INVIEW
              </InView>
            ) : null} */}
          </div>
        </div>
      )}
      {/* <ListEditor
        userGameLoading={userGameLoading}
        open={open}
        setOpen={setOpen}
        game={selectedGame as GameDataType}
        isGameAdded={selectedGame?.isGameAdded}
        setSelectedGame={setSelectedGame}
      /> */}
    </Content>
  );
}
