import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface PokemonDetailData {
  id: number
  name: string
  height: number
  weight: number
  types: Array<{
    slot: number
    type: {
      name: string
      url: string
    }
  }>
  sprites: {
    front_default: string
  }
  abilities: Array<{
    is_hidden: boolean
    slot: number
    ability: {
      name: string
      url: string
    }
  }>
  moves: Array<{
    move: {
      name: string
      url: string
    }
  }>
  species: {
    name: string
    url: string
  }
  evolutions: string[]
}

interface PokemonEvolutionData {
  id: number
  baby_trigger_item: string
  chain: {
    is_baby: boolean
    species: {
      name: string
      url: string
    }
    evolution_details: string
    evolves_to: [
      {
        is_baby: boolean
        species: {
          name: string
          url: string
        }
        evolution_details: [
          {
            item: null
            trigger: {
              name: string
              url: string
            }
            gender: null
            held_item: null
            known_move: null
            known_move_type: null
            location: null
            min_level: 20
            min_happiness: null
            min_beauty: null
            min_affection: null
            needs_overworld_rain: boolean
            party_species: null
            party_type: null
            relative_physical_stats: null
            time_of_day: string
            trade_species: null
            turn_upside_down: boolean
          }
        ]
        evolves_to: []
      }
    ]
  }
}
// @TODO: add fallbacks and catches as this is very fragile and not really ideal
const transformEvolutionsData = ({ species, evolves_to }: any) => {
  let result: string[] = []
  if (species) {
    result.push(species.name)
  }
  if (evolves_to.length > 0) {
    result = result.concat(transformEvolutionsData(evolves_to[0]))
  }
  return result
}

export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<PokemonDetailData, { name: string }>({
      query: ({ name }) => `pokemon/${name}`,
    }),
    getPokemonCustom: builder.query({
      async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
        // get a pokemon
        const pokemonResult = await fetchWithBQ(`pokemon/${arg.name}`)
        if (pokemonResult.error)
          return { error: pokemonResult.error as FetchBaseQueryError }
        const pokemon = pokemonResult.data as PokemonDetailData
        // fetch the evolutions => technically this could be a different step
        // as we dont always need to fetch the full data up front
        // the evolutions seem to be off for some
        const { data: evoData, error } = await fetchWithBQ(
          `evolution-chain/${pokemon.id}/`
        )

        // need to transform the data from the evolutions
        // just returns an array of the names of the evolutions
        const transformedData =
          evoData && (evoData as PokemonEvolutionData).chain
            ? transformEvolutionsData((evoData as PokemonEvolutionData).chain)
            : []

        pokemon.evolutions = transformedData
        return evoData
          ? { data: pokemon as PokemonDetailData }
          : { error: error as FetchBaseQueryError }
      },
    }),
  }),
})

// Export hooks for usage in functional components
export const { useGetPokemonByNameQuery, useGetPokemonCustomQuery } = pokemonApi
