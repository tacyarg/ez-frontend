import React, { useState } from 'react'

import styled from 'styled-components'
// import system from 'styled-system'

import { Flex, Box, Button, Image } from './index'
import Assets from '../components/Assets'

import theme from '../styles/theme'

const Sidebar = styled(Flex)`
  border-right: 2px solid rgba(0, 0, 0, 0.4);
  display: ${p => (p.isOpen ? 'auto' : 'none')};

  @media only screen and (max-width: 600px) {
    display: none;
  }
`

Sidebar.defaultProps = {
  isOpen: true,
  height: '100%',
  flexDirection: 'column',
  boxShadow: '4px 0px 4px -2px rgba(0, 0, 0, 0.2)',
  zIndex: 9001,
  // width: '100%',
  // flex: 1
}

export default Sidebar
