import { Button } from '@chakra-ui/react'
import { useGetCharacter } from '@features/character'
import { ComicsActionKind, useComics } from '@features/comic'
import React from 'react'

type Props = {
  name: string
}

export const CharacterLink: React.FC<Props> = ({ name }) => {
  const { state, dispatch } = useComics()

  const { data } = useGetCharacter({
    nameStartsWith: name
  })

  const filterSelected = data?.id == state.characterId

  const handleCharacterFilter = () => {
    dispatch({
      type: ComicsActionKind.UPDATE_CHARACTER_ID,
      payload: filterSelected ? 0 : data?.id
    })
  }

  return (
    <Button
      _disabled={{ opacity: 1 }}
      colorScheme={filterSelected ? 'red' : 'blackAlpha'}
      onClick={handleCharacterFilter}
    >
      {name}
    </Button>
  )
}
