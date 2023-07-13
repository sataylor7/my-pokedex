import { createSlice } from '@reduxjs/toolkit'

export interface searchState {
  value: string
}

const initialState: searchState = {
  value: '',
}
// this is separate from the history as it deals with more the ui triggering
// and not record keeping
export const searchSlice = createSlice({
  initialState,
  name: 'search',
  reducers: {
    clearSearch: () => {
      return initialState
    },
    currentSearch: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { currentSearch, clearSearch } = searchSlice.actions

export default searchSlice.reducer
