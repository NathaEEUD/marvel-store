import { AspectRatio, Heading, Text, VStack } from '@chakra-ui/react'
import { IComicResult } from '@features/comic'
import NextImage from 'next/image'
import React from 'react'

type Props = IComicResult

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#202020" offset="20%" />
      <stop stop-color="#EC1D24" offset="50%" />
      <stop stop-color="#202020" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#202020" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export const Card: React.FC<Props> = ({ id, title, thumbnail, price }) => {
  return (
    <VStack spacing={6} w="100%">
      <AspectRatio
        boxShadow="0 26px 24px rgb(0 0 0 / 40%)"
        ratio={2 / 3}
        w="100%"
      >
        <NextImage
          alt={title}
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 475)
          )}`}
          layout="fill"
          placeholder="blur"
          src={`${thumbnail.path}.${thumbnail.extension}`}
        />
      </AspectRatio>
      <VStack
        alignItems="flex-start"
        h="100%"
        justifyContent="space-between"
        spacing={2}
        w="100%"
      >
        <Heading as="h3" fontSize={{ base: 'sm', lg: 'md' }}>
          {title}
        </Heading>

        <Text fontSize="sm">{price} USD</Text>
      </VStack>
    </VStack>
  )
}
