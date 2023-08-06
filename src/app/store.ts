import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from '@features/userSlice';
import userGamesListReducer from '@features/userGamesListSlice';
import userGameReducer from '@features/userGameSlice';
import addedGamesReducer from '@features/addedGamesSlice';
import homeSearchSlice from '@features/homeSearchSlice';
import { createGameFiltersSlice } from '@features/gameFiltersSlice';
import userPostSlice from '@features/userPostSlice';
import { HomeGameFilters, UserGameFilters } from '@/types/global';

const defaultGameFilters: HomeGameFilters = {
  genres: [],
  platforms: [],
  tags: [],
  year: undefined,
  search: '',
  sortBy: 'name',
};

const defaultUserGameFilters: UserGameFilters = {
  genres: undefined,
  platforms: undefined,
  tags: undefined,
  year: undefined,
  search: undefined,
  sortBy: undefined,
  selectedList: 'all',
};

const gameFiltersSlice = createGameFiltersSlice<HomeGameFilters>(
  'gameFiltersSlice',
  defaultGameFilters
);
const userGameFiltersSlice = createGameFiltersSlice<UserGameFilters>(
  'userGameFiltersSlice',
  defaultUserGameFilters
);

const rootReducer = combineReducers({
  user: userReducer,
  userGames: userGamesListReducer,
  userGame: userGameReducer,
  homeSearch: homeSearchSlice,
  gameFilters: gameFiltersSlice.reducer,
  userGameFilters: userGameFiltersSlice.reducer,

  addedGames: addedGamesReducer,
  userPost: userPostSlice,
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
  setFilters: setGameFilters,
  resetFilter: resetGameFilter,
  reset: resetGameFilters,
} = gameFiltersSlice.actions;
export const {
  setFilters: setUserGameFilters,
  resetFilter: resetUserGameFilter,
  reset: resetUserGameFilters,
} = userGameFiltersSlice.actions;

setupListeners(store.dispatch);
