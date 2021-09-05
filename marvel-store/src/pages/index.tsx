import type { GetStaticProps, NextPage } from 'next'

import { comicKeys, IQueryParams, useGetComics } from '@features/comic'
import Head from 'next/head'
import React from 'react'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { defaultQueryFn } from '@features/comic/queries'
import { Card } from '@molecules/card/Card'
import { Container, Grid } from '@chakra-ui/react'
import { Header } from '@organisms/header/Header'
import { Footer } from '@organisms/footer/Footer'

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  const params: IQueryParams = {
    titleStartsWith: '',
    page: 0
  }

  await queryClient.prefetchQuery(comicKeys.list(params), defaultQueryFn)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

const Home: NextPage = () => {
  const queryParams: IQueryParams = {
    titleStartsWith: '',
    page: 0
  }

  const { data } = useGetComics(queryParams)

  return (
    <>
      <Head>
        <title>Marvel Store | Home</title>
        <meta content="The awesome Marvel Store" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <Header />

      <Container maxW="container.xl" mb={12} mt={12}>
        <Grid gap={8} templateColumns={`repeat(4, 1fr)`}>
          {data &&
            data?.results.map(comic => <Card key={comic.id} {...comic} />)}
        </Grid>
      </Container>

      <Footer />
    </>
  )
}

export default Home
