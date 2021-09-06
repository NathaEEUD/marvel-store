import { VStack } from '@chakra-ui/react'
import { CharacterFilter } from '@molecules/character-filter/CharacterFilter'
import React from 'react'

export const Filter: React.FC = () => {
  return (
    <VStack spacing={2}>
      <p>Search</p>
      <CharacterFilter />
    </VStack>
  )
}
