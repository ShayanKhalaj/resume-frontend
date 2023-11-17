import Head from 'next/head'
import React from 'react'

const Header = (props) => {
  return (
    <Head>
        {props.children}
    </Head>
  )
}

export default Header