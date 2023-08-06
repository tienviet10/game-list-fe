import { createSlice } from '@reduxjs/toolkit';
import { HomeSearchSlice } from './types';

const initialState: HomeSearchSlice = {
  view: 'grid',
};

export const homeSearchSlice = createSlice({
  name: 'homeSearchSlice',
  initialState,
  reducers: {
    setView(state, action: { payload: 'grid' | 'list' }) {
      state.view = action.payload;
    },
  },
});

export const { setView } = homeSearchSlice.actions;

export default homeSearchSlice.reducer;
