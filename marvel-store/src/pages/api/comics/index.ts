import type { NextApiRequest, NextApiResponse } from 'next'

import { marvelApi, marvelApiLimit, serverSideConfig } from '@services/api'

const allComics = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('API allComics req.query ::: ', req.query)

  const { titleStartsWith, page } = req.query
  const MARVEL_COMICS_URL = `${process.env.NEXT_PUBLIC_MARVEL_API_URL}/comics`

  const serverSideParams = serverSideConfig()

  try {
    const response = await marvelApi.get(MARVEL_COMICS_URL, {
      params: {
        ...serverSideParams.params,
        orderBy: '-modified',
        titleStartsWith,
        offset: marvelApiLimit * +page || 0
      }
    })

    res.status(200).send(response.data)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export default allComics
