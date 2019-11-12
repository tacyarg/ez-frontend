import React, { useEffect, useState } from "react";
import { Image, Button, Box, Text, Flex, Avatar } from "../../primitives";
import { GameNav, Modals, Utils, Assets } from "../index";
import Wiring from "../../libs/wiring";
import CoinSide from "./CoinSide";

// TODO: insted of taking the info in as props, spawn a connected version.

const CoinflipListing = ({
  idx = 0,
  players = [],
  bets,
  items = [],
  state = "open",
  value = 4.2,
  winner,
  config
}) => {

  const Player1 = players[0]
  const Player1Bet = bets[0]
  const Player2 = players[1]
  const Player2Bet = bets[1]

  return (
    <Flex
      p={3}
      alignItems="center"
      justifyContent="center"
      flexDirection={["column", "row"]}
      bg={Utils.isOdd(idx) ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.1)"}
    >
      <Flex alignItems="center" width={[1, 1 / 5]}>
        <Avatar src={Player1.image} size={[32, 48]} position="relative">
          <CoinSide selection={Player1Bet.selection} />
        </Avatar>
        {Player2 && (
          <>
            <Text mx={2}>VS</Text>
            <Avatar src={Player2.image} size={[32, 48]} position="relative">
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
      <Flex
        alignItems="center"
        flexDirection="column"
        m={[2, 0]}
        width={[1, 1 / 5]}
      >
        <Text fontSize={4} color={"red"}>
          {Utils.parseValue(value)}
        </Text>
        <Text fontSize={1}>
          {`${Utils.parseValue(
            value * config.discrepancyMin
          )} - ${Utils.parseValue(value * config.discrepancyMax)}`}
        </Text>
      </Flex>
      <Flex width={[1, 1 / 5]}>
        <Button type="primary">Join</Button>
        <Box mx={2} />
        <Button type="simple">Watch</Button>
      </Flex>
    </Flex>
  );
};

export default CoinflipListing;
