import React, { useState, useEffect } from 'react'
import { Box } from '../../primitives'

import Spinner from './Spinner'
import RoundInfo from './RoundInfo'
import Timer from './Timer'
import Bets from './Bets'
import BetItems from './BetItems'

const SpinnerDefault = p => {
  return (
    <Box>
      <BetItems />
      <Box position="relative" my={4} zIndex={1}>
        <RoundInfo />
        <Spinner />
        <Timer />
      </Box>
      <Bets />
    </Box>
  )
}

SpinnerDefault.CurrentJackpotRound = p => {
  return (
    <Box>
      <BetItems.CurrentJackpotRound />
      <Box position="relative" my={4} zIndex={1}>
        <RoundInfo.CurrentJackpotRound />
        <Spinner.CurrentJackpotRound />
        <Timer.CurrentJackpotRound />
      </Box>
      <Bets.CurrentJackpotRound />
    </Box>
  )
}

export default SpinnerDefault
