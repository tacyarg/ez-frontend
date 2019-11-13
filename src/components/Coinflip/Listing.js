import React, { useEffect, useState } from "react";
import { Image, Button, Box, Text, Flex, Avatar } from "../../primitives";
import { GameNav, Modals, Utils, Assets } from "../index";
import Wiring from "../../libs/wiring";
import CoinSide from "./CoinSide";
import RoundLimits from './RoundLimits'

// TODO: insted of taking the info in as props, spawn a connected version.

const ConnectedModal = Wiring.connectMemo(
  React.memo(({ socket, isOpen, toggleModal, selection, gameid }) => {
    return (
      <Modals.ItemDeposit.LocalInventory
        isOpen={isOpen}
        onClose={e => toggleModal()}
        onConfirm={itemids => {
          toggleModal()
          return socket.private.call('joinCoinflipFromInventory', {
            gameid,
            itemids,
            selection
          })
        }}
      />
    )
  }),
  p => {
    return {
      socket: p.socket,
      isOpen: p.isOpen,
      toggleModal: p.toggleModal,
      gameid: p.gameid,
      selection: p.selection,
    }
  }
)

const JoinCoinflip = React.memo(({ gameid, selection }) => {
  const [isOpen, setOpen] = useState(false)

  function toggleModal() {
    setOpen(!isOpen)
  }

  return (
    <>
      <ConnectedModal selection={selection} gameid={gameid} isOpen={isOpen} toggleModal={toggleModal} />
      <Button
        as={Flex}
        alignItems="center"
        type="primary"
        onClick={e => toggleModal()}
      >
        <Assets.Icons.Coins size={20} mr={2} bg="yellow" /> Join
      </Button>
    </>
  )
})

const CoinflipTimer = React.memo(({ coinflips, gameid }) => {
  const timeleft = coinflips[gameid] ? coinflips[gameid].timeleft / 1000 : 0
  return (
    <Text>{timeleft}</Text>
  )
})


const CoinflipListing = ({
  idx = 0,
  players = [],
  bets = [],
  items = [],
  state = "open",
  value = 4.2,
  winner,
  id,
  config,
  timeleft = 0,
  userid = null
}) => {

  const Player1 = players[0]
  const Player1Bet = bets[0]
  const Player2 = players[1]
  const Player2Bet = bets[1]
  const selection = config.selections.find(b => Player1Bet.selection !== b)
  const time = Math.floor(timeleft / 1000)
  const gameWinner = players.find(p => p.id === winner)

  console.log(Player1.id, userid)

  return <Flex
    p={3}
    alignItems="center"
    justifyContent="center"
    flexDirection={["column", "row"]}
    bg={Utils.isOdd(idx) ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.1)"}
  >
    <Flex alignItems="center" width={[1, 1 / 5]}>
      <Avatar src={Player1.avatar} size={[32, 48]} position="relative">
        <CoinSide selection={Player1Bet.selection} />
      </Avatar>
      {Player2 && (
        <>
          <Text mx={2}>VS</Text>
          <Avatar src={Player2.avatar} size={[32, 48]} position="relative">
            <CoinSide selection={Player2Bet.selection} />
          </Avatar>
        </>
      )}
    </Flex>
    <Flex alignItems="center" width={[1, 1 / 3]}>
      {items.map((p, k) => {
        if (k > 3) return;
        return (
          <Image
            key={p.id}
            src={p.image}
            alt={p.name}
            size={[32, 48]}
            p={2}
          />
        );
      })}
      {items.length > 3 && items.length - 4 > 0 && (
        <Flex ml={1} p={2} flexDirection="column" alignItems="center">
          <Text fontSize={3} color="subtext">{`+${items.length - 4}`}</Text>
          <Text fontSize={1} color="subtext" opacity={0.5}>
            more
            </Text>
        </Flex>
      )}
    </Flex>
    <Text fontSize={4} color="subtext" p={[1, 0]} width={[1, 1 / 6]}>
      {time > 0 && time < 60 ? time : state}
    </Text>
    <RoundLimits value={value} config={config} />
    <Flex width={[1, 1 / 5]} alignItems="center">
      {!winner ?
        <>
          {Player1.id !== userid && <>
            <JoinCoinflip gameid={id} selection={selection} />
            <Box mx={2} />
          </>}
          <Button type="simple">Watch</Button>
        </>
        :
        <>
          <Avatar src={gameWinner.avatar} size={[32, 48]} position="relative" />
          <Box mx={2} />
          <Text>{gameWinner.username}</Text>
        </>
      }
    </Flex>
  </Flex>

}

export default CoinflipListing;
