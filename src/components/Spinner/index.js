import React, { useState, useEffect } from 'react'
import { Box } from '../../primitives'

import Spinner from './Spinner'
import RoundInfo from './RoundInfo'
import Timer from './Timer'
import Bets from './Bets'
import BetItems from './BetItems'
import Provable from './Provable'

const SpinnerDefault = React.memo(({ game = {}, ...p }) => {
  return (
    <Box {...p}>
      <BetItems {...game} />
      <Box position="relative" my={4} zIndex={1}>
        <RoundInfo {...game} />
        <Spinner {...game} />
        <Timer timeleft={game.timeleft / 100} />
      </Box>
      <Bets {...game} />
      <Provable gameid={game.id} state={game.state} />
    </Box>
  )
}, (oldState, newState) => {
  return oldState.game.updated === newState.game.updated
})

SpinnerDefault.CurrentJackpotRound = p => {
  return (
    <Box {...p}>
      <BetItems.CurrentJackpotRound />
      <Box position="relative" my={4} zIndex={1}>
        <RoundInfo.CurrentJackpotRound />
        <Spinner.CurrentJackpotRound />
        <Timer.CurrentJackpotRound />
      </Box>
      <Bets.CurrentJackpotRound />
      <Provable.CurrentJackpotRound />
    </Box>
  )
}

export default SpinnerDefault
