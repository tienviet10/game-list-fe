import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import userReducer from '@/features/userSlice';
import userGamesListReducer from '@/features/userGamesListSlice';
import userGameReducer from '@/features/userGameSlice';
import addedGamesReducer from '@/features/addedGamesSlice';
import homeSearchSlice from '@/features/homeSearchSlice';
import { createGameFiltersSlice } from '@/features/gameFiltersSlice';
import { createHomeGameFiltersSlice } from '@/features/homeGameFiltersSlice';

const userGameFiltersSlice = createGameFiltersSlice({
  name: 'userGameFiltersSlice',
  initialState: {
    genres: undefined,
    platforms: undefined,
    tags: undefined,
    year: undefined,
    // search: undefined,
    sortBy: undefined,
    selectedList: 'all',
  },
  reducers: {},
});

const homeGameFiltersSlice = createHomeGameFiltersSlice();

const rootReducer = combineReducers({
  user: userReducer,
  userGames: userGamesListReducer,
  userGame: userGameReducer,
  homeSearch: homeSearchSlice,

  homeGameFilters: homeGameFiltersSlice.reducer,
  userGameFilters: userGameFiltersSlice.reducer,

  addedGames: addedGamesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;

export const {
  incrementItem,
  toggleItem,
  removeItem,
  clearCategory,
  setFilters: setHomeFilter,
  resetFilter: resetHomeFilter,
  reset: resetHomeFilters,
} = homeGameFiltersSlice.actions;

export const {
  setFilters: setUserGameFilters,
  resetFilter: resetUserGameFilter,
  reset: resetUserGameFilters,
} = userGameFiltersSlice.actions;
