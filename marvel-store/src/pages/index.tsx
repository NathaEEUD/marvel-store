import type { GetStaticProps, NextPage } from 'next'

import {
  comicKeys,
  ComicsActionKind,
  IQueryParams,
  useComics,
  useGetComics
} from '@features/comic'
import Head from 'next/head'
import React from 'react'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { defaultQueryFn } from '@features/comic/queries'
import { Card } from '@molecules/card/Card'
import { Container, Grid, Skeleton, VStack } from '@chakra-ui/react'
import { Header } from '@organisms/header/Header'
import { Footer } from '@organisms/footer/Footer'
import { Filter } from '@organisms/filter/Filter'
import { Pagination } from '@organisms/pagination/Pagination'

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  const params: IQueryParams = {
    page: 0,
    titleStartsWith: '',
    characterId: 0
  }

  await queryClient.prefetchQuery(comicKeys.list(params), defaultQueryFn)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

const Home: NextPage = () => {
  const { state, dispatch } = useComics()

  const { data, isLoading } = useGetComics(state)

  const handlePreviousPage = () => {
    const header = document.querySelector('header')

    header?.scrollIntoView({ behavior: 'smooth' })

    if (state.page > 0) {
      dispatch({
        type: ComicsActionKind.UPDATE_PAGE,
        payload: state.page - 1
      })
    }
  }

  const handleNextPage = () => {
    const header = document.querySelector('header')

    header?.scrollIntoView({ behavior: 'smooth' })

    if (data?.total_pages && state.page < data?.total_pages) {
      dispatch({
        type: ComicsActionKind.UPDATE_PAGE,
        payload: state.page + 1
      })
    }
  }

  return (
    <>
      <Head>
        <title>Marvel Store | Home</title>
        <meta content="The awesome Marvel Store" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <Header />

      <Container maxW="container.xl" mb={12} mt={12}>
        <VStack spacing={8}>
          <Filter />

          <Skeleton
            h="100%"
            isLoaded={!isLoading}
            maxH={!isLoading ? '100%' : '100vh'}
            // minH={!isLoading ? '100%' : '100vh'}
            minH="100vh"
            overflow="hidden"
            w="100%"
          >
            <Grid gap={8} templateColumns={`repeat(4, 1fr)`}>
              {data &&
                data?.results.map(comic => <Card key={comic.id} {...comic} />)}
            </Grid>
          </Skeleton>

          <Pagination
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            pageIndex={state.page}
            totalPages={data?.total_pages || 0}
          />
        </VStack>
      </Container>

      <Footer />
    </>
  )
}

export default Home
