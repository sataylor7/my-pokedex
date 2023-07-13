import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDebounce } from 'use-debounce'

import { clearHistoryList } from './components/history/historySlice'
import PokemonWrapper, { Pokemon } from './components/pokemon/Pokemon'
import Search from './components/search/Search'
import { clearSearch } from './components/search/searchSlice'
import type { RootState } from './store'

const App: React.FC = () => {
  // basic ui setup
  const dispatch = useDispatch()
  const currentSearchKey = useSelector((state: RootState) => state.search)
  const history = useSelector((state: RootState) => state.history)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showHistoryUI, setShowHistoryUI] = useState(history.results.length > 0)
  const [showHistoryLink, setShowHistoryLink] = useState(false)

  const [value] = useDebounce(currentSearchKey.value, 1000)

  const handleShowHistory = () => {
    setShowHistoryLink(!showHistoryLink)
  }
  const handleClearHistory = () => {
    dispatch(clearSearch())
    dispatch(clearHistoryList())
    handleShowHistory()
  }
  // Would probably clean this up a lot and break it out into more components if given the time
  // would also look into react router and its outlets so that we can just render one section
  // instead of all
  // also would like to dedupe the history, its actually not calling the api again its just looking at
  // the cache
  return (
    <main className="flex min-h-screen w-full flex-col">
      <header className=" w-full  bg-gray-100 p-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-md t">My Pokedex</h1>
          <Search />
        </div>
      </header>

      {(currentSearchKey.value || history.results.length > 0) && (
        <div className="mx-auto flex w-3/4 flex-col gap-y-4 py-2">
          <div className="flex justify-between text-left">
            <div>
              <h2>Current Search Key: {value}</h2>
              <h3>Search Results:</h3>
            </div>
            {showHistoryUI && (
              <div className="flex flex-col">
                <button type="button" onClick={handleShowHistory}>
                  {showHistoryLink ? `hide` : `show`} history list
                </button>
                {showHistoryLink && (
                  <button type="button" onClick={handleClearHistory}>
                    clear history list
                  </button>
                )}
              </div>
            )}
          </div>
          {showHistoryLink || !currentSearchKey.value ? (
            history.results.length > 0 &&
            history.results.map((res) => {
              return <Pokemon key={res.id} data={res} />
            })
          ) : (
            <PokemonWrapper />
          )}
        </div>
      )}
      {!currentSearchKey.value && !history.results.length && (
        <div className="mx-auto flex w-3/4 flex-col gap-y-4 py-2">
          Please use the search bar to search for a pokemon
        </div>
      )}
    </main>
  )
}

export default App
