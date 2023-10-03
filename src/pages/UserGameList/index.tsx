import { useAppSelector } from '@app/hooks';
import { setInitialState } from '@features/userGamesListSlice';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import type { ListsOrderType, RequiredGame } from '@constants/types';
import useGetUserGames from '@services/usergames/useGetUserGames';
import UserGamesTable from '@components/GamesListTable';
import FilterColumn from '@components/UserListFilterColumn';
import styles from './UserGameListStyle.module.scss';

function UserGameList() {
  const dispatch = useDispatch();
  const selectedList = useAppSelector(
    (state) => state.userGameFilters.selectedList
  );
  const listOrder: ListsOrderType[] = useAppSelector(
    (state) => state.userGames.listOrder
  );

  const { userGames, userDataIsLoading, getUserGames } = useGetUserGames();
  useEffect(() => {
    getUserGames();
  }, [getUserGames]);

  // Initialize the listsOrder, selectedLists, and localListOrder in redux toolkit
  useEffect(() => {
    if (userGames?.data.data.userGamesByStatus?.listsOrder) {
      dispatch(
        setInitialState(
          userGames?.data.data.userGamesByStatus?.listsOrder.split(',')
        )
      );
    }
  }, []);

  const listToDisplay = useMemo(() => {
    if (selectedList === 'all') {
      return listOrder;
    }
    return [selectedList];
  }, [listOrder, selectedList]);

  if (userDataIsLoading || !userGames?.data.data.userGamesByStatus) {
    return <div>Loading...</div>;
  }

  console.log('listToDisplay', listToDisplay);

  return (
    <div className={styles.mainContainer}>
      <FilterColumn />
      <div>
        {listToDisplay.map((list) => {
          console.log(
            'userGames?.data.data.userGamesByStatus[list]',
            userGames?.data?.data?.userGamesByStatus[list]
          );
          return (
            <UserGamesTable
              key={list}
              gamesData={
                userGames?.data.data.userGamesByStatus[list] as RequiredGame[]
              }
              title={list[0].toUpperCase() + list.slice(1)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default UserGameList;
