import React from 'react'
import { Divider, Button, Text, Box, Flex } from '../primitives'
import Wiring from '../libs/wiring'
import utils from '../libs/utils'

const Badge = ({ children }) => {
  return (
    <Box bg="red" px={2} py={1} borderRadius="normal">
      <Text fontSize={5}>{children}</Text>
    </Box>
  )
}

const NavBtn = ({ children, ...p }) => {
  return (
    <Button
      {...p}
      as={Flex}
      type="simple"
      alignItems="center"
      justifyContent="center"
      p={2}
      flex={1}
      borderBottom="4px solid red"
    >
      {children}
    </Button>
  )
}

const JackpotBtn = Wiring.connectMemo(
  ({ jackpot, onClick }) => {
    return (
      <NavBtn onClick={onClick}>
        <Text fontSize={5}>Jackpot</Text>
        <Box mx={1} />
        <Badge>{utils.parseValue(jackpot.value)}</Badge>
      </NavBtn>
    )
  },
  p => {
    return {
      onClick: p.onClick,
      jackpot: utils.findCurrentRound(p.public.jackpots)
    }
  }
)

const CoinflipBtn = Wiring.connectMemo(
  ({ value = 0, onClick }) => {
    return (
      <NavBtn onClick={onClick}>
        <Text fontSize={5}>Coinflip</Text>
        <Box mx={1} />
        <Badge>{utils.parseValue(value)}</Badge>
      </NavBtn>
    )
  },
  p => {
    console.log(p)
    // get the current round.
    return {
      onClick: p.onClick,
      value: Object.values(p.public.coinflips).reduce((memo, g) => {
        memo += g.value
        return memo
      }, 0),
    }
  }
)

export default ({ location, history }) => {
  // const cPage = location.pathname
  // console.log('CURRENT PAGE', history)

  return (
    <Flex borderBottom="2px solid #e94c4c">
      <JackpotBtn onClick={e => {
        history.push('/jackpot')
      }}/>
      <JackpotBtn onClick={e => {
        history.push('/jackpot10max')
      }}/>
      <CoinflipBtn onClick={e => {
        history.push('/coinflip')
      }}/>
    </Flex>
  )
}
