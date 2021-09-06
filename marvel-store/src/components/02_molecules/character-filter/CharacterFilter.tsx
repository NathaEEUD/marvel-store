import { CharacterLink } from '@atoms/character-link/CharacterLink'
import { Wrap, WrapItem } from '@chakra-ui/react'
import { IQueryParams } from '@features/character'
import React from 'react'

export const CharacterFilter: React.FC = () => {
  const characterFilters: IQueryParams[] = [
    {
      nameStartsWith: 'Spider-Man'
    },
    {
      nameStartsWith: 'Wolverine'
    },
    {
      nameStartsWith: 'Hulk'
    },
    {
      nameStartsWith: 'Thor'
    }
  ]

  return (
    <Wrap justify="center" w="100%">
      {characterFilters.map(characterFilter => (
        <WrapItem key={characterFilter.nameStartsWith}>
          <CharacterLink name={characterFilter.nameStartsWith} />
        </WrapItem>
      ))}
    </Wrap>
  )
}
