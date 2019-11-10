import React, { useState, useEffect } from 'react'
import { Box, Flex, Text } from '../../primitives'
import Wiring from '../../libs/wiring'

const Provable = ({ gameid, state }) => {
  return (
    <Flex width={1} justifyContent="center">
      <Text color="subtext" py={4} fontSize={2}>
        {gameid} | {state}
      </Text>
    </Flex>
  )
}

Provable.CurrentJackpotRound = Wiring.connectMemo(Provable, ({ jackpot }) => {
  const { id, state } = jackpot
  return {
    gameid: id,
    state,
  }
})

export default Provable
