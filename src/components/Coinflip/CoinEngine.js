import React, { useEffect, useState } from "react";
import {
  Box, Flex, Text, Image, Avatar
} from "../../primitives";
import styled from 'styled-components'

import CoinSide from './CoinSide';
import ctCoin from '../../assets/images/ctfliplogo.png'
import tCoin from '../../assets/images/tfliplogo.png'
import coinflips from '../../assets/images/coinflips/*.png'

const Animation = styled(Image)`
  -webkit-animation: play 4.4s steps(217) forwards;
  -moz-animation: play 4.4s steps(217) forwards;
  -ms-animation: play 4.4s steps(217) forwards;
  -o-animation: play 4.4s steps(217) forwards;
  animation: play 4.4s steps(217) forwards;

  @-webkit-keyframes play {
    100% { background-position: -86800px; }
  }
  @-moz-keyframes play {
    100% { background-position: -86800px; }
  }
  @-ms-keyframes play {
    100% { background-position: -86800px; }
  }
  @-o-keyframes play {
    100% { background-position: -86800px; }
  }
  @keyframes play {
    100% { background-position: -86800px; }
  }

  background-size: auto;
  background-position: left center;
`

const redAnimations = [coinflips.BlueRed, coinflips.RedRed]
const blueAnimations = [coinflips.RedBlue, coinflips.BlueBlue]


const PickAnimiation = (selection, outcome = 0) => {
  // outcome should be 0 or 1
  const index = outcome >= 0.5 ? 1 : 0
  return selection === 'heads' ?
    redAnimations[index] : blueAnimations[index]
}

export default React.memo(({ selection, outcome }) => {
  return <Flex position="relative" justifyContent="center" alignItems="center">
    <Box
      width={'400px'}
      position="absolute"
      overflow="hidden"
      m={2}
    >
      <Animation
        height={['200px', '400px']}
        src={PickAnimiation(selection, outcome)}
      // backgroundPosition={`-${frame}px`}
      />

    </Box>
  </Flex>
})
