import React, { useState } from 'react'
import { Divider, Flex, Box, Text, Button } from '../primitives'
import Spinner from '../components/Spinner'
import Modals from '../components/Modals'
import GameNav from '../components/GameNav'

import Wiring from '../libs/wiring'
import Utils from '../components/Utils'
import Assets from '../components/Assets'

const Rule = ({ children, ...p }) => {
  return (
    <Text
      borderRadius="normal"
      bg="subnavbg"
      fontWeight="normal"
      p={2}
      fontSize={1}
      m={1}
      {...p}
    >
      {children}
    </Text>
  )
}

const Rules = Wiring.connectMemo(
  ({
    betValueMax = 100000, // max value per bet
    betValueMin = 1, // min value per bet
    betItemLimit = 20, // max items per bet
  }) => {
    return (
      <Flex justifyContent="center">
        <Flex justifyContent="space-between" flexDirection={['column', 'row']}>
          <Rule>SKIN LIMIT: {betItemLimit}</Rule>
          <Rule>MIN BET: {Utils.parseValue(betValueMin)}</Rule>
          <Rule>MAX BET: {Utils.parseValue(betValueMax)}</Rule>
        </Flex>
      </Flex>
    )
  },
  p => p.jackpot.config
)

const ConnectedModal = Wiring.connectMemo(
  ({ socket, isOpen, toggleModal, gameid }) => {
    return (
      <Modals.ItemDeposit.LocalInventory
        isOpen={isOpen}
        onClose={e => toggleModal()}
        onConfirm={itemids => {
          toggleModal()
          return socket.private.call('joinJackpotFromInventory', {
            gameid,
            itemids,
          })
        }}
      />
    )
  },
  p => {
    return {
      socket: p.socket,
      isOpen: p.isOpen,
      toggleModal: p.toggleModal,
      gameid: p.jackpot.id,
    }
  }
)

const JoinJackpot = p => {
  const [isOpen, setOpen] = useState(false)

  function toggleModal() {
    setOpen(!isOpen)
  }

  return (
    <>
      <ConnectedModal isOpen={isOpen} toggleModal={toggleModal} />
      <Button
        as={Flex}
        alignItems="center"
        type="primary"
        onClick={e => toggleModal()}
      >
        <Assets.Icons.Coins size={20} mr={2} bg="yellow" /> Join Jackpot
      </Button>
    </>
  )
}

const ActionBar = () => {
  return (
    <Utils.TitleBar>
      {/* <Text fontSize={4}>Rules: </Text> */}
      <Rules />
      <Box mx="auto" />
      <JoinJackpot />
    </Utils.TitleBar>
  )
}

const History = Wiring.connect(p => {
  return Object.values(p.history)
    .sort((x, y) => {
      return x.updated < y.updated ? 1 : -1
    })
    .map(game => {
      // return <Text>{game.id}</Text>
      return <>
        <Spinner game={game} my={4} />
        <Divider />
      </>
    })
}, p => {
  console.log(p)
  return {
    // currentJackpot: p.public.jackpot,
    history: p.public.jackpots
  }
})

export default p => {
  return (
    <>
      <GameNav {...p} />
      <ActionBar />
      {/* <Spinner.CurrentJackpotRound /> */}
      {/* <Divider /> */}
      <History />
    </>
  )
}
