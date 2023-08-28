import { INITIAL_USER_GAME_BY_ID_STATE } from '@constants/constants';
import { createSlice } from '@reduxjs/toolkit';
import { InitialStateUserGameType } from '@features/types';

const initialState: InitialStateUserGameType = INITIAL_USER_GAME_BY_ID_STATE;

// TODO: Add types to refector the reducer
export const userGameSlice = createSlice({
  name: 'userGame',
  initialState,
  reducers: {
    setUserGameReducer: (state, action) => {
      const { type, payload } = action.payload;

      if (type === 'gameStatus') {
        if (payload === 'Inactive') {
          state.id = '';
          state.gameStatus = '';
          state.gameNote = '';
          state.rating = 0;
          state.private = false;
          state.completedDate = undefined;
          state.startDate = undefined;
        } else {
          state.gameStatus = payload;
        }
      } else if (type === 'gameNote') {
        state.gameNote = payload;
      } else if (type === 'rating') {
        state.rating = payload;
      } else if (type === 'private') {
        state.private = payload;
      } else if (type === 'completedDate') {
        state.completedDate = payload === '' ? undefined : payload;
      } else if (type === 'startDate') {
        state.startDate = payload === '' ? undefined : payload;
      } else if (type === 'userGame') {
        const {
          gameStatus,
          gameNote,
          rating,
          private: isPrivate,
          completedDate,
          startDate,
          id,
        } = payload;

        if (gameStatus === 'Inactive') {
          state.id = '';
          state.gameStatus = '';
          state.gameNote = '';
          state.rating = 0;
          state.private = false;
          state.completedDate = undefined;
          state.startDate = undefined;
        } else {
          state.id = id;
          state.gameStatus = gameStatus;
          state.gameNote = gameNote;
          state.rating = rating;
          state.private = isPrivate;
          state.completedDate =
            completedDate === '' ? undefined : completedDate;
          state.startDate = startDate === '' ? undefined : startDate;
        }
      } else if (type === 'reset') {
        Object.assign(state, INITIAL_USER_GAME_BY_ID_STATE);
      }
    },
  },
});

export const { setUserGameReducer } = userGameSlice.actions;

export default userGameSlice.reducer;
