import { createSlice } from '@reduxjs/toolkit'

import type { PokemonDetailData } from '../../services/pokemon'

import { pokemonApi } from './../../services/pokemon'

export interface HistoryState {
  results: PokemonDetailData[]
}

const initialState: HistoryState = {
  results: [],
}
// the concept behind this is to actually have a history section of the store
// it will hold the data that was fetched from the search
// ideally the search should look at the history first before it makes a call to the api
// this is my first time using redux toolkit and rtk-query, in the past I have done everything
// scratch and controlled caching
export const historySlice = createSlice({
  extraReducers: (builder) => {
    builder.addMatcher(
      pokemonApi.endpoints.getPokemonCustom.matchFulfilled,
      (state, action) => {
        // I actually didnt know how to fix this type error, I had to do a bunch of research
        // took way longer than it should of
        state.results.push(action.payload as PokemonDetailData)
      }
    )
  },
  initialState,
  name: 'history',
  reducers: {
    clearHistoryList: () => {
      return initialState
    },
    removeFromHistoryList: (state, action) => {
      state.results.splice(
        state.results.findIndex((item) => item.id === action.payload),
        1
      )
    },
  },
})

// Action creators are generated for each case reducer function
export const { clearHistoryList, removeFromHistoryList } = historySlice.actions

export default historySlice.reducer
