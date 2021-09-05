import type { NextApiRequest, NextApiResponse } from 'next'

import { marvelApi, serverSideConfig } from '@services/api'
import { ICharacterResult, IQueryParams } from '@features/character/types'

const characterInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('API characterInfo req.query ::: ', req.query)

  const { nameStartsWith } = req.query
  const MARVEL_CHARACTERS_URL = `${process.env.NEXT_PUBLIC_MARVEL_API_URL}/characters`
  let params: Partial<IQueryParams> = {
    orderBy: '-modified'
  }

  const serverSideParams = serverSideConfig()

  if (nameStartsWith) {
    params = { ...params, nameStartsWith: nameStartsWith.toString() }

    try {
      const response = await marvelApi.get(MARVEL_CHARACTERS_URL, {
        params: {
          ...serverSideParams.params,
          ...params
        }
      })

      const marvelData = response.data.data

      // console.log('API characterInfo results ::: ', marvelData.results)

      const characterResponse: ICharacterResult = {
        id: marvelData?.results[0].id,
        name: marvelData?.results[0].name,
        description: marvelData?.results[0].description,
        thumbnail: marvelData?.results[0].thumbnail
      }

      res.status(200).json(characterResponse)
    } catch (error) {
      res.status(500).send(error.message)
    }
  } else {
    res.status(500).send('nameStartsWith is required')
  }
}

export default characterInfo
