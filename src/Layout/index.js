import React, { useEffect, useState } from 'react'

import Header from './Header'
// import Footer from './components/Footer'
import Sidenav from './Sidenav'
import Chat from './Chat'

import { Box, Flex, Page } from '../primitives'
import Pages from '../pages'
import Assets from '../components/Assets'

const Layout = ({ children }) => {
  // const links = Object.keys(Pages).reduce((memo, k) => {
  //   if (k === "NotFound") return memo;
  //   memo.push({ label: k, href: `/${k.toLowerCase()}` });
  //   return memo;
  // }, []);

  return (
    <Box
      width={1}
      height={'100vh'}
      style={{
        overflow: 'hidden',
      }}
    >
      <Header />

      <Flex height={'calc(100% - 64px)'} width={1}>
        <Sidenav />
        <Chat />
        <Page as={Assets.Background}>{children}</Page>
      </Flex>
      {/* <Footer /> */}
    </Box>
  )
}

export default Layout
