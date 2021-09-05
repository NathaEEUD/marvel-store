import axios from 'axios'
import md5 from 'md5'

const marvelPublicKey = process.env.NEXT_PUBLIC_MARVEL_API_KEY
const marvelPrivateKey = process.env.PRIVATE_MARVEL_API_KEY

export const marvelApiLimit = 10

export const marvelApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MARVEL_API_URL,
  params: {
    apikey: marvelPublicKey,
    limit: marvelApiLimit
  }
})

export function serverSideConfig() {
  const ts = Number(new Date())
  const md5Hash =
    marvelPrivateKey && md5(ts + marvelPrivateKey + marvelPublicKey)

  return {
    params: {
      ts,
      hash: md5Hash,
      offset: 0
    }
  }
}

export const customApi = {
  comics: `${process.env.NEXT_PUBLIC_API_URL}/comics`
}
