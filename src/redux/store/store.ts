import {configureStore} from '@reduxjs/toolkit';
import postsReducer from '../reducers/postsReducer';
import productsReducer from '../reducers/productsReducer';
import storeReducer from '../reducers/storeReducer';
import userReducer from '../reducers/userReducer';
//need to implement caching properly
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    products: productsReducer,
    user: userReducer,
    store: storeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
