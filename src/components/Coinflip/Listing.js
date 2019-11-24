import React, { useEffect, useState } from "react";
import { Image, Box, Text, Flex, Avatar } from "../../primitives";
import { Utils } from "../index";
import utils from '../../libs/utils'
import CoinSide from "./CoinSide";
import RoundLimits from './RoundLimits'
import JoinCoinflipModal from './JoinCoinflip'
import WatchCoinflipModal from './WatchCoinflip'

const CoinflipListing = React.memo(({
  coinflip = {},
  userid = null,
  idx = 0,
}) => {

  const {
    Player1,
    Player1Bet,
    Player2,
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
    payouts,
    players
  } = utils.parseCoinflip(coinflip)

  return <Flex
    p={3}
    alignItems="center"
    justifyContent="center"
    flexDirection={["column", "row"]}
    bg={Utils.isOdd(idx) ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.1)"}
  >
    <Flex alignItems="center" width={[1, 1 / 5]}>
      <Avatar src={Player1.avatar} size={[32, 48]} position="relative">
        <CoinSide position="absolute" selection={Player1Bet.selection} />
      </Avatar>
      {Player2 && (
        <>
          <Text mx={2}>VS</Text>
          <Avatar src={Player2.avatar} size={[32, 48]} position="relative">
            <CoinSide position="absolute" selection={Player2Bet.selection} />
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
          {Player1.id !== userid && players.length < 2 && <>
            <JoinCoinflipModal gameid={id} selection={selection} />
            <Box mx={2} />
          </>}
        </>
        : payouts.length > 0 && <>
          <Avatar src={gameWinner.avatar} size={[32, 48]} position="relative" />
          <Box mx={2} />
          <Text>{gameWinner.username}</Text>
        </>
      }
      <WatchCoinflipModal gameid={id} />
    </Flex>
  </Flex>

}, (oldState, newState) => {
  return oldState.updated === newState.updated
})

export default CoinflipListing;
