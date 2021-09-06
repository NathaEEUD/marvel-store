import type { NextApiRequest, NextApiResponse } from 'next'

import { marvelApi, marvelApiLimit, serverSideConfig } from '@services/api'
import { IComicResult, IComicsResponse, IQueryParams } from '@features/comic'

const allComics = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('API allComics req.query ::: ', req.query)

  const { page, titleStartsWith, characterId } = req.query
  let MARVEL_COMICS_URL = `${process.env.NEXT_PUBLIC_MARVEL_API_URL}/comics`
  let params: Partial<IQueryParams> = {
    orderBy: '-modified',
    offset: marvelApiLimit * +page || 0
  }

  const serverSideParams = serverSideConfig()

  if (+characterId !== 0) {
    MARVEL_COMICS_URL = `${process.env.NEXT_PUBLIC_MARVEL_API_URL}/characters/${characterId}/comics`
  }

  if (titleStartsWith) {
    params = { ...params, titleStartsWith: titleStartsWith.toString() }
  }

  try {
    const response = await marvelApi.get(MARVEL_COMICS_URL, {
      params: {
        ...serverSideParams.params,
        ...params
      }
    })

    const marvelData = response.data.data

    // console.log('API allComics results ::: ', marvelData.results)

    const comicsResults: IComicResult[] = marvelData?.results?.map(
      (result: IComicResult) => {
        const printPrice = result?.prices?.find(
          (item: { type: string; price: number }) => item.type === 'printPrice'
        )

        return {
          id: result?.id || '',
          title: result?.title || '',
          thumbnail: result?.thumbnail || {},
          price: printPrice?.price || 0
        }
      }
    )

    const comicsResponse: IComicsResponse = {
      count: marvelData.total,
      total_pages: Math.ceil(marvelData.total / marvelApiLimit),
      results: comicsResults
    }

    res.status(200).json(comicsResponse)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export default allComics
