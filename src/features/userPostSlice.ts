import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: { post: string } = {
  post: '',
};

export const userPostSlice = createSlice({
  name: 'userPost',
  initialState,

  reducers: {
    setPost: (state, action: PayloadAction<string>) => {
      state.post = action.payload;
    },
  },
});

export const { setPost } = userPostSlice.actions;

export default userPostSlice.reducer;
