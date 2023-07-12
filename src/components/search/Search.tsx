import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { useDispatch } from 'react-redux'

import { currentSearch } from './searchSlice'

function Search() {
  const dispatch = useDispatch()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(currentSearch(e.target.value))
  }
  return (
    <div className="relative pt-2 text-gray-600">
      <input
        className="h-10 rounded-lg border-2 border-gray-300 bg-white px-5 pr-16 text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Search"
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={() => {}}
        className="absolute right-0 top-0 mr-4 mt-5"
      >
        <HiOutlineSearch />
      </button>
    </div>
  )
}

export default Search
