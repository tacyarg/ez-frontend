import React, { useEffect, useState } from 'react'

import Header from './Header'
import Sidenav from './Sidenav'
import Chat from '../components/Chat'
// import Footer from './components/Footer'

import { Box, Flex, Page } from '../primitives'
import Assets from '../components/Assets'

const Layout = ({ children, ...p }) => {
  return (
    <Box
      width={1}
      height={'100vh'}
      style={{
        overflow: 'hidden',
      }}
    >
      <Header {...p} />
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
