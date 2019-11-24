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

const CountdownStage = styled('svg')`
  transform: rotateY(-180deg) rotateZ(-90deg);
  // transform: rotateZ(-90deg);
  position: relative;
  height: 400px
  // width: 400px;
  width: 100%;
  // bottom: 100px;
  // right: 100px;
`

const CountdownOutlineCircle = styled('circle')`
  stroke-dasharray: 440px;
  stroke-dashoffset: 0px;
  stroke-width: 25px;
  // stroke: #600F0B;
  fill: none;

  stroke: #41634A;  
`

const CountdownCircle = styled('circle')`
  stroke-dasharray: 440px;
  // stroke-dashoffset: 440px;
  stroke-width: 25px;
  stroke: #A91B0D;
  fill: none;

  stroke: #37ba29;
  stroke-dashoffset: 0px;

  stroke-dashoffset: ${p => Math.floor(p.timeleft)}px;
`


const Countdown = ({ secondsLeft = 0, totalSeconds = 0 }) => {

  let endDashArray = 440;
  // const secondsLeft = timeleft
  // const totalSeconds = config.duration / 1000
  let startingOffset = (1 - (secondsLeft / totalSeconds)) * endDashArray;

  return <Flex position="relative" alignItems="center" justifyContent="center">
    <CountdownStage>
      <CountdownOutlineCircle
        r="70" cx="50%" cy="50%"
      // cx='100'
      // cy='100'
      />
      <CountdownCircle
        r="70" cx="50%" cy="50%"
        // cx='100'
        // cy='100'
        timeleft={startingOffset}
      />
    </CountdownStage>
    <Text position="absolute" color="subtext">
      {secondsLeft > 60 ? `${(secondsLeft / 60).toFixed(2)} min.` : `${Math.floor(secondsLeft)} sec.`}
    </Text>
  </Flex>
}

const PlayerAvatar = ({ src, size = [64, 128], selection = 'tails' }) => {
  // console.log('PlayerAvatar', src)
  return src ?
    <Avatar m={2} src={src} size={size} position='relative'>
      <CoinSide size={[32, 64]} position="absolute" selection={selection} />
    </Avatar> :
    <CoinSide m={2} size={size} selection={selection} />
}

const CoinflipPlayer = ({ player = {}, bet = {}, value = 0, ...p }) => {
  const [cache, setCache] = useState(bet.items)

  const chance = value > 0 ? (bet.value / value) * 100 : 0

  useEffect(() => {
    setCache(bet.items)
  }, [bet.items])

  return <Flex
    flexDirection="column"
    alignItems="center"
    // justifyContent="center"
    {...p}
  >
    <PlayerAvatar src={player.avatar} selection={bet.selection} />
    <Text fontSize={[3, 5]} m={1}>{player.username ? `${player.username} - ${chance.toFixed(2)}%` : 'Waiting...'}</Text>
    <Divider bg="backingLight" m={2} />
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
    <Text fontSize={3}>{label}:</Text>
    <Box mx={1} />
    <Text fontSize={2} color='subtext' {...p}>
      {value}
    </Text>
  </Flex>
}

const CoinAnimation = ({ selection, time = 0, outcome, duration, ...p }) => {
  return <Flex
    {...p}
    mx="auto"
    alignItems="center"
    justifyContent="center"
  >
    {selection && outcome ?
      <CoinEngine
        selection={selection}
        outcome={outcome}
      />
      : <Countdown secondsLeft={time} totalSeconds={duration} />
      // : time > 60 ? <Text color="subtext">Expires in  {Number(time / 60).toFixed(2)} minutes.</Text>
      //   : <Text color="subtext">{Number(time)} seconds.</Text>
    }
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
    bets,
    selection,
    time,
    gameWinner,
    items,
    id,
    state,
    value,
    config,
    winner,
    selections,
    winnerBet,
    provable,
  } = utils.parseCoinflip(coinflip)

  const isState = (s) => {
    return Boolean(state === s)
  }

  // const Player2Selection = selections.find(s => s !== Player1Bet.selection)

  return (
    <WiredModal
      isOpen={isOpen}
      onConfirm={onConfirm}
      onClose={onClose}
      title={
        <Box>
          <ModalValue label="Coinflip ID" value={coinflip.id} />
          <ModalValue label="Value" color="green" value={Utils.parseValue(coinflip.value)} />
          <ModalValue label="State" value={coinflip.state} />
        </Box>
      }
    >
      <Flex
        width={1}
        flexDirection={['column', 'row']}
      // alignItems="center"
      // justifyContent="center"
      >
        <CoinflipPlayer player={Player1} bet={Player1Bet} value={value} width={[1, 1 / 3]} />

        <CoinAnimation
          // bg="backingLight"
          selection={winnerBet ? winnerBet.selection : null}
          outcome={provable ? provable.outcome : null}
          time={time}
          duration={isState('draw') ? config.drawDuration / 1000 : config.duration / 1000}
        />

        <CoinflipPlayer player={Player2} bet={Player2Bet} value={value} width={[1, 1 / 3]} />
      </Flex>
    </WiredModal>
  )
}

export default WatchCoinflip
