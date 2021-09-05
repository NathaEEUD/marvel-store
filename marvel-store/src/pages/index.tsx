import type { GetStaticProps, NextPage } from 'next'

import { comicKeys, IQueryParams, useGetComics } from '@features/comic'
import Head from 'next/head'
import React from 'react'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { defaultQueryFn } from '@features/comic/queries'

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
    <div>
      <Head>
        <title>Marvel Store</title>
        <meta content="The awesome Marvel Store" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <h1>Marvel Store</h1>
      {data && JSON.stringify(data)}
    </div>
  )
}

export default Home
