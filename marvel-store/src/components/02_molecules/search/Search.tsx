import { SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { ComicsActionKind, useComics } from '@features/comic'
import debounce from '@utils/debounce'
import React from 'react'

export const Search: React.FC = () => {
  const { state, dispatch } = useComics()

  const handleSearchFilter = React.useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      if (state.page !== 0) {
        dispatch({
          type: ComicsActionKind.UPDATE_PAGE,
          payload: 0
        })
      }
      dispatch({
        type: ComicsActionKind.UPDATE_COMIC_NAME,
        payload: e.target.value || ''
      })
    }, 500),
    []
  )

  return (
    <InputGroup variant="filled" w="100%">
      <InputLeftElement pointerEvents="none">
        <SearchIcon />
      </InputLeftElement>

      <Input
        borderRadius="lg"
        focusBorderColor="primary"
        placeholder="Search comic..."
        onChange={handleSearchFilter}
      />
    </InputGroup>
  )
}
