import React from 'react'
import { Flex } from '../../primitives'
import Cards from '../Cards'
import Wiring from '../../libs/wiring'

const Bets = ({ players = [], bets = [] }) => {
  return (
    <Flex
      width={1}
      flexWrap="wrap"
      // justifyContent={'space-between'}
      flexDirection={['column', 'row']}
      justifyContent="center"
    >
      {bets.map((b, index) => {
        b.user = players.find(u => u.id === b.userid)
        return <Cards.JackpotBet key={b.id} index={index} bet={b} m={2} />
      })}
    </Flex>
  )
}

Bets.CurrentJackpotRound = Wiring.connectMemo(Bets, p => {
  return {
    players: p.jackpot.players,
    bets: p.jackpot.bets,
  }
})

export default Bets
