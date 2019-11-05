import React from 'react'
import { Divider, Button, Text, Box, Flex } from '../primitives'
import Wiring from '../libs/wiring'
import utils from '../libs/utils'

const Badge = ({ value, color = 'red', money }) => {
  return (
    <Box
      p={2}
      bg={color}
      borderRadius="normal"
      style={{
        boxShadow: '1px 2px 1px rgba(0, 0, 0, 0.25)',
        color: money ? '#e2c957' : null,
      }}
    >
      {money && '$'}
      {utils.parseValue(value)}
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
  ({ label = 'Jackpot', jackpot, onClick }) => {
    return (
      <NavBtn onClick={onClick}>
        <Text fontSize={5}>{label}</Text>
        <Box mx={1} />
        <Badge value={jackpot.value} />
      </NavBtn>
    )
  },
  p => {
    return {
      label: p.label,
      onClick: p.onClick,
      jackpot: p.jackpot,
    }
  }
)

const CoinflipBtn = Wiring.connectMemo(
  ({ value = 0, onClick }) => {
    return (
      <NavBtn onClick={onClick}>
        <Text fontSize={5}>Coinflip</Text>
        <Box mx={1} />
        <Badge value={value} />
      </NavBtn>
    )
  },
  p => {
    // console.log(p)
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
    <Flex
      borderBottom="2px solid #e94c4c"
      // flexWrap="wrap"
      flexDirection={['column', 'row']}
    >
      <JackpotBtn
        onClick={e => {
          history.push('/jackpot')
        }}
      />
      {/* <JackpotBtn
        label="10 Max"
        onClick={e => {
          history.push('/jackpot10max')
        }}
      /> */}
      <CoinflipBtn
        onClick={e => {
          history.push('/coinflip')
        }}
      />
    </Flex>
  )
}
