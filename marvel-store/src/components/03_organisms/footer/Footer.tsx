import { Center, chakra } from '@chakra-ui/react'
import React from 'react'

export const Footer: React.FC = () => {
  return (
    <Center
      as="footer"
      bgGradient="linear(to-t, blackAlpha.900, blackAlpha.500)"
      bottom="0"
      color="tertiary"
      h="42px"
      p={2}
      position="fixed"
      w="100%"
    >
      <chakra.a
        fontSize={{ base: 'xs', md: 'md' }}
        href="http://marvel.com\"
        opacity="0.7"
        textAlign="center"
        textDecoration="underline"
      >
        Data provided by Marvel. © 2021 MARVEL
      </chakra.a>
    </Center>
  )
}
