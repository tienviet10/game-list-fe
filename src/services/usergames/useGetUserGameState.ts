import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@app/hooks';
import { setUserGameReducer } from '@features/userGameSlice';
import { INITIAL_USER_GAME_BY_ID_STATE } from '@constants/constants';
import useGetUserGame from './useGetUserGame';

const useGetUserGameState = (gameId: number | undefined) => {
  const dispatch = useDispatch();
  const userState = useAppSelector((state) => state.user);
  const { userGame, userGameDataIsLoading, getUserGame } =
    useGetUserGame(gameId);

  useEffect(() => {
    if (userGame?.data.data && userState.user.id !== '') {
      dispatch(
        setUserGameReducer({
          type: 'userGame',
          payload: userGame?.data.data.userGame,
        })
      );
    } else {
      dispatch(
        setUserGameReducer({
          type: 'userGame',
          payload: INITIAL_USER_GAME_BY_ID_STATE,
        })
      );
    }
  }, [dispatch, userGame?.data.data, userState.user.id]);

  return { userGame, userGameDataIsLoading, getUserGame };
};

export default useGetUserGameState;
