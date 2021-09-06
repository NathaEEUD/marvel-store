import { customApi } from '@services/api'
import axios from 'axios'
import { useQuery } from 'react-query'

import { ICharacterResponse, IQueryParams } from './types'

export const characterKeys = {
  all: ['characters'] as const,
  lists: () => [...characterKeys.all, 'list'] as const,
  detail: (id: string) => [...characterKeys.all, id] as const
}

export const fetchCharacters = async (
  apiUrl: string,
  params: IQueryParams
): Promise<any> => {
  const response = await axios.get(apiUrl, { params })

  return response.data
}

export const useGetCharacter = (queryParams: IQueryParams) => {
  const apiUrl = customApi.characters
  const apiParams: IQueryParams = {
    nameStartsWith: queryParams.nameStartsWith
  }

  return useQuery<ICharacterResponse>(
    characterKeys.detail(apiParams.nameStartsWith),
    () => fetchCharacters(apiUrl, apiParams),
    {
      retry: 1,
      staleTime: 3600000,
      refetchOnWindowFocus: false
    }
  )
}
