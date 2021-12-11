import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Post} from '../../types';
export interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

export const postSlice = createSlice({
  name: 'Posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      console.log('dispatch');
    },
  },
});

export const {setPosts} = postSlice.actions;

export default postSlice.reducer;
