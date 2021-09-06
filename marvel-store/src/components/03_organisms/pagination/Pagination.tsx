import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { HStack, IconButton, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {
  pageIndex: number
  totalPages: number
  handlePreviousPage: () => void
  handleNextPage: () => void
}

export const Pagination: React.FC<Props> = ({
  pageIndex,
  totalPages,
  handlePreviousPage,
  handleNextPage
}) => {
  return (
    <HStack alignItems="center" spacing="2">
      <IconButton
        aria-label="Previous Page"
        disabled={pageIndex === 0}
        icon={<ChevronLeftIcon />}
        onClick={() => handlePreviousPage()}
      />

      <Text>
        Page{' '}
        <Text as="span" fontWeight="bold">
          {pageIndex + 1}
        </Text>{' '}
        of{' '}
        <Text as="span" fontWeight="bold">
          {totalPages}
        </Text>
      </Text>

      <IconButton
        aria-label="Next Page"
        disabled={pageIndex === totalPages - 1}
        icon={<ChevronRightIcon />}
        onClick={() => handleNextPage()}
      />
    </HStack>
  )
}
