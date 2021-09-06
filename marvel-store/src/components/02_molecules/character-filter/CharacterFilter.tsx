import { CharacterLink } from '@atoms/character-link/CharacterLink'
import { HStack } from '@chakra-ui/react'
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
    <HStack w="100%">
      {characterFilters.map(characterFilter => (
        <CharacterLink
          key={characterFilter.nameStartsWith}
          name={characterFilter.nameStartsWith}
        />
      ))}
    </HStack>
  )
}
