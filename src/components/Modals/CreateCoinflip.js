import React, { useState, useEffect } from 'react'
import { Flex, Box, Text, Button, Modal, Divider } from '../../primitives'

import Assets from '../Assets'
import Wiring from '../../libs/wiring'
import Utils from '../Utils'
import WiredModal from './Modal'

const CreateCoinflip = ({ items = [], socket, ...p }) => {
  const [loading, setLoading] = useState(false)
  const [cache, setCache] = useState(Object.values(items))

  useEffect(() => {
    setCache(Object.values(items))
  }, [items])

  useEffect(() => {
    socket.private.call('listExpressTradeInventoryItems')
  }, [p.isOpen])

  const totalValue = cache
    .reduce((memo, item) => {
      memo += Number(item.price)
      return memo
    }, 0)
    .toFixed(2)

  const [selection, setSelection] = useState(null)

  const isSelected = coin => {
    return selection === coin
  }

  return (
    <WiredModal
      {...p}
      // onSearch={onSearch}
      title={
        <Flex alignItems="center">
          Create Coinflip:
          <Box mx={1} />
          <Text color="green" fontSize={4}>
            {totalValue}
          </Text>
        </Flex>
      }
    >
      <Flex width={1}>
        <Box p={4} bg="backingLight">
          <Assets.Coinflip.tCoin
            onClick={e => setSelection('t')}
            size={[50, 100]}
            selected={isSelected('t')}
          />
          <Box my={4} />
          <Assets.Coinflip.ctCoin
            onClick={e => setSelection('ct')}
            size={[50, 100]}
            selected={isSelected('ct')}
          />
        </Box>
        <Box mx="auto"/>
        <Utils.ItemList
          items={cache}
          // onChange={({ selectedItems, selectedValue }) => {
          //   setSelectedItems(selectedItems)
          //   setAmount(selectedValue)
          // }}
        />
      </Flex>
    </WiredModal>
  )
}

export default Wiring.connectMemo(CreateCoinflip, p => {
  return {
    isOpen: p.isOpen,
    onClose: p.onClose,
    onConfirm: p.onConfirm,
    socket: p.socket,
    items: p.private.inventory,
  }
})
