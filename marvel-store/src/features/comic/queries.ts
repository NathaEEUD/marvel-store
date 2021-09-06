import { customApi } from '@services/api'
import axios from 'axios'
import { useQuery } from 'react-query'

import { IComicsResponse, IQueryParams } from './types'

export const comicKeys = {
  all: ['comics'] as const,
  lists: () => [...comicKeys.all, 'list'] as const,
  list: (filters: IQueryParams) => [...comicKeys.lists(), filters] as const,
  detail: (id: string) => [...comicKeys.all, id] as const
}

export const fetchComics = async (
  apiUrl: string,
  params: IQueryParams
): Promise<any> => {
  const response = await axios.get(apiUrl, { params })

  return response.data
}

export const useGetComics = (queryParams: IQueryParams) => {
  const apiUrl = customApi.comics
  const apiParams: IQueryParams = {
    page: queryParams.page,
    titleStartsWith: queryParams.titleStartsWith,
    characterId: queryParams.characterId
  }

  return useQuery<IComicsResponse>(
    comicKeys.list(apiParams),
    () => fetchComics(apiUrl, apiParams),
    {
      retry: 1,
      staleTime: 3600000,
      refetchOnWindowFocus: false
    }
  )
}

export const defaultQueryFn = async () => {
  const apiUrl = customApi.comics
  const apiParams: IQueryParams = {
    page: 0,
    titleStartsWith: '',
    characterId: 0
  }

  const response = await fetchComics(apiUrl, apiParams)

  return response
}
