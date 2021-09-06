export interface IQueryParams {
  orderBy?: string
  nameStartsWith: string
}

export type ICharacterResponse = ICharacterResult

export interface ICharacterResult {
  id: number
  name: string
  description: string
  thumbnail: { path: string; extension: string }
}
