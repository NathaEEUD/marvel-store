import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import theme from '@foundations/theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ComicsProvider } from '@features/comic'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ComicsProvider>
          <Component {...pageProps} />
        </ComicsProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
