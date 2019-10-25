import React from "react";

import { Flex, Badge, Box, Page, Avatar, Image, Text } from "../primitives";
import Spinner from "../components/Jackpot/Spinner";
import ItemCard from "../components/ItemCard";

const BetItems = ({ items = ["3", "3", "3"] }) => {
  return (
    <Flex width={1} p={1}>
      {items.map(item => {
        return <ItemCard key={item.id} {...item} />;
      })}
    </Flex>
  );
};

const Players = p => {
  return <Flex>yo</Flex>;
};

export default p => {
  return (
    <Box bg="backing" height={'100%'}>
      <BetItems />
      <Spinner />
      <Players />
    </Box>
  );
};
