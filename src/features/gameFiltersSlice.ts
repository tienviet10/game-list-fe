import {
  Draft,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';

export function createGameFiltersSlice<
  T,
  Reducers extends SliceCaseReducers<T>,
>({
  name,
  initialState,
  reducers,
}: {
  name: string;
  initialState: T;
  reducers: ValidateSliceCaseReducers<T, Reducers>;
}) {
  return createSlice({
    name,
    initialState,
    reducers: {
      setFilters: (state: Draft<T>, action: PayloadAction<Partial<T>>) => {
        return { ...state, ...action.payload };
      },

      resetFilter: (state: Draft<T>, action: PayloadAction<keyof T>) => {
        const filterKey = action.payload;
        return { ...state, [filterKey]: initialState[filterKey] };
      },

      reset: () => initialState,

      ...reducers,
    },
  });
}
