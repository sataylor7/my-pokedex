import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import historyReducer from './components/history/historySlice'
import searchReducer from './components/search/searchSlice'
import { pokemonApi } from './services/pokemon'

export const store = configureStore({
  // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    history: historyReducer,
    search: searchReducer,
  },
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
