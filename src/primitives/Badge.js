import React from 'react'
import styled from 'styled-components'
import {} from 'styled-system'

import { Box, Flex } from './'
import theme from '../styles/theme'

const Badge = styled(Flex)`
  height: 40px;
  line-height: 40px;
  // position: absolute;
  // top: -20px;
  background-color: rgb(23, 23, 25);
  padding: 0 4px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  // z-index: 2;
`

Badge.displayName = 'Badge'
Badge.defaultProps = {
  alignItems: 'center',
}

const LeftTriangle = styled.div`
  // position: absolute;
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  top: 0;
  left: -20px;
  border-right: 20px solid rgb(23, 23, 25);
`

const RightTriangle = styled.div`
  // position: absolute;
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  top: 0;
  right: -20px;
  border-left: 20px solid rgb(23, 23, 25);
`

export default ({ children, ...p }) => {
  return (
    <Flex position="relative">
      <LeftTriangle />
      <Badge {...p}>{children}</Badge>
      <RightTriangle />
    </Flex>
  )
}
