import React, { useState, useEffect } from 'react'
import { Flex, Box, Text, Button, Modal, Divider } from '../../primitives'

import Assets from '../Assets'
import Wiring from '../../libs/wiring'
import Utils from '../Utils'
import WiredModal from './Modal'

const ItemDeposit = ({
  items = [],
  isOpen = x => x,
  onClose = x => x,
  onConfirm = x => x,
}) => {
  const [cache, setCache] = useState([])
  const [total, setTotal] = useState(0)
  const [amount, setAmount] = useState(0)
  const [selectedItems, setSelectedItems] = useState([])

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
  }, [items, isOpen])

  return (
    <WiredModal
      isOpen={isOpen}
      amount={amount}
      onConfirm={e => {
        onConfirm(selectedItems)
        setSelectedItems([])
      }}
      onClose={e => {
        onClose(selectedItems)
        setSelectedItems([])
      }}
      // onSearch={onSearch}
      title={
        <Flex alignItems="center">
          Deposit Items:
          <Box mx={1} />
          <Text color="green" fontSize={4}>
            {total}
          </Text>
        </Flex>
      }
    >
      <Utils.ItemList
        items={cache}
        onChange={({ selectedItems, selectedValue }) => {
          setSelectedItems(selectedItems)
          setAmount(selectedValue)
        }}
      />
    </WiredModal>
  )
}

ItemDeposit.WaxInventory = Wiring.connectMemo(
  props => {
    useEffect(() => {
      if (props.socket)
        props.socket.private.call('listAllMyExpressTadeInventoryItems')
    }, [props.isOpen])
    return <ItemDeposit {...props} />
  },
  p => {
    return {
      isOpen: p.isOpen,
      onClose: p.onClose,
      onConfirm: p.onConfirm,
      socket: p.socket,
      items: p.private.waxInventory,
    }
  }
)

ItemDeposit.LocalInventory = Wiring.connectMemo(
  props => {
    return <ItemDeposit {...props} />
  },
  p => {
    return {
      isOpen: p.isOpen,
      onClose: p.onClose,
      onConfirm: p.onConfirm,
      socket: p.socket,
      items: p.private.inventory,
    }
  }
)

export default ItemDeposit
