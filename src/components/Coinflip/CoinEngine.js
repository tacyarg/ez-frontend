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
  
  width: 400px;
  height: 300px;
  margin: 2% auto;
  position: absolute;
  left: -97px;
  bottom: -50px;
  background-position: left center;
`

export default p => {
  return <Box position="relative">
    <Animation src={coinflips.BlueBlue} />
  </Box>
}
