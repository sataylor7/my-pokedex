import React from 'react'
import { useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce'

import Pokemon from './components/pokemon/Pokemon'
import Search from './components/search/Search'
import type { RootState } from './store'

const App: React.FC = () => {
  // basic ui setup
  const currentSearchKey = useSelector((state: RootState) => state.search)
  //const history = useSelector((state: RootState) => state.history.results)
  //const [currentSearchKey, setcurrentSearchKey] = useState('bulbasaur')
  const [value] = useDebounce(currentSearchKey.value, 1000)

  return (
    <main className="flex min-h-screen w-full flex-col">
      <header className=" w-full  bg-gray-100 p-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-md t">My Pokedex</h1>
          <Search />
        </div>
      </header>
      {currentSearchKey.value ? (
        <div className="mx-auto flex w-3/4 flex-col gap-y-4 py-2">
          <div className="text-left">
            <h2>Current Search Key: {value}</h2>
            <h3>Search Results:</h3>
          </div>
          <Pokemon />
        </div>
      ) : (
        <div className="mx-auto flex w-3/4 flex-col gap-y-4 py-2">
          Please use the search bar to search for a pokemon
        </div>
      )}
    </main>
  )
}

export default App
