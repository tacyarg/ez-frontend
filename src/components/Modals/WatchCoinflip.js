import React, { useState, useEffect } from 'react'
import { Flex, Box, Text, Avatar, Spinner, Divider } from '../../primitives'
import WiredModal from './Modal'
import utils from '../../libs/utils'
import CoinSide from "../Coinflip/CoinSide";
import CoinEngine from '../Coinflip/CoinEngine'

import styled from 'styled-components'
import Utils from '../Utils';

const Triangle = styled(Box)`
  // position: absolute;
  width: 0;
  height: 0;
  border-top: 40px solid transparent;
  border-bottom: 40px solid transparent;
  top: 0;
  background-color: red;
`


const PlayerAvatar = ({ src, size = [64, 128], selection = 'tails' }) => {
  // console.log('PlayerAvatar', src)
  return src ?
    <Avatar m={4} src={src} size={size} position='relative'>
      <CoinSide size={[32, 64]} position="absolute" selection={selection} />
    </Avatar> :
    <CoinSide m={4} size={size} selection={selection} />
}

const CoinflipPlayer = ({ player = {}, bet = {} }) => {
  const [cache, setCache] = useState(bet.items)
  return <Flex flexDirection="column" alignItems="center">
    <PlayerAvatar src={player.avatar} />
    <Text fontSize={6} m={2}>{player.username || 'Waiting...'}</Text>
    <Divider />
    <Utils.ItemList
      items={cache}
    // onChange={({ selectedItems, selectedValue }) => {
    //   setSelectedItems(selectedItems)
    //   setAmount(selectedValue)
    // }}
    />
  </Flex>
}

const ModalValue = ({ label = 'value', value = 0, ...p }) => {
  return <Flex alignItems="center">
    <Text fontSize={4}>{label}:</Text>
    <Box mx={1} />
    <Text fontSize={5} color='subtext' {...p}>
      {value}
    </Text>
  </Flex>
}

const WatchCoinflip = ({
  coinflip = {},
  isOpen = x => x,
  onClose = x => x,
  onConfirm = x => x,
}) => {

  const {
    Player1 = {},
    Player1Bet,
    Player2 = {},
    Player2Bet,
    selection,
    time,
    gameWinner,
    items,
    id,
    state,
    value,
    config,
    winner,
    selections
  } = utils.parseCoinflip(coinflip)

  // const Player2Selection = selections.find(s => s !== Player1Bet.selection)

  return (
    <WiredModal
      isOpen={isOpen}
      onConfirm={onConfirm}
      onClose={onClose}
      title={
        <Box>
          <ModalValue label="Coinflip ID" value={coinflip.id} />
          <ModalValue label="Value" color="green" value={coinflip.value} />
          <ModalValue label="State" value={coinflip.state} />
        </Box>
      }
    >
      <Flex width={[1, 2 / 3]}>
        <CoinflipPlayer player={Player1} bet={Player1Bet} />
        <Box mx="auto">
          <CoinEngine />
        </Box>
        <CoinflipPlayer player={Player2} bet={Player2Bet} />
      </Flex>
    </WiredModal>
  )
}

export default WatchCoinflip
