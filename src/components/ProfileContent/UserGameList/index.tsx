import { useAppSelector } from '@app/hooks';

import { setInitialState } from '@features/userGamesListSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ListsOrderType, RequiredGame } from '@constants/types';
import useGetUserGames from '@services/usergames/useGetUserGames';
import UserGamesTable from '@components/GamesListTable';
import styles from './UserGameListStyle.module.scss';

function UserGameList() {
  const dispatch = useDispatch();
  // const selectedList = useAppSelector(
  //   (state) => state.userGameFilters.selectedList
  // );
  const listOrder: ListsOrderType[] = useAppSelector(
    (state) => state.userGames.listOrder
  );

  const { userGames, userDataIsLoading, getUserGames } = useGetUserGames();

  useEffect(() => {
    getUserGames();
  }, [getUserGames]);

  // Initialize the listsOrder, selectedLists, and localListOrder in redux toolkit
  useEffect(() => {
    if (userGames?.data.data.userGamesByStatus.listsOrder) {
      dispatch(
        setInitialState(
          userGames?.data.data.userGamesByStatus.listsOrder.split(',')
        )
      );
    }
  }, [dispatch]);

  if (userDataIsLoading || !userGames?.data.data.userGamesByStatus) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.mainContainer}>
      {/* <FilterColumn /> */}
      <div>
        {listOrder.length > 0 &&
          listOrder.map((list: ListsOrderType) => {
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
