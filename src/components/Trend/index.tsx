import useAllGames from '@services/game/useAllGames';

function Trend() {
  // dispatch(setUserGameFilters({ sortBy: 'avg_score' }));

  const { data, isFetching } = useAllGames(20, 'avg_score');
  const bestGames = !isFetching && data?.pages[0]?.data?.data?.games;
  !isFetching && console.log(bestGames);

  const { data: newestData, isFetching: newestIsFetching } = useAllGames(
    20,
    'total_rating'
  );
  const newestGames =
    !newestIsFetching && newestData?.pages[0]?.data?.data?.games;
  !newestIsFetching && console.log(newestGames);

  return (
    <div>
      <h1>Trend</h1>
    </div>
  );
}

export default Trend;
