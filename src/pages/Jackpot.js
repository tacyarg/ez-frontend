import React, { useState } from 'react'
import { Flex, Box, Text, Button } from '../primitives'
import Spinner from '../components/Spinner'
import Modal from '../components/Modals'
import GameNav from '../components/GameNav'

import Wiring from '../libs/wiring'
import Utils from '../components/Utils'

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
        <Flex
          justifyContent="space-between"
          // my={2}
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

const History = p => {
  return <Box>{/* do somthing relevant */}</Box>
}

// const calcOdds = (betValue, JackpotValue) => {
//   const percent = betValue / JackpotValue;
//   return (percent * 100).toFixed(0);
// }

// const Nav = ({ onDeposit }) => {
//   return (
//     <Box p={2} width={1} bg="subnavbg">
//       <Flex alignItems="center" p={2} border="thick" borderColor="backingLight">
//         <Button type="primary" onClick={onDeposit}>
//           Deposit
//         </Button>
//         <Box mx="auto" />
//         <Text>Win Chance: 0%</Text>
//       </Flex>
//     </Box>
//   )
// }

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

const JoinJackpot = p => {
  const [isOpen, setOpen] = useState(false)

  function toggleModal() {
    setOpen(!isOpen)
  }

  return (
    <>
      <ConnectedModal isOpen={isOpen} toggleModal={toggleModal} />
      <Button type="primary" onClick={toggleModal}>
        Join Jackpot
      </Button>
    </>
  )
}

const ActionBar = () => {
  return (
    <>
      <Utils.TitleBar>
        {/* <Text fontSize={4}>Jackpot: </Text> */}
        <Rules />
        <Box mx="auto" />
        <JoinJackpot />
      </Utils.TitleBar>
    </>
  )
}

export default p => {
  return (
    <>
      <GameNav {...p} />
      <ActionBar />
      <Spinner.CurrentJackpotRound />
      <History />
    </>
  )
}
