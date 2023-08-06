import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export function createGameFiltersSlice<T>(name: string, initialState: T) {
  return createSlice({
    name,
    initialState,
    reducers: {
      setFilters: (state, action: PayloadAction<Partial<T>>) => {
        return { ...state, ...action.payload };
      },
      resetFilter: (state, action: PayloadAction<keyof T>) => {
        const filterKey = action.payload;
        return { ...state, [filterKey]: initialState[filterKey] };
      },
      reset: () => initialState,
    },
  });
}
