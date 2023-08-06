import { createSlice } from '@reduxjs/toolkit';

const initialState: { addedList: string[]; isUserGameEdited: boolean } = {
  addedList: [],
  isUserGameEdited: false,
};

export const addedGamesSlice = createSlice({
  name: 'addedGames',
  initialState,
  reducers: {
    setClearAddedGames: (state) => {
      state.addedList = [];
    },
    setAddedGames: (state, action) => {
      if (action.payload.type === 'add') {
        state.addedList.push(action.payload.gameId);
      } else if (action.payload.type === 'remove') {
        state.addedList = state.addedList.filter(
          (id) => id !== action.payload.gameId
        );
      }
    },
    setIsUserGameEdited: (state, action) => {
      if (action.payload.type === 'edit') {
        state.isUserGameEdited = true;
      } else if (action.payload.type === 'reset') {
        state.isUserGameEdited = false;
      }
    },
  },
});

export const { setAddedGames, setIsUserGameEdited, setClearAddedGames } =
  addedGamesSlice.actions;

export default addedGamesSlice.reducer;
