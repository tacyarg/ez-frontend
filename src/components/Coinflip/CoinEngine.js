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
`

export default p => {

  const [frame, setFrame] = useState(0)

  var fps = 15;
  var window = 400
  function draw() {
    setTimeout(function () {
      console.log('DRAW FRAME', fps)
      requestAnimationFrame(draw);
      // Drawing code goes here
      setFrame(fps + window) // camera position
    }, 1000 / fps);
  }

  useEffect(() => draw(), [])

  useEffect(() => {
    console.log('Frame', frame)
  }, [frame])

  return <Box position="relative" {...p}>
    <Image
      position="absolute"
      overflow="hidden"
      height={400}
      src={coinflips.BlueBlue}
      backgroundPosition={`-${frame}px`}
    />
  </Box>
}
