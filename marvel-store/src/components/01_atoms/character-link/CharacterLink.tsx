import { Button } from '@chakra-ui/react'
import { IQueryParams, useGetCharacter } from '@features/character'
import React from 'react'

type Props = {
  name: string
}

export const CharacterLink: React.FC<Props> = ({ name }) => {
  const queryParams: IQueryParams = {
    nameStartsWith: name
  }

  const { data } = useGetCharacter(queryParams)

  return (
    <Button colorScheme="blackAlpha">
      {name} {data?.id}
    </Button>
  )
}
