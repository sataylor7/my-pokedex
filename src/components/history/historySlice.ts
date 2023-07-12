import { createSlice } from '@reduxjs/toolkit'

export interface HistoryState {
  results: Array<{
    id: string
  }>
}

const initialState: HistoryState = {
  results: [
    {
      id: '',
    },
  ],
}
// the concept behind this is to actually have a history section of the store
// it will hold the data that was fetched from the search
// ideally the search should look at the history first before it makes a call to the api
// this is my first time using redux toolkit and rtk-query, in the past I have done everything
// scratch and controlled caching
export const historySlice = createSlice({
  initialState,
  name: 'history',
  reducers: {
    addToHistoryList: (state, action) => {
      state.results.push(action.payload)
    },
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
export const { addToHistoryList, clearHistoryList, removeFromHistoryList } =
  historySlice.actions

export default historySlice.reducer
