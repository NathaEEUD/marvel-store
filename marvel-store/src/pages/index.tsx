import type { NextPage } from 'next'

import React from 'react'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Marvel Store</title>
        <meta content="The awesome Marvel Store" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <h1>Marvel Store</h1>
    </div>
  )
}

export default Home
