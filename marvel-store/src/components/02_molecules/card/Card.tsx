import { AspectRatio, Heading, Image, Text, VStack } from '@chakra-ui/react'
import { IComicResult } from '@features/comic'
import React from 'react'
import NextLink from 'next/link'

type Props = IComicResult

export const Card: React.FC<Props> = ({ id, title, thumbnail, price }) => {
  return (
    <NextLink passHref href={`/${id}`}>
      <VStack cursor="pointer" spacing={6} w="100%">
        <AspectRatio
          boxShadow="0 26px 24px rgb(0 0 0 / 40%)"
          ratio={2 / 3}
          w="100%"
        >
          <Image
            alt={title}
            src={`${thumbnail.path}.${thumbnail.extension}`}
            w="100%"
          />
        </AspectRatio>
        <VStack
          alignItems="flex-start"
          h="100%"
          justifyContent="space-between"
          spacing={2}
          w="100%"
        >
          <Heading as="h3" size="md">
            {title}
          </Heading>

          <Text fontSize="sm">{price} USD</Text>
        </VStack>
      </VStack>
    </NextLink>
  )
}
