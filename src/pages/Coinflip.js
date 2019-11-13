import React, { useEffect, useState } from "react";
import {
  Image,
  Button,
  Box,
  Card,
  Text,
  Flex,
  Page,
  Avatar
} from "../primitives";
import FakeCoinflips from "../libs/fake/coinflips";
import { GameNav, Modals, Utils, Assets } from "../components";
import Wiring from "../libs/wiring";

import Stat from "../components/Coinflip/Stat";
import ConnectedModal from "../components/Coinflip/Modal";
import CoinflipListing from "../components/Coinflip/Listing";

const Stats = Wiring.connectMemo(({ coinflips }) => {

  const [stats, setStats] = useState([])

  useEffect(() => {
    coinflips = Object.values(coinflips)
    const totalValue = coinflips.reduce((memo, cf) => {
      memo += cf.value
      return memo
    }, 0)
    const totalItems = coinflips.reduce((memo, cf) => {
      memo += cf.items.length
      return memo
    }, 0)
    const totalPlayers = coinflips.reduce((memo, cf) => {
      memo += cf.players.length
      return memo
    }, 0)

    setStats([
      {
        label: 'Total Value',
        value: totalValue,
        // text: '#e2c957',
        money: true
      },
      {
        label: 'Total Items',
        value: totalItems,
        color: '#00aeef'
      },
      {
        label: "Total Players",
        value: totalPlayers,
        color: '#e94c4c'
      }
    ])

  }, [coinflips])

  return (
    <Flex flexWrap="wrap">
      {stats.map(s => {
        return <Stat {...s} />;
      })}
    </Flex>
  );
},
  ({ coinflips = {} }) => {
    return {
      coinflips
    };
  }
);

const ConnectedListings = Wiring.connect(
  p => {
    const { coinflips ={} } = p
    return Object.values(coinflips).map((cf, idx) => {
      return <CoinflipListing {...cf} key={cf.id} idx={idx} />;
    });
  }
);

export default p => {
  return (
    <>
      <Box height={"100%"}>
        <GameNav {...p} />
        <Utils.TitleBar flexDirection={["column", "row"]}>
          <Stats />
          <Box mx={[0, "auto"]} />
          <ConnectedModal />
        </Utils.TitleBar>
        <Flex
          // flexWrap="wrap"
          justifyContent="center"
          bg="backingLight"
          p={[2, 3]}
          alignItems="center"
          borderBottom="3px solid #42b142"
          flexDirection={["column", "row"]}
        >
          <Text width={[1, 1 / 5]}>Players</Text>
          <Text width={[1, 1 / 3]}>Items</Text>
          <Text width={[1, 1 / 7]}>Status</Text>
          <Text width={[1, 1 / 7]}>Total</Text>
          <Text width={[1, 1 / 5]}>Actions</Text>
        </Flex>
        <ConnectedListings />
      </Box>
    </>
  );
};
