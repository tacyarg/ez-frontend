import React, { useState, useEffect } from 'react'
import { Flex, Box, Text, Button } from '../../primitives'

import Cards from '../Cards'
import Wiring from '../../libs/wiring'

const BetItems = ({ players = [], items = [] }) => {
  return (
    <Flex
      width={1}
      p={1}
      style={{
        overflowX: 'auto',
      }}
    >
      {items.map(item => {
        // merge the player metadata
        item.user = players.find(u => u.id === item.userid)
        return <Cards.JackpotItem key={item.id} {...item} />
      })}
    </Flex>
  )
}

BetItems.CurrentJackpotRound = Wiring.connectMemo(
  BetItems,
  p => {
    return {
      players: p.jackpot.players,
      items: p.jackpot.items,
    }
  }
)

export default BetItems
