import React, { useState } from 'react'
import { Flex, Box, Text, Button } from '../primitives'
import Spinner from '../components/Spinner'
import Cards from '../components/Cards'
import Assets from '../components/Assets'
import Modal from '../components/Modals'
import GameNav from '../components/GameNav'

import Wiring from '../libs/wiring'
import Utils from '../components/Utils'

const BetItems = Wiring.connectMemo(
  ({ players = [], items = [] }) => {
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
  },
  p => {
    return {
      players: p.jackpot.players,
      items: p.jackpot.items,
    }
  }
)

const Bets = Wiring.connectMemo(
  ({ players = [], bets = [] }) => {
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
  },
  p => {
    return {
      players: p.jackpot.players,
      bets: p.jackpot.bets,
    }
  }
)

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
      <Flex width={1} justifyContent="center">
        <Flex
          justifyContent="space-between"
          my={2}
          flexDirection={['column', 'row']}
        >
          <Rule>SKIN LIMIT: {betItemLimit}</Rule>
          <Rule>MIN BET: {Utils.parseValue(betValueMin)}</Rule>
          <Rule>MAX BET: {Utils.parseValue(betValueMax)}</Rule>
        </Flex>
      </Flex>
    )
  },
  p => p.jackpot.config
)

const CurrentRound = p => {
  return (
    <>
      <Rules />
      <BetItems />
      <Spinner />
      <Bets />
    </>
  )
}

const History = p => {
  return <Box>{/* do somthing relevant */}</Box>
}

// const calcOdds = (betValue, JackpotValue) => {
//   const percent = betValue / JackpotValue;
//   return (percent * 100).toFixed(0);
// }

const Nav = ({ onDeposit }) => {
  return (
    <Box p={2} width={1} bg="subnavbg">
      <Flex alignItems="center" p={2} border="thick" borderColor="backingLight">
        <Button type="primary" onClick={onDeposit}>
          Deposit
        </Button>
        <Box mx="auto" />
        <Text>Win Chance: 0%</Text>
      </Flex>
    </Box>
  )
}

const ConnectedModal = Wiring.connectMemo(
  ({ socket, isOpen, toggleModal, gameid }) => {
    return (
      <Modal.DepositFromInventory
        isOpen={isOpen}
        onClose={e => {
          toggleModal()
        }}
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

export default p => {
  const [isOpen, setOpen] = useState(false)

  function toggleModal() {
    setOpen(!isOpen)
  }

  return (
    <>
      <ConnectedModal isOpen={isOpen} toggleModal={toggleModal} />
      <GameNav {...p} />
      <Nav onDeposit={e => toggleModal()} />
      <CurrentRound />
      <History />
    </>
  )
}
