import useAllGames from '@services/game/useAllGames';
import GamesTrends from '@components/Trend/GamesTrends';
import GamesListLoading from '@components/AllGames/GamesList/GamesListLoading';

function Trend() {
  // dispatch(setUserGameFilters({ sortBy: 'avg_score' }));

  const { data, isFetching: isBestFetching } = useAllGames(20, 'avg_score');
  const bestGames = !isBestFetching && data?.pages[0]?.data?.data?.games;

  const { data: newestData, isFetching: isNewestFetching } = useAllGames(
    20,
    'total_rating'
  );
  const newestGames =
    !isNewestFetching && newestData?.pages[0]?.data?.data?.games;

  return (
    <div>
      <div>
        {isBestFetching ? (
          <GamesListLoading />
        ) : (
          <GamesTrends title="Highest Rating" games={bestGames} />
        )}

        {isNewestFetching ? (
          <GamesListLoading />
        ) : (
          <GamesTrends title="Latest Played" games={newestGames} />
        )}
      </div>
    </div>
  );
}

export default Trend;
