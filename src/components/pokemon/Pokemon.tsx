import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import type { PokemonDetailData } from '../../services/pokemon'
import { useGetPokemonCustomQuery } from '../../services/pokemon'
import type { RootState } from '../../store'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'

import { addToHistoryList } from '../history/historySlice'

type pokemonProps = {
  pokemon: PokemonDetailData
}

const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
})

export const PokemonDetail = ({ pokemon }: pokemonProps) => {
  // moves array can be a lot, so for now I am just displaying the first 10
  // ideally we could have it if they clicked show more then it would show the next 10 etc
  // I am running out of my time limit of a few hours though
  const trimmedMoveArray =
    pokemon.moves.length > 9 ? pokemon.moves.slice(0, 9) : pokemon.moves

  return (
    <div className="flex flex-1 flex-col rounded-lg border bg-slate-50 px-5 py-4 ">
      <h3 className="mb-4 border-b bg-slate-100 p-5 text-xl font-bold">
        More Details for {pokemon.name}
      </h3>
      <div className="flex flex-row gap-x-4 text-slate-700">
        <span className="text-md font-semibold">Abilities:</span>
        {pokemon.abilities.length > 0 &&
          pokemon.abilities.map(({ ability, is_hidden }) => {
            if (!is_hidden) {
              return <div key={ability.name}>{ability.name}</div>
            } else {
              return null
            }
          })}
      </div>
      <div className="flex flex-row gap-x-4 text-slate-700">
        <span className="text-md font-semibold">Moves:</span>
        <div className="flex flex-wrap gap-x-4">
          {trimmedMoveArray.length > 0 &&
            trimmedMoveArray.map(({ move }) => {
              return <div key={move.name}>{move.name}</div>
            })}
        </div>
      </div>
      <div className="flex flex-row gap-x-4 text-slate-700">
        <span className="text-md font-semibold">Species:</span>
        {pokemon.species && <div>{pokemon.species.name}</div>}
      </div>
      <div className="flex flex-row gap-x-4 text-slate-700">
        <span className="text-md font-semibold">Evolutions:</span>
        {pokemon.evolutions.length > 0 &&
          formatter.format(pokemon.evolutions.map((item) => item))}
      </div>
    </div>
  )
}

export default function Pokemon() {
  const [showDetail, setShowDetail] = useState(false)
  const dispatch = useDispatch()
  const currentSearchKey = useSelector((state: RootState) => state.search)
  const { data, error, isUninitialized, isLoading } = useGetPokemonCustomQuery(
    {
      name: currentSearchKey.value,
    },
    { skip: !currentSearchKey.value }
  )
  if (isLoading || isUninitialized) {
    return <p>loading, please wait</p>
  }

  if (error) {
    return <p>something went wrong</p>
  }

  const handleShowDetails = () => {
    setShowDetail(!showDetail)
  }

  if (data) {
    // set the dispatch to add to the history slice
    dispatch(addToHistoryList(data))
  }

  return (
    <div className="flex flex-row gap-x-4">
      <Card>
        <CardHeader>
          <CardTitle>{data.name}</CardTitle>
          <CardDescription>
            types: {formatter.format(data.types.map((item) => item.type.name))}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <img src={data.sprites.front_default} alt={data.name} />
        </CardContent>
        <CardFooter>
          <button
            type="button"
            className="text-blue-900 underline underline-offset-4"
            onClick={handleShowDetails}
          >
            Click here for more details
          </button>
        </CardFooter>
      </Card>

      {showDetail && <PokemonDetail pokemon={data} />}
    </div>
  )
}
