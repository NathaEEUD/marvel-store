export interface IQueryParams {
  orderBy?: string
  offset?: number
  titleStartsWith: string
  page: number
}

export interface IComicsResponse {
  count: number
  total_pages: number
  results: readonly IComicResult[]
}

export interface IComicResult {
  id: number
  title: string
  price: number
  thumbnail: { path: string; extension: string }
  prices?: { type: string; price: number }[]
}
