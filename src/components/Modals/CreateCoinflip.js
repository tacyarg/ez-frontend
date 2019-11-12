import React, { useState, useEffect } from "react";
import { Flex, Box, Text, Button, Modal, Divider } from "../../primitives";

import Assets from "../Assets";
import Wiring from "../../libs/wiring";
import Utils from "../Utils";
import WiredModal from "./Modal";

const CreateCoinflip = ({
  items = [],
  socket,
  onConfirm = x => x,
  onClose = x => x,
  isOpen
}) => {
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState(Object.values(items));
  const [total, setTotal] = useState(0)
  const [amount, setAmount] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    setCache(Object.values(items))
    setSelectedItems([])
    setAmount(0)

    setTotal(
      cache
        .reduce((memo, item) => {
          memo += Number(item.price)
          return memo
        }, 0)
        .toFixed(2)
    )
  }, [items, isOpen, onClose, onConfirm])


  const isSelected = coin => {
    return selection === coin;
  };

  return (
    <WiredModal
      isOpen={isOpen}
      amount={amount}
      onConfirm={e => {
        onConfirm(selectedItems, selection);
        setSelectedItems([]);
      }}
      onClose={e => {
        onClose(selectedItems);
        setSelectedItems([]);
      }}
      title={
        <Flex alignItems="center">
          Create Coinflip:
          <Box mx={1} />
          <Text color="green" fontSize={4}>
            {total}
          </Text>
        </Flex>
      }
    >
      <Flex width={1}>
        <Box p={4} bg="backingLight">
          <Assets.Coinflip.tCoin
            onClick={e => setSelection("heads")}
            size={[50, 100]}
            selected={isSelected("heads")}
          />
          <Box my={4} />
          <Assets.Coinflip.ctCoin
            onClick={e => setSelection("tails")}
            size={[50, 100]}
            selected={isSelected("tails")}
          />
        </Box>
        <Box mx="auto" />
        <Utils.ItemList
          items={cache}
          onChange={({ selectedItems, selectedValue }) => {
            setSelectedItems(selectedItems);
            setAmount(selectedValue);
          }}
        />
      </Flex>
    </WiredModal>
  );
};

export default Wiring.connectMemo(CreateCoinflip, p => {
  return {
    isOpen: p.isOpen,
    onClose: p.onClose,
    onConfirm: p.onConfirm,
    socket: p.socket,
    items: p.private.inventory
  };
});
