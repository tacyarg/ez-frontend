import React, { useState, useEffect } from 'react'
import { Badge, Box, Flex, Text } from '../../primitives'
import Wiring from '../../libs/wiring'

import Utils from '../Utils'
import Assets from '../Assets'

const RoundInfo = ({
  value = 5.43,
  items = [],
  config = {},
  state = 'open',
  winner,
}) => {
  return (
    <Flex position="absolute" width={1} top={-20} zIndex={2}>
      <Badge>
        <Assets.Icons.Coins size={20} bg="yellow" /> <Box mx={1} />
        {Utils.parseValue(value)}
      </Badge>
      <Text color="subtext" mx="auto">
        {winner ? winner.username : state}
      </Text>
      <Badge>
        <Assets.Icons.Gun bg="yellow" />({items.length}/
        {config.roundItemLimit || 100})
      </Badge>
    </Flex>
  )
}

RoundInfo.CurrentJackpotRound = Wiring.connectMemo(RoundInfo, ({ jackpot }) => {
  const { value, items, config, state } = jackpot
  return {
    value,
    items,
    config,
    state,
  }
})

export default RoundInfo
