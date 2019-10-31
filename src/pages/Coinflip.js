import React from 'react'
import {
  Image,
  Button,
  Box,
  Card,
  Text,
  Flex,
  Page,
  Avatar,
} from '../primitives'
import FakeCoinflips from '../libs/fake/coinflips'

import Table from '../components/Table'

const Badge = ({ value, color, money }) => {
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
      {Number(value).toLocaleString(undefined, {
        minimumFractionDigits: money ? 2 : 0,
        maximumFractionDigits: 2,
      })}
    </Box>
  )
}

const Stat = ({ label = 'Label', value = 0, money, color }) => {
  return (
    <Flex
      borderRadius="normal"
      flex={1}
      mx={[0, 4]}
      alignItems="center"
      p={2}
      style={{
        border: '1px solid #58585c',
      }}
      bg="#434349"
    >
      <Text letterSpacing="slight" px={2}>
        {label.toUpperCase()}
      </Text>
      <Box mx="auto" />
      <Badge value={value} color={color} money={money} />
    </Flex>
  )
}

const CoinflipListing = ({
  players = [],
  items = [],
  state = 'open',
  value = 4.2,
  winner,
}) => {
  return (
    <Flex justifyContent="space-evenly" p={2} alignItems="center">
      <Flex alignItems="center">
        <Avatar src={players[0].image} size={64} />
        {players[1] && (
          <>
            <Text mx={2}>VS</Text>
            <Avatar src={players[1].image} size={64} />
          </>
        )}
      </Flex>
      <Flex alignItems="center">
        {items.map((p, k) => {
          if (k > 5) return
          return <Image key={p.id} src={p.image} alt={p.name} size={64} p={2} />
        })}
        {items.length > 5 && (
          <Text fontSize={4} color="subtext">{`+ ${items.length} more`}</Text>
        )}
      </Flex>
      <Text fontSize={4} color="subtext">
        {state}
      </Text>
      <Text fontSize={4} color="subtext">
        $
        {Number(value).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Text>
      <Flex>
        <Button type="primary">Join</Button>
        <Box mx={2} />
        <Button>Watch</Button>
      </Flex>
    </Flex>
  )
}

export default p => {
  const stats = [
    {
      label: 'Total Value',
      value: 1199.49,
      money: true,
      color: '#58585c',
    },
    {
      label: 'Total Items',
      value: 102,
      color: 'blue',
    },
    {
      label: 'Total Players',
      value: 43,
      color: 'red',
    },
  ]

  const coinflips = FakeCoinflips()

  return (
    <Box bg="backingLight" height={'100%'}>
      <Flex
        flexWrap="wrap"
        bg="backingLight"
        p={3}
        alignItems="center"
        borderBottom="3px solid green"
      >
        {stats.map(s => {
          return <Stat {...s} />
        })}
        <Button px={4} py={3} type="primary">
          Create Coinflip
        </Button>
      </Flex>
      {coinflips.map(cf => {
        return <CoinflipListing {...cf} key={cf.id} />
      })}
    </Box>
  )
}
