import React, { useEffect, useState } from 'react'
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

import { GameNav, Modals, Utils, Assets} from '../components'

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
      // flexDirection={['column', 'row']}
      // flexWrap="wrap"
      borderRadius="normal"
      width={[1, 'auto']}
      // flex={[1,0]}
      mx={[1, 2]}
      p={[1, 2]}
      alignItems="center"
      style={{
        border: '1px solid #58585c',
      }}
      bg="#434349"
    >
      <Text letterSpacing="slight" px={2}>
        {label.toUpperCase()}
      </Text>
      <Box mx={['auto', 3]} my={[1, 0]} />
      <Badge value={value} color={color} money={money} />
    </Flex>
  )
}

const CoinflipListing = ({
  idx = 0,
  players = [],
  items = [],
  state = 'open',
  value = 4.2,
  winner,
}) => {
  return (
    <Flex
      p={2}
      alignItems="center"
      justifyContent="center"
      flexDirection={['column', 'row']}
      bg={Utils.isOdd(idx) ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.1)'}
    >
      <Flex alignItems="center" width={[1, 1 / 5]}>
        <Avatar src={players[0].image} size={[32, 64]} />
        {players[1] && (
          <>
            <Text mx={2}>VS</Text>
            <Avatar src={players[1].image} size={[40, 64]} />
          </>
        )}
      </Flex>
      <Flex alignItems="center" width={[1, 1 / 3]}>
        {items.map((p, k) => {
          if (k > 3) return
          return (
            <Image
              key={p.id}
              src={p.image}
              alt={p.name}
              size={[40, 64]}
              p={2}
            />
          )
        })}
        {items.length > 3 && (
          <Flex ml={1} p={2} flexDirection="column" alignItems="center">
            <Text fontSize={3} color="subtext">{`+${items.length - 4}`}</Text>
            <Text fontSize={1} color="subtext" opacity={0.5}>
              more
            </Text>
          </Flex>
        )}
      </Flex>
      <Text fontSize={4} color="subtext" p={[1, 0]} width={[1, 1 / 6]}>
        {state}
      </Text>
      <Text fontSize={4} color={'red'} p={[2, 0]} width={[1, 1 / 6]}>
        ${Utils.parseValue(value)}
      </Text>
      <Flex width={[1, 1 / 5]}>
        <Button type="primary">Join</Button>
        <Box mx={2} />
        <Button type="simple">Watch</Button>
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

  const [isOpen, setOpen] = useState(false)

  function toggleModal() {
    setOpen(!isOpen)
  }

  return (
    <>
      <Modals.CreateCoinflip
        isOpen={isOpen}
        onClose={e => toggleModal()}
        onConfirm={e => toggleModal()}
      />
      <Box height={'100%'}>
        <GameNav {...p} />
        <Utils.TitleBar flexDirection={['column', 'row']}>
          <Flex flexWrap="wrap">
            {stats.map(s => {
              return <Stat {...s} />
            })}
          </Flex>
          <Box mx={[0, 'auto']} />
          <Button
            mt={[3, 0]}
            as={Flex}
            alignItems="center"
            type="primary"
            onClick={e => toggleModal()}
          >
            <Assets.Icons.Coins size={20} mr={2} bg="yellow" /> Create Coinflip
          </Button>
        </Utils.TitleBar>
        <Flex
          // flexWrap="wrap"
          justifyContent="center"
          bg="backingLight"
          p={[2, 3]}
          alignItems="center"
          borderBottom="3px solid #42b142"
          flexDirection={['column', 'row']}
        >
          <Text width={[1, 1 / 5]}>Players</Text>
          <Text width={[1, 1 / 3]}>Items</Text>
          <Text width={[1, 1 / 7]}>Status</Text>
          <Text width={[1, 1 / 7]}>Total</Text>
          <Text width={[1, 1 / 5]}>Actions</Text>
        </Flex>
        {coinflips.map((cf, idx) => {
          return <CoinflipListing {...cf} key={cf.id} idx={idx} />
        })}
      </Box>
    </>
  )
}
