import React from 'react'

import styled from 'styled-components'
import {
  width,
  height,
  backgroundPosition,
  backgroundImage,
  backgroundSize,
  background,
} from 'styled-system'

import {Box, Flex} from '.'

const type = props => {
  switch (props.type) {
    case 'steam':
      return `
        filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5)) saturate(123%) contrast(110%);
      `
    // case 'avatar':
    //   return `
    //    border-radius={theme.radii.circle}
    //   `
    default:
      return `
      `
  }
}

const Styled = styled(Box)`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  ${backgroundPosition}
  ${backgroundImage}
  ${backgroundSize}
  ${type}
  ${height}
  ${width}
`

const Image = ({ children, ...props }) => (
  <Styled {...props} backgroundImage={`url(${props.src})`}>
    {children}
  </Styled>
)

Image.Item = ({ children, ...props }) => (
  <Box {...props} position="relative">
    <Styled height={'60%'} backgroundImage={`url(${props.src})`} style={{
      position: 'absolute',
      // top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1
    }}/>
      <Flex flexDirection="column" style={{zIndex: 2, height:"100%", width:"100%"}}>{children}</Flex>
  </Box>
)

Image.displayName = 'Image'

Image.defaultProps = {
  // borderRadius: "normal"
}

export default Image
